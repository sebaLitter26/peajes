
import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';


// servicios / providers
//import { BluetoothService } from "../../providers/bluetooth";

@Component({
    selector: 'page-bluetooth',
    templateUrl: 'bluetooth.html'
})
export class BluetoothPage {

    unpairedDevices: any;
    pairedDevices: any;
    gettingDevices: boolean;
    paired: boolean = false;
    comando: string = "";

    //dato_recivido

    constructor(
        //private _bt: BluetoothService, private alertCtrl: AlertController
    ) {

    }




}
