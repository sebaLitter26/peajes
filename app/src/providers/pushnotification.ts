import { Injectable, ViewChild } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { NativeRingtones } from '@ionic-native/native-ringtones';

import moment from 'moment';


import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { AlertController, Platform, ModalController, Nav, NavParams, ToastController } from 'ionic-angular';


import { URL_NOTIFICACIONES, URL_NOTIFICACIONES_MSQ, URL_NOTIFICACIONES_MSJ, URL_NOTIFICACIONES_MSU, ABREVIACIONES, URL_NOTIFICACIONES_ACK, URL_NOTIFICACIONES_EVT } from "../config/url.servicios";

// servicios / providers
import { UsuarioService } from "./usuario";
import { BasededatosService } from "./basededatos";

// paginas del modal
import { MensajePage } from "../pages/mensaje/mensaje";
import { TabsPage } from "../pages/tabs/tabs";


@Injectable()
export class PushnotificationService {

    //pushToken:string = "";
    datos_push: datos_push;
    MSU: datos_push[] = [];

    n_notif: any;
    u_notif: any;
    q_notif: any;
    j_notif: any;
    out_notif: any;

    myTracks: any[];
    allTracks: any[];
    selectedTrack: any;

    msjs_no_leidos: number = 0;

    audio: any;

    @ViewChild(Nav) nav: Nav;

    @ViewChild(NavParams) navParams: NavParams;


    constructor(private oneSignal: OneSignal,
        public platform: Platform,
        private _us: UsuarioService,
        public http: HttpClient,
        private alertCtrl: AlertController,
        public modalCtrl: ModalController,

        private toast: ToastController,
        private SQL: BasededatosService,
        private ringtones: NativeRingtones,


    ) {

        if (this.platform.is('cordova')) {
            this.getAllMensajes();

            this.ringtones.getRingtone().then((ringtones) => {
                this.selectedTrack = ringtones[0];
                console.log(this.selectedTrack);
            });

        }
        this.msjs_no_leidos = this.MSU.filter(x => x.leido == 0).length;


    }

