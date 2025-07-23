require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a MongoDB usando Mongoose
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);  
  });

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor Express corriendo correctamente!');
});

// Rutas de clientes
app.use('/api/clientes', clienteRoutes);  


// Configuración del puerto y el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Corriendo en http://localhost:5000/`);
});
