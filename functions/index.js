const { onValueWritten } = require("firebase-functions/v2/database");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const { getDatabase } = require("firebase-admin/database");

initializeApp();

const NAMES = {
  tito: "Tito",
  ale: "Ale",
  sol: "Sol",
  tatan: "Tatan",
  luci: "Luci",
};

// Triggered when an assignment changes
exports.notifyOnAssignment = onValueWritten(
  {
    ref: "/assignments/{weekKey}/{day}/{tripKey}",
    region: "us-central1",
  },
  async (event) => {
    const assignedTo = event.data.after.val();
    const previouslyAssigned = event.data.before.val();

    // Only notify when someone new assigns (not when releasing)
    if (!assignedTo || assignedTo === previouslyAssigned) return;

    const { weekKey, day, tripKey } = event.params;

    // Get trip details
    const db = getDatabase();
    const tripSnap = await db.ref(`fixed_trips/${day}/${tripKey}`).get();
    // Also check onetime trips
    let trip = tripSnap.val();
    if (!trip) {
      const onetimeSnap = await db
        .ref(`onetime_trips/${weekKey}/${day}/${tripKey}`)
        .get();
      trip = onetimeSnap.val();
    }
    if (!trip) return;

    const assignedName = NAMES[assignedTo] || assignedTo;
    const dayNames = {
      lun: "lunes",
      mar: "martes",
      mie: "miércoles",
      jue: "jueves",
      vie: "viernes",
    };
    const dayName = dayNames[day] || day;
    const typeLabel = trip.type === "llevar" ? "lleva" : "busca";

    const title = `🚗 ${assignedName} se asignó`;
    const body = `${assignedName} ${typeLabel} a ${trip.childId === "sol" ? "Sol" : trip.childId === "tatan" ? "Tatan" : "Luci"} el ${dayName} a las ${trip.time}`;

    // Get all FCM tokens except the one who assigned
    const tokensSnap = await db.ref("fcm_tokens").get();
    const tokensData = tokensSnap.val();
    if (!tokensData) return;

    const tokens = Object.entries(tokensData)
      .filter(([user, _]) => user !== assignedTo)
      .flatMap(([_, userTokens]) =>
        typeof userTokens === "object" ? Object.values(userTokens) : [userTokens]
      )
      .filter(Boolean);

    if (tokens.length === 0) return;

    // Send notifications
    const messaging = getMessaging();
    const results = await messaging.sendEachForMulticast({
      tokens,
      notification: { title, body },
      webpush: {
        notification: {
          title,
          body,
          icon: "/Traslados/icon-192.png",
          badge: "/Traslados/icon-192.png",
          vibrate: [200, 100, 200],
        },
        fcmOptions: {
          link: "https://sebastianfl-bit.github.io/Traslados/",
        },
      },
    });

    // Clean up invalid tokens
    const invalidTokens = [];
    results.responses.forEach((resp, i) => {
      if (!resp.success) invalidTokens.push(tokens[i]);
    });

    console.log(
      `Sent ${results.successCount} notifications, ${results.failureCount} failed`
    );
  }
);
