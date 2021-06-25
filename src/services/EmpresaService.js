import { SERVIDOR } from './Servidor';
import axios from 'axios';
import * as url from "url";

class EmpresaService {
    static urlListar = SERVIDOR + '/empresa/lista'
    static urlRegistrar = SERVIDOR + '/empresa/registrar';
    static urlActualizar = SERVIDOR + '/empresa/actualizar';
    static urlEliminar = SERVIDOR + '/empresa/eliminar';

    static listar = (idusuario) => {
        return axios.get(this.urlListar+"/"+idusuario)
    }

    static registrar = (data) => {
        return axios.post(this.urlRegistrar, data);
    }
    static update = ( data,idempresa ) => {

        let enviarData = {
            idempresa: idempresa,
            razonsocial:data.razonsocial,
            ruc:data.ruc
        };

        return axios.put(this.urlActualizar,enviarData)
    }
    static delete = ( id ) => {
        return axios.delete(this.urlEliminar+"/"+id)
    }


}



export default EmpresaService;