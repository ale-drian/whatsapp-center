import { SERVIDOR } from './Servidor';
import axios from 'axios';

class ReporteService {

    static urlLista = SERVIDOR + '/reporte';

    static listar = (idempresa,idusuario) => {
        return axios.get(this.urlLista+"/"+idempresa+"/"+idusuario);
    }

}



export default ReporteService;