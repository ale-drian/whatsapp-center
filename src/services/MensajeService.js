import { SERVIDOR } from './Servidor';
import axios from 'axios';

class MensajeService {

    static urlLista = SERVIDOR + '/mensaje/lista/';
    static urlEnviarMensaje = SERVIDOR + '/mensaje/enviar/';
    static urlEliminarMensaje=SERVIDOR+'/mensaje/eliminar/'


    static listar = (idcontacto) => {
        return axios.get(this.urlLista+idcontacto);
    }

    static enviarMensaje = (idcontacto,data) => {
        let enviarData = {
            idcontacto: idcontacto,
            mensaje:data.mensaje_unicode
        };

        return axios.post(this.urlEnviarMensaje,enviarData);
    }

    static eliminarMensaje = (idcontacto,idmensaje) => {
        return axios.delete(this.urlEliminarMensaje+idcontacto+"/"+idmensaje);
    }


}

export default MensajeService;