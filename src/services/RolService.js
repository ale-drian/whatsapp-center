import { SERVIDOR } from './Servidor';
import axios from 'axios';

class RolService {

    static urlLista = SERVIDOR + '/rol/lista';

    static ADMINISTRADOR = 1;
    static AGENTE = 2;
    static ROOT = 3;


    static listar = (idrol) => {
        return axios.get(this.urlLista+"/"+idrol);
    }

}



export default RolService;