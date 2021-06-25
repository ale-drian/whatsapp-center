import React, {useEffect, useState} from 'react'
import {useAuth} from "../../context/auth";
import NumeroTelefonoService from "../../services/NumeroTelefonoService";

function NumeroTelefono(props) {
    const [data, setData] = useState([]);
    const [idnumero, setIdnumero] = useState(0);

    const [isError, setIsError] = useState(false);

    const { user: {idempresa}} = useAuth();

    useEffect(() => {
        NumeroTelefonoService.listar(idempresa).then(result => {
            if (result.status === 200) {
                setData(result.data);
            } else {
                setData([]);
                setIsError(true);
            }
        }).catch(error => {
            setData([]);
            setIsError(true);
        });
    }, [idempresa]);

    function seleccionarNumero(e){
        setIdnumero(e.target.value)
        props.handleChange(e.target.value)
    }


    return (
        <div className="container-fluid p-0">
            <select className="form-control" value={idnumero}  onChange={seleccionarNumero} >
                <option value="0">Seleccione un Número de Telefono</option>
                {
                    data.map((numeroTelefono, index) => {
                        return (
                            <option key={index} value={numeroTelefono.idnumero}> {numeroTelefono.numero} </option>
                        );
                    })
                }
            </select>
        </div>
    )
}

export default NumeroTelefono;

