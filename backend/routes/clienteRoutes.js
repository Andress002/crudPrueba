const express = require('express');
const Cliente = require('../models/Cliente');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuracion de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Carpeta donde se guardaran las fotos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

// Validar ObjectId antes de realizar la consulta
const validarObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


// Crear un cliente con foto (POST)
router.post('/', upload.single('foto'), async (req, res) => {
    try {
        const data = req.body;

        
        if (req.file) {
            data.foto = req.file.filename; // Guarda la ruta al archivo subido
        }

        const nuevoCliente = new Cliente(data);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);  
    } catch (error) {
        console.error('Error al crear cliente', error.message);
        res.status(500).json({ error: 'Error al crear cliente' });
    }
});

// Obtener todos los clientes (GET)
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error al obtener clientes:', error.message);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

// Obtener cliente por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!validarObjectId(id)) return res.status(400).json({ error: 'ID no válido' });

    try {
        const cliente = await Cliente.findById(id);
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error al obtener cliente:', error.message);
        res.status(500).json({ error: 'Error al obtener cliente' });
    }
});

// Actualizar cliente

router.put('/:id', upload.single('foto'), async (req, res) => {
    const { id } = req.params;
    if (!validarObjectId(id)) return res.status(400).json({ error: 'ID no válido' });

    try {
        if (req.file) {
            req.body.foto = req.file.filename; //  Actualiza la foto si se sube una nueva
        }

        const actualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.status(200).json(actualizado);
    } catch (error) {
        console.error('Error al actualizar cliente', error.message);
        res.status(500).json({ error: 'Error al actualizar cliente' });
    }
});


// Eliminar cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!validarObjectId(id)) return res.status(400).json({ error: 'ID no valido' });

    try {
        const eliminado = await Cliente.findByIdAndDelete(id);
        if (!eliminado) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error) {
        console.error('Error al eliminar cliente', error.message);
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
});

module.exports = router;
