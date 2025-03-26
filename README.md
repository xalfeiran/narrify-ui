# 🎙️ Narrify UI

**Narrify** es una aplicación web que resume automáticamente videos de YouTube usando inteligencia artificial. Este repositorio contiene el **frontend** desarrollado en React + TailwindCSS.

👉 Visítalo en producción: [https://narrify.cloud](https://narrify.cloud)

---

## 🧠 ¿Qué hace?

1. Permite al usuario pegar el link de un video de YouTube.
2. Extrae la transcripción (si está disponible).
3. Envía la transcripción a un backend que usa la API de OpenAI.
4. Muestra un resumen estructurado e inteligente, con emojis, títulos y conclusiones claras.

---

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Helmet](https://github.com/nfl/react-helmet) (para SEO)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 🚀 Instalación local

```bash
git clone https://github.com/tuusuario/narrify-ui.git
cd narrify-ui
npm install
npm start
```

Por defecto, la app se ejecutará en [http://localhost:3000](http://localhost:3000)

---

## 🌐 Comunicación con el backend

La app se comunica con el backend a través de una ruta como:

```
GET /summarize?video_id=VIDEO_ID
Authorization: Bearer TU_TOKEN
```

Puedes configurar esta URL y el token en un archivo `.env`:

```env
REACT_APP_API_URL=https://narrify.cloud/summarize
REACT_APP_API_TOKEN=tu_token_privado
```

(Recuerda reiniciar el servidor si haces cambios en `.env`)

---

## 📁 Estructura del proyecto

```
/public
  └── index.html
/src
  ├── App.js
  ├── index.css
  └── assets/
```

---

## 🧩 Características destacadas

- UI amigable y responsiva (TailwindCSS)
- Soporte para CORS
- Permite pegar links de YouTube en distintos formatos
- Presenta el resumen con estructura clara, título, canal y video embed
- Sección de "Cómo funciona"
- Pie de página con branding

---

## 📌 Pendientes / ideas futuras

- Validación automática del link
- Almacenamiento de historial del usuario
- Compartir resúmenes por link único
- Fallback automático a un servidor alterno (en Raspberry Pi, por ejemplo)
- Soporte para múltiples idiomas

---

## ✨ Créditos

Desarrollado por [Xavier Alfeirán](https://www.linkedin.com/in/xavieralfeiran/) como un experimento entre necesidad, curiosidad y amor por la tecnología.

---

## 📝 Licencia

MIT License
