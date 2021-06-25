import './App.css';
import {AuthContext} from "./context/auth";
import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import Login from "./components/auth/Login";
import PagePrincipal from "./components/app/PagePrincipal";
import React, {useEffect, useReducer} from "react";
import PrivateRoute from "./routers/PrivateRoute";
import PageChat from "./components/app/PageChat";
import PageHerramienta from "./components/app/PageHerramienta";
import PageUsuario from "./components/app/PageUsuario";
import PageEmpresa from "./components/app/PageEmpresa";
import PageTelefono from "./components/app/PageTelefono";
import PageSoporte from "./components/app/PageSoporte";
import PageConfiguracion from "./components/app/PageConfiguracion";
import {authReducer} from "./components/auth/authReducer";
import PublicRoute from "./routers/PublicRoute";

const init = () => JSON.parse(localStorage.getItem('user')) || { logged:false }

function App(props) {

    const [user, dispatch] = useReducer(authReducer,{},init)


    useEffect(()=>{
        localStorage.setItem( 'user', JSON.stringify(user))
    },[user])

    

    return (
        <AuthContext.Provider value={{user,dispatch}}>
            <Router>
                <Switch>



                    <PublicRoute path="/login" component={Login}/>

                    <PrivateRoute path="/index" component={PagePrincipal} />
                    <PrivateRoute path="/chat" component={PageChat} />
                    <PrivateRoute path="/herramienta" component={PageHerramienta} />
                    <PrivateRoute path="/usuario" component={PageUsuario} />
                    <PrivateRoute path="/empresa" component={PageEmpresa} />
                    <PrivateRoute path="/telefono" component={PageTelefono} />
                    <PrivateRoute path="/soporte" component={PageSoporte} />
                    <PrivateRoute path="/configuracion" component={PageConfiguracion} />

                    <Redirect
                        from="/"
                        to="/index"
                    />


                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;



