import React, {useEffect, useRef, useState} from 'react'
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import {Modal} from "reactstrap";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/auth";
import UsuarioService from "../../services/UsuarioService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RolService from "../../services/RolService";
import swal from 'sweetalert';
import EmpresaService from "../../services/EmpresaService";
import Header from "../whatsapp/Header";
import AccesoDenegado from "../auth/AccesoDenegado";


function PageUsuario(props) {

    //USUARIO LOGUEADO
    const {user: {idusuario, idempresa, idrol}} = useAuth();

    const [listaUsuario, setListaUsuario] = useState({data: [], loading: false});
    const [listaRol, setListaRol] = useState({dataRol: []});
    const [listaEmpresa, setListaEmpresa] = useState({dataEmpresa: []});

    const [mainModal, setMainModal] = useState(false);
    const {data, loading} = listaUsuario
    const {dataRol} = listaRol
    const {dataEmpresa} = listaEmpresa

    const [iduser, setIduser] = useState(0);
    const [currentUsuario, setCurrentUsuario] = useState({});

    const [isError, setIsError] = useState(false);
    const {message} = isError

    const {register, handleSubmit, reset, setValue, errors, watch} = useForm(
        {
            defaultValues: {"idrol": 1, "idempresa": idempresa}
        }
    );

    const clave = useRef({});
    clave.current = watch("clave", "");

    const [updateData, setUpdateData] = useState(0);
    const [accion, setAccion] = useState("");

    useEffect(() => {
        EmpresaService.listar(idusuario)
            .then(res => {
                if (res.status === 200) {
                    setListaEmpresa({
                        dataEmpresa: res.data,
                        loading: true
                    })


                } else {
                    setListaEmpresa({...listaEmpresa, loading: false})
                }
            })
            .catch(err => {
                setIsError({error: true, message: err.toString()})
                setListaEmpresa({...listaEmpresa, loading: false})
            })
    }, [updateData]);

    useEffect(() => {
        RolService.listar(idrol)
            .then(res => {
                if (res.status === 200) {
                    setListaRol({
                        dataRol: res.data,
                        loading: true
                    })
                } else {
                    setListaRol({...listaRol, loading: false})
                }
            })
            .catch(err => {
                setIsError({error: true, message: err.toString()})
                setListaRol({...listaRol, loading: false})
            })
    }, [updateData]);

    useEffect(() => {
        UsuarioService.listar2(idempresa, idusuario)
            .then(res => {
                if (res.status === 200) {
                    setListaUsuario({
                        data: res.data,
                        loading: true
                    })
                } else {
                    setListaUsuario({...listaUsuario, loading: false})
                }
            })
            .catch(err => {
                setIsError({error: true, message: err.toString()})
                setListaUsuario({...listaUsuario, loading: false})
            })

    }, [updateData]);

    //ACTUALIZAR INFORMACION DEL FORMULARIO EN CASO DE EDITAR Y ELIMINAR
    useEffect(() => {
        const fields = ['apellidos', 'nombres', 'idempresa', 'idrol', 'usuario'];
        fields.forEach(field => setValue(field, currentUsuario[field]));
    }, [iduser]);

    useEffect(() => {
        setIduser(currentUsuario['idusuario'])
    }, [currentUsuario]);

    const OpenModal = (data, accion) => {
        setCurrentUsuario(data)
        setMainModal(true)
        setAccion(accion)
    }

    const CloseModal = () => {
        setCurrentUsuario({})
        setMainModal(false)
        setAccion("")
    }

    function onSubmit(data, e) {
        switch (accion) {
            case "Nuevo Usuario":
                UsuarioService.registrar(data).then(res => {
                    if (res.status === 200) {
                        setUpdateData(updateData + 1)
                        swal({
                            title: "¡Todo bien!",
                            text: "Usuario creado correctamente",
                            icon: "success",
                            button: "OK",
                        });
                    }
                }).catch(err => {
                    if (err.response) {
                        swal({
                            title: "¡Algo salio mal!",
                            text: err.response.data,
                            icon: "error",
                            button: "OK",
                        });
                    } else {
                        console.log('Error', err.message);
                    }
                })
                setCurrentUsuario({})
                setMainModal(false)
                break;
            case "Editar Usuario":
                UsuarioService.actualizar(data, currentUsuario.idusuario)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            swal({
                                title: "¡Todo bien!",
                                text: "Usuario editado correctamente",
                                icon: "success",
                                button: "OK",
                            });

                        }
                    }).catch(err => {
                    if (err.response) {
                        swal({
                            title: "¡Algo salio mal!",
                            text: err.response.data,
                            icon: "error",
                            button: "OK",
                        });
                    } else {
                        console.log('Error', err.message);
                    }
                })
                setCurrentUsuario({})
                setMainModal(false)
                break;
            case "Eliminar Usuario":
                UsuarioService.eliminar(currentUsuario.idusuario)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            swal({
                                title: "¡Todo bien!",
                                text: "Usuario eliminado correctamente",
                                icon: "success",
                                button: "OK",
                            });
                        }
                    }).catch(err => {
                    if (err.response) {
                        swal({
                            title: "¡Algo salio mal!",
                            text: err.response.data,
                            icon: "error",
                            button: "OK",
                        });
                    } else {
                        console.log('Error', err.message);
                    }
                })
                setCurrentUsuario({})
                setMainModal(false)
                break;
        }

    }


    return (
        <div className="container-fluidbg-fondo-light bg-fondo p-0">

            {
                idrol === RolService.AGENTE ?
                    (
                        <div className="d-flex">
                            <MenuPrincipal/>
                            <AccesoDenegado/>
                        </div>

                    ) : (

                        <div className="d-flex">
                            <MenuPrincipal/>
                            <div className="container-fluid p-0">
                                <Header/>
                                <div id="contenido-principal" className="#">
                                    <section className="py-3">
                                        <div className="row d-block">
                                            <span className="ml-5 pl-4">WhatsAppCenter <strong className="text-primary">/ Usuarios</strong></span>
                                        </div>
                                        <div className="p-3 ml-5 mr-5 mt-3 card shadow-sm">

                                            <div className="row card-header bg-white pt-1 pb-0">
                                                <div className="col-9">
                                                    <span className="card-title-table">Mantenimiento de Usuarios</span>
                                                </div>
                                                <div className="col-3">
                                                    <button className="btn btn-success m-2 pr-4 pl-4"
                                                            onClick={() => OpenModal({}, 'Nuevo Usuario')}>Nuevo
                                                    </button>
                                                </div>
                                            </div>

                                            {
                                                !loading ? (
                                                        <div className="d-flex justify-content-center mt-5">
                                                            <div className="spinner-border" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            {isError ? (
                                                                <div className="ml-2">
                                                                    <p>{message}</p>
                                                                </div>
                                                            ) : ('')}
                                                        </div>)
                                                    :
                                                    (<div className="card-body">
                                                        <table className="table table-bordered table-striped">
                                                            <thead className="bg-thead">
                                                            <tr className="text-center">
                                                                <th scope="col">Empresa</th>
                                                                <th scope="col">Apellidos</th>
                                                                <th scope="col">Nombres</th>
                                                                <th scope="col">Rol</th>
                                                                <th scope="col">Usuario</th>
                                                                <th scope="col">Acciones</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="bg-tbody">
                                                            {
                                                                data.map((usr) => {
                                                                    return (
                                                                        <tr key={usr.idusuario} className="text-center">
                                                                            <td>{usr.razonsocial}</td>
                                                                            <td>{usr.apellidos}</td>
                                                                            <td>{usr.nombres}</td>
                                                                            <td>{usr.rol}</td>
                                                                            <td>{usr.usuario}</td>
                                                                            <td className="text-center p-1">
                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(usr, 'Editar Usuario')}
                                                                                        className="btn btn-warning m-1">
                                                                                    <FontAwesomeIcon icon="pencil-alt"
                                                                                                     className="mr-2"/> Editar
                                                                                </button>

                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(usr, 'Eliminar Usuario')}
                                                                                        className="btn btn-danger m-1"
                                                                                        data-target="#ModalEliminar">
                                                                                    <FontAwesomeIcon icon="trash-alt"
                                                                                                     className="mr-2"/> Eliminar
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>)
                                            }
                                            <Modal isOpen={mainModal}>
                                                <div className="modal-header">
                                                    <h5 className="modal-title">{accion}</h5>
                                                    <button type="button" className="close"
                                                            onClick={() => setMainModal(false)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={handleSubmit(onSubmit)}>
                                                        {accion === 'Eliminar Usuario' ? (
                                                            <>
                                                                <p>¿Desea Eliminar al
                                                                    usuario <strong>{currentUsuario.nombres}</strong> ?</p>
                                                            </>
                                                        ) : (
                                                            <div className="form-group">

                                                                <div className="mb-4">
                                                                    <select className="form-control btn-light"
                                                                            name="idempresa"
                                                                            ref={register}>
                                                                        {
                                                                            dataEmpresa.map((empresa, index) => {
                                                                                return (
                                                                                    <option key={empresa.idempresa}
                                                                                            value={empresa.idempresa}>{empresa.razonsocial} </option>
                                                                                );
                                                                            })}
                                                                    </select>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Ingrese un Apellido"
                                                                        name="apellidos"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar un Apellido'
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                            {errors.apellidos && errors.apellidos.message}
                                                        </span>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Ingrese un Nombre"
                                                                        name="nombres"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar un Nombre'
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                            {errors.nombres && errors.nombres.message}
                                                        </span>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <select className="form-control btn-light" name="idrol"
                                                                            ref={register}>
                                                                        {
                                                                            dataRol.map((rol, index) => {
                                                                                return (
                                                                                    <option key={rol.idrol}
                                                                                            value={rol.idrol}>{rol.descripcion} </option>
                                                                                );
                                                                            })}
                                                                    </select>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Ingrese el nombre de Usuario"
                                                                        name="usuario"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar un nombre de usuario'
                                                                                }
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
                                                                        placeholder="Ingrese una contraseña"
                                                                        name="clave"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar una contraseña '
                                                                                }, minLength: {
                                                                                    value: 4,
                                                                                    message: "La contraseña debe contener un mínimo 4 caracteres"
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                            {errors.clave && errors.clave.message}
                                                        </span>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        placeholder="Confirme la contraseña"
                                                                        name="clave2"
                                                                        ref={register({
                                                                            validate: value =>
                                                                                value === clave.current || "La contraseña no coincide"
                                                                        })}
                                                                    />

                                                                    <span className="text-danger small">
                                                            {errors.clave2 && errors.clave2.message}
                                                        </span>
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    onClick={() => CloseModal()}>Cancelar
                                                            </button>
                                                            {accion === 'Nuevo Usuario' ? (
                                                                <button type="submit"
                                                                        className="btn btn-success">Registrar</button>
                                                            ) : (accion === 'Editar Usuario') ? (
                                                                <button type="submit"
                                                                        className="btn btn-info">Actualizar</button>
                                                            ) : (
                                                                <button type="submit"
                                                                        className="btn btn-danger">Eliminar</button>
                                                            )}
                                                        </div>
                                                    </form>
                                                </div>
                                            </Modal>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}

export default PageUsuario;
  