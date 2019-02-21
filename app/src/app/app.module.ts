
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';



//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule , AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from "../config/firebase.config";



// Pipes
//import { ImagenPipe } from "../pipes/imagen";

// storage
import { IonicStorageModule } from '@ionic/storage';




// Plugins
import { Geolocation } from '@ionic-native/geolocation';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { CallNumber } from '@ionic-native/call-number';
import { Keyboard } from '@ionic-native/keyboard';
//import { BackgroundMode } from '@ionic-native/background-mode';
import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
import { SQLite } from '@ionic-native/sqlite';
import { NativeRingtones } from '@ionic-native/native-ringtones';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NativeAudio } from '@ionic-native/native-audio';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserModule } from '@angular/platform-browser';

import moment from 'moment'; //tiempo

// servicios / providers
import { UsuarioService, ComandosService, UbicacionService, PushnotificationService, BasededatosService, BluetoothService } from "../providers/index.services";


// Mapas
import { AgmCoreModule } from '@agm/core';
import { GoogleMaps } from "@ionic-native/google-maps";

export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}



// Paginas
import {  /*CarritoPage,
          CategoriasPage,
          OrdenesPage,
          OrdenesDetallePamodalCtrlge,
          PorCategoriasPage,
          ProductoPage
        */
        LoginPage,
        HomePage,
        MapaPage,
        //MapaPage2,
        TabsPage,
        TerminosPage,
        MensajePage,
        HistorialPage,
        PorMensajePage,
        CallPage,
        BluetoothPage,
        BrowserPage,
       } from "../pages/index.paginas";


@NgModule({
  declarations: [
    MyApp,
    //ImagenPipe,
    HomePage,
    LoginPage,
    TabsPage,
    MapaPage,
    //MapaPage2,
    TerminosPage,
    MensajePage,
    HistorialPage,
    PorMensajePage,
    CallPage,
    BluetoothPage,
    BrowserPage,
    /*
    CarritoPage,
    CategoriasPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,

    ProductoPage
    */
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOLPLNra4lzA17qyXlhtOko3RWBnwzMEA'//'AIzaSyBxrEesxyKdQcrAVLfgfswFBZ57Z87VmlI' //'AIzaSyDjcG4qvuiEjmNE3y1v8Fl2GH68wtLnWFQ'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    MapaPage,
    //MapaPage2,
    TerminosPage,
    MensajePage,
    HistorialPage,
    PorMensajePage,
    CallPage,
    BluetoothPage,
    BrowserPage,
    /*
    CarritoPage,
    CategoriasPage,
    OrdenesPage,
    OrdenesDetallePage,
    PorCategoriasPage,
    ProductoPage
    */
  ],
  providers: [
    //proveedores y servicios ambos juntos como BluetoothService  y  BluetoothSerial
    StatusBar,
    SplashScreen,
    UsuarioService,
    UbicacionService,
    PushnotificationService,
    BasededatosService,
    ComandosService,
    BluetoothService,
    GoogleMaps,
    Geolocation,
    OneSignal,
    BluetoothSerial,
    Network,
    CallNumber,
    Keyboard,
    NativeAudio,
    //BackgroundMode,
    Camera,
    InAppBrowser,
    Device,
    AngularFireDatabase,
    SQLite,
    NativeRingtones,
    TextToSpeech,
    Toast,
    Media,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
