import React, {useEffect, useRef, useState} from 'react'
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import Header from "../whatsapp/Header";
import ContactoService from "../../services/ContactoService";
import Contacto from "../whatsapp/Contacto";
import Mensaje from "../whatsapp/Mensaje";
import {useAuth} from "../../context/auth";
import NumeroTelefono from "../whatsapp/NumeroTelefono";
import ContactoActual from "../whatsapp/ContactoActual";
import Chat from "../whatsapp/Chat";
import MensajeService from "../../services/MensajeService";
import RolService from "../../services/RolService";
import AccesoDenegado from "../auth/AccesoDenegado";

function PageChat(props) {
    //USUARIO LOGUEADO
    const {user: {idusuario,idrol,idempresa}} = useAuth();

    const [data, setData] = useState([]);
    const [dataMensaje, setDataMensaje] = useState([]);
    const [idnumero, setIdnumero] = useState(0);
    const [idcontacto, setIdcontacto] = useState(0);
    const [contactoActual, setContactoActual] = useState(null);

    const [items, setItems] = useState(0);

    const [isError, setIsError] = useState(false);
    const {message} = isError

    const [loading, setLoading] = useState(true);
    
    const [arrayUsuarios, setArrayUsuarios] = useState([]);

    const colores = ['#4892cf','#c93a3a','#3a9c45','#e39322','#6e60cc', '#a82049'];
    
    const scroll_in_booton = useRef(null);

    const [updateContacto, setUpdateContacto] = useState(0);

    function setContacto(contacto, index) {
        setLoading(false)
        setContactoActual(contacto);
        setIdcontacto(contacto.idcontacto);
        setItems(contacto.idcontacto);
    }

    function change(idnumero) {
        if(idnumero=="0"){
            setIdcontacto(0)
            setIdnumero(0)
        }else{
            setIdnumero(idnumero)
            setUpdateContacto(updateContacto+1);
        }
    }

    function enviarMensaje(data) {
        setLoading(false)
        MensajeService.enviarMensaje(idcontacto,data).then(result => {
            if (result.status === 200) {
                actualizarChat();
            } else {
                setIsError(false);
            }
        }).catch(error => {
            setLoading(false)
            setIsError(true);
        });



    }

    function eliminarMensaje(idmensaje){
        setLoading(false);
        MensajeService.eliminarMensaje(idcontacto,idmensaje).then(result => {
            if (result.status === 200) {
                actualizarChat();
            } else {
                setIsError(false);
            }
        }).catch(error => {
            setLoading(false)
            setIsError(true);
        });
    }

    function actualizarCambioAgente(){
        setUpdateContacto(updateContacto + 1)
    }

    function actualizarChat(){
        setTimeout(function(){setItems(items+1)},2000);
    }

    useEffect(() => {
        setDataMensaje([]);
        if(idcontacto!=0){
            MensajeService.listar(idcontacto).then(result => {
                if (result.status === 200) {
                    setDataMensaje(result.data);
                    setLoading(true);
    
                } else {
                    setDataMensaje([]);
                    setIsError(true);
                    setLoading(true);
                }
            }).catch(error => {
                setIsError({error: true, message: error.toString()})
                setDataMensaje([]);
                setIsError(true);
                setLoading(true);
            });
        }
    }, [items]);

    useEffect(() => {
        if(idnumero!=0){

            ContactoService.listar(idnumero,idusuario).then(result => {
                if (result.status === 200) {
                    setData(result.data);
                } else {
                    setData([]);
                    setIsError(true);
                }
            }).catch(error => {
                setIsError({error: true, message: error.toString()})
                setData([]);
                setIsError(true);
            });
        }

    }, [updateContacto]);

    useEffect(() => {
        if(idcontacto != 0){
            scroll_in_booton.current.scrollTop = scroll_in_booton.current.scrollHeight;
        }
      });

    return (
        <div className="container-fluidbg-fondo-light bg-fondo  p-0">
            {
                idrol === RolService.ROOT ?(
                    <div className="d-flex">
                        <MenuPrincipal/>
                        <AccesoDenegado/>
                    </div>
                ): (
                        <div className="d-flex">
                            <MenuPrincipal/>
                            <div className="container-fluid p-0 principal_page_chat">
                                <Header />
                                <div className="row m-1 page_principal_chat">
                                    <div className="col-lg-4 col-md-5 col-sm-6 container_page_chat">

                                        <div className="form-group row m-1 mr-3">
                                            <NumeroTelefono handleChange={change}/>
                                        </div>
                                        <div className="scrollable m-1">
                                            {idnumero!=0?
                                                data.map((contacto, index) => {
                                                    if(arrayUsuarios.length == 0 || !arrayUsuarios.includes(contacto.idusuario)){
                                                        setArrayUsuarios(arrayUsuarios => [...arrayUsuarios, contacto.idusuario]);
                                                    }
                                                    return (
                                                        <div key={contacto.idcontacto}>
                                                            <Contacto contacto={contacto} color={colores[arrayUsuarios.indexOf(contacto.idusuario)]}
                                                                      handleClick={() => setContacto(contacto, index)}
                                                                      handleCambiarAgente={actualizarCambioAgente}
                                                            />
                                                        </div>
                                                    );
                                                })
                                                :''
                                            }
                                        </div>
                                    </div>
                                    {idcontacto != 0 ?
                                        <div className="col-lg-8 col-md-7 col-sm-6 chat page_chat">
                                            <div className="chat_header">
                                                {(contactoActual != null)
                                                    ?<ContactoActual contacto={contactoActual}/>
                                                    : ''
                                                }
                                                {
                                                    !loading ? (
                                                            <div className="spinner-border" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        ):
                                                        (
                                                            ''
                                                        )
                                                }
                                            </div>
                                            <div ref={scroll_in_booton} className="chat_body">
                                                <Mensaje data={dataMensaje} handleEliminar={eliminarMensaje}  />
                                            </div>
                                            {/**chat footer */}
                                            <Chat handleClick={enviarMensaje} />
                                        </div>
                                        : ''}
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default PageChat;
  