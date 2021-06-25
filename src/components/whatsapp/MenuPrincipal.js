import React, {useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import logo_white from "../../image/logos/logo-white.png";
import '../FontAwesome';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth} from "../../context/auth";
import {types} from "../../types/types";
import swal from 'sweetalert';
import RolService from "../../services/RolService";

function MenuPrincipal(props) {

    const {user: {idusuario, idrol}} = useAuth();

    const {dispatch} = useAuth()
    const history = useHistory()

    let location = useLocation();
    let loc = location.pathname;


    const [classToogleCollapse, setClassToogleCollapse] = useState("bg-secondary");
    const [classRotate, setClassRotate] = useState("toogle-sidebar");

    const handleLogout = () => {
        swal({
            title: 'Cerrar Sesión',
            text: '¿Está seguro de Cerrar Sesión?',
            icon: 'warning',
            buttons: [
                'No, cancelar',
                'Si, salir'
            ],
            dangerMode: true,
        }).then(function (isConfirm) {
            if (isConfirm) {
                history.replace('/login')
                dispatch({
                    type: types.logout
                })
            }
        });
    }

    const ToogleSideBar = () => {
        if (classToogleCollapse == "bg-secondary") {
            setClassToogleCollapse("bg-secondary toogle-collapse");
            setClassRotate("toogle-sidebar rotate");
        } else {
            setClassToogleCollapse("bg-secondary");
            setClassRotate("toogle-sidebar");
        }
    }

    return (
        <div id="sidebar-container" className={classToogleCollapse}>
            <div className="logo">
                <img alt="" src={logo_white} className="logo-white"/>
                <h4 className="text-light font-weight-bold"><span>Whatsapp Center</span></h4>
            </div>
            <div className="menu">
                {/*PUEDEN ACCEDER TODOS LOS ROLES*/}
                <Link to="/index"
                      className={loc == "/index" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                    <FontAwesomeIcon icon="laptop" className="mr-2"/> <span>Inicio</span>
                </Link>

                {/*TODOS MENOS EL ROL ROOT*/}
                {idrol !== RolService.ROOT ?
                    (<Link to="/chat"
                           className={loc == "/chat" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                        <FontAwesomeIcon icon="comment" className="mr-2"/> <span>Chat</span>
                    </Link>) : (
                       ''
                    )
                }

                {/*SOLO EL ROL ROOT*/}
                {idrol === RolService.ROOT ?
                    (
                        <Link to="/empresa"
                              className={loc == "/empresa" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                            <FontAwesomeIcon icon="building" className="mr-2"/> <span>Administrar Empresas</span>
                        </Link>
                    ) : ('')
                }

                {/*SOLO EL ROL ROOT*/}
                {idrol === RolService.ROOT ?
                    (
                        <Link to="/telefono"
                              className={loc == "/telefono" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                            <FontAwesomeIcon icon="phone" className="mr-2"/> <span>Administrar Telefonos</span>
                        </Link>
                    ) : (
                        ''   )
                }

                {/*TODOS MENOS EL ROL AGENTE*/}
                {idrol !== RolService.AGENTE ?
                    (<Link to="/usuario"
                           className={loc == "/usuario" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                        <FontAwesomeIcon icon="users" className="mr-2"/> <span>Administrar Usuarios</span>
                    </Link>) : (
                        '')
                }



                {/*SOLO EL ROL ADMINISTRADOR*/}
                {idrol=== RolService.ADMINISTRADOR ?
                    (<Link to="/configuracion"
                           className={loc == "/configuracion" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                        <FontAwesomeIcon icon="cog" className="mr-2"/> <span>Configuración</span>
                    </Link>) : (
                        ''
                    )
                }

                <hr></hr>
                {/*PUEDEN ACCEDER TODOS LOS ROLES*/}
                <Link to="/soporte"
                      className={loc == "/soporte" ? "d-block p-3 text-light selected" : "d-block p-3 text-light"}>
                    <FontAwesomeIcon icon="bullhorn" className="mr-2"/> <span>Soporte</span>
                </Link>



                <Link to="/login" onClick={handleLogout} className="d-block p-3 text-light">
                    <FontAwesomeIcon icon="sign-in-alt" className="mr-2"/> <span>Salir</span>
                </Link>
            </div>
            <div className={classRotate} onClick={() => ToogleSideBar()}><FontAwesomeIcon icon="angle-double-left"/>
            </div>
        </div>
    )
}

export default MenuPrincipal;