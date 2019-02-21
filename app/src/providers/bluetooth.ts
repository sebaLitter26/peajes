import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabase , AngularFireObject } from 'angularfire2/database';


//import { UsuarioService } from "./usuario";

@Injectable()
export class BluetoothService {


  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: Boolean;

  dato_recivido:string = "";

  //usuario: AngularFireObject<any[]>;
  //private watch:any;

  constructor( private bluetoothSerial: BluetoothSerial,
                private alertCtrl: AlertController,
               //private af: AngularFireModule,
               //private afDb: AngularFireDatabase,
               //private _us: UsuarioService
             ) {

        bluetoothSerial.enable();
        bluetoothSerial.isEnabled().then((data) => {
          console.log(data);
          this.startScanning();
        }, () => {
          console.log("bluetooth is not enabled trying to enable it");
              this.bluetoothSerial.enable().then(() => {
                  console.log("bluetooth got enabled hurray");
                    }, () => {
                      console.log("user did not enabled");
              })
        });

  }


// 00:21:13:01:69:D6


 startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        // alert(element.name);
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      });
  }
  //success = (data) => alert(data);
  //fail = (error) => alert(error);

 selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe((success) => {
              this.pairedDevices = success;
            },
              (err) => {
                  console.log(err);
              });
          }
        }
      ]
    });
    alert.present();

  }

 disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }


 mandarComando(comando : string){
      if(comando == "")
        return;
      this.bluetoothSerial.write(comando).then((success) => {
        console.log(success);
      },
        (err) => {
              console.log(err);
        });
  }

 obtener_datos(){
    // the success callback is called whenever data is received
    this.bluetoothSerial.read().then((data: any) => {
        console.log(data);
        this.dato_recivido = data;
    },
      (err)=>{
        console.log(err);
    });

  }


}
