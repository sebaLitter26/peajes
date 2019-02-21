webpackJsonp([0],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushnotificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_onesignal__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_ringtones__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__usuario__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__basededatos__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_mensaje_mensaje__ = __webpack_require__(391);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// servicios / providers


// paginas del modal

var PushnotificationService = /** @class */ (function () {
    function PushnotificationService(oneSignal, platform, _us, http, alertCtrl, modalCtrl, toast, SQL, ringtones) {
        var _this = this;
        this.oneSignal = oneSignal;
        this.platform = platform;
        this._us = _us;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.toast = toast;
        this.SQL = SQL;
        this.ringtones = ringtones;
        this.MSU = [];
        this.msjs_no_leidos = 0;
        if (this.platform.is('cordova')) {
            this.getAllMensajes();
            this.ringtones.getRingtone().then(function (ringtones) {
                _this.selectedTrack = ringtones[0];
                console.log(_this.selectedTrack);
            });
        }
        this.msjs_no_leidos = this.MSU.filter(function (x) { return x.leido == 0; }).length;
    }
    PushnotificationService.prototype.init_notifications = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit('01b21eca-d2be-4caa-87e8-033bd4d612ef', '992540997536');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
            this.oneSignal.getIds().then(function (ids) {
                _this.send_push_id(ids.userId);
            });
            /*
              this.storage.get(“ids”).then((value) => {
              rt=value;
              console.log(‘Storage value: ‘+ value);
              })
              */
            this.oneSignal.handleNotificationReceived().subscribe(function (msj) {
                // do something when notification is received
                //leyenda = msj.payload.body;
                _this.datos_push = {
                    titulo: msj.payload.additionalData.titulo,
                    contenido: msj.payload.body,
                    ms: msj.payload.additionalData.tipo,
                    id_msj: msj.payload.additionalData.nromsj,
                    fecha: __WEBPACK_IMPORTED_MODULE_3_moment___default()().format(),
                    boton_respuesta: null,
                    leido: 0,
                };
                _this.analiza_notificacion();
            });
            this.oneSignal.handleNotificationOpened().subscribe(function (msj) {
                // do something when a notification is opened
                //leyenda = msj.notification.payload.body;
                _this.datos_push = {
                    titulo: msj.notification.payload.additionalData.titulo,
                    contenido: msj.notification.payload.body,
                    ms: msj.notification.payload.additionalData.tipo,
                    id_msj: msj.notification.payload.additionalData.nromsj,
                    boton_respuesta: msj.action.actionID,
                    fecha: __WEBPACK_IMPORTED_MODULE_3_moment___default()().format(),
                    leido: 0,
                };
                _this.analiza_notificacion();
            });
            this.oneSignal.endInit();
        }
        else {
            console.log('OneSignal no funciona en Chrome');
        }
    };
    PushnotificationService.prototype.cambiar_contenido_abrev = function (letra) {
        var index = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["a" /* ABREVIACIONES */].findIndex(function (d) { return d.letra === letra; }); //find index in your array
        console.log("index", index);
        return (index > -1) ? __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["a" /* ABREVIACIONES */][index].leyenda : this.datos_push.contenido;
    };
    PushnotificationService.prototype.tiempoAnterior = function (fecha_creado) {
        return __WEBPACK_IMPORTED_MODULE_3_moment___default.a.utc(fecha_creado).fromNow();
    };
    PushnotificationService.prototype.playSelectedTrack = function () {
        // use AudioProvider to control selected track
        //this._audioProvider.play(this.selectedTrack);
        //this.audio = new Audio(this.myTracks[this.selectedTrack].src);
        //this.audio.play();
        this.ringtones.playRingtone(this.selectedTrack.Url);
    };
    PushnotificationService.prototype.pauseSelectedTrack = function () {
        var _this = this;
        // use AudioProvider to control selected track
        //this._audioProvider.pause(this.selectedTrack);
        setTimeout(function () {
            _this.ringtones.stopRingtone(_this.selectedTrack.Url);
        }, 4000);
    };
    PushnotificationService.prototype.onTrackFinished = function (track) {
        console.log('Track finished', track);
    };
    PushnotificationService.prototype.analiza_notificacion = function () {
        console.log("msj analizo", this.datos_push);
        this.respuestaACK(this.datos_push);
        //console.log(msj );
        this.datos_push.contenido = this.cambiar_contenido_abrev(this.datos_push.contenido);
        this.playSelectedTrack();
        this.pauseSelectedTrack();
        this.mandar_respuesta();
    };
    PushnotificationService.prototype.mandar_respuesta = function () {
        var _this = this;
        this.descartar_notif();
        switch (this.datos_push.ms) {
            case "MSQ":
                if (this.datos_push.boton_respuesta) {
                    this.respuestaMSQ(this.datos_push.boton_respuesta, this.datos_push.id_msj);
                }
                else {
                    //En caso de no haber seleccionado una respuesta en la notificacion
                    this.q_notif = this.alertCtrl.create({
                        title: this.datos_push.titulo,
                        subTitle: this.datos_push.contenido,
                        buttons: [{
                                text: 'RECHAZAR',
                                handler: function () {
                                    _this.respuestaMSQ("NO", _this.datos_push.id_msj);
                                }
                            },
                            {
                                text: 'ACEPTAR',
                                handler: function () {
                                    _this.respuestaMSQ("SI", _this.datos_push.id_msj);
                                }
                            }]
                    });
                    this.q_notif.present();
                    setTimeout(function () { return _this.q_notif.dismiss(); }, 20000);
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
    };
    PushnotificationService.prototype.descartar_notif = function () {
        if (this.u_notif) {
            this.u_notif.dismiss().catch(function (e) { return console.log('MSU error', e); });
            this.u_notif = null;
        }
        if (this.q_notif) {
            this.q_notif.dismiss().catch(function (e) { return console.log('MSQ error', e); });
            this.q_notif = null;
        }
        if (this.n_notif) {
            this.n_notif.dismiss().catch(function (e) { return console.log('MSN error', e); });
            this.n_notif = null;
        }
        if (this.j_notif) {
            this.j_notif.dismiss().catch(function (e) { return console.log('MSJ error', e); });
            this.j_notif = null;
        }
        if (this.out_notif) {
            this.out_notif.dismiss().catch(function (e) { return console.log('MSOUT error', e); });
            this.out_notif = null;
        }
    };
    PushnotificationService.prototype.respuestaMSO = function (msj) {
        //this.nav.setRoot( TabsPage ,{ salir_de_frecuencia: true } ).catch(e => console.log('Ira a Home error', e)) ;
        this.out_notif = this.toast.create({
            message: this.datos_push.contenido,
            position: "buttom",
            //duration: 3000,
            showCloseButton: true,
            closeButtonText: "OK",
        });
        this.out_notif.present();
    };
    PushnotificationService.prototype.respuestaMSU = function (msj) {
        this.insertarMensaje(this.datos_push);
        this.u_notif = this.alertCtrl.create({
            title: this.datos_push.titulo,
            subTitle: this.datos_push.contenido,
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        //this.resp_MSU(this.datos_push.id_msj );
                        //this.MSU.pop();
                    }
                }]
        });
        this.u_notif.present();
    };
    PushnotificationService.prototype.resp_MSU = function (id_msj) {
        var _this = this;
        var data = new FormData();
        data.append("respuesta", "OK");
        data.append("nromsj", id_msj);
        var url = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["l" /* URL_NOTIFICACIONES_MSU */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
            console.log(resp);
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error en el MSQ",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    PushnotificationService.prototype.respuestaACK = function (msj) {
        var _this = this;
        var data = new FormData();
        //data.append("respuesta", "OK" );
        data.append("nromsj", msj.id_msj);
        data.append("tipo", msj.ms);
        var url = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["h" /* URL_NOTIFICACIONES_ACK */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
            console.log(resp);
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error en el ACK",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    PushnotificationService.prototype.respuestaMSN = function (msj) {
        if (this.datos_push.contenido.length > 0) {
            this.n_notif = this.toast.create({
                message: this.datos_push.contenido,
                position: "buttom",
                cssClass: "mensaje-toast",
            });
            this.n_notif.present();
        }
        else
            this.n_notif.dismiss();
    };
    PushnotificationService.prototype.respuestaMSQ = function (acepta_rechaza, id_msj) {
        var _this = this;
        var data = new FormData();
        data.append("respuesta", acepta_rechaza);
        data.append("nromsj", id_msj);
        var url = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["k" /* URL_NOTIFICACIONES_MSQ */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
            console.log(resp);
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error en el MSQ",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    PushnotificationService.prototype.respuestaMSJ = function (acepta_rechaza, id_msj) {
        var _this = this;
        var data = new FormData();
        data.append("respuesta", acepta_rechaza);
        data.append("nromsj", id_msj);
        var url = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["j" /* URL_NOTIFICACIONES_MSJ */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
            console.log(resp);
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error en el MSJ",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    PushnotificationService.prototype.send_push_id = function (push_token) {
        var _this = this;
        var data = new FormData();
        data.append("token", push_token);
        //data.append("ids_notificacion", this.ids );
        //data.append("usuario", this._us.id_usuario );
        //data.append("clave", this._us.clave );
        console.log(push_token);
        var url = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["g" /* URL_NOTIFICACIONES */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
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
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error en las notificaciones",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    PushnotificationService.prototype.modal_respuesta_MSJ = function (msj_notificacion) {
        var _this = this;
        this.j_notif = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__pages_mensaje_mensaje__["a" /* MensajePage */], { msj_notificacion: msj_notificacion });
        this.j_notif.present();
        this.j_notif.onDidDismiss(function (abrirHome) {
            var neg_cancelo = _this.navParams.get('data');
            console.log("neg_cancelo", neg_cancelo);
            var data = new FormData();
            data.append("evento", neg_cancelo.numero);
            data.append("nromsj", msj_notificacion.id_msj);
            data.append("tipo", msj_notificacion.ms);
            var url = __WEBPACK_IMPORTED_MODULE_6__config_url_servicios__["i" /* URL_NOTIFICACIONES_EVT */] + '/' + _this._us.id_usuario + '/' + _this._us.clave;
            return _this.http.post(url, data)
                .subscribe(function (resp) {
                console.log(resp);
            }, function (err) {
                _this.alertCtrl.create({
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
    };
    // basededatos interface
    PushnotificationService.prototype.ionViewDidLoad = function () {
        //this.getAllMensajes();
    };
    PushnotificationService.prototype.borrar_mensaje = function (id) {
        var _this = this;
        this.SQL.deleteMensaje(id)
            .then(function (response) {
            console.log(response);
            //let index = this.MSU.findIndex(d => d.id_msj === mensaje.id_msj); //find index in your array
            (_this.MSU[id].leido == 0) ? _this.msjs_no_leidos-- : null;
            _this.MSU.splice(id, 1); //remove element from array
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    PushnotificationService.prototype.getAllMensajes = function () {
        var _this = this;
        this.SQL.getMensajes()
            .then(function (mensajes) {
            console.log("getAllMensajes ", mensajes);
            _this.MSU = mensajes;
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    PushnotificationService.prototype.insertarMensaje = function (msj) {
        //msj.leido = 1;
        var _this = this;
        this.SQL.addMensaje(msj)
            .then(function (response) {
            _this.MSU.unshift(response);
            _this.msjs_no_leidos++;
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    PushnotificationService.prototype.updateMensaje = function (mensaje) {
        var _this = this;
        mensaje = Object.assign({}, mensaje);
        //mensaje.leido = 0;
        this.SQL.updateMensaje(mensaje)
            .then(function (response) {
            var index = _this.MSU.findIndex(function (d) { return d.id_msj === mensaje.id_msj; }); //find index in your array
            _this.MSU[index] = response; // .splice(index, 1);//remove element from array
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* Nav */])
    ], PushnotificationService.prototype, "nav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavParams */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavParams */])
    ], PushnotificationService.prototype, "navParams", void 0);
    PushnotificationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_onesignal__["a" /* OneSignal */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__usuario__["a" /* UsuarioService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_8__basededatos__["a" /* BasededatosService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_ringtones__["a" /* NativeRingtones */]])
    ], PushnotificationService);
    return PushnotificationService;
}());

//# sourceMappingURL=pushnotification.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 212:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 212;

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComandosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__usuario__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// usuario service

var ComandosService = /** @class */ (function () {
    function ComandosService(http, alertCtrl, platform, _us) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this._us = _us;
        this.id_empresa = 0;
        this.imei = 0;
        this.estado = "";
        this.licencia = " ";
    }
    ComandosService.prototype.obtener_viaje = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var data = new FormData();
        console.log("obtuvo viaje", this._us.clave);
        //data.append("usuario", this.id_usuario );
        //data.append("clave", this.clave );
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["p" /* URL_VIAJE */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
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
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error al solicitar el viaje",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    ComandosService.prototype.obtener_parada = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var data = new FormData();
        //data.append("usuario", this.id_usuario );
        //data.append("clave", this.clave );
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["m" /* URL_PARADA */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
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
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error al enviar Parada",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    ComandosService.prototype.login_pantalla = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var data = new FormData();
        data.append("licencia", this.licencia);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["c" /* URL_CONECTARPANTALLA */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
            _this.licencia = resp.result.licencia;
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
        }, function (err) {
            console.log(err);
            _this.alertCtrl.create({
                title: "Error al conectar pantalla",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    ComandosService.prototype.logout_pantalla = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        var data = new FormData();
        data.append("licencia", this.licencia);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["d" /* URL_DESCONECTARPANTALLA */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        return this.http.post(url, data)
            .subscribe(function (resp) {
            _this.licencia = " ";
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
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error al desconectar Pantalla",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        } //,() => { console.log("error") }
        );
    };
    ComandosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__usuario__["a" /* UsuarioService */]])
    ], ComandosService);
    return ComandosService;
}());

//# sourceMappingURL=comandos.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasededatosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BasededatosService = /** @class */ (function () {
    function BasededatosService(http, platform, sqlite) {
        var _this = this;
        this.http = http;
        this.platform = platform;
        this.sqlite = sqlite;
        this.dbReady = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        if (this.platform.is('cordova')) {
            platform.ready().then(function () {
                _this.createDatabase();
            });
        }
    }
    BasededatosService.prototype.createTables = function () {
        return this.database.executeSql("CREATE TABLE IF NOT EXISTS mensajes (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titulo TEXT,contenido TEXT,\n        ms TEXT, id_msj INTEGER ,\n        boton_respuesta TEXT ,\n        fecha DATE ,\n        leido INTEGER);", {})
            .catch(function (err) { return console.log("error detected creating tables", err); });
    };
    BasededatosService.prototype.setDatabase = function (db) {
        if (this.database === null) {
            this.database = db;
        }
    };
    BasededatosService.prototype.isReady = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //if dbReady is true, resolve
            if (_this.dbReady.getValue()) {
                resolve();
            }
            //otherwise, wait to resolve until dbReady returns true
            else {
                _this.dbReady.subscribe(function (ready) {
                    if (ready) {
                        console.log("ready database");
                        resolve();
                    }
                });
            }
        });
    };
    BasededatosService.prototype.createDatabase = function () {
        var _this = this;
        this.sqlite.create({
            name: 'mensajes.db',
            location: 'default'
        })
            .then(function (db) {
            _this.database = db;
            _this.createTables().then(function () {
                //communicate we are ready!
                _this.dbReady.next(true);
            });
        });
    };
    BasededatosService.prototype.getMensajes = function () {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * from mensajes", [])
                .then(function (data) {
                var mensajes = [];
                for (var i = 0; i < data.rows.length; i++) {
                    mensajes.push(data.rows.item(i));
                }
                return mensajes;
            });
        }).catch(function (error) { return Promise.reject(error); });
    };
    BasededatosService.prototype.addMensaje = function (msj) {
        var _this = this;
        return this.isReady()
            .then(function () {
            var id_msj = msj.id_msj.toString();
            return _this.database.executeSql("INSERT INTO mensajes(titulo,contenido , ms, id_msj, boton_respuesta , fecha, leido) VALUES ('" + msj.titulo + "','" + msj.contenido + "','" + msj.ms + "','" + id_msj + "','" + msj.boton_respuesta + "','" + msj.fecha + "','" + msj.leido + "');", {}).then(function (result) {
                if (result.insertId) {
                    console.log(" add ", result);
                    return _this.getMensaje(result.insertId);
                }
            });
        });
    };
    BasededatosService.prototype.updateMensaje = function (msj) {
        var _this = this;
        return this.isReady()
            .then(function () {
            var sql = 'UPDATE mensajes SET titulo=?,contenido=? , ms=?, id_msj=?, boton_respuesta=? , fecha=?, leido=? WHERE id_msj=?';
            var id_msj = msj.id_msj.toString();
            console.log("update, ", id_msj);
            return _this.database.executeSql(sql, [msj.titulo, msj.contenido, msj.ms, id_msj, msj.boton_respuesta, msj.fecha, msj.leido, id_msj]).then(function (result) {
                if (result.insertId) {
                    console.log(" update ", result);
                    return _this.getMensaje(result.insertId);
                }
            });
        });
    };
    BasededatosService.prototype.getMensaje = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * FROM mensajes WHERE id = " + id, [])
                .then(function (data) {
                if (data.rows.length) {
                    return data.rows.item(0);
                }
                return null;
            });
        });
    };
    BasededatosService.prototype.deleteMensaje = function (id) {
        var _this = this;
        return this.isReady()
            .then(function () {
            console.log(" borrar id ", id);
            return _this.database.executeSql("DELETE FROM mensajes WHERE id = " + id, []);
        });
    };
    BasededatosService.prototype.getTodosFromMensaje = function (listId) {
        var _this = this;
        return this.isReady()
            .then(function () {
            return _this.database.executeSql("SELECT * from mensajes WHERE leido = " + listId, [])
                .then(function (data) {
                var todos = [];
                for (var i = 0; i < data.rows.length; i++) {
                    var todo = data.rows.item(i);
                    //cast binary numbers back to booleans
                    todo.isImportant = !!todo.isImportant;
                    todo.isDone = !!todo.isDone;
                    todos.push(todo);
                }
                return todos;
            });
        });
    };
    BasededatosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], BasededatosService);
    return BasededatosService;
}());

//# sourceMappingURL=basededatos.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MensajePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MensajePage = /** @class */ (function () {
    function MensajePage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.msj = "";
        this.msj = this.navParams.get("msj_notificacion");
        //this.msj.contenido.innerHTML = this.msj.contenido;
        //console.log( this.msj);
    }
    MensajePage.prototype.manda_evento = function (numero) {
        var data = {
            titulo: "Modal MSJ cerrado",
            numero: numero
        };
        this.viewCtrl.dismiss(data);
    };
    MensajePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-mensaje',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/mensaje/mensaje.html"*/'<ion-header>\n\n  <ion-navbar color="morado">\n    <ion-title>Mensaje Recibido</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1>{{ msj.titulo }}</h1>\n\n  <p>\n      {{ msj.contenido }}\n  </p>\n\n  <button ion-button\n          block\n          color="primary"\n          (click)="manda_evento(2)">\n    Cancelar\n  </button>\n\n  <button ion-button\n          block\n          color="danger"\n          (click)="manda_evento(4)">\n    Negativo\n  </button>\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/mensaje/mensaje.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], MensajePage);
    return MensajePage;
}());

