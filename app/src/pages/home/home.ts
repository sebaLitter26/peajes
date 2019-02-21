import { Component} from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';


import { LoginPage } from "../login/login";

import { NavController, NavParams, Platform } from "ionic-angular";

// servicios / providers
import { UsuarioService } from "../../providers/usuario";
import { ComandosService }  from "../../providers/comandos";





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //productoPage = ProductoPage;
  candado: string = "unlock";
  ponersacar:string = "Poner en ";

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  posicion_record :  any;


  constructor(
               private _cm: ComandosService,
               private _us: UsuarioService,
               public navCtrl: NavController,
               private callNumber: CallNumber,
               private navParams: NavParams,
               private media: Media,
               private file: File,
               public platform: Platform,
             ) {


               this.candado = "unlock";
               this.ponersacar = "Poner en ";


               let salir = this.navParams.get("candado") ;
               if(salir){
                 this._cm.logout_pantalla((data)=>{

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
  borrar_usuario(){

    this._us.cerrar_sesion( (borrar)=>{
        if(borrar)
        {
          console.log(" usuario borrado ", this._us.id_usuario);
          this.navCtrl.setRoot( LoginPage ) .catch(e => console.log('error al borrar cuenta', e));
          this._cm.licencia = "";

        }

    });

  }

  llamar_central(){
        this.callNumber.callNumber("5491165..", true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
  }
/*
  getAudioList() {

    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }

*/
  startRecord() {
      if (this.platform.is('ios')) {
        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
        this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
        this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.startRecord();
      this.recording = true;
  }


  stopRecord(ev) {
      console.log(ev.center);
      let dist = Math.sqrt( Math.pow(ev.center.x,2)+Math.pow(ev.center.y,2)  )
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
  }

  playAudio(file,idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

/*
  siguiente_pagina( infiniteScroll ){

    this._ps.cargar_todos()
          .then( ()=>{

            infiniteScroll.complete();

          });



  }
*/

  pantalla(){
      if(this.candado == "unlock")
      {

          this._cm.login_pantalla((data)=>{
              this.candado = "lock";
              this.ponersacar = "Sacar de ";

          });


      }else{

          this._cm.logout_pantalla((data)=>{
              this.candado = "unlock";

              this.ponersacar = "Poner en ";
          });

      }

  }

  ionViewWillEnter() {
      //this.getAudioList();
  }



}
