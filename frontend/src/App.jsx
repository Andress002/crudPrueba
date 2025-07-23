import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    identificacion: '',
    tipo_identificacion: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    direccion: '',
    telefono: '',
    email: '',
    ocupacion: '',
    fecha_nacimiento: '',
    foto: ''
  });

  const [clientes, setClientes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [clienteActual, setClienteActual] = useState(null);

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clientes');
      setClientes(res.data);
    } catch (err) {
      console.error('Error al obtener los clientes', err);
    }
  };

  const validar = () => {
    const errores = {};
    const soloLetras = /^[A-Za-z\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const edadValida = (fecha, tipo) => {
      if (!fecha) return false;
      const hoy = new Date();
      const nacimiento = new Date(fecha);
      if (nacimiento > hoy) return false;

      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad--;

      if (tipo === 'RC' && edad >= 7) return false;
      if (tipo === 'TI' && (edad < 7 || edad >= 18)) return false;
      if (tipo === 'CC' && edad < 18) return false;

      return true;
    };

    if (!formData.identificacion) errores.identificacion = 'Identificacion es requerida';
    if (!formData.tipo_identificacion) errores.tipo_identificacion = 'Tipo de identificacion es requerido';
    if (!formData.primer_nombre || !soloLetras.test(formData.primer_nombre))
      errores.primer_nombre = 'El primer nombre solo puede contener letras y espacios';
    if (formData.segundo_nombre && !soloLetras.test(formData.segundo_nombre))
      errores.segundo_nombre = 'El segundo nombre solo puede contener letras y espacios';
    if (!formData.primer_apellido || !soloLetras.test(formData.primer_apellido))
      errores.primer_apellido = 'El primer apellido solo puede contener letras y espacios';
    if (formData.segundo_apellido && !soloLetras.test(formData.segundo_apellido))
      errores.segundo_apellido = 'El segundo apellido solo puede contener letras y espacios';
    if (!soloNumeros.test(formData.telefono))
      errores.telefono = 'El telefono solo puede contener numeros';
    if (!emailValido.test(formData.email))
      errores.email = 'El correo electronico no es valido';
    if (!edadValida(formData.fecha_nacimiento, formData.tipo_identificacion))
      errores.fecha_nacimiento = 'La fecha de nacimiento no es valida para este tipo de identificacion';

    return errores;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
    setErrors({ ...errors, [name]: undefined });
  };

  const mostrarError = (campo) => {
    return errors[campo] && <span className="error">{errors[campo]}</span>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = validar();

    if (Object.keys(errores).length > 0) {
      setErrors(errores);
      return;
    }

    const datos = new FormData();
    Object.entries(formData).forEach(([clave, valor]) => {
      if (valor) datos.append(clave, valor);
    });

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:5000/api/clientes/${clienteActual._id}`, datos);
        alert('Cliente actualizado');
      } else {
        await axios.post('http://localhost:5000/api/clientes', datos);
        alert('Cliente registrado');
      }

      obtenerClientes();
      resetFormulario();
    } catch (err) {
      console.error('Error al enviar los datos', err);
      alert('Hubo un error');
    }
  };

  const resetFormulario = () => {
    setFormData({
      identificacion: '',
      tipo_identificacion: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      direccion: '',
      telefono: '',
      email: '',
      ocupacion: '',
      fecha_nacimiento: '',
      foto: ''
    });
    setIsUpdating(false);
    setClienteActual(null);
    setErrors({});
  };

  const eliminarCliente = async (id) => {
    if (window.confirm('¿Eliminar cliente?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clientes/${id}`);
        alert('Cliente eliminado');
        obtenerClientes();
      } catch (err) {
        console.error('Error al eliminar', err);
      }
    }
  };

  const iniciarActualizacion = (cliente) => {
    setIsUpdating(true);
    setClienteActual(cliente);
    setFormData({
      identificacion: cliente.identificacion,
      tipo_identificacion: cliente.tipo_identificacion,
      primer_nombre: cliente.primer_nombre,
      segundo_nombre: cliente.segundo_nombre || '',
      primer_apellido: cliente.primer_apellido,
      segundo_apellido: cliente.segundo_apellido || '',
      direccion: cliente.direccion || '',
      telefono: cliente.telefono,
      email: cliente.email,
      ocupacion: cliente.ocupacion || '',
      fecha_nacimiento: cliente.fecha_nacimiento,
      foto: ''
    });
  };

  return (
    <div className="contenedor-principal">
      <div className="formulario">
        <h2>{isUpdating ? 'Actualizar Cliente' : 'Registrar Cliente'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Identificacion:</label>
            <input type="text" name="identificacion" value={formData.identificacion} onChange={handleChange} />
            {mostrarError('identificacion')}
          </div>

          <div>
            <label>Tipo de identificacion:</label>
            <select name="tipo_identificacion" value={formData.tipo_identificacion} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="RC">RC - Registro Civil</option>
              <option value="TI">TI - Tarjeta de Identidad</option>
              <option value="CC">CC - Cédula de Ciudadania</option>
            </select>
            {mostrarError('tipo_identificacion')}
          </div>

          <div>
            <label>Primer Nombre:</label>
            <input type="text" name="primer_nombre" value={formData.primer_nombre} onChange={handleChange} />
            {mostrarError('primer_nombre')}
          </div>

          <div>
            <label>Segundo Nombre:</label>
            <input type="text" name="segundo_nombre" value={formData.segundo_nombre} onChange={handleChange} />
            {mostrarError('segundo_nombre')}
          </div>

          <div>
            <label>Primer Apellido:</label>
            <input type="text" name="primer_apellido" value={formData.primer_apellido} onChange={handleChange} />
            {mostrarError('primer_apellido')}
          </div>

          <div>
            <label>Segundo Apellido:</label>
            <input type="text" name="segundo_apellido" value={formData.segundo_apellido} onChange={handleChange} />
            {mostrarError('segundo_apellido')}
          </div>

          <div>
            <label>Telefono:</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
            {mostrarError('telefono')}
          </div>

          <div>
            <label>Correo Electronico:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {mostrarError('email')}
          </div>

          <div>
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
            {mostrarError('fecha_nacimiento')}
          </div>

          <div>
            <label>Foto (opcional):</label>
            <input type="file" name="foto" accept="image/*" onChange={handleChange} />
          </div>

          <button type="submit">
            {isUpdating ? 'Actualizar Cliente' : 'Registrar Cliente'}
          </button>

          {isUpdating && (
            <button
              type="button"
              onClick={resetFormulario}
              style={{
               backgroundColor: '#999',
               color: 'white',
               padding: '10px 1px',
               paddingTop: '6px',
               border: 'none',
               borderRadius: '4px',
               cursor: 'pointer' 
              }}
            >
              Cancelar actualizacion
            </button>
          )}
        </form>
      </div>

      <div className="lista-clientes">
        <h2>Clientes Registrados</h2>
        <ul>
          {clientes.map((cliente) => {
            const nombreCompleto = [
              cliente.primer_nombre,
              cliente.segundo_nombre,
              cliente.primer_apellido,
              cliente.segundo_apellido
            ].filter(Boolean).join(' ');

            return (
              <li key={cliente._id}>
                <strong>{nombreCompleto}</strong><br />
                <span><strong>ID:</strong> {cliente.identificacion}</span><br />
                <span><strong>Email:</strong> {cliente.email}</span><br />
                <span><strong>Tel:</strong> {cliente.telefono}</span><br />
                {cliente.foto && (
                  <div>
                    <img
                      src={`http://localhost:5000/uploads/${cliente.foto}`}
                      alt="Foto"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <button onClick={() => iniciarActualizacion(cliente)}>Actualizar</button>
                <button onClick={() => eliminarCliente(cliente._id)}>Eliminar</button>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
