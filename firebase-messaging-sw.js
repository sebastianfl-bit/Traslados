importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Reemplaza con tu config de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-dcx2xUMkC8gPFkRxwpywkeUkUX8heb0",
  authDomain: "uberfamily-79768.firebaseapp.com",
  databaseURL: "https://uberfamily-79768-default-rtdb.firebaseio.com",
  projectId: "uberfamily-79768",
  storageBucket: "uberfamily-79768.firebasestorage.app",
  messagingSenderId: "800976815153",
  appId: "1:800976815153:web:5736033ce4588652928110",
  measurementId: "G-RNTMNEKXT5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/Traslados/icon-192.png',
    badge: '/Traslados/icon-192.png',
    vibrate: [200, 100, 200],
  });
});
