import React, {useState} from 'react'
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import Header from "../whatsapp/Header";

function PageHerramienta(props) {

    return (
        <div className="container-fluidbg-fondo-light bg-fondo p-0">
            <div className="d-flex">

                <MenuPrincipal/>

                <div className="container-fluid p-0">
                    <Header />
                    <div id="contenido-principal" className="#">
                        <section className="py-3">
                            <div className="container">
                                <h1>Herramienta</h1>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHerramienta;
  