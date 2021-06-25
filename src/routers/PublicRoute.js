import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";

function PublicRoute({ component: Component,data, ...rest }) {

    const {user:{logged}} = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                (!logged) ? (<Component {...props}  {...data} /> ) : (
                    <Redirect
                        to={{ pathname: "/index", state: { referer: props.location } }}
                    />
                )
            }
        />

    );
}

export default PublicRoute;