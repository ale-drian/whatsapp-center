import React, {useState} from 'react';
import {Avatar} from "@material-ui/core";

function ContactoActual(props) {

    const [isError, setIsError] = useState(false);

    return (
        <div className="container-fluid p-0">
            <Avatar src={props.contacto.imagen} className="current_contact_avatar"/>
            <span className="current_contact_name">{props.contacto.nombre}</span>
        </div>
    )
}

export default ContactoActual;

