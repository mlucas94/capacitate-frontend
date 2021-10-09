import React, { useState, useEffect } from 'react';
import { cursoById, solicitarCupo, yaEstaInscripto, cancelarCupo } from './Api.js';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const Curso = (props) => {
    const [cursoData, setCursoData] = useState({
        nombre: "",
        cupos: 0,
        descripcion: "",
        cuposReservados: 0,
    });
    const [usuarioInscripto, setUsuarioInscripto] = useState(false)

    let { id } = useParams();
    let dniTest = "12345"

    useEffect(() => {
        getCursoData();
        getEstaInscripto();
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

    const getEstaInscripto = () => {
        yaEstaInscripto(id, { dni : dniTest })
        .then(data => {
            setUsuarioInscripto(data)
        })
        .catch(error => {
            return
        })
    }

    const handleSolicitarCupo = () => {
        solicitarCupo(id, { dni: dniTest })
            .then(data => {
                if(data.reservas) {
                    setCursoData({
                        ...cursoData,
                        cuposReservados: data.reservas.length
                    })
                    getEstaInscripto();
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
                    text: "Por favor vuelva a intentar mas tarde.",
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            })
    }

    const handleCancelarCupo = () => {
        cancelarCupo(id, { dni: dniTest })
        .then(data => {
            if(data.reservas) {
                setCursoData({
                    ...cursoData,
                    cuposReservados: data.reservas.length
                })
                getEstaInscripto();
            } else {
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
                text: "Por favor vuelva a intentar mas tarde.",
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
            <div>
                {
                    !usuarioInscripto ? 
                        <button type="button" class="btn btn-primary" onClick={handleSolicitarCupo}> Solicitar Cupo </button>
                        : <button type="button" class="btn btn-danger" onClick={handleCancelarCupo}> Cancelar Cupo </button>
                }
            </div>
        </div>
    )

}

export default Curso;