import { SERVIDOR } from './Servidor';
import axios from 'axios';

class UsuarioService {

    static urlLogin = SERVIDOR + '/usuario/login';
    static urlRegistrar = SERVIDOR + '/usuario/registrar';
    static urlActualizar = SERVIDOR + '/usuario/actualizar';
    static urlEliminar = SERVIDOR + '/usuario/eliminar';
    static urlLista = SERVIDOR + '/usuario/lista';
    static urlLista2 = SERVIDOR + '/usuario/lista2';

    static registrar = (data) => {

        let enviarData = {
            idempresa: data.idempresa,
            apellidos:data.apellidos,
            nombres:data.nombres,
            idrol:data.idrol,
            usuario:data.usuario,
            clave:data.clave
        };

        return axios.post(this.urlRegistrar, enviarData);
    }

    static actualizar = (data,idusuario) => {

        let enviarData = {
            idusuario: idusuario,
            idempresa: data.idempresa,
            apellidos:data.apellidos,
            nombres:data.nombres,
            idrol:data.idrol,
            usuario:data.usuario,
            clave:data.clave
        };




        return axios.put(this.urlActualizar, enviarData);
    }

    static eliminar = (idusuario) => {

        return axios.delete(this.urlEliminar+"/"+idusuario);
    }

    static login = (data) => {
        let enviarData = {
            usuario: data.usuario,
            clave: data.clave
        };

        return axios.post(this.urlLogin, enviarData);
    }

    static listar = (idempresa) => {
        return axios.get(this.urlLista+"/"+idempresa);
    }

    static listar2 = (idempresa,idusuario) => {
        return axios.get(this.urlLista2+"/"+idempresa+"/"+idusuario);
    }

}



export default UsuarioService;