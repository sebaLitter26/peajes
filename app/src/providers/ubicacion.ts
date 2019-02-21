import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { CustomGeoposition } from "../modelos/CustomGeoposition";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import * as simplify from "simplify-js";

//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabase } from 'angularfire2/database';


//import { UsuarioService } from "./usuario";

@Injectable()
export class UbicacionService {

    //usuario: AngularFireObject<any[]>;
    private watch: any;
    // Here we set the min accuracy that we want to keep
    minAccuracy: number = 25;
    // This will determine how frequently we simplify and emit positions
    positionPile: number = 3;
    // We use positionArray to temporary store positions in order to simplify them later
    positionArray: CustomGeoposition[] = [];
    // We store the last position emitted here in order to avoid jumps that could be produced from simplification
    previousPosition: CustomGeoposition = null;
    // We define the Subject and the observable that will emit the position values to the subscribers
    private _actualPosition: BehaviorSubject<Geoposition> = new BehaviorSubject<Geoposition>(null);
    public actualPosition: Observable<Geoposition> = this._actualPosition.asObservable();

    constructor(private geolocation: Geolocation,
        //private af: AngularFireModule,
        //private afDb: AngularFireDatabase,
        //private _us: UsuarioService
    ) {
        //console.log('Hello Ubicacion Provider');
        /*
            if( !this._us.clave ){
              return;
            }

            this.usuario = this.afDb.object("/usuarios/" + this._us.clave );
        */
    }


    iniciar_localizacion() {

        this.watch = this.geolocation.watchPosition({ enableHighAccuracy: true })
            .filter((p) => p.coords !== undefined) //Filter Out Errors
            .subscribe(actualPosition => {
                // Check if the position is valid
                if (actualPosition.coords !== undefined) {
                    // Validate the position, if speed is 0 it means that user is stopped, so we don't need to track that, we also check the min accuracy
                    if (actualPosition.coords.speed > 0 && actualPosition.coords.accuracy < this.minAccuracy) {
                        //If the position is valid we push to our positions array
                        this.positionArray.push(new CustomGeoposition(actualPosition));
                        // Once we've reached the maximum stack of positions we process them
                        if (this.positionArray.length > this.positionPile) {
                            // Adding at first position the last position processed, to force simplification to start there
                            if (this.previousPosition == null) {
                                this.previousPosition = this.positionArray[0];
                            }
                            this.positionArray.unshift(this.previousPosition);
                            // Simplifying line
                            let filteredPoints = simplify(this.positionArray, 15, true);
                            // Resetting the array
                            this.positionArray = [];
                            filteredPoints.unshift(this.previousPosition);
                            // We call a method that will emit the simplified positions
                            this.parseFilteredPoints(filteredPoints);
                        }
                    }
                }
            }
                , error => {
                    console.log(error); //error handling
                });

    }

    detener_localizacion() {
        this.watch.unsubscribe();
    }


    // This method gets the array of simplified positions and emits them to the subscribers
    parseFilteredPoints(filteredPoints: CustomGeoposition[]) {
        filteredPoints.forEach(point => {
            this._actualPosition.next(point);
            this.previousPosition = point;
        });
    }

}
