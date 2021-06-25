import React, {useEffect, useState} from 'react'
//FontAwesome
import '../FontAwesome';
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import Header from "../whatsapp/Header";
import {useAuth} from "../../context/auth";
import {useHistory} from "react-router-dom";
import {types} from "../../types/types";
import CanvasJSReact from '../../canvas/canvasjs.react';
import ReporteService from "../../services/ReporteService";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PagePrincipal(props) {
    const { user:{ apellidos, nombres,idempresa , idusuario, idrol} } = useAuth();
    const { dispatch } = useAuth()
    const history = useHistory()

    const handleLogout = ()=>{
        history.replace('/login')
        dispatch({
            type:types.logout
        })
    }


    const [updateData, setUpdateData] = useState(0);
    const [listaUsuarios, setListaUsuarios] = useState({data: [], loading: false});
    const {data, loading} = listaUsuarios
    const [isError, setIsError] = useState(false);
    const {message} = isError

    //const [dataPointUser, setDataPoinUser] = useState([]);

    useEffect(() => {
        ReporteService.listar(idempresa, idusuario)
            .then(res => {
                if (res.status === 200) {
                    setListaUsuarios({
                        data: res.data,
                        loading: true
                    })
                } else {
                    setListaUsuarios({...listaUsuarios, loading: false})
                }
            })
            .catch(err => {
                setIsError({error: true, message: err.toString()})
                setListaUsuarios({...listaUsuarios, loading: false})
            })

    }, [updateData]);

    let dataPointUser = []
    for(const usuario in data){
        dataPointUser.push({
            label: data[usuario].nombres + " " + data[usuario].apellidos,
            y: data[usuario].contactos
        })
    }
    const options = {
        animationEnabled: true,
        animationDuration: 2000,
        theme: "light2",
        title: {
          text: "Contactos por Agente",
          padding: 20
        },
        dataPointMaxWidth:50,
        axisX:{
            title: "Agentes",
            tickLength: 10,
            margin: 20
           },
        axisY:{
            title: "N° Contactos Asignados",
            gridThickness: 1,
            tickLength: 10,
            margin: 20
           },
        data: [{
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                type: "column",
                dataPoints: dataPointUser
         }]
     }


    return (
        <div className="container-fluidbg-fondo-light bg-fondo p-0">
            <div className="d-flex">

                <MenuPrincipal/>

                <div className="container-fluid p-0">
                    <Header />
                    <div id="contenido-principal " className="#">
                        <section className="py-3 ">
                            <div className="container  ">
                                <h2>Bienvenido {nombres}</h2>
                                <CanvasJSChart options = {options} />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagePrincipal;
