##  Prueba Técnica - Sistema de Gestión de Clientes

Este proyecto implementa un sistema completo para **gestionar clientes** con operaciones CRUD (crear, leer, actualizar y eliminar), utilizando:

- 🔧 **Backend**: Node.js + Express + MongoDB (Mongoose)
- 💻 **Frontend**: React
- ✅ Validaciones en frontend y backend
- 📡 API RESTful

---

##  Tecnologias utilizadas

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Base de datos**: MongoDB
- **ORM**: Mongoose
- **Herramientas adicionales**: axios, dotenv, cors

---

## 📁 Estructura del proyecto

/backend
├── models/
│ └── Cliente.js
├── routes/
│ └── clienteRoutes.js
├── server.js
└── .env

/frontend
├── src/
│ ├── App.jsx
│ └── services/clienteService.js
└── public/
└── index.html


## ⚙️ Instalacion y ejecucion

### 🔧 Requisitos previos

- Node.js v18+ instalado
- MongoDB (local o Atlas)



### 🚀 Configurar y ejecutar el backend
```bash

cd backend
npm install
```

## Crear un archivo .env con este contenido

```env
PORT=5000
DB_URI=mongodb://localhost:27017/clientesDB
```


## Ejecutar el servidor

node server.js

El backend quedara activo en: http://localhost:5000

##  Configurar el frontend

```bash
cd ../frontend
npm install
npm start
```

El frontend estara disponible en: http://localhost:5173


##  Funcionalidades

🔄 Funcionalidades
Descripción

➕ Crear cliente : 	Formulario con validaciones y foto opcional
📋 Consultar clientes : 	Lista de clientes registrados con foto
✏️ Editar cliente : 	Modifica campos existentes
❌ Eliminar cliente : 	Borra el registro de un cliente



✅ Validaciones Importantes

📞 Teléfono: solo numeros

🧍‍♂️ Nombres/apellidos: solo letras

✉️ Email: validación con regex

🎂 Fecha de nacimiento:

RC: menor de 7 años

TI: entre 7 y 17 años

CC: 18 años o más



🖼️ Subida de Fotos
Las imágenes se suben al backend con multer

Se almacenan en: backend/uploads

Se visualizan desde:

http://localhost:5000/uploads/nombre_de_la_foto.jpg



Desarrollado por: (Andres_Ramos)
Fecha: Julio 2025
Proyecto: Prueba técnica - SYSNET













