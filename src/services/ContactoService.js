import { SERVIDOR } from './Servidor';
import axios from 'axios';

class ContactoService {

    static urlLista = SERVIDOR + '/contacto/lista';
    static urlActualizar = SERVIDOR + '/contacto/actualizar';

    static listar = (idnumero,idusuario) => {
        return axios.get(this.urlLista+"/"+idnumero+"/"+idusuario);
    }


    static actualizar = (idcontacto,idusuario) => {

        let enviarData = {
            idusuario: idusuario,
            idcontacto:idcontacto
        };
        return axios.put(this.urlActualizar, enviarData);
    }

}



export default ContactoService;