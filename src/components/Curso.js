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
                Swal.fire({
                    title: "Error de conexión",
                    text: "Por favor vuelva a intentar mas tarde",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
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
                    //setCursoData({
                    //    ...cursoData,
                    //    cuposReservados: cursoData.cupos
                    //})
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

    const tieneCupo = () => {
        return true
        //cambiar cuposreservados para que tenga la lista de dnis? y preguntar si esta incluido el propio
        //Alt. 2 metodos nuevos: uno actualiza solamente cuposReservados, el otro hace la consulta al back sobre el usuario
    }

    return (
        <div className="container">
            <h1>{cursoData.nombre}</h1>
            <p>{cursoData.descripcion}</p>
            <h3> {cursoData.cupos - cursoData.cuposReservados} cupos disponibles </h3>
            <div>
                {
                    tieneCupo() ? 
                        <button type="button" class="btn btn-primary" onClick={handleSolicitarCupo}> Solicitar Cupo </button>
                        : <button type="button" class="btn btn-danger" onClick={handleSolicitarCupo}> Cancelar Cupo </button>
                }
            </div>
        </div>
    )

}

export default Curso;