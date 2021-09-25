import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { allCursos } from './Api.js';

const Home = (props) => {
    const [cursosData, setCursosData] = useState([]);

    useEffect(() => {
        getCursosData();
    }, [])


    const getCursosData = () => {
        allCursos()
            .then(data => setCursosData(data))

    }


    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-sm-3">
                    <img src="/logo.png" alt="capacitate-logo" />
                </div>
                <div className="col-sm-6" min-height="50vh">
                    <h1>
                        CURSOS
                    </h1>
                    <div className="pt-5">
                        {cursosData.map((curso) =>
                            <div className="d-flex justify-content-center pt-2">
                                <Link to={{pathname: `/curso/${curso.id}`}} type="button" className="btn btn-primary"> {curso.nombre} - {curso.localidad} </Link>
                            </div>
                            )}
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        </div>
    )
}

//<Link to={{pathname: `/curso/${"1"}`}} type="button" class="btn btn-primary"> ELECTRICIDAD 1 </Link>

export default Home;