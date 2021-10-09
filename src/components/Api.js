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

export const solicitarCupo = (id, usuario) => {
    return axios.post(`${API_URL}/api/curso/${id}`, usuario)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            return err.response.data
        })
}

export const cancelarCupo = (id, usuario) => {
    return axios.post(`${API_URL}/api/curso/${id}/cancelar`, usuario)
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err)
        return err.response.data
    })
}

export const yaEstaInscripto = (id, usuario) => {
    return axios.post(`${API_URL}/api/curso/${id}/inscripto`, usuario)
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err)
        return err.response.data
    })
}