//# sourceMappingURL=mensaje.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BluetoothService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_bluetooth_serial__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabase , AngularFireObject } from 'angularfire2/database';
//import { UsuarioService } from "./usuario";
var BluetoothService = /** @class */ (function () {
    //usuario: AngularFireObject<any[]>;
    //private watch:any;
    function BluetoothService(bluetoothSerial, alertCtrl) {
        var _this = this;
        this.bluetoothSerial = bluetoothSerial;
        this.alertCtrl = alertCtrl;
        this.dato_recivido = "";
        bluetoothSerial.enable();
        bluetoothSerial.isEnabled().then(function (data) {
            console.log(data);
            _this.startScanning();
        }, function () {
            console.log("bluetooth is not enabled trying to enable it");
            _this.bluetoothSerial.enable().then(function () {
                console.log("bluetooth got enabled hurray");
            }, function () {
                console.log("user did not enabled");
            });
        });
    }
    // 00:21:13:01:69:D6
    BluetoothService.prototype.startScanning = function () {
        var _this = this;
        this.pairedDevices = null;
        this.unpairedDevices = null;
        this.gettingDevices = true;
        this.bluetoothSerial.discoverUnpaired().then(function (success) {
            _this.unpairedDevices = success;
            _this.gettingDevices = false;
            success.forEach(function (element) {
                // alert(element.name);
            });
        }, function (err) {
            console.log(err);
        });
        this.bluetoothSerial.list().then(function (success) {
            _this.pairedDevices = success;
        }, function (err) {
        });
    };
    //success = (data) => alert(data);
    //fail = (error) => alert(error);
    BluetoothService.prototype.selectDevice = function (address) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Connect',
            message: 'Do you want to connect with?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Connect',
                    handler: function () {
                        _this.bluetoothSerial.connect(address).subscribe(function (success) {
                            _this.pairedDevices = success;
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    BluetoothService.prototype.disconnect = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Disconnect?',
            message: 'Do you want to Disconnect?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Disconnect',
                    handler: function () {
                        _this.bluetoothSerial.disconnect();
                    }
                }
            ]
        });
        alert.present();
    };
    BluetoothService.prototype.mandarComando = function (comando) {
        if (comando == "")
            return;
        this.bluetoothSerial.write(comando).then(function (success) {
            console.log(success);
        }, function (err) {
            console.log(err);
        });
    };
    BluetoothService.prototype.obtener_datos = function () {
        var _this = this;
        // the success callback is called whenever data is received
        this.bluetoothSerial.read().then(function (data) {
            console.log(data);
            _this.dato_recivido = data;
        }, function (err) {
            console.log(err);
        });
    };
    BluetoothService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], BluetoothService);
    return BluetoothService;
}());

//# sourceMappingURL=bluetooth.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__terminos_terminos__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_index_services__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { HomePage } from "../home/home";


// servicios / providers

