import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { Network } from '@ionic-native/network';
//import { Keyboard } from '@ionic-native/keyboard';
import moment from 'moment';
//import { SQLite } from '@ionic-native/sqlite';






// servicios / providers
import { UsuarioService, UbicacionService } from "../providers/index.services";
// import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/index.paginas";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any;
    @ViewChild(Nav) nav: Nav;

    salir: boolean = false;
    tiempo_salir: number = 3000;

    connected: Subscription;
    disconnected: Subscription;


    constructor(platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        private _us: UsuarioService,
        private _gps: UbicacionService,
        private network: Network,
        private toast: ToastController,

        //private menuCtrl: MenuController,
        //private alertCtrl: AlertController,

        //private keyboard: Keyboard,
        //public sqlite: SQLite,


    ) {
        platform.ready().then(() => {
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


            platform.registerBackButtonAction(() => {
                if (this.nav.canGoBack()) {
                    this.nav.pop().then(() => { }, () => { }); // If called very fast in a row, pop will reject because no pages
                } else {
                    if (!this.salir) {
                        this.showAlert("Si presiona el boton una vez más saldra de Avelo-GO");
                        this.salir = true;

                        setTimeout(() => {
                            this.salir = false;
                        }, this.tiempo_salir);
                    } else {
                        platform.exitApp(); //Exit from app
                    }

                }
            }, 500);

            moment.locale('es');
            /*
                        this.network.onConnect().subscribe((data: any) => {
            
                            this.displayNetworkUpdate(data.type);
                        }, error => console.error(error));
            
                                    this.network.onDisconnect().subscribe((data: any) => {
            
                                        this.displayNetworkUpdate(data.type);
                                    }, error => console.error(error));
                        */
            this._us.cargar_storage()
                .then(() => {

                    //let modal:any;
                    //modal = this.modalCtrl.create( TabsPage );

                    if (this._us.activo()) {
                        // Okay, so the platform is ready and our plugins are available.
                        // Here you can do any higher level native things you might need.
                        statusBar.styleDefault();
                        splashScreen.hide();
                        //console.log("usuario logueado");
                        this._gps.iniciar_localizacion();
                        if (platform.is("cordova")) {
                            this._gps.iniciar_localizacion();
                        }

                    }
                    this.abrirPagina(LoginPage);

                });
            platform.pause.subscribe(() => {
                console.log('[INFO] App pausada');
                //logoutPantalla

            });

        });

    }





    ionViewDidEnter() {

    }


    ionViewWillLeave() {
        this.connected.unsubscribe();
        this.disconnected.unsubscribe();
    }

    displayNetworkUpdate(connectionState: string) {
        let networkType = this.network.type;
        this.toast.create({
            message: `Ahora se encuentra ${connectionState} via ${networkType}`,
            duration: 4000
        }).present();
    }

    showAlert(msj: string) {
        this.toast.create({
            message: msj,
            duration: this.tiempo_salir,
            //showCloseButton : true,
            //closeButtonText : "OK",

        }).present();
    }

    abrirPagina(pagina: any) {
        this.rootPage = pagina;
        //this.menuCtrl.close();
    }
}
