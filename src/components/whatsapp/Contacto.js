import React, {useEffect, useState} from 'react'
import '../../styles/styleContacto.css';
import {Avatar} from "@material-ui/core";
import ContactoService from "../../services/ContactoService";
import UsuarioService from "../../services/UsuarioService";
import {useAuth} from "../../context/auth";
import swal from 'sweetalert';
import {Modal} from "reactstrap";
import {useForm} from "react-hook-form";
import RolService from "../../services/RolService";

function change_date(string){ //2021-01-06 06:40
    const date_full = string.split(' ');
    const date = date_full[0].split('-');
    const hour = date_full[1];
    const format_date = date[2] + "/" + date[1] + "/" + date[0];
    const result = format_date + " " + hour
    return result;
}

function removerTexto(string){
    if(string.length>=23){
      let nuevo = string.substr(0,23);
      nuevo += " ...";
      return nuevo;
    }
    return string;
  }

function Contacto(props) {
    const {user: {idempresa, idrol}} = useAuth();
    const [isError, setIsError] = useState(false);
    const [idcontacto, setIdcontacto] = useState(props.contacto.idcontacto);
    const [idusuario, setIdusuario] = useState(props.contacto.idusuario);
    const [agentes, setagentes] = useState(null);
    const [listaUsuario, setListaUsuario] = useState({data: [], loading: false});
    //Modal
    const [mainModal, setMainModal] = useState(false);
    const [accion, setAccion] = useState("");
    const {register, handleSubmit, reset, setValue, errors,watch} = useForm(
        {
            defaultValues: {"idusuario":idusuario},
        }
    );
    const CloseModal = () => {
       // setCurrentUsuario({})
        setMainModal(false)
       // setAccion("")
    }
    const OpenModal = (data, accion) => {
        //setCurrentUsuario(data)
        setMainModal(true)
        //setAccion(accion)
    }
    //
    const {data, loading} = listaUsuario
    const [updateData, setUpdateData] = useState(0);


    const colorUsuario = {
        color: props.color,
    };

    useEffect(() => {
        UsuarioService.listar(idempresa)
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
    }, [idempresa]);


    function onSubmit(data, e) {


        ContactoService.actualizar(idcontacto,data.idusuario).then(result => {
            if (result.status === 200) {

                props.handleCambiarAgente()
                swal({
                    title: "¡Todo bien!",
                    text: "Se ha asignado el agente",
                    icon: "success",
                    button: "OK",
                })
            } else {
                setIsError(true);
                swal({
                    title: "¡Algo salio mal!",
                    icon: "error",
                    button: "OK",
                });
            }
        }).catch(error => {
            setIsError(true);
            swal({
                title: "¡Algo salio mal!",
                text: error.response.data,
                icon: "error",
                button: "OK",
            });
        });

        setMainModal(false)

    }


    function cambiar(e){
        e.stopPropagation();
        OpenModal({});
    }

    return (
        <div className="container-p">
            <div className="containerContacto" onClick={props.handleClick} >
                <Avatar src={props.contacto.imagen}/>
                <div className="constainerContacto_info">
                    <h5> {removerTexto(props.contacto.nombre)}</h5>
                    <span className="date_contact_conection">Última conexión: {change_date(props.contacto.fconexion)}</span>
                    <br/>
                    <span className="date_contact_conection">Asignado a: <b style={colorUsuario}> {props.contacto.nombreusuario}</b></span>

                    {idrol === RolService.ADMINISTRADOR ?
                        (
                            <button className="btn btn-warning m-2 pr-4 pl-4"
                                 onClick={(e) => cambiar(e)}>Cambiar
                        </button>
                        ) : (
                            ''
                        )
                    }
                </div>
            </div>
            <Modal isOpen={mainModal}>
                                    <div className="modal-header">
                                        <h5 className="modal-title">Asignar Agente</h5>
                                        <button type="button" className="close" onClick={() => setMainModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit(onSubmit)}>

                                            <div className="form-group">
                                                <label>Contacto: {props.contacto.nombre}</label>
                                                <label>Agente Asignado: <strong>{props.contacto.nombreusuario}</strong></label>
                                                <label>Cambiar de Agente : </label><br/>
                                                <select className="form-control btn-light" name="idusuario"
                                                        ref={register}>
                                                    {
                                                        data.map((usuario, index) => {
                                                            return (
                                                                <option key={usuario.idusuario}
                                                                        value={usuario.idusuario}>{usuario.nombres} - {usuario.apellidos} </option>
                                                            );
                                                        })}
                                                </select>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        onClick={() => CloseModal()}>Cancelar
                                                </button>
                                                <button type="submit" className="btn btn-success">Registrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
        </div>
    )
}
export default Contacto;

