# Traslados — Setup en 15 minutos

## Archivos incluidos
- `index.html` — la app completa
- `manifest.json` — configuración PWA
- `README.md` — estas instrucciones

---

## Paso 1: Crear proyecto Firebase (5 min)

1. Ve a https://console.firebase.google.com
2. Clic en **"Agregar proyecto"**
3. Nombre: `traslados-fam` (o el que quieras)
4. Desactiva Google Analytics (no es necesario) → **Crear proyecto**
5. En el menú izquierdo → **Realtime Database** → **Crear base de datos**
   - Elige cualquier ubicación (ej. us-central1)
   - Selecciona **"Iniciar en modo de prueba"** → Siguiente
6. En el menú izquierdo → **Configuración del proyecto** (ícono ⚙️)
7. Baja hasta **"Tus apps"** → clic en **</>** (web)
8. Nombre de la app: `traslados` → **Registrar app**
9. Copia el objeto `firebaseConfig` que aparece — se ve así:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "traslados-fam.firebaseapp.com",
  databaseURL: "https://traslados-fam-default-rtdb.firebaseio.com",
  projectId: "traslados-fam",
  storageBucket: "traslados-fam.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## Paso 2: Pegar credenciales en index.html (1 min)

Abre `index.html` y busca este bloque (línea ~270):

```js
// 🔥 REEMPLAZA ESTO CON TU CONFIG DE FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  ...
};
```

Reemplázalo con tu config copiada del paso anterior.

---

## Paso 3: Subir a Netlify (5 min)

1. Ve a https://netlify.com → crea cuenta gratis con tu email
2. En el dashboard → **"Add new site"** → **"Deploy manually"**
3. Arrastra la carpeta `traslados` (que contiene index.html y manifest.json)
4. ¡Listo! Netlify te da una URL como `https://algo-random-123.netlify.app`

---

## Paso 4: Instalar en el teléfono

### iPhone (Safari)
1. Abre la URL en Safari
2. Toca el botón compartir (□↑)
3. → **"Agregar a pantalla de inicio"**

### Android (Chrome)
1. Abre la URL en Chrome
2. Toca los tres puntos (⋮)
3. → **"Agregar a pantalla de inicio"** o aparece un banner automático

---

## Reglas de seguridad Firebase (opcional pero recomendado)

En Firebase Console → Realtime Database → Reglas, pega esto:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Esto permite acceso libre (está bien para uso familiar privado).

---

## Personalización

En `index.html` puedes cambiar:
- Nombres "Tito" y "Ale" buscando esos textos
- Colores de cada hijo en la sección de Ajustes dentro de la app

¡Listo!
