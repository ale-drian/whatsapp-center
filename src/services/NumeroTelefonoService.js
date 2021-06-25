import { SERVIDOR } from './Servidor';
import axios from 'axios';

class NumeroTelefonoService {

    static urlRegistrar = SERVIDOR + '/numero/registrar';
    static urlActualizar = SERVIDOR + '/numero/actualizar';
    static urlEliminar = SERVIDOR + '/numero/eliminar';
    static urlLista = SERVIDOR + '/numero/lista';
    static urlLista2 = SERVIDOR + '/numero/lista2';


    static urlListaConfiguracion = SERVIDOR + '/numero/listaConfiguracion';
    static urlLogout = SERVIDOR + '/numero/logout';



    static listar = (idempresa) => {
        return axios.get(this.urlLista+"/"+idempresa);
    }

    static listar2 = (idempresa,idusuario) => {
        return axios.get(this.urlLista2+"/"+idempresa+"/"+idusuario);
    }

    static listarConfiguracion = (idempresa) => {
        return axios.get(this.urlListaConfiguracion+"/"+idempresa);
    }

    static registrar = (data) => {
        let enviarData = {
            idempresa: data.idempresa,
            numero: data.numero,
            instance:data.instance,
            token:data.token
        };
        
        return axios.post(this.urlRegistrar, enviarData);
    }
    
    static actualizar = (data,idnumero) => {
        
        let enviarData = {
            idnumero: idnumero,
            idempresa: data.idempresa,
            numero: data.numero,
            instance:data.instance,
            token:data.token
        };




        return axios.put(this.urlActualizar, enviarData);
    }

    static eliminar = (idnumero) => {

        return axios.delete(this.urlEliminar+"/"+idnumero);
    }

    static logout = (idnumero) => {

        return axios.get(this.urlLogout+"/"+idnumero);
    }


}



export default NumeroTelefonoService;