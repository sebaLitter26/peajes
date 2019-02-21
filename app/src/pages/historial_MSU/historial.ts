import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// servicios / providers
import { PushnotificationService }  from "../../providers/pushnotification";

import { PorMensajePage } from "../index.paginas";

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  tiempo_atras: string;
  mostrar_mensaje: boolean = false;
  mostrar_estilo:string = "nowrap";


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _pushProvider: PushnotificationService,
               ) {

                 setTimeout(()=>{
                    this.navCtrl.setRoot(this.navCtrl.getActive().component);
                 }, 60000);  //refresca la pagina cada 1 min para cambiar el tiempo de las notificaciones

  }

  ver_mensaje(){

      if(!this.mostrar_mensaje){
            this.mostrar_estilo = "pre-line";
            this.mostrar_mensaje = true;
      }else{
            this.mostrar_estilo = "nowrap";
            this.mostrar_mensaje = false;
      }

  }




  ir_a_pagina(i){
    //console.log(this._pushProvider.MSU[i], i);
    //let index = this._pushProvider.MSU.findIndex(d => d.id_msj === mensaje.id_msj); //find index in your array
    if(this._pushProvider.MSU[i].leido == 0)
    {
      this._pushProvider.MSU[i].leido = 1;
      this._pushProvider.msjs_no_leidos--;
      this._pushProvider.updateMensaje( this._pushProvider.MSU[i] );
    }


    this.navCtrl.push( PorMensajePage,
        {
          msu: this._pushProvider.MSU[i],

        }  ) .catch(e => console.log('PorMensajePage error', e));

  }


}