//import { UsuarioService } from "../../providers/usuario";
var LoginPage = /** @class */ (function () {
    function LoginPage(_pushProvider, navCtrl, _us, modalCtrl) {
        this._pushProvider = _pushProvider;
        this.navCtrl = navCtrl;
        this._us = _us;
        this.modalCtrl = modalCtrl;
        this.nombre = "";
        this.apellido = "";
        this.acepta_terminos = false;
        //clave:string = "";
        this.muestra_activacion = false;
        this.licencias = [
            {
                numero: "1573608122",
                modelo: "BMW X3 Azul"
            },
        ];
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
    LoginPage.prototype.ionViewWillEnter = function () {
        (this.tabBarElement) ? this.tabBarElement.style.display = 'none' : "";
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        (this.tabBarElement) ? this.tabBarElement.style.display = 'flex' : "";
    };
    LoginPage.prototype.ingresar = function () {
        var _this = this;
        this._us.ingresar(this.nombre, this.apellido, this.celular, function (activo) {
            switch (activo) {
                case '1': //usuario ya registrado anteriormente
                    _this._us.reactivar(function (data) {
                        _this.pasar_slide();
                    });
                    break;
                case "0":
                    _this.muestra_activacion = true;
                    break;
                case "activar":
                    _this.muestra_activacion = true;
                    break;
                default:
            }
        });
        //this.viewCtrl.dismiss(true);
    };
    LoginPage.prototype.focusNext = function (e) {
        var pageElements = document.querySelectorAll('input');
        var len = pageElements.length;
        var focusNext = false;
        for (var i = 0; i < len; i++) {
            var elem = pageElements[i];
            if (focusNext) {
                if (elem.style.display !== 'none') {
                    elem.focus();
                    break;
                }
            }
            else if (pageElements[i] === e.target) {
                focusNext = true;
            }
        }
    };
    LoginPage.prototype.ingresar_codigo = function () {
        var _this = this;
        this._us.ingresar_codigo_activar(this.codigo, function (data) {
            //this.viewCtrl.dismiss(true);
            // tenemos la clave, ir al home
            //this.navCtrl.setRoot( HomePage );
            console.log(data);
            // continuar a la siguiente pantalla
            _this.pasar_slide();
        });
    };
    LoginPage.prototype.pasar_slide = function () {
        /*
        let loading = this.loadingCtrl.create({
          content: "Espere por favor..."
        });
    
        loading.present();
    
    
        // Verificar si la clave es valida
    
              loading.dismiss();
              */
        //this._us.activo().then((resp)=>{
        if (this._us.activo()) {
            if (this.licencias.length == 1) {
                this.ir_a_home(this.licencias[0]);
            }
            else {
                // continuar a la siguiente pantalla de seleccion de licencias
                this.slides.lockSwipes(false);
                this.slides.slideNext();
                this.slides.lockSwipes(true);
            }
        }
    };
    LoginPage.prototype.ir_a_home = function (licencia) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */], {
            licencia: licencia.numero,
        }).catch(function (e) { return console.log('TabsPage error', e); });
        this._pushProvider.init_notifications();
        /*this.navCtrl.push( TabsPage, {
            licencia: licencia.numero,
            //thing2: 'data2'
        });*/
    };
    LoginPage.prototype.modal_terminosYcondiciones = function () {
        var modal;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__terminos_terminos__["a" /* TerminosPage */]);
        modal.present();
        modal.onDidDismiss(function (abrirHome) {
            /*
            if(abrirHome){
                this.modalCtrl.create( TabsPage );
            }
            */
        });
    };
    LoginPage.prototype.ngAfterViewInit = function () {
        //ionViewDidLoad(){
        var _this = this;
        this.slides.lockSwipes(true);
        //this.slides.freeMode = false;
        this.slides.paginationType = "progress";
        if (this.slides) {
            setTimeout(function () {
                _this.slides.update();
                _this.pasar_slide();
            }, 300);
            //this.viewCtrl.dismiss(true);
            //this.navCtrl.setRoot( HomePage ) .catch(e => console.log('HomePage error', e));
            /*

            */
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], LoginPage.prototype, "slides", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/login/login.html"*/'\n\n\n\n\n<ion-content padding>\n\n  <ion-slides pager>\n    <!-- Login Slide -->\n    <ion-slide>\n\n      <ion-toolbar>\n      </ion-toolbar>\n\n\n        <h2 class="slide-title">¿Listo para empezar?</h2>\n\n        <div *ngIf="!muestra_activacion">\n          <ion-list>\n\n            <ion-item>\n              <ion-label floating>Nombre</ion-label>\n              <ion-input type="text" [(ngModel)]="nombre" (keyup.enter)="focusNext($event)"  required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label floating>Apellido</ion-label>\n              <ion-input type="text" [(ngModel)]="apellido" (keyup.enter)="focusNext($event)" required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label floating>Numero de Telefono</ion-label>\n              <ion-input type="number" [(ngModel)]="celular" (keyup.enter)="focusNext($event)" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label>Acepta los\n                  <button ion-button\n\n                          (click)="modal_terminosYcondiciones()">\n                    Terminos y Condiciones\n                  </button>\n                    </ion-label>\n                <ion-checkbox [(ngModel)]="acepta_terminos" ></ion-checkbox>\n            </ion-item>\n\n          </ion-list>\n\n          <button ion-button\n                  [disabled]=" celular?.length < 10  ||  apellido.length < 2 || nombre.length < 2 || !acepta_terminos"\n                  block\n                  (click)="ingresar()">\n            Ingresar\n          </button>\n\n        </div>\n\n\n\n\n        <div *ngIf="muestra_activacion" >\n\n          <ion-list>\n\n            <ion-item>\n              <ion-label floating>Código de activación</ion-label>\n              <ion-input type="number"  [(ngModel)]="codigo" required></ion-input>\n            </ion-item>\n\n\n          </ion-list>\n\n          <button ion-button\n                  [disabled]=" (codigo?.length != 4 ) "\n                  block\n                  (click)="ingresar_codigo()">\n            Activar\n          </button>\n\n        </div>\n\n        <img src="assets/imgs/taxis.png" class="slide-image"/>\n\n      </ion-slide>\n\n\n      <!-- Seleccionar Licencia Slide -->\n      <ion-slide>\n        <ion-toolbar>\n            <h2 class="slide-title">¿Que licencia desea utilizar?</h2>\n        </ion-toolbar>\n        <ion-grid>\n\n          <ion-item *ngFor="let licencia of licencias" (click)="ir_a_home( licencia )">\n\n                      <p>\n                        {{ licencia.numero }}\n                        <br>\n                        {{ licencia.modelo }}\n                      </p>\n            </ion-item>\n\n\n        </ion-grid>\n\n      </ion-slide>\n    <!-- Fin del último slide -->\n\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_index_services__["d" /* PushnotificationService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_index_services__["f" /* UsuarioService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_paginas__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pushnotification__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// servicios / providers

var TabsPage = /** @class */ (function () {
    function TabsPage(_pushProvider) {
        this._pushProvider = _pushProvider;
        //tab1 = LoginPage;
        this.tab1 = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["e" /* HomePage */];
        //tab2 = CategoriasPage;
        //tab3 = OrdenesPage;
        //tab4 = "Busqueda";
        this.tab2 = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["g" /* MapaPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["d" /* HistorialPage */];
        this.tab4 = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["c" /* CallPage */];
        this.tab5 = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["a" /* BluetoothPage */];
        this.tab6 = __WEBPACK_IMPORTED_MODULE_1__index_paginas__["b" /* BrowserPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/tabs/tabs.html"*/'\n\n<ion-tabs>\n\n  <ion-tab tabIcon="home" tabTitle="Home" [root]="tab1"></ion-tab>\n  <!-- <ion-tab tabIcon="star" tabTitle="Categorías" [root]="tab2"></ion-tab>\n  <ion-tab tabIcon="list" tabTitle="Ordenes" [root]="tab3"></ion-tab>\n  <ion-tab tabIcon="search" tabTitle="Buscar" [root]="tab4"></ion-tab>\n-->\n  <ion-tab tabIcon="locate" tabTitle="Ubicación" [root]="tab2"></ion-tab>\n\n  <ion-tab tabIcon="mail" tabTitle="Mensajes" [root]="tab3" [tabBadge] = "_pushProvider.msjs_no_leidos>0 ?  _pushProvider.msjs_no_leidos  : null" tabBadgeStyle="danger"></ion-tab>\n\n  <ion-tab tabIcon="call" tabTitle="Llamar" [root]="tab4"></ion-tab>\n\n  <ion-tab tabIcon="bluetooth" tabTitle="Bluetooth" [root]="tab5"></ion-tab>\n\n  <ion-tab tabIcon="planet" tabTitle="Internet" [root]="tab6"></ion-tab>\n\n</ion-tabs>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_pushnotification__["a" /* PushnotificationService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TerminosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TerminosPage = /** @class */ (function () {
    function TerminosPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    TerminosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TerminosPage');
    };
    TerminosPage.prototype.dismiss = function () {
        var data = { 'foo': 'bar' };
        console.log(data);
        this.viewCtrl.dismiss(data);
    };
    TerminosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-terminos',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/terminos/terminos.html"*/'\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n      <button ion-button\n\n              (click)="this.dismiss()">\n        Registrarse\n      </button>\n    </ion-buttons>\n\n      <ion-title>Terminos Y Condiciones</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n\n     <ion-card-header text-wrap>\n\n\n\n\n      <h1 ion-text color="primary">Términos de Servicio</h1>\n      <h2 ion-text color="secondary" >PLATAFORMA (APP) SU TAXI</h2>\n      <br>\n      <h2 ion-text color="primary">TÉRMINOS Y CONDICIONES DE USO</h2>\n\n      <p>A continuación se detallan los términos y condiciones de uso de la APLICACION para dispositivos móviles SU TAXI, incluida y detallada en el presente portal web http://www.sutaxi.com/ar/ (en adelante la “APLICACION”), que en conjunto se denominan la “Plataforma”, los que son de propiedad de SU TAXI S.A.(en adelante “SU TAXI”).</p>\n\n      <p>Toda persona que ingrese, utilice o se registre en la Plataforma se considera Usuario de la misma. Para ello, [ cada vez que] [cuando] el Usuario haga uso de la Plataforma [debe haber leído y aceptado los presentes términos y condiciones] [se entenderá ha leído y aceptado los presentes términos y condiciones, los que acepta y suscribe al ingresar y hacer uso de la Plataforma por primera vez]. Los presentes términos y condiciones y sus modificaciones y adaptaciones realizadas por SU TAXI de tiempo en tiempo (en adelante los “Términos y Condiciones”),. serán aplicables cada vez que se utilice la Plataforma y se considerarán y entenderán aceptados por quien utilice la Plataforma..</p>\n\n      <p>La aceptación de los presentes Términos y Condiciones por el conductor de taxis y/o vehículos de alquiler debidamente matriculado y registrado conforme la legislación aplicable (en adelante el “TAXISTA”) faculta y otorga mandato irrevocable a SU TAXI para que ésta, en nombre y representación del TAXISTA, cobre y perciba directamente de los Pasajeros las cantidades que éstos paguen como tarifa por los servicios de transporte prestados por el TAXISTA, que resultaren pagados mediante tarjeta de crédito o débito debidamente registrada en la Web SU TAXI y/o en la APLICACION SU TAXI; y para que SU TAXI cobre y perciba directamente de las Empresas las cantidades que éstas paguen como tarifa por los servicios de transportes prestados por el TAXISTA en virtud del respectivo convenio suscrito con SU TAXI, según sea el caso.</p>\n\n      <p>SU TAXI, debidamente representada, acepta el mandato que se le confiere por el presente en los términos señalados.</p>\n\n      <p>La relación entre el TAXISTA y SU TAXI (ambos, en conjunto, las “Partes”) se encuentra limitada exclusivamente a lo establecido en los presentes Términos y Condiciones teniendo en consideración:</p>\n\n      <H3 ion-text color="danger">I.</H3> <p>Que el TAXISTA es titular de una Licencia de Taxi o de la Licencia de Conductor Profesional, actualmente vigente, y cumple con todas las exigencias legales y reglamentarias necesarias para operar/conducir un taxi.</p>\n\n      <H3 ion-text color="danger">II.</H3> <p>Que el TAXISTA es propietario o tenedor con títulos suficiente de un vehículo (“Vehículo”), el que cumple íntegramente con las condiciones técnicas necesarias y apropiadas para efectuar de manera segura y continua el servicio de transporte en taxi, con los mecanismos necesarios para registrar en el tiempo, velocidad y distancias recorridas, así como con toda otra exigencia establecida en la normativa legal y reglamentaria vigente, incluidas pero no limitadas a: la correspondiente Licencia de Taxi, Cédula Verde, Verificación Técnica Vehicular (VTV), Certificado Técnico de Reloj Taxímetro y seguros exigidos para el transporte de pasajeros al día.</p>\n\n      <H3 ion-text color="danger">III.</H3><p> SU TAXI declara ser una empresa dedicada principalmente a prestar servicios de creación, desarrollo, producción, comercialización y prestación de servicios de internet, servicios electrónicos y digitales, aplicaciones móviles, programas informáticos y software para cualquier tipo de dispositivo contactando a los usuarios que se registran como pasajeros (en adelante los “Pasajeros”) en su página web y/o en su APLICACION  y a las empresas que suscriben un convenio corporativo con SU TAXI (“Empresas”), con el taxi más próximo a su ubicación que se encuentre debidamente registrado en su página web y/o en su APLICACION, con el propósito de optimizar el requerimiento de servicios de taxis por parte de los Pasajeros y Empresas.</p>\n\n      <p>Para tales efectos, SU TAXI presta servicios de Intermediación a través de la promoción y difusión de los servicios de transporte que prestan los taxistas debidamente registrados en su página web y/o en su APLICACION para la contratación de sus servicios con el público en general y Empresas.</p>\n\n      <H3 ion-text color="danger">IV.</H3> <p>El TAXISTA tiene la intención de recibir de SU TAXI los servicios Intermediación a través de la promoción y difusión de los servicios de transporte del TAXISTA con el público en general y con Empresas a través de los servicios descritos anteriormente, contactando a los Pasajeros y Empresas y actuando como agente de cobranza de la tarifa por los servicios de transporte por cuenta del Taxista, cuando corresponda de conformidad con lo establecido en el presente instrumento.</p>\n      <br>\n      <H4 ion-text color="danger">1. OBJETO</H4>\n\n      <p>Mediante su aceptación de los presentes Términos y Condiciones el TAXISTA contrata los servicios de Intermediación de SU TAXI a través de su APLICACION y/o página Web, quien se obliga a prestarlos a través de la promoción y difusión de los servicios de transporte del TAXISTA al público en general y a Empresas, contactando a los Pasajeros y Empresas y actuando como agente de cobranza de la tarifa por los servicios de transporte por cuenta del Taxista, cuando proceda, en los términos y bajo las condiciones aquí estipuladas, otorgando mandato comercial a tales fines en un todo de acuerdo con la legislación vigente en la República Argentina (“Servicios de Intermediación”).</p>\n      <br>\n      <H4 ion-text color="danger">2. ROL DE INTERMEDIADOR.</H4>\n\n      <p>De manera general, el papel desarrollado por SU TAXI en virtud de los términos y condiciones aquí estipulados consiste en poner en disposición del TAXISTA y de los pasajeros usuarios de la APLICACION, en condición de intermediario, un espacio virtual con el fin que celebren entre ellos un contrato de transporte de personas, sin estar vinculado con el TAXISTA o con los pasajeros usuarios, por relaciones de colaboración dependencia, mandato o representación. SU TAXI mediante la APLICACION no presta servicios de transporte, tampoco es un operador de transporte ni posee una flota de vehículos; simplemente permite el uso a los pasajeros usuarios de la APLICACION. Por lo que se declara expresamente que no existe entre SU TAXI y/o sus representantes legales o accionistas, relación ni vínculo laboral alguno, relación de mandato ni representación con los taxistas ni con los pasajeros usuarios.</p>\n\n      <p>Específicamente para los modelos de negocios denominados “CORPORATIVO“ y “PAGOS” que se explicarán en las siguientes cláusulas, SU TAXI podrá actuar simultáneamente como mandatario del TAXISTA únicamente en lo que corresponde a la recepción o cobro de los pagos que se cause a favor del TAXISTA por los servicios prestados.  En ningún caso en virtud de este contrato SU TAXI contratará en nombre propio los servicios del TAXISTA.</p>\n      <br>\n      <H4 ion-text color="danger">3. PROCEDIMIENTO</H4>\n\n      <p>El procedimiento mediante el cual se pondrá en relación a los pasajeros con el TAXISTA dependerá de alguno de los siguientes modelos de negocio escogido por el pasajero para solicitar el servicio de taxi.</p>\n      <br>\n      <H4 ion-text color="danger">4. ACTIVACIÓN</H4>\n\n      <p>Luego de que SU TAXI verifique los datos, documentos así como la declaración de la veracidad de la información entregados por el Taxista, documentos y datos que son de responsabilidad exclusiva del taxista, se procederá a activar la APLICACION para uso exclusivo del taxista.</p>\n\n      <p>Adicionalmente, para que el TAXISTA tenga acceso a la APLICACION y poder aceptar las solicitudes que se generen por parte de los usuarios, tener acceso a la APLICACION y/o Plataforma propiedad de SU TAXI y prestar directamente los servicios de transporte tipo TAXI que el TAXISTA ofrece, este deberá contar con un saldo a su favor de conformidad al proceso de recarga establecido en el presente.</p>\n      <br>\n      <H4 ion-text color="danger">5. RECARGAS</H4>\n\n      <p>Sin perjuicio de que la APLICACION se encuentre activada, el TAXISTA para acceder y aceptar las solicitudes enviadas a través de la APLICACION por los usuarios, deberá contar con un saldo a su favor, el cual lo podrá adquirir a través de las recargas en los establecimientos que constan autorizados y se detallan dentro de la APLICACION. SU TAXI no se responsabiliza del funcionamiento de los puntos autorizados toda vez que estos no forman parte de la compañía y son de responsabilidad de terceros.</p>\n      <br>\n      <H4 ion-text color="danger">6. MODELOS DE NEGOCIO Y TARIFAS</H4>\n\n      <p>SU TAXI se reserva el derecho a modificar, ampliar, reducir y/o establecer una nueva modalidad de pago en cualquier momento según estime conveniente para el correcto funcionamiento del servicio. Los cambios generados en virtud de lo anterior serán debidamente informados al TAXISTA(por medio de correo electrónico, aceptación de términos y condiciones y/o cualquier otro medio idóneo).</p>\n\n      <p>MODELO GENERAL: SU TAXI permitirá a los pasajeros usuarios registrarse en su Plataforma y solicitar desde su dispositivo móvil, servicios de transporte de personas.  La Plataforma transmitirá la ubicación de los usuarios al dispositivo móvil del TAXISTA y le dará la opción de aceptar la solicitud formulada por los usuarios para prestar sus servicios acudiendo a la ubicación señalada.  El pago de los servicios de acuerdo con este modelo de negocio será efectuado directamente al TAXISTA por parte de los pasajeros y el pago de la comisión de SU TAXI se descontará de la recarga según el plan seleccionado.</p>\n\n      <p>En los pagos efectuados a través de dinero en efectivo por los Pasajeros como tarifa por los servicios de transporte prestados por el TAXISTA como consecuencia de la prestación los Servicios de Intermediación por parte de SU TAXI, a fin de abonar la comisión de SU TAXI, el TAXISTA deberá adquirir crédito mediante depósitos en efectivo en un sistema de cobro habilitado (Pagofacil o cualquier otra empresa habilitada). Contra el deposito correspondiente, el TAXISTA obtendrá un código PIN a incorporar en la APLICACION o en la Web de SU TAXI. Al incorporar el código PIN correspondiente se le acreditará un crédito equivalente al monto depositado (el “Crédito”), que le permitirá utilizar la APLICACION y/o Web SU TAXI y concretar los viajes correspondientes.</p>\n\n      <p>Por cada servicio de transporte prestado por el Taxista, SU TAXI descontará automáticamente del Crédito del TAXISTA su comisión. En los pagos efectuados bajo esta modalidad SU TAXI no intervendrá como mandatario ni agente de cobro de los Taxistas.</p>\n\n      <p>Las tarifas están sujetas a variaciones dependiendo de la política corporativa de SU TAXI, por lo cual el TAXISTA declara y reconoce que las tarifas aplicables serán aquellas publicadas en el sitio web de la compañía.</p>\n\n      <p>CORPORATIVO: La Plataforma permitirá a compañías interesadas, contratar servicios de taxi corporativo para sus empleados y funcionarios, y pagar dichos servicios por medio de la Plataforma de SU TAXI.  En este modelo de negocio, SU TAXI asignará una cuenta, con o sin cupo de crédito, a cada compañía para permitir que empleados y funcionarios determinados puedan solicitar servicios de taxi desde sus dispositivos móviles a través de la APLICACION y pagar dichos servicios con cargo a la cuenta de la compañía. Al momento de finalizar el viaje o servicio el TAXISTA ingresará en la APLICACION el monto a pagar por el servicio y la APLICACION generará al pasajero un recibo digital que podrá confirmar para que el pago se cargue a la cuenta de la compañía.  En este modelo de negocio SU TAXI, en condición de mandatario del TAXISTA, se encargará de recibir de las compañías contratantes los pagos de los servicios contratados por dichas compañías, sus empleados y funcionarios a través de la APLICACION y realizara los pagos que correspondan al TAXISTA en la cuenta indicada en el pie de la presente. En contraprestación de los servicios de intermediación el TAXISTA pagará a SU TAXI una comisión establecida por la compañía. La referida comisión está sujeta a variaciones dependiendo de la política corporativa de SU TAXI, por lo cual el TAXISTA declara y reconoce que las comisiones aplicables serán aquellas publicadas en el sitio web de la compañía.</p>\n\n      <p>PAGOS: Es un servicio prestado al usuario pasajero para permitir el pago de los servicios de taxi con tarjetas de debido o crédito, por medio de un tercero proveedor de servicios de pagos online vinculado con la APLICACION. En este modelo de negocio SU TAXI podrá actuar como mandatario del TAXISTA para encargar al proveedor del servicio de pagos la recepción de los pagos de los pasajeros. En contraprestación de los servicios de intermediación el TAXISTA pagará a SU TAXI una comisión establecida por la empresa sobre la tarifa cobrada por el TAXISTA al pasajero incluido el Impuesto al Valor Agregado (IVA). La referida comisión está sujeta a variaciones dependiendo de la política corporativa de SU TAXI, por lo cual el TAXISTA declara y reconoce que las comisiones aplicables serán aquellas publicadas en el sitio web de la compañía.</p>\n      <br>\n      <H4 ion-text color="danger">7. MANDATO</H4>\n\n      <p>El TAXISTA faculta y otorga mandato  irrevocable a SU TAXI para que ésta, en nombre y representación del Taxista, cobre y perciba directamente de los Pasajeros las cantidades que éstos paguen como tarifa por los servicios de transportes prestados por el TAXISTA a través de tarjeta de crédito o débito debidamente registrada en la Web SU TAXI y/o en la APLICACION SU TAXI y cobre y perciba directamente de las Empresas las cantidades que éstas paguen como tarifa por los servicios de transportes prestados por el TAXISTA en virtud del respectivo convenio suscrito con SU TAXI, según sea el caso.</p>\n\n      <p>El TAXISTA autoriza expresa e irrevocablemente a SU TAXI para descontar automáticamente de las sumas que perciba en razón del encargo encomendado la contraprestación a que SU TAXI tiene derecho de conformidad con la presente cláusula, así como para imputar a las referidas sumas toda y cualquier cantidad que el TAXISTA pudiere adeudar a SU TAXI en virtud del presente.</p>\n\n      <p>El TAXISTA libera a SU TAXI de la obligación de rendir cuenta de su gestión, ya que las sumas percibidas por SU TAXI corresponderán a la contraprestación a que ésta tiene derecho de conformidad con la aceptación de los términos y condiciones aquí establecidos y que serán de su propiedad.</p>\n\n      <p>SU TAXI, debidamente representada, acepta el mandato que se le confiere por el presente en los términos señalados.\n      <br>\n      <H4 ion-text color="danger">8. PROCEDIMIENTO DE PAGO</H4>\n\n      <p>Para los casos de CORPORATIVO Y PAGOS, el TAXISTA emitirá a SU TAXI una factura por el total de servicios de transporte quincenalmente. En ambos casos si el TAXISTA incumpliera y su factura fuera entregada fuera del plazo establecido en la presente para cada quincena, dicha factura será procesada y pagada en el período siguiente.</p>\n      <br>\n      <H4 ion-text color="danger">9. FACULTADES DE SU TAXI</H4>\n\n      <p>En virtud de la aceptación de los presentes términos y condiciones SU TAXI se encuentra facultado para (I) Ofrecer por cualquier medio los servicios del TAXISTA; (II) Compartir con terceros y por cualquier canal de comunicación información del TAXISTA, y sobre el uso de su cuenta y su comportamiento en la prestación de sus servicios; (III) Suspender la ejecución de los servicios aquí establecidos en cualquier momento, sin justificación o aviso previo y sin lugar al pago de indemnización alguna; (iv) Ejecutar todas las demás actividades convenientes o necesarias para la ejecución de los términos y condiciones aquí establecidos.\n      <br>\n      <H4 ion-text color="danger">10. OBLIGACIONES DE SU TAXI</H4>\n\n      <p>En virtud de los presentes términos y condiciones SU TAXI estará especialmente obligado a facilitar al TAXISTA su registro en la APLICACION y el uso de la misma mientras la cuenta del TAXISTA permanezca activa, sin perjuicio que SU TAXI pueda cancelar o suspender la cuenta en cualquier momento sin necesidad de justificación alguna y mantener en su página web las tarifas y comisiones actualizadas.</p>\n      <br>\n      <H4 ion-text color="danger">11. OBLIGACIONES DEL TAXISTA.</H4>\n\n      <H4 ion-text color="secondary">a.</H4> <p>Prestar personal y directamente a los usuarios un servicio de transporte comercial tipo TAXI de calidad y en cumplimiento a la legislación vigente al momento de la prestación de sus servicios, utilizando especialmente el taxímetro en todos los servicios que preste.</p>\n\n      <H4 ion-text color="secondary">b.</H4> <p> Mantener en todo momento el Vehículo en condiciones óptimas de seguridad e higiene para la prestación del servicio de transporte.</p>\n\n      <H4 ion-text color="secondary">c.</H4> <p> Mantener vigentes todos los permisos, seguros y cualquier otra exigencia que resulte necesaria para la prestación de los servicios de transporte de conformidad con la normativa legal y reglamentaria vigente.</p>\n\n      <H4 ion-text color="secondary">d.</H4> <p> Notificar a SU TAXI inmediatamente en caso de cualquier cambio que se realizare en relación a la persona o el vehículo.</p>\n\n      <H4 ion-text color="secondary">e.</H4> <p> Cubrir el combustible, reparaciones, mantenimiento, pólizas de seguros y demás gastos inherentes tanto al Vehículo como a la prestación de los servicios de transporte.</p>\n\n      <H4 ion-text color="secondary">f.</H4> <p> El TAXISTA procurará utilizar y exhibir en el Vehículo, de manera permanente y continua, los anuncios y el logotipo de SU TAXI que SU TAXI le entregue al efecto, publicidad que deberá ubicarse en el o los lugares del Vehículo que SU TAXI indique al TAXISTA en cada oportunidad. En cumplimiento de esta obligación, el TAXISTA deberá  obtener y/o mantener vigentes en todo momento los permisos del Vehículo que puedan resultar necesarios para contratar y colocar anuncios publicitarios, así como observar íntegramente la normativa legal y reglamentaria que regula la materia.</p>\n\n      <H4 ion-text color="secondary">g.</H4> <p> Ejecutar de buena fe la relación jurídica y comercial derivada de aceptación de los términos y condiciones, dando cumplimiento a todas y cada una de las obligaciones.</p>\n\n      <H4 ion-text color="secondary">h.</H4> <p> El TAXISTA será único y exclusivo responsable de toda y cualquier infracción a la normativa vigente en que incurra con ocasión de la prestación de los servicios de transporte, siendo de su exclusivo cargo el pago de eventuales multas, sanciones e indemnizaciones que pudieren derivarse de dichas infracciones.</p>\n\n      <H4 ion-text color="secondary">i.</H4> <p> El TAXISTA está obligado a respetar el código de conducta y los términos de servicio del SU TAXI, documentos que podrán ser  revisados en el sitio web de la compañía, los cuales podrán ser modificados de tiempo en tiempo.</p>\n\n      <H4 ion-text color="secondary">j.</H4> <p> El TAXISTA no podrá contar y/o utilizar un sistema de software, APLICACION, página Web y/o Plataforma similar o idéntico propiedad de una compañía diferente, que cumpla con el mismo o similar objeto que el previsto en estos términos y condiciones, siendo la relación que se mantiene con SU TAXI de carácter exclusivo y excluyente.</p>\n\n      <H4 ion-text color="secondary">k.</H4> <p> Poner en la APLICACION que el pasajero se encuentra a bordo cuando realmente lo esté.</p>\n\n      <H4 ion-text color="secondary">l.</H4> <p> No cancelar viajes que superen el 20% del total de los viajes tomados semanalmente.</p>\n\n      <H4 ion-text color="secondary">m.</H4> <p> Mantener en secreto la información confidencial y particularmente los datos personales a los que tenga acceso con ocasión de los presentes términos y condiciones.</p>\n\n      <H4 ion-text color="secondary">n.</H4> <p> Cumplir con todas las obligaciones legales que le sean aplicables como conductor y como proveedor del servicio de transporte público de personas.</p>\n\n      <H4 ion-text color="secondary">o.</H4> <p> Cumplir los requisitos que SU TAXI le solicite para mantener activa su cuenta en la APLICACION.</p>\n\n      <H4 ion-text color="secondary">p.</H4> <p> Revisar de manera constante la página web de SU TAXI a efectos de poder enterarse de cualquier actualización de políticas aplicables a los términos y condiciones.</p>\n\n      <H4 ion-text color="secondary">q.</H4> <p> El TAXISTA será único y exclusivo responsable de toda y cualquier infracción a la normativa vigente en que incurra con ocasión de la prestación de los servicios de transporte, siendo de su exclusivo cargo el pago de eventuales multas, sanciones e indemnizaciones que pudieren derivarse de dichas infracciones. El TAXISTA libera expresamente a SU TAXI, en forma total y absoluta, de toda y cualquier responsabilidad derivada del incumplimiento de las obligaciones previstas en estos términos y condiciones y/o en la normativa vigente y/o de los efectos de dicho incumplimiento, o de daños o lesiones sufridos por el Taxista, los Pasajeros, terceros o el medio ambiente a causa o con ocasión de la prestación de los servicios de transporte, cualquiera sea su tipo, naturaleza y alcance, obligándose a mantenerle completamente indemne de toda responsabilidad o molestia, obligándose a asumir directamente, o bien, reembolsar de inmediato a SU TAXI de todo y cualquier pago que esta última se viera en la necesidad o conveniencia de efectuar por tal concepto. En el evento de que un tercero vinculado o no convencionalmente con el Taxista, le demandare perjuicios por un daño o lesión sufrida a causa o con ocasión de la prestación de los servicios de transporte, el TAXISTA deberá mantener completamente indemne a SU TAXI y asumir directamente, o bien, reembolsar de inmediato a SU TAXI, de toda indemnización y de todo pago o gasto en que incurriere con motivo de su defensa.</p>\n\n      <H4 ion-text color="secondary">r.</H4> <p> SANCIONES. En caso de incumplimiento de las obligaciones del Taxista, SU TAXI procederá con las sanciones que considere pertinente, si prejuicio de las acciones administrativas, civiles y/o penales a que hubieran lugar a iniciarse por parte de SU TAXI y/o las autoridades competentes. El desglose de sanciones podrá ser  revisadas en el sitio web de la compañía las cuales podrán ser modificadas de tiempo en tiempo, siendo las aplicables aquellas que estuviesen publicadas al momento del cometimiento del incumplimiento o infracción.</p>\n      <br>\n      <H4 ion-text color="danger">12. IMPUESTOS Y RETENCIONES</H4>\n\n      <p>Cada TAXISTA será el responsable de pagar los impuestos y practicar las retenciones que correspondan de acuerdo con la ley.</p>\n      <br>\n      <H4 ion-text color="danger">13. CONTRATACIÓN TERCEROS</H4>\n\n      <p>SU TAXI podrá, a su cargo y bajo su responsabilidad, celebrar los contratos que considere convenientes o necesarios, así como valerse de terceros para cumplir con las obligaciones que asume conforme con los presentes términos y condiciones, sin perjuicio de lo cual SU TAXI será el único y exclusivo responsable frente al TAXISTA de la debida ejecución y cumplimiento de las obligaciones derivadas de los mismos.</p>\n      <br>\n      <H4 ion-text color="danger">14. RESPONSABILIDAD RELACIÓN LABORAL</H4>\n\n      <p>Las Partes dejan expresa constancia de que la aceptación de los términos y condiciones no crea ningún tipo de vínculo laboral de subordinación ni dependencia entre ellas ni entre ellas y las personas que se encuentren a su cargo, en su caso, declarando las Partes que la aceptación de los términos y condiciones da lugar a una prestación de servicios de carácter comercial, por lo que en ningún caso podrá ser considerado o asimilado a un contrato de trabajo regido por la legislación laboral.</p>\n      <br>\n      <H4 ion-text color="danger">15. CONFIDENCIALIDAD DE MARCAS</H4>\n\n      <p>El TAXISTA quedará obligado a no reproducir, divulgar, informar o dar a conocer, bajo ninguna circunstancia ni a persona alguna, salvo autorización expresa, anticipada y por escrito de SU TAXI, toda o cualesquiera información financiera, legal, administrativa, técnica, profesional o de cualquier otra naturaleza relacionada con los Servicios de Intermediación ni con la actividad desarrollada por SU TAXI (“Información Confidencial”). En consecuencia, el TAXISTA se compromete a mantener la más estricta y absoluta reserva de la Información Confidencial, como asimismo a no usar para beneficio de nadie, salvo de SU TAXI, toda la Información Confidencial recibida o desarrollada en  razón de la la aceptación de los términos y condiciones aquí establecidos.</p>\n\n      <p>El TAXISTA declara conocer y aceptar la aplicación de los artículos 153 y subsiguientes del Código Penal, así como la Ley 24.766 de Confidencialidad en la Información y Productos.</p>\n\n      <p>Las obligaciones referidas no regirán si media alguna disposición legal o resolución judicial o acto de autoridad administrativa que obligue al TAXISTA a someter materias sujetas al secreto y confidencialidad antes referidas, a conocimiento de los tribunales de justicia, instituciones, jueces árbitros o entidades facultadas por la ley y que actúen dentro de sus atribuciones, debiendo dar noticia de ello a SU TAXI antes de su cumplimiento.</p>\n\n      <p>El uso de parte o de la totalidad de la Información Confidencial por parte del TAXISTA sin autorización expresa y por escrito de SU TAXI, dará lugar a la indemnización de perjuicios a que resulte procedente, sin perjuicio de los demás derechos que le corresponden a SU TAXI de conformidad con lo aquí dispuesto y la legislación vigente.</p>\n\n      <p>Terminada la relación jurídica y contractual entre las Partes derivada de la aceptación de los términos y condiciones aquí establecidos, el TAXISTA deberá entregar a SU TAXI toda la Información Confidencial. El TAXISTA no podrá conservar copia alguna de archivo o documento que contenga la Información Confidencial.</p>\n\n      <p>La aceptación de los términos y condiciones aquí establecidos no implica ni podrá ser interpretado como el otorgamiento de una exclusividad de SU TAXI hacia el TAXISTA para la promoción y difusión de los servicios de transporte ofrecidos por el TAXISTA al público general. Por tanto, durante la vigencia de la relación jurídica y comercial entre las Partes derivada de la aceptación de estos términos y condiciones, SU TAXI podrá contratar sus Servicios de Intermediación con cualesquiera terceros.\n\n      <p>El TAXISTA reconoce que SU TAXI es la única titular y propietaria de las distintas marcas de fábrica y de servicios, emblemas, diseños, distintivos, logotipos, isotipos y combinación de colores con que se identifica y que los mismos no podrán utilizarse por el TAXISTA sin el consentimiento por escrito de SU TAXI.</p>\n\n      <p>En caso de terminación de estos términos y condiciones por cualquier causa, el TAXISTA dejará en forma automática de usar y exhibir la marca de SU TAXI, debiendo realizar todos los actos necesarios a fin de remover todas las marcas, emblemas, diseños, distintivos y/o símbolos de propiedad de SU TAXI. En tal caso, el TAXISTA no podrá utilizar, en forma directa o indirecta, marcas o diseños iguales o similares a los de propiedad de SU TAXI, o que tiendan a inducir a confusiones, errores o engaños a terceros al respecto.\n\n      <p>Las obligaciones previstas en esta Cláusula permanecerán vigentes aún después de la terminación de la aceptación de los términos y condiciones aquí establecidos, cualquiera fuera la causa de la extinción.</p>\n      <br>\n      <H4 ion-text color="danger">16. VIGENCIA</H4>\n\n      <p>La relación jurídica y comercial derivada de la aceptación de los términos y condiciones aquí establecidos comenzará a regir el día en que la misma se tuviere por aceptada, y no estará sujeta a plazo.</p>\n\n      <p>Sin perjuicio de lo anterior, la relación jurídica y comercial derivada de la aceptación de los términos y condiciones aquí establecidos podrá terminar antes de la expiración de la vigencia convenida (i) en los casos previstos en la Cláusula siguiente; y, (ii) si SU TAXI notifica al TAXISTA de su intención de terminarla anticipadamente, en cualquier tiempo y sin expresión de causa, mediante carta documento, notificación escrita con aviso de recibo, mensaje de texto o correo electrónico, sin derecho a indemnización ni compensación alguna.</p>\n      <br>\n      <H4 ion-text color="danger">17. INCUMPLIMIENTO Y TÉRMINO ANTICIPADO</H4>\n\n      <p>El incumplimiento por alguna de las Partes de cualquiera de las obligaciones que han asumido en virtud de la aceptación de los términos y condiciones aquí establecidos, que no fuere remediable, o que siéndolo no fuere remediado dentro de 48 horas de comunicado el incumplimiento a la parte incumplidora, dará derecho a la otra parte para poner inmediato término a la relación jurídica y comercial derivada de la aceptación de los términos y condiciones aquí establecidos mediante carta documento, mensaje de texto o correo electrónico de la parte incumplidora, sin necesidad de declaración judicial o administrativa alguna y sin derecho a indemnización ni compensación a la parte incumplidora.</p>\n\n      <p>Igual derecho tendrá SU TAXI en caso que el TAXISTA cayere en estado o situación de insolvencia, entendiéndose para todos los efectos que existe notoria insolvencia si el TAXISTA cae en un estado general de falta de pagos; si uno o más de sus acreedores solicita su quiebra o formula proposiciones de acuerdo preventivo extrajudicial o judicial; si por vía de medidas prejudiciales o precautorias se obtiene en su contra secuestros, retenciones, prohibiciones de celebrar actos y contratos respecto de cualquiera de sus bienes; o, si ocurriere cualquier otro hecho que también ponga en evidencia una notoria insolvencia de su parte.</p>\n      <br>\n      <H4 ion-text color="danger">18. CESIÓN</H4>\n\n      <p>Las partes no podrán ceder en todo o en parte sus derechos y obligaciones derivados de la aceptación de los términos y condiciones aquí establecidos sin autorización previa y por escrito de la otra parte.</p>\n      <br>\n      <H4 ion-text color="danger">19. DISPOSICIONES VARIAS</H4>\n\n      <p>La validez, interpretación y cumplimiento de las disposiciones contenidas en los términos y condiciones aquí establecidos se regirán por las leyes de la República Argentina.</p>\n\n      <p>Ninguna modificación, adición o renuncia a las disposiciones de los términos y condiciones aquí establecidos tendrá el carácter de obligatoria para las Partes, a menos que se establezca por escrito y sea firmada por las mismas o aceptada por cada una de las Partes por nuevos términos y condiciones. En consecuencia, ninguna explicación o información oral de cualquiera de las Partes podrá ser estimada como una modificación o interpretación de la misma. La sola circunstancia de que ocasionalmente o en lapsos determinados se acepten situaciones que impliquen transgresión de lo estipulado en estos términos y condiciones, o de que las Partes no ejerzan o ejerciten con retardo los derechos que ésta les otorga, sea que consten de manera expresa o que deriven de ella en razón de su naturaleza o de la ley, constituirán simples actos u omisiones de mera tolerancia de las Partes que no podrán ser interpretados ni invocados como una modificación tácita del contenido de estos términos y condiciones y que no privarán a las partes del ejercicio de sus derechos. Ninguna renuncia de las Partes a hacer valer sus derechos o facultades frente a un incumplimiento en que incurra la otra parte se interpretará como una renuncia a hacer valer sus derechos o facultades ante incumplimientos posteriores, ya sea en relación a la misma u otra disposición de estos términos y condiciones.   </p>\n\n      <p>El contenido de los términos y condiciones constituye la relación íntegra entre SU TAXI y el TAXISTA respecto de la materia objeto del mismo, reemplazando toda y cualquier negociación anterior.</p>\n\n      <p>Si cualquiera de las disposiciones contenidas en estos términos y condiciones se declarare nula, ilegal, inoponible, inexistente o anulable, la validez, legalidad, oponibilidad y existencia de las disposiciones restantes no se verán alteradas o perjudicadas por ese hecho.</p>\n      <br>\n      <H4 ion-text color="danger">20. RESOLUCIÓN DE CONFLICTOS</H4>\n\n      <p>En caso de suscitarse cualquier controversia en relación con los términos y condiciones aquí establecidos, las Partes acuerdan expresamente someterse a la jurisdicción  del Tribunal de Arbitraje de la Bolsa de Comercio de la Capital Federal, con expresa renuncia a cualquier otro fuero y jurisdicción.</p>\n\n    </ion-card-header>\n  </ion-card>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/terminos/terminos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], TerminosPage);
    return TerminosPage;
}());

//# sourceMappingURL=terminos.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(480);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export myCustomAudioProviderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_firebase_config__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_bluetooth_serial__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_onesignal__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_device__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_call_number__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_keyboard__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ionic_audio__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_native_ringtones__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_text_to_speech__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_audio__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_media__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_file__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_in_app_browser__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_index_services__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__agm_core__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_google_maps__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







//Firebase



// Pipes
//import { ImagenPipe } from "../pipes/imagen";
// storage

// Plugins







//import { BackgroundMode } from '@ionic-native/background-mode';










// servicios / providers

// Mapas


function myCustomAudioProviderFactory() {
    return (window.hasOwnProperty('cordova')) ? new __WEBPACK_IMPORTED_MODULE_18_ionic_audio__["a" /* CordovaMediaProvider */]() : new __WEBPACK_IMPORTED_MODULE_18_ionic_audio__["c" /* WebAudioProvider */]();
}
// Paginas

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                //ImagenPipe,
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["e" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["f" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["j" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["g" /* MapaPage */],
                //MapaPage2,
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["k" /* TerminosPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["h" /* MensajePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["d" /* HistorialPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["i" /* PorMensajePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["c" /* CallPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["a" /* BluetoothPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["b" /* BrowserPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_27__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_9__config_firebase_config__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_18_ionic_audio__["b" /* IonicAudioModule */].forRoot(__WEBPACK_IMPORTED_MODULE_18_ionic_audio__["d" /* defaultAudioProviderFactory */]),
                __WEBPACK_IMPORTED_MODULE_29__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCOLPLNra4lzA17qyXlhtOko3RWBnwzMEA' //'AIzaSyBxrEesxyKdQcrAVLfgfswFBZ57Z87VmlI' //'AIzaSyDjcG4qvuiEjmNE3y1v8Fl2GH68wtLnWFQ'
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["e" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["f" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["j" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["g" /* MapaPage */],
                //MapaPage2,
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["k" /* TerminosPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["h" /* MensajePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["d" /* HistorialPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["i" /* PorMensajePage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["c" /* CallPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["a" /* BluetoothPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_index_paginas__["b" /* BrowserPage */],
            ],
            providers: [
                //proveedores y servicios ambos juntos como BluetoothService  y  BluetoothSerial
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_28__providers_index_services__["f" /* UsuarioService */],
                __WEBPACK_IMPORTED_MODULE_28__providers_index_services__["e" /* UbicacionService */],
                __WEBPACK_IMPORTED_MODULE_28__providers_index_services__["d" /* PushnotificationService */],
                __WEBPACK_IMPORTED_MODULE_28__providers_index_services__["a" /* BasededatosService */],
                __WEBPACK_IMPORTED_MODULE_28__providers_index_services__["c" /* ComandosService */],
                __WEBPACK_IMPORTED_MODULE_28__providers_index_services__["b" /* BluetoothService */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_google_maps__["b" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_native_audio__["a" /* NativeAudio */],
                //BackgroundMode,
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_native_ringtones__["a" /* NativeRingtones */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_text_to_speech__["a" /* TextToSpeech */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_file__["a" /* File */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicErrorHandler */] },
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_index_services__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_index_paginas__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { SQLite } from '@ionic-native/sqlite';
// servicios / providers

// import { HomePage } from '../pages/home/home';

var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, _us, _gps, network, toast, 
    //private menuCtrl: MenuController,
    //private alertCtrl: AlertController,
    keyboard) {
        var _this = this;
        this._us = _us;
        this._gps = _gps;
        this.network = network;
        this.toast = toast;
        this.keyboard = keyboard;
        this.salir = false;
        this.tiempo_salir = 3000;
        platform.ready().then(function () {
            /*
                            this.backgroundMode.setDefaults({
            
                                title: 'Avelo-GO',
                                text: 'la Aplicacion seguira ejecutandose',
                              });
            
                              setTimeout(() => {
            
                                    this.backgroundMode.enable();
            
                                    if( !this.backgroundMode.isEnabled() )
                                            console.log('backgroundMode plugin not install');
            
                              }, 500);
                              */
            platform.registerBackButtonAction(function () {
                if (_this.nav.canGoBack()) {
                    _this.nav.pop().then(function () { }, function () { }); // If called very fast in a row, pop will reject because no pages
                }
                else {
                    if (!_this.salir) {
                        _this.showAlert("Si presiona el boton una vez más saldra de Avelo-GO");
                        _this.salir = true;
                        setTimeout(function () {
                            _this.salir = false;
                        }, _this.tiempo_salir);
                    }
                    else {
                        platform.exitApp(); //Exit from app
                    }
                }
            }, 500);
            __WEBPACK_IMPORTED_MODULE_6_moment___default.a.locale('es');
            _this.network.onConnect().subscribe(function (data) {
                console.log(data);
                _this.displayNetworkUpdate(data.type);
            }, function (error) { return console.error(error); });
            _this.network.onDisconnect().subscribe(function (data) {
                console.log(data);
                _this.displayNetworkUpdate(data.type);
            }, function (error) { return console.error(error); });
            _this._us.cargar_storage()
                .then(function () {
                //let modal:any;
                //modal = this.modalCtrl.create( TabsPage );
                if (_this._us.activo()) {
                    // Okay, so the platform is ready and our plugins are available.
                    // Here you can do any higher level native things you might need.
                    statusBar.styleDefault();
                    splashScreen.hide();
                    //console.log("usuario logueado");
                    _this._gps.iniciar_localizacion();
                    if (platform.is("cordova")) {
                        _this._gps.iniciar_localizacion();
                    }
                }
                _this.abrirPagina(__WEBPACK_IMPORTED_MODULE_8__pages_index_paginas__["f" /* LoginPage */]);
            });
            platform.pause.subscribe(function () {
                console.log('[INFO] App pausada');
                //logoutPantalla
            });
        });
    }
    MyApp.prototype.ionViewDidEnter = function () {
    };
    MyApp.prototype.ionViewWillLeave = function () {
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    };
    MyApp.prototype.displayNetworkUpdate = function (connectionState) {
        var networkType = this.network.type;
        this.toast.create({
            message: "Ahora se encuentra " + connectionState + " via " + networkType,
            duration: 4000
        }).present();
    };
    MyApp.prototype.showAlert = function (msj) {
        this.toast.create({
            message: msj,
            duration: this.tiempo_salir,
        }).present();
    };
    MyApp.prototype.abrirPagina = function (pagina) {
        this.rootPage = pagina;
        //this.menuCtrl.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__providers_index_services__["f" /* UsuarioService */],
            __WEBPACK_IMPORTED_MODULE_7__providers_index_services__["e" /* UbicacionService */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_keyboard__["a" /* Keyboard */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 260,
	"./af.js": 260,
	"./ar": 261,
	"./ar-dz": 262,
	"./ar-dz.js": 262,
	"./ar-kw": 263,
	"./ar-kw.js": 263,
	"./ar-ly": 264,
	"./ar-ly.js": 264,
	"./ar-ma": 265,
	"./ar-ma.js": 265,
	"./ar-sa": 266,
	"./ar-sa.js": 266,
	"./ar-tn": 267,
	"./ar-tn.js": 267,
	"./ar.js": 261,
	"./az": 268,
	"./az.js": 268,
	"./be": 269,
	"./be.js": 269,
	"./bg": 270,
	"./bg.js": 270,
	"./bm": 271,
	"./bm.js": 271,
	"./bn": 272,
	"./bn.js": 272,
	"./bo": 273,
	"./bo.js": 273,
	"./br": 274,
	"./br.js": 274,
	"./bs": 275,
	"./bs.js": 275,
	"./ca": 276,
	"./ca.js": 276,
	"./cs": 277,
	"./cs.js": 277,
	"./cv": 278,
	"./cv.js": 278,
	"./cy": 279,
	"./cy.js": 279,
	"./da": 280,
	"./da.js": 280,
	"./de": 281,
	"./de-at": 282,
	"./de-at.js": 282,
	"./de-ch": 283,
	"./de-ch.js": 283,
	"./de.js": 281,
	"./dv": 284,
	"./dv.js": 284,
	"./el": 285,
	"./el.js": 285,
	"./en-au": 286,
	"./en-au.js": 286,
	"./en-ca": 287,
	"./en-ca.js": 287,
	"./en-gb": 288,
	"./en-gb.js": 288,
	"./en-ie": 289,
	"./en-ie.js": 289,
	"./en-il": 290,
	"./en-il.js": 290,
	"./en-nz": 291,
	"./en-nz.js": 291,
	"./eo": 292,
	"./eo.js": 292,
	"./es": 293,
	"./es-do": 294,
	"./es-do.js": 294,
	"./es-us": 295,
	"./es-us.js": 295,
	"./es.js": 293,
	"./et": 296,
	"./et.js": 296,
	"./eu": 297,
	"./eu.js": 297,
	"./fa": 298,
	"./fa.js": 298,
	"./fi": 299,
	"./fi.js": 299,
	"./fo": 300,
	"./fo.js": 300,
	"./fr": 301,
	"./fr-ca": 302,
	"./fr-ca.js": 302,
	"./fr-ch": 303,
	"./fr-ch.js": 303,
	"./fr.js": 301,
	"./fy": 304,
	"./fy.js": 304,
	"./gd": 305,
	"./gd.js": 305,
	"./gl": 306,
	"./gl.js": 306,
	"./gom-latn": 307,
	"./gom-latn.js": 307,
	"./gu": 308,
	"./gu.js": 308,
	"./he": 309,
	"./he.js": 309,
	"./hi": 310,
	"./hi.js": 310,
	"./hr": 311,
	"./hr.js": 311,
	"./hu": 312,
	"./hu.js": 312,
	"./hy-am": 313,
	"./hy-am.js": 313,
	"./id": 314,
	"./id.js": 314,
	"./is": 315,
	"./is.js": 315,
	"./it": 316,
	"./it.js": 316,
	"./ja": 317,
	"./ja.js": 317,
	"./jv": 318,
	"./jv.js": 318,
	"./ka": 319,
	"./ka.js": 319,
	"./kk": 320,
	"./kk.js": 320,
	"./km": 321,
	"./km.js": 321,
	"./kn": 322,
	"./kn.js": 322,
	"./ko": 323,
	"./ko.js": 323,
	"./ky": 324,
	"./ky.js": 324,
	"./lb": 325,
	"./lb.js": 325,
	"./lo": 326,
	"./lo.js": 326,
	"./lt": 327,
	"./lt.js": 327,
	"./lv": 328,
	"./lv.js": 328,
	"./me": 329,
	"./me.js": 329,
	"./mi": 330,
	"./mi.js": 330,
	"./mk": 331,
	"./mk.js": 331,
	"./ml": 332,
	"./ml.js": 332,
	"./mn": 333,
	"./mn.js": 333,
	"./mr": 334,
	"./mr.js": 334,
	"./ms": 335,
	"./ms-my": 336,
	"./ms-my.js": 336,
	"./ms.js": 335,
	"./mt": 337,
	"./mt.js": 337,
	"./my": 338,
	"./my.js": 338,
	"./nb": 339,
	"./nb.js": 339,
	"./ne": 340,
	"./ne.js": 340,
	"./nl": 341,
	"./nl-be": 342,
	"./nl-be.js": 342,
	"./nl.js": 341,
	"./nn": 343,
	"./nn.js": 343,
	"./pa-in": 344,
	"./pa-in.js": 344,
	"./pl": 345,
	"./pl.js": 345,
	"./pt": 346,
	"./pt-br": 347,
	"./pt-br.js": 347,
	"./pt.js": 346,
	"./ro": 348,
	"./ro.js": 348,
	"./ru": 349,
	"./ru.js": 349,
	"./sd": 350,
	"./sd.js": 350,
	"./se": 351,
	"./se.js": 351,
	"./si": 352,
	"./si.js": 352,
	"./sk": 353,
	"./sk.js": 353,
	"./sl": 354,
	"./sl.js": 354,
	"./sq": 355,
	"./sq.js": 355,
	"./sr": 356,
	"./sr-cyrl": 357,
	"./sr-cyrl.js": 357,
	"./sr.js": 356,
	"./ss": 358,
	"./ss.js": 358,
	"./sv": 359,
	"./sv.js": 359,
	"./sw": 360,
	"./sw.js": 360,
	"./ta": 361,
	"./ta.js": 361,
	"./te": 362,
	"./te.js": 362,
	"./tet": 363,
	"./tet.js": 363,
	"./tg": 364,
	"./tg.js": 364,
	"./th": 365,
	"./th.js": 365,
	"./tl-ph": 366,
	"./tl-ph.js": 366,
	"./tlh": 367,
	"./tlh.js": 367,
	"./tr": 368,
	"./tr.js": 368,
	"./tzl": 369,
	"./tzl.js": 369,
	"./tzm": 370,
	"./tzm-latn": 371,
	"./tzm-latn.js": 371,
	"./tzm.js": 370,
	"./ug-cn": 372,
	"./ug-cn.js": 372,
	"./uk": 373,
	"./uk.js": 373,
	"./ur": 374,
	"./ur.js": 374,
	"./uz": 375,
	"./uz-latn": 376,
	"./uz-latn.js": 376,
	"./uz.js": 375,
	"./vi": 377,
	"./vi.js": 377,
	"./x-pseudo": 378,
	"./x-pseudo.js": 378,
	"./yo": 379,
	"./yo.js": 379,
	"./zh-cn": 380,
	"./zh-cn.js": 380,
	"./zh-hk": 381,
	"./zh-hk.js": 381,
	"./zh-tw": 382,
	"./zh-tw.js": 382
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 535;

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UbicacionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modelos_CustomGeoposition__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_simplify_js__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_simplify_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_simplify_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__usuario__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UbicacionService = /** @class */ (function () {
    function UbicacionService(geolocation, 
    //private af: AngularFireModule,
    //private afDb: AngularFireDatabase,
    _us) {
        this.geolocation = geolocation;
        this._us = _us;
        // Here we set the min accuracy that we want to keep
        this.minAccuracy = 25;
        // This will determine how frequently we simplify and emit positions
        this.positionPile = 3;
        // We use positionArray to temporary store positions in order to simplify them later
        this.positionArray = [];
        // We store the last position emitted here in order to avoid jumps that could be produced from simplification
        this.previousPosition = null;
        // We define the Subject and the observable that will emit the position values to the subscribers
        this._actualPosition = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.actualPosition = this._actualPosition.asObservable();
        //console.log('Hello Ubicacion Provider');
        /*
            if( !this._us.clave ){
              return;
            }
        
            this.usuario = this.afDb.object("/usuarios/" + this._us.clave );
        */
    }
    UbicacionService.prototype.iniciar_localizacion = function () {
        var _this = this;
        this.watch = this.geolocation.watchPosition({ enableHighAccuracy: true })
            .filter(function (p) { return p.coords !== undefined; }) //Filter Out Errors
            .subscribe(function (actualPosition) {
            // Check if the position is valid
            if (actualPosition.coords !== undefined) {
                // Validate the position, if speed is 0 it means that user is stopped, so we don't need to track that, we also check the min accuracy
                if (actualPosition.coords.speed > 0 && actualPosition.coords.accuracy < _this.minAccuracy) {
                    //If the position is valid we push to our positions array
                    _this.positionArray.push(new __WEBPACK_IMPORTED_MODULE_2__modelos_CustomGeoposition__["a" /* CustomGeoposition */](actualPosition));
                    // Once we've reached the maximum stack of positions we process them
                    if (_this.positionArray.length > _this.positionPile) {
                        // Adding at first position the last position processed, to force simplification to start there
                        if (_this.previousPosition == null) {
                            _this.previousPosition = _this.positionArray[0];
                        }
                        _this.positionArray.unshift(_this.previousPosition);
                        // Simplifying line
                        var filteredPoints = __WEBPACK_IMPORTED_MODULE_4_simplify_js__(_this.positionArray, 15, true);
                        // Resetting the array
                        _this.positionArray = [];
                        filteredPoints.unshift(_this.previousPosition);
                        // We call a method that will emit the simplified positions
                        _this.parseFilteredPoints(filteredPoints);
                    }
                }
            }
        }, function (error) {
            console.log(error); //error handling
        });
    };
    UbicacionService.prototype.detener_localizacion = function () {
        this.watch.unsubscribe();
    };
    // This method gets the array of simplified positions and emits them to the subscribers
    UbicacionService.prototype.parseFilteredPoints = function (filteredPoints) {
        var _this = this;
        filteredPoints.forEach(function (point) {
            _this._actualPosition.next(point);
            _this.previousPosition = point;
        });
    };
    UbicacionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__usuario__["a" /* UsuarioService */]])
    ], UbicacionService);
    return UbicacionService;
}());

//# sourceMappingURL=ubicacion.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomGeoposition; });
var CustomGeoposition = /** @class */ (function () {
    function CustomGeoposition(geoposition) {
        this.coords = geoposition.coords;
        this.timestamp = geoposition.timestamp;
        this.x = geoposition.coords.latitude;
        this.y = geoposition.coords.longitude;
    }
    return CustomGeoposition;
}());

//# sourceMappingURL=CustomGeoposition.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_call_number__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_media__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_comandos__ = __webpack_require__(385);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// servicios / providers


var HomePage = /** @class */ (function () {
    function HomePage(_cm, _us, navCtrl, callNumber, navParams, media, file, platform) {
        this._cm = _cm;
        this._us = _us;
        this.navCtrl = navCtrl;
        this.callNumber = callNumber;
        this.navParams = navParams;
        this.media = media;
        this.file = file;
        this.platform = platform;
        //productoPage = ProductoPage;
        this.candado = "unlock";
        this.ponersacar = "Poner en ";
        this.recording = false;
        this.audioList = [];
        this.candado = "unlock";
        this.ponersacar = "Poner en ";
        var salir = this.navParams.get("candado");
        if (salir) {
            this._cm.logout_pantalla(function (data) {
            });
        }
    }
    /*
    
      getViaje(){
          this._cm.obtener_viaje();
    
      }
    
    
      getParada(){
          this._cm.obtener_parada();
    
      }
    */
    HomePage.prototype.borrar_usuario = function () {
        var _this = this;
        this._us.cerrar_sesion(function (borrar) {
            if (borrar) {
                console.log(" usuario borrado ", _this._us.id_usuario);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]).catch(function (e) { return console.log('error al borrar cuenta', e); });
                _this._cm.licencia = "";
            }
        });
    };
    HomePage.prototype.llamar_central = function () {
        this.callNumber.callNumber("5491165..", true)
            .then(function () { return console.log('Launched dialer!'); })
            .catch(function () { return console.log('Error launching dialer'); });
    };
    /*
      getAudioList() {
    
        if(localStorage.getItem("audiolist")) {
          this.audioList = JSON.parse(localStorage.getItem("audiolist"));
          console.log(this.audioList);
        }
      }
    
    */
    HomePage.prototype.startRecord = function () {
        if (this.platform.is('ios')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        else if (this.platform.is('android')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
            this.audio = this.media.create(this.filePath);
        }
        this.audio.startRecord();
        this.recording = true;
    };
    HomePage.prototype.stopRecord = function (ev) {
        console.log(ev.center);
        var dist = Math.sqrt(Math.pow(ev.center.x, 2) + Math.pow(ev.center.y, 2));
        console.log(dist);
        ev.preventDefault();
        /*
        this.audio.stopRecord();
        let posicion_record_nueva =  document.getElementById('boton_record').getBoundingClientRect();
  
        if( 0 < (posicion_record_nueva.left - this.posicion_record.left) ){
            let data = { filename: this.fileName };
            console.log("mandar audio");
        }
  
        //this.audioList.push(data);
        //localStorage.setItem("audiolist", JSON.stringify(this.audioList));
        this.recording = false;
        //this.getAudioList();
        */
    };
    HomePage.prototype.playAudio = function (file, idx) {
        if (this.platform.is('ios')) {
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
            this.audio = this.media.create(this.filePath);
        }
        else if (this.platform.is('android')) {
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
            this.audio = this.media.create(this.filePath);
        }
        this.audio.play();
        this.audio.setVolume(0.8);
    };
    /*
      siguiente_pagina( infiniteScroll ){
    
        this._ps.cargar_todos()
              .then( ()=>{
    
                infiniteScroll.complete();
    
              });
    
    
    
      }
    */
    HomePage.prototype.pantalla = function () {
        var _this = this;
        if (this.candado == "unlock") {
            this._cm.login_pantalla(function (data) {
                _this.candado = "lock";
                _this.ponersacar = "Sacar de ";
            });
        }
        else {
            this._cm.logout_pantalla(function (data) {
                _this.candado = "unlock";
                _this.ponersacar = "Poner en ";
            });
        }
    };
    HomePage.prototype.ionViewWillEnter = function () {
        //this.getAudioList();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar>\n    <span *ngIf= "candado == \'lock\' " class="licencia">LICENCIA:<br> {{this._cm.licencia}} </span>\n    <ion-buttons start>\n      <button ion-button\n              *ngIf="_us.activo()"\n              (click)="this.borrar_usuario()">\n            Borrar <br> Cuenta\n      </button>\n    </ion-buttons>\n\n\n    <ion-title>\n      Comandos\n    </ion-title>\n  <!--\n    <ion-buttons end>\n\n      <button ion-button icon-only\n              (click)="_cs.ver_carrito()">\n        <ion-icon name="cart"></ion-icon>\n        <ion-badge color="danger"\n                   class="carrito-numero"\n                   *ngIf="_cs.items.length > 0">\n                {{ _cs.items.length }}\n        </ion-badge>\n      </button>\n\n      &nbsp;\n      &nbsp;\n\n    </ion-buttons>\n  -->\n\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content center>\n\n    <ion-row>\n\n      <ion-col >\n\n            <button ion-button large  icon-only color="light"\n                    (click)="_cm.obtener_viaje()"\n                    *ngIf= " this.candado == \'lock\'" >\n              <div class="contenidobotones">\n                <img src="assets/icon/obtener_viaje.jpeg">\n                <br>\n                <ion-label center class="etiqueta"  >Obtener <br>Viaje</ion-label>\n              </div>\n            </button>\n\n      </ion-col>\n\n    <ion-col >\n\n        <button ion-button large  icon-only color="light"\n                (click)="_cm.obtener_parada()"\n                *ngIf= " candado == \'lock\' " >\n              <div class="contenidobotones">\n                <img src="assets/icon/parada.jpeg">\n                <br>\n                <ion-label center class="etiqueta"  >Obtener <br>Parada</ion-label>\n              </div>\n        </button>\n\n    </ion-col>\n\n\n    <ion-col >\n          <button ion-button large  icon-only color="light"\n                  (click)="pantalla()">\n                    <div class="contenidobotones">\n                      <img src="assets/icon/{{candado}}.jpeg">\n                      <br>\n                      <ion-label center class="etiqueta"  >{{ this.ponersacar }} <br>Frecuencia</ion-label>\n                    </div>\n          </button>\n    </ion-col>\n\n  </ion-row>\n\n\n\n\n<!--  Boton para llamar a CENTRAL -->\n  <ion-footer align="right" no-border padding>\n      <ion-buttons>\n          <!--\n            <button ion-button icon-only large round color="light"\n                    (click)="llamar_central()" >\n              <ion-icon name=call ></ion-icon>\n            </button>\n            <button ion-button large round danger (touchend)="stopRecord()" *ngIf="recording"><ion-icon name="mic-off"></ion-icon>&nbsp;&nbsp;Stop Record</button>\n            holdclick\n            -->\n            <button ion-button large draggable="true" round [color]="recording ? \'danger\' : \'primary\'" (dragleave)="stopRecord($event)"><ion-icon  [name]="recording ? \'mic-off\' : \'mic\'"></ion-icon>&nbsp;&nbsp;Radio</button>\n      </ion-buttons>\n\n\n  </ion-footer>\n\n\n\n\n\n  <!--\n  <ion-grid>\n\n    <ion-row *ngFor="let pares of _ps.productos">\n      <ion-col *ngFor="let item of pares"\n              [navParams]="{ producto: item }"\n              [navPush]="productoPage">\n       <img [src]="item.codigo | imagen">\n        <p>\n          {{ item.producto }}\n          <br>\n          {{ item.precio_compra | currency:\'USD\':true }}\n        </p>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n\n  <ion-infinite-scroll (ionInfinite)="siguiente_pagina($event)">\n     <ion-infinite-scroll-content></ion-infinite-scroll-content>\n   </ion-infinite-scroll>\n-->\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_comandos__["a" /* ComandosService */],
            __WEBPACK_IMPORTED_MODULE_6__providers_usuario__["a" /* UsuarioService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* Platform */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CallPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_url_servicios__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_index_services__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// servicios / providers

var CallPage = /** @class */ (function () {
    function CallPage(navCtrl, nativeAudio, http, alertCtrl, _us) {
        this.navCtrl = navCtrl;
        this.nativeAudio = nativeAudio;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this._us = _us;
        this.showRemoteVideo = true;
        this.showMyVideo = true;
        this.incomingCallId = 0;
        this.InitializeApiRTC();
        this.nativeAudio.preloadComplex('uniqueI1', 'assets/tone.mp3', 1, 1, 0).then(function (succ) {
            console.log("suu", succ);
        }, function (err) {
            console.log("err", err);
        });
    }
    CallPage.prototype.InitializeApiRTC = function () {
        var _this = this;
        //apiRTC initialization
        apiRTC.init({
            apiKey: "819abef1fde1c833e0601ec6dd4a8226",
            // apiCCId : "2",
            onReady: function (e) {
                _this.sessionReadyHandler(e);
            }
        });
    };
    CallPage.prototype.sessionReadyHandler = function (e) {
        this.myCallId = apiRTC.session.apiCCId;
        this.InitializeControls();
        this.AddEventListeners();
        this.InitializeWebRTCClient();
        this.mandar_telefono_ID(this.myCallId.toString());
    };
    CallPage.prototype.mandar_telefono_ID = function (telefonoID) {
        //let config ={ headers: new HttpHeaders().set(‘Content-Type’, ‘application/json’) };
        var _this = this;
        var data = new FormData();
        data.append("token", telefonoID);
        //data.append("ids_notificacion", this.ids );
        //data.append("usuario", this._us.id_usuario );
        //data.append("clave", this._us.clave );
        console.log(telefonoID);
        var url = __WEBPACK_IMPORTED_MODULE_4__config_url_servicios__["f" /* URL_LLAMADA */] + '/' + this._us.id_usuario + '/' + this._us.clave;
        console.log(url);
        return this.http.post(url, data)
            .subscribe(function (resp) {
            console.log(resp);
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error al enviar ID de telefono",
                subTitle: err.error.msg,
                buttons: ["OK"]
            }).present();
        });
    };
    CallPage.prototype.InitializeWebRTCClient = function () {
        this.webRTCClient = apiRTC.session.createWebRTCClient({
            status: "status" //Optionnal
        });
        /*    this.webRTCClient.setAllowMultipleCalls(true);
            this.webRTCClient.setVideoBandwidth(300);
            this.webRTCClient.setUserAcceptOnIncomingCall(true);*/
    };
    CallPage.prototype.InitializeControls = function () {
        this.showCall = true;
        this.showAnswer = false;
        this.showHangup = false;
        this.showReject = false;
    };
    CallPage.prototype.InitializeControlsForIncomingCall = function () {
        this.showCall = false;
        this.showAnswer = true;
        this.showReject = true;
        this.showHangup = true;
        this.nativeAudio.loop('uniqueI1').then(function (succ) {
            console.log("succ", succ);
        }, function (err) {
            console.log("err", err);
        });
    };
    CallPage.prototype.InitializeControlsForHangup = function () {
        this.showCall = true;
        this.showAnswer = false;
        this.showReject = false;
        this.showHangup = false;
    };
    CallPage.prototype.UpdateControlsOnAnswer = function () {
        this.showAnswer = false;
        this.showReject = false;
        this.showHangup = true;
        this.showCall = false;
    };
    CallPage.prototype.UpdateControlsOnReject = function () {
        this.showAnswer = false;
        this.showReject = false;
        this.showHangup = false;
        this.showCall = true;
    };
    CallPage.prototype.RemoveMediaElements = function (callId) {
        this.webRTCClient.removeElementFromDiv('mini', 'miniElt-' + callId);
        this.webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + callId);
    };
    CallPage.prototype.AddStreamInDiv = function (stream, callType, divId, mediaEltId, style, muted) {
        var mediaElt = null;
        var divElement = null;
        if (callType === 'audio') {
            mediaElt = document.createElement("audio");
        }
        else {
            mediaElt = document.createElement("video");
        }
        mediaElt.id = mediaEltId;
        mediaElt.autoplay = true;
        mediaElt.muted = muted;
        mediaElt.style.width = style.width;
        mediaElt.style.height = style.height;
        divElement = document.getElementById(divId);
        divElement.appendChild(mediaElt);
        this.webRTCClient.attachMediaStream(mediaElt, stream);
    };
    CallPage.prototype.AddEventListeners = function () {
        var _this = this;
        apiRTC.addEventListener("userMediaSuccess", function (e) {
            _this.showStatus = true;
            _this.showMyVideo = true;
            _this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "mini", 'miniElt-' + e.detail.callId, {
                width: "128px",
                height: "96px"
            }, true);
        });
        apiRTC.addEventListener("userMediaError", function (e) {
            _this.InitializeControlsForHangup();
            _this.status = _this.status + "<br/> Ha ocurrido el siguiente error <br/> " + e;
        });
        apiRTC.addEventListener("incomingCall", function (e) {
            _this.InitializeControlsForIncomingCall();
            _this.incomingCallId = e.detail.callId;
        });
        apiRTC.addEventListener("hangup", function (e) {
            if (e.detail.lastEstablishedCall === true) {
                _this.InitializeControlsForHangup();
            }
            _this.status = _this.status + "<br/> Se termino la llamada debido a lo siguiente <br/> " + e.detail.reason;
            _this.RemoveMediaElements(e.detail.callId);
        });
        apiRTC.addEventListener("remoteStreamAdded", function (e) {
            _this.webRTCClient.addStreamInDiv(e.detail.stream, e.detail.callType, "remote", 'remoteElt-' + e.detail.callId, {
                width: "300px",
                height: "225px"
            }, false);
        });
        apiRTC.addEventListener("webRTCClientCreated", function (e) {
            console.log("Cliente webRTC Creado");
            _this.webRTCClient.setAllowMultipleCalls(true);
            _this.webRTCClient.setVideoBandwidth(300);
            _this.webRTCClient.setUserAcceptOnIncomingCall(true);
            /*      this.InitializeControls();
                  this.AddEventListeners();*/
            //this.MakeCall("729278");
        });
    };
    CallPage.prototype.MakeCall = function (calleeId) {
        var callId = this.webRTCClient.call(calleeId);
        if (callId != null) {
            this.incomingCallId = callId;
            this.showHangup = true;
        }
    };
    CallPage.prototype.HangUp = function () {
        this.webRTCClient.hangUp(this.incomingCallId);
    };
    CallPage.prototype.AnswerCall = function (incomingCallId) {
        this.webRTCClient.acceptCall(incomingCallId);
        this.nativeAudio.stop('uniqueI1').then(function () { }, function () { });
        this.UpdateControlsOnAnswer();
    };
    CallPage.prototype.RejectCall = function (incomingCallId) {
        this.webRTCClient.refuseCall(incomingCallId);
        this.UpdateControlsOnReject();
        this.RemoveMediaElements(incomingCallId);
    };
    CallPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-llamada',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/videollamada/llamada.html"*/'<ion-header>\n    <ion-navbar color="dark">\n        <ion-title>\n            SU NÚMERO ES: {{myCallId}}\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-item>\n            <ion-label floating>ID llamada:</ion-label>\n            <ion-input type="number" [(ngModel)]="calleeId"></ion-input>\n        </ion-item>\n    </ion-list>\n    <ion-grid>\n        <ion-row>\n            <ion-col>\n                <button *ngIf="showCall" [disabled]=" calleeId?.length < 5" ion-button block (click)=\'MakeCall(calleeId)\'>Llamar</button>\n            </ion-col>\n            <ion-col>\n                <button *ngIf="showHangup" ion-button block color="danger" (click)=\'HangUp()\'>Colgar</button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <button *ngIf="showAnswer" ion-button block color="secondary" (click)=\'AnswerCall(incomingCallId)\'>Atender</button>\n            </ion-col>\n            <ion-col>\n                <button *ngIf="showReject" ion-button block color="danger">Rechazar</button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <p *ngIf="showStatus" [innerHtml]="status"></p>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="showRemoteVideo">\n            <ion-col>\n                <p>Él</p>\n                <div id="remote" style="width:100%;"></div>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="showMyVideo">\n            <ion-col>\n                <p>Usted</p>\n                <div id="mini"></div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/videollamada/llamada.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_index_services__["f" /* UsuarioService */]])
    ], CallPage);
    return CallPage;
}());

//# sourceMappingURL=llamada.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_index_services__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__ = __webpack_require__(401);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// servicios / providers


var MapaPage = /** @class */ (function () {
    function MapaPage(navCtrl, geolocation, http, _gps) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.http = http;
        this._gps = _gps;
        //ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyDjcG4qvuiEjmNE3y1v8Fl2GH68wtLnWFQ"
        // google maps zoom level
        this.zoom = 15;
        // initial center position for the map
        this.lat = -34.6567962;
        this.lng = -58.6234707;
        this.markers = [
            {
                lat: -34.6453457,
                lng: -58.5889441,
                title: 'Departamento',
                icon: 'purple',
                label: 'D',
                draggable: false
            },
            {
                lat: -34.6567962,
                lng: -58.6234707,
                title: 'RIESGONET',
                icon: 'red',
                label: 'A',
                draggable: false
            },
            {
                lat: -34.5701687,
                lng: -59.0255169,
                title: 'Lujan',
                icon: 'blue',
                label: 'C',
                draggable: false
            },
            {
                lat: -34.639885,
                lng: -58.5569043,
                title: 'Hospital San Juan de Dios',
                icon: 'yellow',
                label: 'B',
                draggable: false
            },
        ];
    }
    MapaPage.prototype.addBoton = function () {
        console.log("Presionaste boton");
        console.log(this._gps.actualPosition);
    };
    MapaPage.prototype.getMarkers = function () {
        this.http.get('assets/data/markers.json')
            .map(function (res) { return res; })
            .subscribe(function (data) {
            //this.addMarkersToMap(data);
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
            console.log(err.message);
        });
    };
    MapaPage.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker: " + (label || index));
    };
    /*
        mapClicked($event: MouseEvent) {
          this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
          });
        }
        */
    MapaPage.prototype.markerDragEnd = function (m, $event) {
        console.log('dragEnd', m, $event);
    };
    MapaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setMap();
        this.loadMap();
        this._gps.iniciar_localizacion();
        this._gps.actualPosition.subscribe(function (position) {
            if (position != null) {
                _this.drawRoute(position);
            }
        });
    };
    MapaPage.prototype.setMap = function () {
        var controls = { compass: true, myLocationButton: false, indoorPicker: false, zoom: true, mapTypeControl: false, streetViewControl: false };
        this.map = new __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["a" /* GoogleMap */]('map', {
            'backgroundColor': 'white',
            'controls': {
                'compass': controls.compass,
                'myLocationButton': controls.myLocationButton,
                'indoorPicker': controls.indoorPicker,
                'zoom': controls.zoom,
                'mapTypeControl': controls.mapTypeControl,
                'streetViewControl': controls.streetViewControl
            },
            'gestures': {
                'scroll': true,
                'tilt': true,
                'rotate': true,
                'zoom': true
            }
        });
    };
    MapaPage.prototype.loadMap = function () {
        this.map.on(__WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_READY).subscribe(function (map) {
            map.clear();
            map.off();
            map.setMapTypeId(plugin.google.maps.MapTypeId.HYBRID);
            map.setMyLocationEnabled(true);
        }, function (error) {
            console.error("Error:", error);
        });
    };
    MapaPage.prototype.drawRoute = function (pos) {
        var _this = this;
        if (this.previousPosition == null) {
            this.previousPosition = pos;
        }
        this.map.addPolyline({
            points: [new __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["d" /* LatLng */](this.previousPosition.coords.latitude, this.previousPosition.coords.longitude), new __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_maps__["d" /* LatLng */](pos.coords.latitude, pos.coords.longitude)],
            visible: true,
            color: '#FF0000',
            width: 4
        }).then(function (res) {
            _this.previousPosition = pos;
        }).catch(function (err) {
            console.log("err: " + JSON.stringify(err));
        });
    };
    MapaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'mapa-page',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/mapa2/mapa.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Mapa2\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="addBoton()"><ion-icon name="add"></ion-icon>agregar Boton</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/mapa2/mapa.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_index_services__["e" /* UbicacionService */]])
    ], MapaPage);
    return MapaPage;
}());

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pushnotification__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// servicios / providers


