import React, { useState, useEffect } from 'react';
import { cursoById, solicitarCupo } from './Api.js';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const Curso = (props) => {
    const [cursoData, setCursoData] = useState({
        nombre: "",
        cupos: 0,
        descripcion: "",
        cuposReservados: 0,
    });

    let { id } = useParams();

    useEffect(() => {
        getCursoData();
    }, [])

    const getCursoData = () => {
        cursoById(id)
            .then(data => {
                setCursoData({...cursoData,
                    nombre: data.nombre,
                    cupos: data.cupos,
                    descripcion: data.descripcion,
                    cuposReservados: data.reservas.length
                })
                
                
            })
            .catch(error => {
                //TODO: mostrar un mensaje de error
            })
    }

    const handleSolicitarCupo = () => {
        solicitarCupo(id)
            .then(data => {
                if(data.reservas) {
                    setCursoData({
                        ...cursoData,
                        cuposReservados: data.reservas.length
                    })
                } else {
                    setCursoData({
                        ...cursoData,
                        cuposReservados: cursoData.cupos
                    })
                    Swal.fire({
                        text: data,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: "Error de conexión",
                    text: "Por favor vuelva a intentar mas tarde",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            })
    }

    return (
        <div className="container">
            <h1>{cursoData.nombre}</h1>
            <p>{cursoData.descripcion}</p>
            <h3> {cursoData.cupos - cursoData.cuposReservados} cupos disponibles </h3>
            <button type="button" class="btn btn-primary" onClick={handleSolicitarCupo}> Solicitar Cupo </button>
        </div>
    )

}

export default Curso;