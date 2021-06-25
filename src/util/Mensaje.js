
import {  Alert } from 'react-native';

class Mensaje {

    static registroExitoso() {
        Alert.alert("Confirmación", "Registro Exito")
    }

    static registroError() {
        Alert.alert("Error", "Error al registrar, intente nuevamente")
    }

    static Error() {
        Alert.alert("Error", "Error, intente nuevamente")
    }

    static alertaSiFoto() {
        Alert.alert("Advertencia", "No puede registrar, Ud. debe tomar una foto")
    }

    static LoginExitoso(usuario) {
        Alert.alert("Confirmación", "Bienvenido "+usuario.nombresApellidos.toUpperCase());        
    }

    static LoginError() {
        Alert.alert("Error", "Verifique su correo o contraseña")
    }


}

export default Mensaje;