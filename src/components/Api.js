import axios from 'axios';
const API_URL = 'http://localhost:8080';

export const cursoById = (id) => {
    return axios.get(`${API_URL}/api/curso/${id}`)
        .then(response => {
            return response.data
        })
}

export const allCursos = () => {
    return axios.get(`${API_URL}/api/curso`)
        .then(response => {
            return response.data
        } )
}