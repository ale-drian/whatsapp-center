import React, {useState, useEffect} from 'react'
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import EmpresaService from "../../services/EmpresaService";
import {Modal} from 'reactstrap';
import {useAuth} from "../../context/auth";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RolService from "../../services/RolService";
import AccesoDenegado from "../auth/AccesoDenegado";
import Header from "../whatsapp/Header";
import swal from "sweetalert";

function PageEmpresa(props) {

    //USUARIO LOGUEADO
    const {user: {idusuario, idrol}} = useAuth();

    const [listaEmpresa, setListaEmpresa] = useState({data: [], loading: false});

    const [mainModal, setMainModal] = useState(false);
    const {data, loading} = listaEmpresa

    const [idempresa, setIdempresa] = useState(0);
    const [currentEmpresa, setCurrentEmpresa] = useState({});

    const [isError, setIsError] = useState(false);
    const {message} = isError

    const {register, handleSubmit, reset, setValue, errors, watch} = useForm();

    const [updateData, setUpdateData] = useState(0);
    const [accion, setAccion] = useState("");

    useEffect(() => {
        EmpresaService.listar(idusuario)
            .then(res => {
                if (res.status === 200) {
                    setListaEmpresa({
                        data: res.data,
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

    //ACTUALIZAR INFORMACION DEL FORMULARIO EN CASO DE EDITAR Y ELIMINAR
    useEffect(() => {
        const fields = ['razonsocial', 'ruc'];
        fields.forEach(field => setValue(field, currentEmpresa[field]));
    }, [idempresa]);

    useEffect(() => {
        setIdempresa(currentEmpresa['idempresa'])
    }, [currentEmpresa]);


    const OpenModal = (data, accion) => {
        setCurrentEmpresa(data)
        setMainModal(true)
        setAccion(accion)
    }

    const CloseModal = () => {
        setCurrentEmpresa({})
        setMainModal(false)
        setAccion("")
    }

    function onSubmit(data, e) {
        switch (accion) {
            case "Nueva Empresa":
                EmpresaService.registrar(data)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            swal({
                                title: "¡Todo bien!",
                                text: "Empresa creada correctamente",
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
                setCurrentEmpresa({})
                setMainModal(false)
                break;
            case "Editar Empresa":
                EmpresaService.update(data, currentEmpresa.idempresa)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            setCurrentEmpresa({})
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
                setCurrentEmpresa({})
                setMainModal(false)
                break;
            case "Eliminar Empresa":
                EmpresaService.delete(currentEmpresa.idempresa)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
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
                setCurrentEmpresa({})
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
                                <Header />
                                <div id="contenido-principal" className="#">
                                    <section className="py-3">
                                        <div className="row d-block">
                                            <span className="ml-5 pl-4">WhatsAppCenter <strong className="text-primary">/ Empresas</strong></span>
                                        </div>
                                        <div className="card p-3 ml-5 mr-5 mt-3 shadow-sm">
                                            <div className="row card-header bg-white pt-1 pb-0">
                                                <div className="col-9">
                                                    <span className="card-title-table">Mantenimiento de Empresas</span>
                                                </div>
                                                <div className="col-3">
                                                    <button className="btn btn-success m-2 pr-4 pl-4"
                                                            onClick={() => OpenModal({}, 'Nueva Empresa')}>Nuevo
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
                                                                <th scope="col">Razon Social</th>
                                                                <th scope="col">RUC</th>
                                                                <th scope="col">Acciones</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                data.map((emp) => {
                                                                    return (
                                                                        <tr key={emp.idempresa} className="text-center">
                                                                            <td>{emp.razonsocial}</td>
                                                                            <td>{emp.ruc}</td>
                                                                            <td className="text-center p-1">
                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(emp, 'Editar Empresa')}
                                                                                        className="btn btn-warning m-1">
                                                                                    <FontAwesomeIcon icon="pencil-alt"
                                                                                                     className="mr-2"/> Editar
                                                                                </button>
                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(emp, 'Eliminar Empresa')}
                                                                                        className="btn btn-danger m-1"
                                                                                        data-target="#ModalEliminar">
                                                                                    <FontAwesomeIcon icon="trash-alt"
                                                                                                     className="mr-2"/>Eliminar
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
                                                        {accion === 'Eliminar Empresa' ? (
                                                            <>
                                                                <p>¿Desea Eliminar la
                                                                    empresa <strong>{currentEmpresa.razonsocial}</strong> ?
                                                                </p>
                                                            </>
                                                        ) : (

                                                            <div className="form-group">

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Ingrese una Razon Social"
                                                                        name="razonsocial"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar una Razon Social'
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                            {errors.razonsocial && errors.razonsocial.message}
                                                        </span>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Ingrese un RUC"
                                                                        name="ruc"
                                                                        ref={
                                                                            register({
                                                                                required: {
                                                                                    value: true,
                                                                                    message: 'Debe Ingresar un numero de RUC'
                                                                                }, minLength: {
                                                                                    value: 11,
                                                                                    message: "El número de RUC debe contener 11 digitos"
                                                                                }, maxLength: {
                                                                                    value: 11,
                                                                                    message: "El número de RUC debe contener 11 digitos"
                                                                                }
                                                                            })
                                                                        }
                                                                    />
                                                                    <span className="text-danger small">
                                                            {errors.ruc && errors.ruc.message}
                                                        </span>
                                                                </div>

                                                            </div>

                                                        )
                                                        }
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary"
                                                                    onClick={() => CloseModal()}>Cancelar
                                                            </button>


                                                            {accion === 'Nueva Empresa' ? (
                                                                <button type="submit"
                                                                        className="btn btn-success">Registrar</button>
                                                            ) : (accion === 'Editar Empresa') ? (
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

export default PageEmpresa;
  