import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';

// servicios / providers
import { UbicacionService } from "../../providers/index.services";


@Component({
    selector: 'mapa-page',
    templateUrl: 'mapa.html'
})
export class MapaPage {

    //ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyDjcG4qvuiEjmNE3y1v8Fl2GH68wtLnWFQ"

    // google maps zoom level
    zoom: number = 15;

    // initial center position for the map
    lat: number = -34.6567962;
    lng: number = -58.6234707;

    markers: any[] = [
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




    constructor(public navCtrl: NavController,
        public geolocation: Geolocation,
        public http: HttpClient,
        private _gps: UbicacionService,
    ) {

    }


    addBoton() {
        console.log("Presionaste boton");
        console.log(this._gps.actualPosition);

    }


    getMarkers() {
        this.http.get('assets/data/markers.json')
            .map((res) => res)
            .subscribe(data => {
                //this.addMarkersToMap(data);
            },
                (err: HttpErrorResponse) => {
                    console.log(err.error);
                    console.log(err.name);
                    console.log(err.message);
                });
    }





    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }
    /*
        mapClicked($event: MouseEvent) {
          this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            draggable: true
          });
        }
        */

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }


    ionViewDidLoad() {
        this.loadMap();

    }

    loadMap() {

        this.geolocation.getCurrentPosition().then((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

        }, (err) => {
            console.log(err);
        });


    }

}




// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