var HistorialPage = /** @class */ (function () {
    function HistorialPage(navCtrl, navParams, _pushProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._pushProvider = _pushProvider;
        this.mostrar_mensaje = false;
        this.mostrar_estilo = "nowrap";
        setTimeout(function () {
            _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
        }, 60000); //refresca la pagina cada 1 min para cambiar el tiempo de las notificaciones
    }
    HistorialPage.prototype.ver_mensaje = function () {
        if (!this.mostrar_mensaje) {
            this.mostrar_estilo = "pre-line";
            this.mostrar_mensaje = true;
        }
        else {
            this.mostrar_estilo = "nowrap";
            this.mostrar_mensaje = false;
        }
    };
    HistorialPage.prototype.ir_a_pagina = function (i) {
        //console.log(this._pushProvider.MSU[i], i);
        //let index = this._pushProvider.MSU.findIndex(d => d.id_msj === mensaje.id_msj); //find index in your array
        if (this._pushProvider.MSU[i].leido == 0) {
            this._pushProvider.MSU[i].leido = 1;
            this._pushProvider.msjs_no_leidos--;
            this._pushProvider.updateMensaje(this._pushProvider.MSU[i]);
        }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__index_paginas__["i" /* PorMensajePage */], {
            msu: this._pushProvider.MSU[i],
        }).catch(function (e) { return console.log('PorMensajePage error', e); });
    };
    HistorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-historial',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/historial_MSU/historial.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Mensajes</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-list>\n    <ion-list-header>\n      {{ _pushProvider.MSU.length }} Mensajes Recibidos\n    </ion-list-header>\n\n\n          <ion-item-sliding  *ngFor="let msj_recibido of _pushProvider.MSU;  let i = index" >\n\n            <ion-item id=\'{{ msj_recibido.id_msj }}\' style.background-color = "{{ msj_recibido.leido==1 ? \'white\' : \'blanchedalmond\' }}"  (click) ="this.ir_a_pagina(i)">\n\n\n            <!--[navPush]="DetalleMensaje"\n            [navParams]="{ msu: msj_recibido  }">\n\n                 <ion-avatar item-start >\n                   {{msj_recibido.ms}}\n                 </ion-avatar>\n               -->\n                   <item-start>{{msj_recibido.titulo}}</item-start>\n                   <p>{{msj_recibido.contenido}}</p>\n                   <ion-note item-end>\n                     {{ _pushProvider.tiempoAnterior(msj_recibido.fecha) }}\n                   </ion-note>\n               </ion-item >\n\n               <ion-item-options (ionSwipe)="_pushProvider.borrar_mensaje(i)"  >\n\n                 <button ion-button color="danger" expandable (click)="_pushProvider.borrar_mensaje(i)">\n                   <ion-icon name="trash"></ion-icon>\n                   Borrar\n                 </button>\n               </ion-item-options>\n\n\n              </ion-item-sliding>\n\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/historial_MSU/historial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_pushnotification__["a" /* PushnotificationService */]])
    ], HistorialPage);
    return HistorialPage;
}());

