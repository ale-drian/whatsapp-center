import React, {useEffect, useRef, useState} from 'react'
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import {Modal} from "reactstrap";
import {useForm} from "react-hook-form";
import {useAuth} from "../../context/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
import NumeroTelefonoService from "../../services/NumeroTelefonoService";
import Header from "../whatsapp/Header";
import RolService from "../../services/RolService";
import AccesoDenegado from "../auth/AccesoDenegado";

function PageConfiguracion(props) {
    //USUARIO LOGUEADO
    const {user: {idempresa,idrol}} = useAuth();

    const [listaNumeroTelefono, setListaNumeroTelefono] = useState({data: [], loading: false});

    const [mainModal, setMainModal] = useState(false);
    const {data, loading} = listaNumeroTelefono

    const [idnumero, setIdnumero] = useState(0);
    const [currentNumeroTelefono, setCurrentNumeroTelefono] = useState({});

    const [isError, setIsError] = useState(false);
    const {message} = isError

    const {register, handleSubmit, reset, setValue, errors, watch} = useForm(
        {
            defaultValues: {"idempresa": 0},
        }
    );

    const [updateData, setUpdateData] = useState(0);
    const [accion, setAccion] = useState("");

    useEffect(() => {
        NumeroTelefonoService.listarConfiguracion(idempresa)
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
        const fields = ['numero', 'instance', 'token','accountStatus','qrCode'];
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

            case "Conectar":
                setUpdateData(updateData + 1)
                swal({
                    title: "¡Todo bien!",
                    text: "Numero conectado a Whatsapp correctamente",
                    icon: "success",
                    button: "OK",
                });
                setCurrentNumeroTelefono({})
                setMainModal(false)
                break;
            case "Desconectar":
                NumeroTelefonoService.logout(currentNumeroTelefono.idnumero)
                    .then(res => {
                        if (res.status === 200) {
                            setUpdateData(updateData + 1)
                            swal({
                                title: "¡Todo bien!",
                                text: "Numero desconectado de Whatsapp correctamente",
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
            idrol === RolService.ADMINISTRADOR ?
            (


            <div className="d-flex">
                <MenuPrincipal/>
                <div className="container-fluid p-0">
                    <Header />
                    <div id="contenido-principal" className="#">
                        <section className="py-3">
                            <div className="row d-block">
                                <span className="ml-5 pl-4">WhatsAppCenter <strong className="text-primary">/ Configuracion</strong></span>
                            </div>
                            <div className="p-3 ml-5 mr-5 mt-3 card shadow-sm">

                                <div className="row card-header bg-white pt-1 pb-0">
                                    <div className="col-9">
                                        <span className="card-title-table">Configuración</span>
                                    </div>
                                    <div className="col-3">
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
                                                    <th scope="col">Numero</th>
                                                    <th scope="col">Status</th>
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

                                                                    { num.accountStatus=="authenticated" ? (
                                                                                    <td>
                                                                                        <label className="mr-2 text-success">Se encuentra conectado </label>
                                                                                    </td>          
                                                                        ):(
                                                                            <td>
                                                                                <label className="mr-2 text-danger">Se encuentra desconectado </label>
                                                                            </td>
                                                                        )
                                                                    }
                                                                    { num.accountStatus=="authenticated" ? (
                                                                                    <td>
                                                                                        <button type="button"
                                                                                            onClick={() => OpenModal(num, 'Desconectar')}
                                                                                            className="btn btn-danger m-1"
                                                                                            data-target="#ModalEliminar">
                                                                                        <FontAwesomeIcon icon="thumbs-down"
                                                                                                         className="mr-2"/> Desconectar
                                                                                    </button>
                                                                                    </td>          
                                                                        ):(
                                                                           <td>
                                                                                <button type="button"
                                                                                        onClick={() => OpenModal(num, 'Conectar')}
                                                                                        className="btn btn-success m-1"
                                                                                        >
                                                                                    <FontAwesomeIcon icon="thumbs-up"
                                                                                                     className="mr-2"/> Conectar
                                                                                </button>
                                                                           </td>
                                                                        )
                                                                    }
                                                                
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
                                        <button type="button" className="close" onClick={() => setMainModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {accion === 'Desconectar' ? (
                                                <>
                                                    <p>¿Desea desconectar número
                                                        <strong>{currentNumeroTelefono.numero}</strong> de Whatsapp ?</p>
                                                </>
                                            ) : (
                                                <div className="form-group">

                                                    <div className="mb-4">

                                                        <img  src={currentNumeroTelefono.qrCode} className="img-fluid"
                                                             alt="Codigo QR"/>
                                                        <label>Escanear el código QR</label>
                                                    </div>

                                                </div>
                                            )
                                            }
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={() => CloseModal()}>Cancelar
                                                </button>
                                                {
                                                   accion === 'Conectar' ? (
                                                    <button type="submit" className="btn btn-success">Aceptar</button>
                                                ) : (
                                                    <button type="submit" className="btn btn-danger">Desconectar</button>
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

            ):(
                    <div className="d-flex">
                        <MenuPrincipal/>
                        <AccesoDenegado/>
                    </div>
                )}
        </div>
    )
}

export default PageConfiguracion;