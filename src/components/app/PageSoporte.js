import React from 'react'
//Estilos
import MenuPrincipal from "../whatsapp/MenuPrincipal";
import Header from "../whatsapp/Header";
import '../FontAwesome';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function PageSoporte(props) {

    return (
        <div className="container-fluidbg-fondo-light bg-fondo p-0">
            <div className="d-flex">

                <MenuPrincipal/>

                <div className="container-fluid p-0">
                <Header />
                    <div id="contenido-principal" className="pl-5 pr-5">
                        <section className="py-3">
                        <div className="row d-block">
                                <span className="ml-5 pl-4">WhatsAppCenter <strong className="text-primary">/ Soporte</strong></span>
                            </div>
                            <div className="container">
                            <div class="section" >
                                    <div class="container">
                                    
                                        
        
                                        <div class="row">
                                            <div class="col-lg-4 col-md-6 col-sm-12">
                                                <h5 class="margin-bottom-30"><FontAwesomeIcon icon="users" className="mr-2" /> Equipo de Desarrollo</h5>
                                                <div class="contact-text">
                                                
                                                    <p> Sixto Santiago Aisa Incapuño
                                                    <br/>sixto.aisa@tecsup.edu.pe</p>
                                                    <p> Thalia Alejandra Adrián Tejada
                                                    <br/>thalia.adrian@tecsup.edu.pe</p>
                                                    <p> Mariam Dalia Apaza Santillana
                                                    <br/>mariam.apaza@tecsup.edu.pe</p>
                                                    <p> Joseph Antonio Carita Mamani
                                                    <br/>joseph.carita@tecsup.edu.pe</p>
                                                    <p> Brayan Oscar Champi Huamani
                                                    <br/>brayan.champi@tecsup.edu.pe</p>
                                                    <p> Brandon Aldair Soto Adco
                                                    <br/>brandon.soto@tecsup.edu.pe</p>
                                                   
                                                </div>
                                            </div>
                                            <div class="col-lg-8 col-md-6 col-sm-12">
                                                <div class="center-heading">  
                                                    <h2 class="section-title">¡Contáctanos!</h2>
                                                </div>
                                                <div class="center-text">
                                                    <p>Si tienes alguna duda o sugerencia, llena el formulario. Nuestro equipo te contactará en breve.</p>
                                                </div>
                                                <div class="contact-form">
                                                    <form id="contact" action="" method="get">
                                                    <div class="row">
                                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <input name="name" type="text" class="form-control" id="name" placeholder="Nombre Completo" required=""/>
                                                        </fieldset>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <input name="name" type="text" class="form-control" id="name" placeholder="Razon Social Empresa" required=""/>
                                                        </fieldset>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <input name="name" type="text" class="form-control" id="name" placeholder="RUC Empresa" required=""/>
                                                        </fieldset>
                                                        </div>
                                                        <div class="col-lg-6 col-md-12 col-sm-12">
                                                        <fieldset>
                                                            <input name="email" type="email" class="form-control" id="email" placeholder="Correo" required=""/>
                                                        </fieldset>
                                                        </div>
                                                        <div class="col-lg-12">
                                                        <fieldset>
                                                            <textarea name="message" rows="6" class="form-control" id="message" placeholder="Escribe tu mensaje" required=""></textarea>
                                                        </fieldset>
                                                        </div>
                                                        <div class="col-lg-12">
                                                        <fieldset>
                                                            <button type="submit" id="form-submit" class="main-button">Enviar Mensaje</button>
                                                        </fieldset>
                                                        </div>
                                                    </div>
                                                    </form>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageSoporte;
  