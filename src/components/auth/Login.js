import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Redirect} from "react-router-dom";
import logo_blue from '../../image/logos/logo_blue.png'
import {useAuth} from "../../context/auth";
import UsuarioService from "../../services/UsuarioService";
import {types} from "../../types/types";

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const { dispatch } = useAuth()

    function onSubmit(data, e) {
        UsuarioService.login(data).then(result => {
            if (result.status === 200) {
                dispatch({
                    type: types.login,
                    payload: result.data
                })
                setLoggedIn(true);
            } else {
                setIsError(true);
            }
        }).catch(error => {
            setIsError(true);
        });
        e.target.reset(); //borra el contenido de los inputs
    }

    if (isLoggedIn) {
        return <Redirect to={"index"}/>;
    }

    return (
        <div className="pt-5">

            <div className="container col-lg-4 col-md-7 col-sm-8 col-11 bg-white pt-2 border border-light rounded shadow">
                <form onSubmit={handleSubmit(onSubmit)} className="text-center p-3 needs-validation">
                    <img className="w-50" src={logo_blue} alt="logo_blue"/>
                    <h3 className="h4 mb-4">Login EC2-1</h3>
                    <div className="form-group mb-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su Usuario"
                                name="usuario"
                                ref={
                                    register({
                                        required: {value: true, message: 'Debe Ingresar su Usuario'}
                                    })
                                }
                                />
                            <span className="text-danger small">
                                {errors.usuario && errors.usuario.message}
                            </span>
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Ingrese su Clave"
                                name="clave"
                                ref={
                                    register({
                                        required: {value: true, message: 'Debe Ingresar su Clave'}
                                    })
                                }
                                />
                            <span className="text-danger small ">
                                {errors.clave && errors.clave.message}
                            </span>
                        </div>
                        <button type="submit" className="btn btn-success">Ingresar</button>
                        {isError &&
                        <div className="alert alert-danger" role="alert">
                            ¡ El Usuario o Clave ingresados no son correctos !
                        </div>
                        }


                        <div className="text-left">
                        <p>usuario : root@gmail.com | clave : 123456 </p>
                        <p>usuario : administrador@gmail.com | clave : 123456 </p>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;