//# sourceMappingURL=historial.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PorMensajePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__ = __webpack_require__(402);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PorMensajePage = /** @class */ (function () {
    function PorMensajePage(navCtrl, navParams, tts, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tts = tts;
        this.viewCtrl = viewCtrl;
        //historialPage = HistorialPage;
        this.mensaje = {};
        this.speaking = false;
        this.mensaje = this.navParams.get("msu");
        //this.cargar_por_mensaje( this.mensaje );
    }
    PorMensajePage.prototype.reproducir_mensaje = function () {
        var _this = this;
        if (this.speaking) {
            this.tts.speak({ text: '' }); // <<< speak an empty string to interrupt.
            this.speaking = false;
            return;
        }
        this.speaking = true;
        this.tts.speak({
            text: this.mensaje.contenido,
            locale: 'es-AR',
            rate: 0.75
        })
            .then(function (val) { _this.speaking = false; }, function (reject) { console.warn(reject); _this.speaking = false; })
            .catch(function (err) { console.error(err); _this.speaking = false; });
    };
    PorMensajePage.prototype.ionViewCanLeave = function () {
        this.tts.speak({ text: '' }); // <<< speak an empty string to interrupt.
        this.speaking = false;
        this.viewCtrl.dismiss("data");
    };
    PorMensajePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-por-mensaje',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/por-mensaje/por-mensaje.html"*/'\n<ion-header>\n\n  <ion-navbar>\n\n\n\n    <ion-title>{{ this.mensaje.titulo }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item >\n\n      <item-start>{{ this.mensaje.titulo}}</item-start>\n      <ion-note    style="white-space: pre-line;"  >\n         {{this.mensaje.contenido}}\n      </ion-note>\n\n    </ion-item>\n\n    <button ion-button (click)="reproducir_mensaje()" color="{{ speaking ? \'danger\' : \'primary\' }}">\n       {{ speaking ? \'Callar Voz\' : \'Leer Mensaje\' }} \n    </button>\n\n  </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/por-mensaje/por-mensaje.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], PorMensajePage);
    return PorMensajePage;
}());

//# sourceMappingURL=por-mensaje.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BluetoothPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_bluetooth__ = __webpack_require__(392);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// servicios / providers

var BluetoothPage = /** @class */ (function () {
    //dato_recivido
    function BluetoothPage(_bt, alertCtrl) {
        this._bt = _bt;
        this.alertCtrl = alertCtrl;
        this.paired = false;
        this.comando = "";
    }
    BluetoothPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-bluetooth',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/dispositivos-bluetooth/bluetooth.html"*/'\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n      <button ion-button block (click)="this._bt.startScanning()">scan</button>\n    </ion-buttons>\n\n      <ion-title>Conexion Bluetooth</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n\n  <ion-list padding>\n      <div *ngIf="this._bt.pairedDevices?.length > 0">\n        <ion-list-header>\n          Paired Devices\n        </ion-list-header>\n        <ion-list *ngFor="let device of this._bt.pairedDevices">\n            <ion-item>\n                <ion-label floating>Ingrese Comando</ion-label>\n                <ion-input type="text" [(ngModel)]="comando"  (keyup.enter)="this._bt.mandarComando(comando)" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <button ion-button  color="secondary" (click)="this._bt.mandarComando(comando)">Enviar comando a {{device.name}}</button>\n                <button ion-button color="danger" (click)="this._bt.disconnect()">Desconectar</button>\n            </ion-item>\n\n        </ion-list>\n\n      </div>\n\n\n\n\n    <ion-list-header>\n      Availlable Devices\n    </ion-list-header>\n    <ion-item *ngFor=\'let device of _bt.unpairedDevices\'>\n      <span (click)="this._bt.selectDevice(device.address)">\n        {{device.name}}\n      </span>\n    </ion-item>\n    <ion-spinner name="crescent" *ngIf="this._bt.gettingDevices"></ion-spinner>\n  </ion-list>\n\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/dispositivos-bluetooth/bluetooth.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_bluetooth__["a" /* BluetoothService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BluetoothPage);
    return BluetoothPage;
}());

//# sourceMappingURL=bluetooth.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__ = __webpack_require__(403);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { NavParams, ViewController } from 'ionic-angular';

var BrowserPage = /** @class */ (function () {
    function BrowserPage(iab) {
        this.iab = iab;
    }
    BrowserPage.prototype.openWebpage = function (url) {
        var options = {
            zoom: 'no',
        };
        // Opening a URL and returning an InAppBrowserObject
        var browser = this.iab.create(url, '_self', options);
        browser.show();
        // Inject scripts, css and more with browser.X
    };
    BrowserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-browser',template:/*ion-inline-start:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/browser/browser.html"*/'<ion-header>\n\n  <ion-navbar color="morado">\n    <ion-title>Internet</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-content padding>\n\n    <ion-item>\n      <ion-label floating>URL</ion-label>\n      <ion-input type="url" [(ngModel)]="url"></ion-input>\n    </ion-item>\n\n    <button ion-button block clear (click)="openWebpage(url)">Open Webpage</button>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/home/seba/Escritorio/Ionic/app-avelo/src/pages/browser/browser.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], BrowserPage);
    return BrowserPage;
}());

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__usuario__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__usuario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__comandos__ = __webpack_require__(385);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__comandos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ubicacion__ = __webpack_require__(539);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__ubicacion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pushnotification__ = __webpack_require__(138);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__pushnotification__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__basededatos__ = __webpack_require__(389);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__basededatos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bluetooth__ = __webpack_require__(392);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__bluetooth__["a"]; });
//export { CarritoService } from "./carrito";
//export { ProductosService } from "./productos";






