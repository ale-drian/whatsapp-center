import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Redirect} from "react-router-dom";
import {useAuth} from "../../context/auth";
import logo_error from '../../image/logos/logo_error_2.png'

function AccesoDenegado(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const { dispatch } = useAuth()


    if (isLoggedIn) {
        return <Redirect to={"index"}/>;
    }

    return (
        <div
            className="mt-5 mb-5 container-fluid col-lg-5 col-md-6 col-sm-8 col-11 bg-white pt-2 border border-light rounded shadow">
            <section>
                <form className="text-center p-5 needs-validation">
                    <h2 className="h4 mb-4">Acceso Denegado</h2>
                    <p>Usted no tiene permisos para acceder a esta opción</p>
                    <div className="form-group mb-4">
                        <div className="mb-1">
                            <img className="w-75" src={logo_error}/>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}
export default AccesoDenegado;

