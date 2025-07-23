import axios from "axios";


const API_URL = 'http://localhost:5000/api/clientes';


//Obtener los clientes
export const getClientes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes' , error);
        throw error;
    }
};


// Funcion para crear un cliente
export const crearCliente = async (clienteData) => {
    try {
        const response = await axios.post(API_URL , clienteData)
        return response.data;
    } catch (error) {
        console.error('Error al crear el cliente' , error);
        throw error;
    }
};


export const actualizarCliente = async (id , clienteData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}` , clienteData)
        return response.data; 
    } catch (error) {
        console.error('Error para actualizar los clientes', error);
        throw error;
    }
};

export const eliminarCliente = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error para eliminar el cliente' , error);
        throw error;
    }
};

