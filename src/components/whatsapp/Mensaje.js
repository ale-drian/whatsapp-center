import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function change_date(numero){
    let unix_timestamp = numero
    // multiplica por 1000 porque es milisegundos.
    const date_full = new Date(unix_timestamp * 1000);
    const year = date_full.getFullYear();
    const month = "0" + (date_full.getMonth() + 1);
    const date = "0" + date_full.getDate();
    const hours = "0" + date_full.getHours();
    const minutes = "0" + date_full.getMinutes();
    const seconds = "0" + date_full.getSeconds();
    const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    const formattedTimeHM = hours.substr(-2) + ':' + minutes.substr(-2) ;
    const formatedDate = date.substr(-2) + '/' + month.substr(-2) + '/' + year;
    return [formattedTimeHM, formattedTime, formatedDate];
}

function Mensaje(props) {
    const [isError, setIsError] = useState(false);

    function eliminar(idmensaje){
        props.handleEliminar(idmensaje)
    }

    return (
        <div className="col-12" >
            {
                props.data.map((mensaje, index) => {
                    return (
                        <div key={index} className="container">
                            {index == 0 || ( change_date(props.data[index-1].time)[2] != change_date(mensaje.time)[2])
                            ? <div className="chat_date"><span>{change_date(mensaje.time)[2]}</span></div>
                            :''}
                            <div className={mensaje.fromMe ? "chat_message chat_message_send" : "chat_message chat_message_recived" }>
                                {mensaje.type == "image" 
                                    ?<img className="chat_body_image" src={mensaje.body}/>
                                    :[
                                        mensaje.type == "document" 
                                            ? <a href={mensaje.body} id="viewer" >{mensaje.body}</a>
                                            :mensaje.body
                                        
                                    ]
                                }   
                                   
                                                           
                                <span className="chat_body_timestamp">
                                    {change_date(mensaje.time)[0]}
                                </span>

                                <button className="btn m-0 p-0"
                                        onClick={() => eliminar(mensaje.id)}>
                                    <FontAwesomeIcon icon="trash-alt" className="mr-2"   />
                                </button>


                                {/*<button type="button" className="btn btn-danger">Eliminar</button>*/}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Mensaje;