    init_notifications() {

        if (this.platform.is('cordova')) {

            this.oneSignal.startInit('01b21eca-d2be-4caa-87e8-033bd4d612ef', '992540997536');

            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);


            this.oneSignal.getIds().then((ids) => {

                this.send_push_id(ids.userId);
            });
            /*
              this.storage.get(“ids”).then((value) => {
              rt=value;
              console.log(‘Storage value: ‘+ value);
              })
              */



            this.oneSignal.handleNotificationReceived().subscribe((msj) => {
                // do something when notification is received

                //leyenda = msj.payload.body;



                this.datos_push = {
                    titulo: msj.payload.additionalData.titulo,
                    contenido: msj.payload.body,
                    ms: msj.payload.additionalData.tipo,
                    id_msj: msj.payload.additionalData.nromsj,
                    fecha: moment().format(),
                    boton_respuesta: null,
                    leido: 0,

                }

                this.analiza_notificacion();

            });

            this.oneSignal.handleNotificationOpened().subscribe((msj) => {
                // do something when a notification is opened


                //leyenda = msj.notification.payload.body;


                this.datos_push = {
                    titulo: msj.notification.payload.additionalData.titulo,
                    contenido: msj.notification.payload.body,
                    ms: msj.notification.payload.additionalData.tipo,
                    id_msj: msj.notification.payload.additionalData.nromsj,
                    boton_respuesta: msj.action.actionID,
                    fecha: moment().format(),
                    leido: 0,


                }

                this.analiza_notificacion();


            });

            this.oneSignal.endInit();

        } else {
            console.log('OneSignal no funciona en Chrome');
        }


    }


    cambiar_contenido_abrev(letra): string {
        let index = ABREVIACIONES.findIndex(d => d.letra === letra); //find index in your array
        console.log("index", index);
        return (index > -1) ? ABREVIACIONES[index].leyenda : this.datos_push.contenido;
    }


    tiempoAnterior(fecha_creado) {
        return moment.utc(fecha_creado).fromNow();

    }


    playSelectedTrack() {
        // use AudioProvider to control selected track
        //this._audioProvider.play(this.selectedTrack);
        //this.audio = new Audio(this.myTracks[this.selectedTrack].src);
        //this.audio.play();

        this.ringtones.playRingtone(this.selectedTrack.Url);
    }

    pauseSelectedTrack() {
        // use AudioProvider to control selected track
        //this._audioProvider.pause(this.selectedTrack);
        setTimeout(
            () => {
                this.ringtones.stopRingtone(this.selectedTrack.Url)
            }, 4000);

    }

    onTrackFinished(track: any) {
        console.log('Track finished', track)
    }


    analiza_notificacion() {
        console.log("msj analizo", this.datos_push);

        this.respuestaACK(this.datos_push);


        //console.log(msj );
        this.datos_push.contenido = this.cambiar_contenido_abrev(this.datos_push.contenido);
        this.playSelectedTrack();
        this.pauseSelectedTrack();

        this.mandar_respuesta();

    }

    mandar_respuesta() {

        this.descartar_notif();


        switch (this.datos_push.ms) {
            case "MSQ":

                if (this.datos_push.boton_respuesta) {
                    this.respuestaMSQ(this.datos_push.boton_respuesta, this.datos_push.id_msj);
                } else {
                    //En caso de no haber seleccionado una respuesta en la notificacion
                    this.q_notif = this.alertCtrl.create({
                        title: this.datos_push.titulo,
                        subTitle: this.datos_push.contenido,
                        buttons: [{
                            text: 'RECHAZAR',
                            handler: () => {
                                this.respuestaMSQ("NO", this.datos_push.id_msj);
                            }
                        },
                        {
                            text: 'ACEPTAR',
                            handler: () => {
                                this.respuestaMSQ("SI", this.datos_push.id_msj);
                            }
                        }]
                    });
                    this.q_notif.present();
                    setTimeout(() => this.q_notif.dismiss(), 20000);

                }
                break;
            case "MSJ":
                //this.respuestaMSJ( acepta_rechaza , this.datos_push.id_msj);
                this.modal_respuesta_MSJ(this.datos_push);
                break;
            case "MSU":
                this.respuestaMSU(this.datos_push);
                break;
            case "MSN":
                this.respuestaMSN(this.datos_push);
                break;
            case "MSO":
                this.respuestaMSO(this.datos_push);
                break;
            default:
        }

    }

    descartar_notif() {

        if (this.u_notif) {
            this.u_notif.dismiss().catch(e => console.log('MSU error', e));
            this.u_notif = null;
        }
        if (this.q_notif) {
            this.q_notif.dismiss().catch(e => console.log('MSQ error', e));
            this.q_notif = null;
        }
        if (this.n_notif) {
            this.n_notif.dismiss().catch(e => console.log('MSN error', e));
            this.n_notif = null;
        }
        if (this.j_notif) {
            this.j_notif.dismiss().catch(e => console.log('MSJ error', e));
            this.j_notif = null;
        }
        if (this.out_notif) {
            this.out_notif.dismiss().catch(e => console.log('MSOUT error', e));
            this.out_notif = null;
        }

    }





    respuestaMSO(msj: datos_push) {
        //this.nav.setRoot( TabsPage ,{ salir_de_frecuencia: true } ).catch(e => console.log('Ira a Home error', e)) ;

        this.out_notif = this.toast.create({
            message: this.datos_push.contenido,
            position: "buttom",
            //duration: 3000,
            showCloseButton: true,
            closeButtonText: "OK",

        });
        this.out_notif.present();

    }

    respuestaMSU(msj: datos_push) {

        this.insertarMensaje(this.datos_push);

        this.u_notif = this.alertCtrl.create({
            title: this.datos_push.titulo,
            subTitle: this.datos_push.contenido,
            buttons: [{
                text: 'OK',
                handler: () => {

                    //this.resp_MSU(this.datos_push.id_msj );
                    //this.MSU.pop();

                }
            }]
        });
        this.u_notif.present();
    }




    resp_MSU(id_msj) {
        let data = new FormData();

        data.append("respuesta", "OK");
        data.append("nromsj", id_msj);

        let url = URL_NOTIFICACIONES_MSU + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {

                console.log(resp);

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error en el MSQ",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }



    respuestaACK(msj) {
        let data = new FormData();

        //data.append("respuesta", "OK" );
        data.append("nromsj", msj.id_msj);
        data.append("tipo", msj.ms);

        let url = URL_NOTIFICACIONES_ACK + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {

                console.log(resp);

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error en el ACK",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }

    respuestaMSN(msj: datos_push) {
        if (this.datos_push.contenido.length > 0) {
            this.n_notif = this.toast.create({
                message: this.datos_push.contenido,
                position: "buttom",
                cssClass: "mensaje-toast",
                //duration: 3000,
                //showCloseButton : true,
                //closeButtonText : "OK",

            });
            this.n_notif.present();
        } else
            this.n_notif.dismiss();
    }




    respuestaMSQ(acepta_rechaza, id_msj) {

        let data = new FormData();

        data.append("respuesta", acepta_rechaza);
        data.append("nromsj", id_msj);

        let url = URL_NOTIFICACIONES_MSQ + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {

                console.log(resp);

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error en el MSQ",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );



    }



    respuestaMSJ(acepta_rechaza, id_msj) {

        let data = new FormData();

        data.append("respuesta", acepta_rechaza);
        data.append("nromsj", id_msj);


        let url = URL_NOTIFICACIONES_MSJ + '/' + this._us.id_usuario + '/' + this._us.clave;

        return this.http.post(url, data)
            .subscribe(resp => {

                console.log(resp);

            },
                (err: HttpErrorResponse) => {

                    this.alertCtrl.create({
                        title: "Error en el MSJ",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }







    send_push_id(push_token: string) {

        let data = new FormData();

        data.append("token", push_token);
        //data.append("ids_notificacion", this.ids );
        //data.append("usuario", this._us.id_usuario );
        //data.append("clave", this._us.clave );

        console.log(push_token);

        let url = URL_NOTIFICACIONES + '/' + this._us.id_usuario + '/' + this._us.clave;



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
                        title: "Error en las notificaciones",
                        subTitle: err.error.msg,
                        buttons: ["OK"]
                    }).present();

                } //,() => { console.log("error") }

            );

    }

    modal_respuesta_MSJ(msj_notificacion) {

        this.j_notif = this.modalCtrl.create(MensajePage, { msj_notificacion: msj_notificacion });

        this.j_notif.present();

        this.j_notif.onDidDismiss((abrirHome: boolean) => {

            let neg_cancelo = this.navParams.get('data');
            console.log("neg_cancelo", neg_cancelo);

            let data = new FormData();

            data.append("evento", neg_cancelo.numero);
            data.append("nromsj", msj_notificacion.id_msj);
            data.append("tipo", msj_notificacion.ms);

            let url = URL_NOTIFICACIONES_EVT + '/' + this._us.id_usuario + '/' + this._us.clave;

            return this.http.post(url, data)
                .subscribe(resp => {

                    console.log(resp);

                },
                    (err: HttpErrorResponse) => {

                        this.alertCtrl.create({
                            title: "Error en el MSJ",
                            subTitle: err.error.msg,
                            buttons: ["OK"]
                        }).present();

                    } //,() => { console.log("error") }

                );

            /*
            if(abrirHome){
                this.modalCtrl.create( HomePage );
            }
            */

        });

    }


    // basededatos interface
    ionViewDidLoad() {
        //this.getAllMensajes();
    }

    borrar_mensaje(id) {

        this.SQL.deleteMensaje(id)
            .then(response => {
                console.log(response);

                //let index = this.MSU.findIndex(d => d.id_msj === mensaje.id_msj); //find index in your array
                (this.MSU[id].leido == 0) ? this.msjs_no_leidos-- : null;
                this.MSU.splice(id, 1);//remove element from array

            })
            .catch(error => {
                console.error(error);
            })
    }

    getAllMensajes() {
        this.SQL.getMensajes()
            .then(mensajes => {
                console.log("getAllMensajes ", mensajes);
                this.MSU = mensajes;
            })
            .catch(error => {
                console.error(error);
            });
    }


    insertarMensaje(msj: datos_push) {
        //msj.leido = 1;

        this.SQL.addMensaje(msj)
            .then(response => {

                this.MSU.unshift(response);
                this.msjs_no_leidos++;
            })
            .catch(error => {
                console.error(error);
            });

    }

    updateMensaje(mensaje: datos_push) {
        mensaje = Object.assign({}, mensaje);
        //mensaje.leido = 0;

        this.SQL.updateMensaje(mensaje)
            .then(response => {
                let index = this.MSU.findIndex(d => d.id_msj === mensaje.id_msj); //find index in your array
                this.MSU[index] = response;// .splice(index, 1);//remove element from array

            })
            .catch(error => {
                console.error(error);
            })
    }



}







// just an interface for type safety.
interface datos_push {

    titulo: string,
    contenido: string,
    ms: string,
    id_msj: number,
    boton_respuesta: string,
    fecha: string;
    leido: number;
}