//# sourceMappingURL=index.services.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(384);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'rxjs/add/operator/map';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id';



// Plugin storage

var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, alertCtrl, platform, storage, device) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.storage = storage;
        this.device = device;
        this.clave = "";
        this.id_empresa = 0;
        this.imei = "0";
        this.estado = "";
        //console.log('Hello Usuario Provider');
        this.cargar_storage();
        if (this.platform.is("cordova")) {
            this.imei = this.device.uuid;
            this.dispositivo = this.device;
            this.dispositivo.version = parseFloat(this.dispositivo.version);
        }
    }
    UsuarioService.prototype.activo = function () {
        var activos = false;
        if (this.clave) {
            //console.log("clave ",this.clave);
            activos = true;
        }
        return activos;
        //return new Promise((resolve, reject) => resolve(activos) );
        //return activos;
        //return Promise.resolve( activos );
    };
    UsuarioService.prototype.getEmpresas = function () {
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["e" /* URL_EMPRESAS */];
        //console.log(url);
        var data = new FormData();
        //let config ={ headers: new HttpHeaders().set(‘Content-Type’, ‘application/json’) };
        data.append("id_empresa", this.id_empresa.toString());
        return this.http.get(url)
            .subscribe(function (resp) {
            console.log(resp);
        });
    };
    UsuarioService.prototype.ingresar = function (nombre, apellido, celular, callback) {
        //this.getEmpresas();
        var _this = this;
        if (this.platform.is("cordova")) {
            this.imei = this.device.uuid;
        }
        this.telefono = "549";
        this.telefono = this.telefono.concat(celular.toString());
        //let config ={ headers: new HttpHeaders().set('Content-Type', 'application/json') };
        //let data = new URLSearchParams();
        var body = new FormData();
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
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["o" /* URL_REGISTRO */];
        return this.http.post(url, body)
            //.map(response => response)
            .subscribe(function (resp) {
            console.log(resp);
            //{status: "OK", msg: "Se aceptó solicitud de registro. Se envía SMS al teléfono especificado."}
            _this.id_usuario = resp['id_usuario'];
            _this.clave = resp['clave'];
            //this.estado = "registrado";
            // Guardar Storage
            _this.guardar_storage();
            callback("activar");
            _this.alertCtrl.create({
                title: "Espere a recivir el codigo SMS",
                subTitle: "Sea Paciente. El msj puede demorar en llegar",
                buttons: ["OK"]
            }).present();
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
            console.log(err.message);
            console.log(err.error.result.activo);
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
    };
    UsuarioService.prototype.ingresar_codigo_activar = function (codigo, callback) {
        //this.getEmpresas();
        var _this = this;
        //let config ={ headers: new HttpHeaders().set('Content-Type', 'application/json') };
        //let data = new URLSearchParams();
        var data = new FormData();
        data.append("codigo", codigo.toString());
        data.append("telefono", this.telefono);
        data.append("imei", this.imei.toString());
        data.append("id_empresa", this.id_empresa.toString());
        //console.log(data);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["b" /* URL_ACTIVAR */];
        return this.http.post(url, data)
            .subscribe(function (resp) {
            //let data_resp = resp.json();
            console.log(resp);
            _this.clave = resp.result.clave;
            _this.id_usuario = resp.result.id_usuario;
            _this.estado = "registrado";
            // Guardar Storage
            _this.guardar_storage();
            callback();
        }, function (err) {
            console.log(err.error);
            console.log(err.name);
            console.log(err.message);
            _this.alertCtrl.create({
                title: "Error con el codigo SMS de registro",
                subTitle: err.message,
                buttons: ["OK"]
            }).present();
        } //,  () => { console.log("error") }
        );
    };
    UsuarioService.prototype.reactivar = function (callback) {
        var _this = this;
        var data = new FormData();
        data.append("telefono", this.telefono);
        data.append("imei", this.imei.toString());
        data.append("id_empresa", this.id_empresa.toString());
        //console.log(data);
        var url = __WEBPACK_IMPORTED_MODULE_3__config_url_servicios__["n" /* URL_REACTIVAR */];
        return this.http.post(url, data)
            .subscribe(function (resp) {
            var data_resp = resp;
            console.log(data_resp);
            _this.clave = resp.result.clave;
            _this.id_usuario = resp.result.id_usuario;
            _this.estado = "registrado";
            // Guardar Storage
            _this.guardar_storage();
            callback();
        }, function (err) {
            _this.alertCtrl.create({
                title: "Error al reactivar la cuenta",
                subTitle: err.message,
                buttons: ["OK"]
            }).present();
        } //,  () => { console.log("error") }
        );
    };
    UsuarioService.prototype.cerrar_sesion = function (callback) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: '¿Estas seguro que desea borrar su cuenta?',
            message: 'Deberas registrarte nuevamente',
            buttons: [
                {
                    text: 'NO',
                    role: 'cancel',
                    handler: function () {
                        callback(false);
                    }
                },
                {
                    text: 'SI',
                    handler: function () {
                        _this.borrar_sesion();
                        callback(true);
                    }
                }
            ]
        });
        alert.present();
    };
    UsuarioService.prototype.borrar_sesion = function () {
        this.clave = null;
        this.id_usuario = null;
        this.estado = null;
        // guardar storage
        this.guardar_storage();
    };
    UsuarioService.prototype.guardar_storage = function () {
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
        }
        else {
            // computadora
            if (this.clave) {
                localStorage.setItem("clave", this.clave);
                localStorage.setItem("id_usuario", this.id_usuario);
                localStorage.setItem('estado', this.estado);
            }
            else {
                localStorage.removeItem("clave");
                localStorage.removeItem("id_usuario");
                localStorage.removeItem("estado");
            }
        }
    };
    UsuarioService.prototype.cargar_storage = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            if (_this.platform.is("cordova")) {
                // dispositivo
                _this.storage.ready()
                    .then(function () {
                    _this.storage.get("clave")
                        .then(function (clave) {
                        if (clave) {
                            _this.clave = clave;
                        }
                    });
                    _this.storage.get("id_usuario")
                        .then(function (id_usuario) {
                        if (id_usuario) {
                            _this.id_usuario = id_usuario;
                        }
                        resolve();
                    });
                });
            }
            else {
                // computadora
                if (localStorage.getItem("clave")) {
                    //Existe items en el localstorage
                    _this.clave = localStorage.getItem("clave");
                    _this.id_usuario = localStorage.getItem("id_usuario");
                }
                resolve();
            }
        });
        return promesa;
    };
    UsuarioService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__["a" /* Device */]])
    ], UsuarioService);
    return UsuarioService;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    apiKey: "AIzaSyAjuHeKg56w9a5rOOiAzFDE-Dm4lDHXwRM",
    authDomain: "pushnoti-38d79.firebaseapp.com",
    databaseURL: "https://pushnoti-38d79.firebaseio.com",
    projectId: "pushnoti-38d79",
    storageBucket: "pushnoti-38d79.appspot.com",
    messagingSenderId: "992540997536"
};
//# sourceMappingURL=firebase.config.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export URL_SERVICIOS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return URL_REGISTRO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return URL_ACTIVAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return URL_REACTIVAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return URL_EMPRESAS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return URL_CONECTARPANTALLA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return URL_DESCONECTARPANTALLA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return URL_NOTIFICACIONES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return URL_NOTIFICACIONES_MSQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return URL_NOTIFICACIONES_MSJ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return URL_NOTIFICACIONES_MSU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return URL_NOTIFICACIONES_ACK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return URL_NOTIFICACIONES_EVT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return URL_LLAMADA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return URL_PARADA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return URL_VIAJE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ABREVIACIONES; });
//export const URL_SERVICIOS = "http://desa.avelo.com.ar/ws/";
//export const URL_SERVICIOS = "http://192.168.2.142/desptaxis/ws/";
var URL_SERVICIOS = "http://localhost/desptaxis/ws/"; //local
//export const URL_SERVICIOS = "http://admin.avelo.com.ar/ws/";
//export const URL_SERVICIOS = "http://192.168.0.18/rest/index.php";
//export const URL_IMAGENES = "http://192.168.0.18/rest/public/img/productos/";
var URL_REGISTRO = URL_SERVICIOS + "registro";
var URL_ACTIVAR = URL_SERVICIOS + "activar";
var URL_REACTIVAR = URL_SERVICIOS + "reactivar";
var URL_EMPRESAS = URL_SERVICIOS + "empresas";
var URL_CONECTARPANTALLA = URL_SERVICIOS + "loginPantalla";
var URL_DESCONECTARPANTALLA = URL_SERVICIOS + "logoutPantalla";
var URL_NOTIFICACIONES = URL_SERVICIOS + "deviceToken";
var URL_NOTIFICACIONES_MSQ = URL_SERVICIOS + "respuestaMSQ";
var URL_NOTIFICACIONES_MSJ = URL_SERVICIOS + "respuestaMSJ";
var URL_NOTIFICACIONES_MSU = URL_SERVICIOS + "respuestaMSU";
var URL_NOTIFICACIONES_ACK = URL_SERVICIOS + "ackPush";
var URL_NOTIFICACIONES_EVT = URL_SERVICIOS + "evtPush";
var URL_LLAMADA = URL_SERVICIOS + "deviceLlamadaToken";
var URL_PARADA = URL_SERVICIOS + "getParada";
var URL_VIAJE = URL_SERVICIOS + "getViaje";
var ABREVIACIONES = [
    { letra: '%o', leyenda: "OK" },
    { letra: '%c', leyenda: "Cancelar" },
    { letra: '%s', leyenda: "SI" },
    { letra: '%n', leyenda: "NO" },
    { letra: '%A', leyenda: "Aceptado" },
    { letra: '%X', leyenda: "Cancelado" },
    { letra: '%e', leyenda: "Espere..." },
    { letra: '%C', leyenda: "¿Está seguro?" },
    { letra: '%a', leyenda: "Aceptar" },
    { letra: '%m', leyenda: "Esperando mensaje..." },
    { letra: '%N', leyenda: "Nuevo Mensaje" },
    { letra: '%r', leyenda: "Rechazar" },
    { letra: '%t', leyenda: "Viaje ya tomado" },
    { letra: '%v', leyenda: "Nuevo Viaje" },
    { letra: '%f', leyenda: "Viaje confirmado" },
    { letra: '%b', leyenda: "¿Puede cubrirlo?" },
    { letra: '%d', leyenda: "Viaje a cuenta" },
    { letra: '%B', leyenda: "Cubra:&" },
    { letra: '%D', leyenda: "Avenida" },
    { letra: '%F', leyenda: "cambio de " },
    { letra: '%P', leyenda: "Parada" },
];
//loginPantalla   candado   licencia del movil
//sendpush msq msg
//respuestamsQ si   llega otro  respuestamsJ
/*

    var funcRegistro = "registro";
    var funcActivar = "activar";



    var funcEmpresas = "empresas";
    var funcEmpresaStatus = "empresaStatus";


    var funcEliminarUsuario = "eliminarUsuario";
    var funcDomicilios = "domicilios";
    var funcNuevoViaje = "nuevoViaje";
    var funcEstadoViaje = "viaje";
    var funcConfirmarViaje = "confirmarViaje";
    var funcRechazarChofer = "rechazarChofer";
    var funcCancelarViaje = "cancelarViaje";
    var funcReactivar = "reactivar";
    var funcCalificarViaje = "calificarViaje";
    var funcKeepAlive = "keepAlive";
    var funcPlaceSuggestion = "getCalle";
    var funcValidarAltura = "getNumeral";
    var funcValidarInterseccion = "getInterseccion";

    //LO UTIL
    var funcRespuetaMSQ = "respuestaMSQ";
    var funcLoginPantalla = "loginPantalla";
    var funcLogoutPantalla = "logoutPantalla";
    var funcParada = "getParada";
    var funcViaje = "getViaje";


    return {
        setUrlBase: function(value) {
            baseUrl = value;
            //baseUrl = adminBaseUrl; // ******
        },
        getUrlBase: function() {
            return baseUrl;
        },
        getUrlEmpresas: function() {
            return adminBaseUrl + funcEmpresas;
        },
        getUrlEmpresaStatus: function(empresaId) {
            return baseUrl + funcEmpresaStatus + "/" + empresaId;
        },
        getUrlRegistro: function() {
            return baseUrl + funcRegistro;
            //return "http://teki.avelo.com.ar/ws/registro";
        },
        getUrlActivar: function() {
            return baseUrl + funcActivar;
        },
        getUrlEliminarUsuario: function(usuario, clave) {
            return baseUrl + funcEliminarUsuario + "/" + usuario + "/" + clave;
        },
        getUrlDomicilios: function(usuario, clave) {
            return baseUrl + funcDomicilios + "/" + usuario + "/" + clave;
        },
        getUrlNuevoViaje: function(usuario, clave) {
            return baseUrl + funcNuevoViaje + "/" + usuario + "/" + clave;
        },
        getUrlEstadoViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcEstadoViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlConfirmarViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcConfirmarViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlRechazarChofer: function(idViaje, usuario, clave) {
            return baseUrl + funcRechazarChofer + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlCancelarViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcCancelarViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlReactivar: function() {
            return baseUrl + funcReactivar;
        },
        getUrlCalificarViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcCalificarViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlKeepAlive: function(usuario, clave) {
            return baseUrl + funcKeepAlive + "/" + usuario + "/" + clave;
        },
        getUrlPlaceSuggestion: function(usuario, clave) {
            return baseUrl + funcPlaceSuggestion + "/" + usuario + "/" + clave;
            //return "http://teki.avelo.com.ar/ws/getCalle/34/5c31bcfa932c53bd35b85e54b598b022";
        },
        getUrlValidarAltura: function(usuario, clave) {
            return baseUrl + funcValidarAltura + "/" + usuario + "/" + clave;
            //return "http://teki.avelo.com.ar/ws/getCalle/34/5c31bcfa932c53bd35b85e54b598b022";
        },
        getUrlValidarInterseccion: function(usuario, clave) {
            return baseUrl + funcValidarInterseccion + "/" + usuario + "/" + clave;
            //return "http://teki.avelo.com.ar/ws/getCalle/34/5c31bcfa932c53bd35b85e54b598b022";
        },
    getUrlRespuestaMSQ: function (usuario, clave) {
        return baseUrl + funcRespuetaMSQ + "/" + usuario + "/" + clave;
    },
    getUrlLoginPantalla: function (usuario, clave) {
        return baseUrl + funcLoginPantalla + "/" + usuario + "/" + clave;
    },
    getUrlLogoutPantalla: function (usuario, clave) {
        return baseUrl + funcLogoutPantalla + "/" + usuario + "/" + clave;
    },
    getUrlParada: function (usuario, clave) {
        return baseUrl + funcParada+ "/" + usuario + "/" + clave;
    },
    getUrlViaje: function (usuario, clave) {
        return baseUrl + funcViaje+ "/" + usuario + "/" + clave;
    },
    }

    */
