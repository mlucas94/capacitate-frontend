import React, { useState, useEffect } from 'react';
import { cursoById, solicitarCupo } from './Api.js';
import { useParams } from 'react-router-dom';

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
                setCursoData({
                    ...cursoData,
                    cuposReservados: data.reservas.length
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