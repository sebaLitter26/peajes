import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';



@Component({
  selector: 'page-por-mensaje',
  templateUrl: 'por-mensaje.html',
})
export class PorMensajePage {

  //historialPage = HistorialPage;

  mensaje:any = {};
  speaking : boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private tts: TextToSpeech,
              public viewCtrl: ViewController,
               ) {

    this.mensaje = this.navParams.get("msu");

    //this.cargar_por_mensaje( this.mensaje );

  }

  reproducir_mensaje(){
    if(this.speaking){
      this.tts.speak({text: ''});  // <<< speak an empty string to interrupt.
      this.speaking = false;
      return;
    }
    this.speaking = true;
    this.tts.speak( {
        text: this.mensaje.contenido,
        locale: 'es-AR',
        rate: 0.75
    })
   .then((val) => { this.speaking = false;  },
   (reject) => {console.warn(reject); this.speaking = false; })
   .catch((err) => {console.error(err); this.speaking = false; });
  }

  ionViewCanLeave() {

    this.tts.speak({text: ''});  // <<< speak an empty string to interrupt.
    this.speaking = false;
    this.viewCtrl.dismiss("data");
  }
/*
  dismiss() {
   //let data = { 'foo': 'bar' };
   //console.log(data);
   this.tts.speak({text: ''});  // <<< speak an empty string to interrupt.
   this.speaking = false;
   this.viewCtrl.dismiss("data");
 }
 */


}
