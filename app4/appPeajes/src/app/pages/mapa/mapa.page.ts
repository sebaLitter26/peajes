import { Component, AfterViewInit, ViewChild, Renderer } from '@angular/core';

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as Control from 'ol/control';

declare var ol: any;

@Component({
    selector: 'app-mapa',
    templateUrl: 'mapa.page.html',
    styleUrls: ['mapa.page.scss'],
})
export class MapaPage {

    @ViewChild('map') map;

    constructor(public renderer: Renderer) {


    }

    ngAfterViewInit() {
        console.log('mapa', this.map);
        if (this.map) {
            console.log('entro mapa');
            this.initOSM();
        }
    }

    initOSM() {
        var map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: 'map',
            controls: Control.defaults({
                attributionOptions: ({
                    collapsible: false
                })
            }),
            view: new View({
                center: [-57.57109, -38.003038],
                zoom: 12
            })
        });
    }
}
