import { AsyncStorage } from 'react-native';
import { decode as atob, encode as btoa } from 'base-64'

class Token {


    static usuario(token) {
        let payload = token.split(".")[1];
        var bin = atob(payload);
        return JSON.parse(bin);
    }

    static isValido(token) {

        if (token !== null && token !== "") {
            let payload = token.split(".")[1];
            var bin = atob(payload);
            let usuario = JSON.parse(bin);


            return usuario.exp > Date.now() / 1000 ? true : false;
        } else {
            return false;
        }


    }

    static registrar(token) {
        AsyncStorage.setItem('TOKEN', token);
    }



    static obtener() {
        return AsyncStorage.getItem('TOKEN');
    }

}

export default Token;