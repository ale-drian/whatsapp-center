import React, {useEffect, useState} from 'react'
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import {Modal} from "reactstrap";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import NumeroTelefonoService from "../../services/NumeroTelefonoService";
import 'react-phone-input-2/lib/style.css'
import Header from "../whatsapp/Header";
import RolService from "../../services/RolService";
import AccesoDenegado from "../auth/AccesoDenegado";
import EmpresaService from "../../services/EmpresaService";

function PageTelefono(props) {
    //USUARIO LOGUEADO
    const {user: {idempresa,idrol,idusuario}} = useAuth();

    const [listaNumeroTelefono, setListaNumeroTelefono] = useState({data: [], loading: false});
    const [listaEmpresa, setListaEmpresa] = useState({dataEmpresa: []});

    const [mainModal, setMainModal] = useState(false);
    const {data, loading} = listaNumeroTelefono
    const {dataEmpresa} = listaEmpresa

    const [idnumero, setIdnumero] = useState(0);
    const [currentNumeroTelefono, setCurrentNumeroTelefono] = useState({});

    const [newNumeroTelefono, setNewNumeroTelefono] = useState("");

    const [isError, setIsError] = useState(false);
    const {message} = isError

    const {register, handleSubmit, reset, setValue, errors, watch} = useForm(
        {
            defaultValues: {"idempresa": idempresa},
        }
    );

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
        NumeroTelefonoService.listar2(idempresa,idusuario)
            .then(res => {
                if (res.status === 200) {
                    setListaNumeroTelefono({
                        data: res.data,
                        loading: true
                    })
                } else {
                    setListaNumeroTelefono({...listaNumeroTelefono, loading: false})
                }
            })
            .catch(err => {
                setIsError({error: true, message: err.toString()})
                setListaNumeroTelefono({...listaNumeroTelefono, loading: false})
            })

    }, [updateData]);

    //ACTUALIZAR INFORMACION DEL FORMULARIO EN CASO DE EDITAR Y ELIMINAR
    useEffect(() => {
        const fields = ['numero', 'instance','idempresa', 'token'];
        fields.forEach(field => setValue(field, currentNumeroTelefono[field]));
    }, [idnumero]);

    useEffect(() => {
        setIdnumero(currentNumeroTelefono['idnumero'])
    }, [currentNumeroTelefono]);

    const OpenModal = (data, accion) => {
        setCurrentNumeroTelefono(data)
        setMainModal(true)
        setAccion(accion)
    }

    const CloseModal = () => {
        setCurrentNumeroTelefono({})
        setMainModal(false)
        setAccion("")
    }

    function onSubmit(data, e) {
        switch (accion) {
            case "Nuevo Numero Telefono":
                NumeroTelefonoService.registrar(data).then(res => {
                    if (res.status === 200) {
                        setUpdateData(updateData + 1)
                        swal({
                            title: "¡Todo bien!",
                            text: "Numero Telefono creado correctamente",
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
                setCurrentNumeroTelefono({})
                setMainModal(false)
                break;
            case "Editar Numero Telefono":
                NumeroTelefonoService.actualizar(data, currentNumeroTelefono.idnumero)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            swal({
                                title: "¡Todo bien!",
                                text: "Numero Telefono editado correctamente",
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
                setCurrentNumeroTelefono({})
                setMainModal(false)
                break;
            case "Eliminar Numero Telefono":
                NumeroTelefonoService.eliminar(currentNumeroTelefono.idnumero)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            swal({
                                title: "¡Todo bien!",
                                text: "Numero Telefono eliminado correctamente",
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
                setCurrentNumeroTelefono({})
                setMainModal(false)
                break;
        }

    }


    return (
        <div className="container-fluidbg-fondo-light bg-fondo p-0">

            {
                idrol !== RolService.ROOT ?
                    (
                        <div className="d-flex">
                            <MenuPrincipal/>
                            <AccesoDenegado/>
                        </div>

                    ) :
                    (


                        <div className="d-flex">
                            <MenuPrincipal/>
                            <div className="container-fluid p-0">
                                <Header/>
                                <div id="contenido-principal" className="#">
                                    <section className="py-3">
                                        <div className="row d-block">
                                            <span className="ml-5 pl-4">WhatsAppCenter <strong className="text-primary">/ Telefonos</strong></span>
                                        </div>
                                        <div className="card p-3 ml-5 mr-5 mt-3 shadow-sm">

                                            <div className="row card-header bg-white pt-1 pb-0">
                                                <div className="col-9">
                                                    <span className="card-title-table">Mantenimiento de Numero de Telefono</span>
                                                </div>
                                                <div className="col-3">
                                                    <button className="btn btn-success m-2 pr-4 pl-4"
                                                            onClick={() => OpenModal({}, 'Nuevo Numero Telefono')}>Nuevo
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
                                                        <table className="table table-striped table-bordered">
                                                            <thead className="bg-thead">
                                                            <tr className="text-center">
                                                                <th scope="col">Empresa</th>
                                                                <th scope="col">Numero</th>
                                                                <th scope="col">Instancia</th>
                                                                <th scope="col">Token</th>
                                                                <th scope="col">Acciones</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody className="bg-tbody">
                                                            {
                                                                data.map((num) => {
                                                                    return (
                                                                        <tr key={num.idnumero} className="text-center">
                                                                            <td>{num.razonsocial}</td>
                                                                            <td>{num.numero}</td>
                                                                            <td>{num.instance}</td>
                                                                            <td>{num.token}</td>
                                                                            <td className="text-center p-1">
                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(num, 'Editar Numero Telefono')}
                                                                                        className="btn btn-warning m-1">
                                                                                    <FontAwesomeIcon icon="pencil-alt"
                                                                                                     className="mr-2"/> Editar
                                                                                </button>

                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(num, 'Eliminar Numero Telefono')}
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
                                                        {accion === 'Eliminar Numero Telefono' ? (
                                                            <>
                                                                <p>¿Desea Eliminar el número de
                                                                    telefono <strong>{currentNumeroTelefono.numero}</strong> ?
                                                                </p>
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
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Ingrese el numero de telefono"
                                                                        name="numero"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar el numero de telefono'
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    {/**
                                                                     *
                                                                     <PhoneInput
                                                                     country={'pe'}
                                                                     type="tel"
                                                                     value={newNumeroTelefono}
                                                                     onChange={value => setNewNumeroTelefono(value)}
                                                                     className="form-control"
                                                                     regions={'south-america'}
                                                                     placeholder="Ingrese un Número con el codigo de pais (51901997852)"
                                                                     inputProps={{
                                                                name:"numero",
                                                                ref: register({
                                                                    required: {
                                                                            value: true,
                                                                            message: 'Debe Ingresar un numero de Telefono'
                                                                        }
                                                                    })


                                                            }}
                                                                     name="numero"
                                                                     ref={newNumeroTelefono}

                                                                     />
                                                                     */}
                                                                    <span className="text-danger small">
                                                            {errors.numero && errors.numero.message}
                                                        </span>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Ingrese el numero de la instancia"
                                                                        name="instance"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar el numero de la instancia'
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                             {errors.instance && errors.instance.message}
                                                        </span>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Ingrese un token"
                                                                        name="token"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar el token'
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                            {errors.token && errors.token.message}
                                                        </span>
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    onClick={() => CloseModal()}>Cancelar
                                                            </button>
                                                            {accion === 'Nuevo Numero Telefono' ? (
                                                                <button type="submit"
                                                                        className="btn btn-success">Registrar</button>
                                                            ) : (accion === 'Editar Numero Telefono') ? (
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

export default PageTelefono;