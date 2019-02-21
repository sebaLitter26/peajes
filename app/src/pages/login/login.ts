import { Component, ViewChild  } from '@angular/core';
import { Slides,  NavController, ModalController } from 'ionic-angular';


//import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { TerminosPage } from '../terminos/terminos';

// servicios / providers
import { PushnotificationService, UsuarioService }  from "../../providers/index.services";
//import { UsuarioService } from "../../providers/usuario";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild(Slides) slides: Slides;
  nombre:string = "";
  apellido:string = "";
  celular:number;
  acepta_terminos: boolean = false;
  codigo: number;
  //clave:string = "";

  muestra_activacion : boolean = false;

  licencias:any[] = [
    {
      numero:"1573608122",
      modelo: "BMW X3 Azul"
    },
    /*
    {
      numero:"1165404122",
      modelo: "Porsche panamera amarillo"
    },
    {
      numero:"1187894120",
      modelo: "Mercedez Benz Clase A Negro"
    },
    {
      numero:"1165505573",
      modelo: "AUDI A3 Blanco"
    },
    */
  ];

  tabBarElement: any;

  constructor(
              private _pushProvider: PushnotificationService,
              public navCtrl: NavController,
              private _us:UsuarioService ,
              private modalCtrl: ModalController) {

          this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ionViewWillEnter() {
    (this.tabBarElement)?this.tabBarElement.style.display = 'none':"";
  }

  ionViewWillLeave() {
    (this.tabBarElement)?this.tabBarElement.style.display = 'flex':"";
  }


  ingresar(){


      this._us.ingresar(
                    this.nombre,
                    this.apellido,
                    this.celular ,
                    (activo)=>{
                          switch(activo){
                              case '1':   //usuario ya registrado anteriormente
                                  this._us.reactivar( (data)=>{
                                                                this.pasar_slide();
                                                              } );
                                  break;
                              case "0":
                                  this.muestra_activacion = true;
                                  break;
                              case "activar":
                                  this.muestra_activacion = true;
                                  break;
                              default:
                          }

                    });

        //this.viewCtrl.dismiss(true);

  }

  focusNext(e){
      let pageElements = document.querySelectorAll('input');
      let len = pageElements.length;
      let focusNext = false;
      for (let i = 0; i < len; i++) {
          let elem = pageElements[i];
          if (focusNext) {
              if (elem.style.display !== 'none') {
                  elem.focus();
                  break;
              }
          } else if (pageElements[i] === e.target) {
              focusNext = true;
          }
      }

  }


  ingresar_codigo(){


      this._us.ingresar_codigo_activar( this.codigo,
        (data)=>{
              //this.viewCtrl.dismiss(true);
              // tenemos la clave, ir al home
              //this.navCtrl.setRoot( HomePage );
              console.log(data);
              // continuar a la siguiente pantalla
              this.pasar_slide();
        });

  }


  pasar_slide(){
    /*
    let loading = this.loadingCtrl.create({
      content: "Espere por favor..."
    });

    loading.present();


    // Verificar si la clave es valida

          loading.dismiss();
          */

          //this._us.activo().then((resp)=>{


          if(this._us.activo()){

              if( this.licencias.length==1 )
              {
                  this.ir_a_home(this.licencias[0]);
              }else{
                  // continuar a la siguiente pantalla de seleccion de licencias
                  this.slides.lockSwipes(false);
                  this.slides.slideNext();
                  this.slides.lockSwipes(true);
              }
          }


  }

  ir_a_home(licencia){
    
      this.navCtrl.setRoot( TabsPage,
          {
            licencia: licencia.numero,
            //thing2: 'data2'
          }  ) .catch(e => console.log('TabsPage error', e));
          this._pushProvider.init_notifications();
      /*this.navCtrl.push( TabsPage, {
          licencia: licencia.numero,
          //thing2: 'data2'
      });*/

  }


  modal_terminosYcondiciones(){
    let modal:any;
    modal = this.modalCtrl.create( TerminosPage );

    modal.present();

    modal.onDidDismiss ( (abrirHome:boolean)=>{
        /*
        if(abrirHome){
            this.modalCtrl.create( TabsPage );
        }
        */
    });

  }




  ngAfterViewInit(){
  //ionViewDidLoad(){

    this.slides.lockSwipes(true);
    //this.slides.freeMode = false;
    this.slides.paginationType = "progress";



         if(this.slides)
         {


              setTimeout(() => {
                  this.slides.update();
                  this.pasar_slide();
              }, 300);


              //this.viewCtrl.dismiss(true);
              //this.navCtrl.setRoot( HomePage ) .catch(e => console.log('HomePage error', e));

              /*

              */
         }


  }

}
