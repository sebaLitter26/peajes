import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';

import { URL_EMPRESAS, URL_REGISTRO, URL_ACTIVAR, URL_REACTIVAR } from "../config/url.servicios";


import { AlertController, Platform } from "ionic-angular";

// Plugin storage
import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioService {

    clave: string = "";
    id_usuario: string;
    id_empresa: number = 0;
    imei: string = "0";
    estado: string = "";
    telefono: string;
    dispositivo: any;



    constructor(public http: HttpClient,
        private alertCtrl: AlertController,
        private platform: Platform,
        private storage: Storage,
        private device: Device,
    ) {

        //console.log('Hello Usuario Provider');
        this.cargar_storage();

        if (this.platform.is("cordova")) {
            this.imei = this.device.uuid;
            this.dispositivo = this.device;
            this.dispositivo.version = parseFloat(this.dispositivo.version);


        }
    }


    activo(): boolean {

        let activos: boolean = false;
        if (this.clave) {
            //console.log("clave ",this.clave);
            activos = true;
        }
        return activos;
        //return new Promise((resolve, reject) => resolve(activos) );
        //return activos;
        //return Promise.resolve( activos );

    }


    getEmpresas() {
        let url = URL_EMPRESAS;
        //console.log(url);
        let data = new FormData();

        //let config ={ headers: new HttpHeaders().set(‘Content-Type’, ‘application/json’) };

        data.append("id_empresa", this.id_empresa.toString());

        return this.http.get(url)
            .subscribe(resp => {

                console.log(resp);

            });

    }






    ingresar(nombre: string, apellido: string, celular: number, callback) {

        //this.getEmpresas();


        if (this.platform.is("cordova")) {
            this.imei = this.device.uuid;
        }

        this.telefono = "549";
        this.telefono = this.telefono.concat(celular.toString());


        //let config ={ headers: new HttpHeaders().set('Content-Type', 'application/json') };

        //let data = new URLSearchParams();
        let body = new FormData();
        body.append('apellido', apellido);
        body.append('nombre', nombre);
        body.append('telefono', this.telefono);
        body.append('imei', this.imei);
        body.append('id_empresa', this.id_empresa.toString());


        /*
        let data = JSON.stringify({
          apellido: apellido ,
          nombre: nombre,
          telefono: this.telefono ,
          imei: this.imei ,
          id_empresa: this.id_empresa.toString() ,
        });
        */


        let url = URL_REGISTRO;

        return this.http.post(url, body)
            //.map(response => response)
            .subscribe(resp => {

                console.log(resp);
                //{status: "OK", msg: "Se aceptó solicitud de registro. Se envía SMS al teléfono especificado."}

                this.id_usuario = resp['id_usuario'];
                this.clave = resp['clave'];
                //this.estado = "registrado";

                // Guardar Storage
                this.guardar_storage();



                callback("activar");

                this.alertCtrl.create({
                    title: "Espere a recivir el codigo SMS",
                    subTitle: "Sea Paciente. El msj puede demorar en llegar",
                    buttons: ["OK"]
                }).present();

            },
                (err: HttpErrorResponse) => {
                    console.log(err);
                    console.log(err.name);
                    console.log(err.message);
                    console.log(err.error.result);
                    callback(err.error.result.activo);
                }
                /*
                (err) => {
                    console.log("activo usuarios.ts ",err);
                    //console.log("activo usuarios.ts ",JSON.parse(err._body).result.activo);
                    callback( JSON.parse(err._body).result.activo );

                    /*
                    this.alertCtrl.create({
                      title: "Error al registrarse",
                      subTitle: JSON.parse(err._body).msg,
                      buttons: ["OK"]
                    }).present();


                }
                */

            );

    }



    ingresar_codigo_activar(codigo: number, callback) {

        //this.getEmpresas();


        //let config ={ headers: new HttpHeaders().set('Content-Type', 'application/json') };

        //let data = new URLSearchParams();
        let data = new FormData();

        data.append("codigo", codigo.toString());
        data.append("telefono", this.telefono);
        data.append("imei", this.imei.toString());
        data.append("id_empresa", this.id_empresa.toString());

        //console.log(data);

        let url = URL_ACTIVAR;

        return this.http.post(url, data)
            .subscribe((resp: any) => {

                //let data_resp = resp.json();
                console.log(resp);

                this.clave = resp.result.clave;
                this.id_usuario = resp.result.id_usuario;

                this.estado = "registrado";

                // Guardar Storage
                this.guardar_storage();


                callback();


            },

                (err: HttpErrorResponse) => {
                    console.log(err.error);
                    console.log(err.name);
                    console.log(err.message);
                    this.alertCtrl.create({
                        title: "Error con el codigo SMS de registro",
                        subTitle: err.message,
                        buttons: ["OK"]
                    }).present();

                }   //,  () => { console.log("error") }

            );


    }


    reactivar(callback) {


        let data = new FormData();

        data.append("telefono", this.telefono);
        data.append("imei", this.imei.toString());
        data.append("id_empresa", this.id_empresa.toString());

        //console.log(data);

        let url = URL_REACTIVAR;

        return this.http.post(url, data)
            .subscribe((resp: any) => {


                let data_resp = resp;
                console.log(data_resp);

                this.clave = resp.result.clave;
                this.id_usuario = resp.result.id_usuario;

                this.estado = "registrado";

                // Guardar Storage
                this.guardar_storage();


                callback();


            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error al reactivar la cuenta",
                        subTitle: err.message,
                        buttons: ["OK"]
                    }).present();

                }   //,  () => { console.log("error") }

            );


    }

    cerrar_sesion(callback) {
        let alert = this.alertCtrl.create({
            title: '¿Estas seguro que desea borrar su cuenta?',
            message: 'Deberas registrarte nuevamente',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: () => {
                        callback(false);
                    }
                },
                {
                    text: 'SI',
                    handler: () => {
                        this.borrar_sesion();
                        callback(true);
                    }
                }
            ]
        });
        alert.present();
    }

    borrar_sesion() {

        this.clave = null;
        this.id_usuario = null;
        this.estado = null;

        // guardar storage
        this.guardar_storage();
    }

    private guardar_storage() {

        if (this.platform.is("cordova")) {
            // dispositivo
            //console.log("pushToken ",push_token);
            //console.log("user ",this.id_usuario);
            //console.log("user ",this.clave);

            this.storage.set('clave', this.clave);
            this.storage.set('id_usuario', this.id_usuario);
            this.storage.set('estado', this.estado);
            //this.storage.set('ids', this.ids );
            //this.storage.set('pushToken', this.pushToken);

        } else {
            // computadora
            if (this.clave) {
                localStorage.setItem("clave", this.clave);
                localStorage.setItem("id_usuario", this.id_usuario);
                localStorage.setItem('estado', this.estado);
            } else {
                localStorage.removeItem("clave");
                localStorage.removeItem("id_usuario");
                localStorage.removeItem("estado");
            }

        }


    }

    cargar_storage() {

        let promesa = new Promise((resolve, reject) => {

            if (this.platform.is("cordova")) {
                // dispositivo
                this.storage.ready()
                    .then(() => {

                        this.storage.get("clave")
                            .then(clave => {
                                if (clave) {
                                    this.clave = clave;
                                }
                            })

                        this.storage.get("id_usuario")
                            .then(id_usuario => {
                                if (id_usuario) {
                                    this.id_usuario = id_usuario;
                                }
                                resolve();
                            })

                    })


            } else {
                // computadora
                if (localStorage.getItem("clave")) {
                    //Existe items en el localstorage
                    this.clave = localStorage.getItem("clave");
                    this.id_usuario = localStorage.getItem("id_usuario");

                }

                resolve();

            }

        });

        return promesa;

    }

}
