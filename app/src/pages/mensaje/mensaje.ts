import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-mensaje',
  templateUrl: 'mensaje.html'
})
export class MensajePage {

  msj:any = "";


  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {

    this.msj = this.navParams.get("msj_notificacion");

    //this.msj.contenido.innerHTML = this.msj.contenido;

    //console.log( this.msj);

  }


  manda_evento( numero:number){

    let data = {
      titulo: "Modal MSJ cerrado",
      numero : numero
    };


    this.viewCtrl.dismiss( data );

  }







}
