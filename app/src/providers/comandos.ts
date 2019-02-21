import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import { map } from 'rxjs/operators';

import { URL_VIAJE, URL_PARADA, URL_CONECTARPANTALLA, URL_DESCONECTARPANTALLA } from "../config/url.servicios";


import { AlertController } from "ionic-angular";

// usuario service
import { UsuarioService } from "./usuario";


@Injectable()
export class ComandosService {

    clave: string;
    id_usuario: string;
    id_empresa: number = 0;
    imei: number = 0;
    estado: string = "";
    licencia: string = " ";


    constructor(public http: HttpClient,
        private alertCtrl: AlertController,
        //private platform: Platform,
        private _us: UsuarioService,

    ) {

    }



    obtener_viaje(callback = null) {

        let data = new FormData();

        console.log("obtuvo viaje", this._us.clave);

        //data.append("usuario", this.id_usuario );
        //data.append("clave", this.clave );


        let url = URL_VIAJE + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {

                console.log(resp);
                //{status: "OK", msg: "Se aceptó solicitud de registro. Se envía SMS al teléfono especificado."}
                /*
                                this.id_usuario = resp['id_usuario'];
                                this.clave = resp['clave'];
                                //this.estado = "registrado";

                                // Guardar Storage
                                this.guardar_storage();

                                callback();

                                this.alertCtrl.create({
                                  title: "Espere a recivir el codigo SMS",
                                  subTitle: "Sea Paciente. El msj puede demorar en llegar",
                                  buttons: ["OK"]
                                }).present();
                                */

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error al solicitar el viaje",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }


    obtener_parada(callback = null) {

        let data = new FormData();


        //data.append("usuario", this.id_usuario );
        //data.append("clave", this.clave );


        let url = URL_PARADA + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {

                console.log(resp);
                //{status: "OK", msg: "Se aceptó solicitud de registro. Se envía SMS al teléfono especificado."}
                /*
                                this.id_usuario = resp['id_usuario'];
                                this.clave = resp['clave'];
                                //this.estado = "registrado";

                                // Guardar Storage
                                this.guardar_storage();

                                callback();

                                this.alertCtrl.create({
                                  title: "Espere a recivir el codigo SMS",
                                  subTitle: "Sea Paciente. El msj puede demorar en llegar",
                                  buttons: ["OK"]
                                }).present();
                                */

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error al enviar Parada",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }


    login_pantalla(callback = null) {
        let data = new FormData();
        data.append("licencia", this.licencia);

        let url = URL_CONECTARPANTALLA + '/' + this._us.id_usuario + '/' + this._us.clave;



        return this.http.post(url, data)
            .subscribe((resp: any) => {

                this.licencia = resp.result.licencia;
                callback(resp);

                //{status: "OK", msg: "Se aceptó solicitud de registro. Se envía SMS al teléfono especificado."}
                /*
                this.id_usuario = resp['id_usuario'];
                this.clave = resp['clave'];
                //this.estado = "registrado";

                // Guardar Storage
                this.guardar_storage();

                callback();
                this.alertCtrl.create({
                  title: "Espere a recivir el codigo SMS",
                  subTitle: "Sea Paciente. El msj puede demorar en llegar",
                  buttons: ["OK"]
                }).present();
                */

            },
                (err: HttpErrorResponse) => {
                    console.log(err);
                    this.alertCtrl.create({
                        title: "Error al conectar pantalla",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }







    logout_pantalla(callback = null) {
        let data = new FormData();

        data.append("licencia", this.licencia);

        let url = URL_DESCONECTARPANTALLA + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {
                this.licencia = " ";
                callback(resp);
                //{status: "OK", msg: "Se aceptó solicitud de registro. Se envía SMS al teléfono especificado."}
                /*
                this.id_usuario = resp['id_usuario'];
                this.clave = resp['clave'];
                //this.estado = "registrado";

                // Guardar Storage
                this.guardar_storage();

                callback();
                this.alertCtrl.create({
                  title: "Espere a recivir el codigo SMS",
                  subTitle: "Sea Paciente. El msj puede demorar en llegar",
                  buttons: ["OK"]
                }).present();
                */

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error al desconectar Pantalla",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }



}
