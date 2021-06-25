import React from 'react'
//FontAwesome
import '../FontAwesome';
import {useAuth} from "../../context/auth";
import {useHistory} from "react-router-dom";
import {types} from "../../types/types";
import CanvasJSReact from '../../canvas/canvasjs.react';

function Header(props) {
    const { user:{ apellidos, nombres,razonsocial ,  rol} } = useAuth();
    const { dispatch } = useAuth()
    const history = useHistory()

    const handleLogout = ()=>{
        history.replace('/login')
        dispatch({
            type:types.logout
        })
    }
    return (
        <nav className="navbar navbar-light bg-fondo border-bottom">
                <div className="container container-nav-superior">
                    <div className="float-right" id="user-informacion" >
                        <h6>{razonsocial}&nbsp;&nbsp;|&nbsp;&nbsp;{nombres+" "+apellidos}&nbsp;&nbsp;|&nbsp;&nbsp;{rol}</h6>
                    </div>
                </div>
        </nav>
    )
}

export default Header;
  