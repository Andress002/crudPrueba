const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  identificacion: {
    type: String,
    required: true
  },
  tipo_identificacion: {
    type: String,
    required: true,
    enum: ['RC', 'TI', 'CC'] 
  },
  primer_nombre: {
    type: String,
    required: true,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El primer nombre solo debe contener letras']
  },
  segundo_nombre: {
    type: String,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'El segundo nombre solo debe contener letras']
  },
  primer_apellido: {
    type: String,
    required: true,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El primer apellido solo debe contener letras']
  },
  segundo_apellido: {
    type: String,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'El segundo apellido solo debe contener letras']
  },
  direccion: String,
  telefono: {
    type: String,
    required: true,
    match: [/^\d+$/, 'El telefono solo debe contener numeros']
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo valido']
  },
  ocupacion: String,
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  foto: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = Cliente;