//# sourceMappingURL=url.servicios.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(542);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__home_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login__ = __webpack_require__(397);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(398);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__videollamada_llamada__ = __webpack_require__(543);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__videollamada_llamada__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mapa2_mapa__ = __webpack_require__(544);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__mapa2_mapa__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__terminos_terminos__ = __webpack_require__(399);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__terminos_terminos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mensaje_mensaje__ = __webpack_require__(391);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__mensaje_mensaje__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__historial_MSU_historial__ = __webpack_require__(545);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_7__historial_MSU_historial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__por_mensaje_por_mensaje__ = __webpack_require__(546);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_8__por_mensaje_por_mensaje__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dispositivos_bluetooth_bluetooth__ = __webpack_require__(547);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__dispositivos_bluetooth_bluetooth__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__browser_browser__ = __webpack_require__(548);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_10__browser_browser__["a"]; });

//export { CarritoPage } from "./carrito/carrito";
//export { CategoriasPage } from "./categorias/categorias";

//export { OrdenesPage } from "./ordenes/ordenes";
//export { OrdenesDetallePage } from "./ordenes-detalle/ordenes-detalle";
//export { PorCategoriasPage } from "./por-categorias/por-categorias";









//# sourceMappingURL=index.paginas.js.map

/***/ })

},[461]);
//# sourceMappingURL=main.js.map