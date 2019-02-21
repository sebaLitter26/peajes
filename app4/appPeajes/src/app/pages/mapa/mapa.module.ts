import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MapaRoutingModule } from './mapa-routing.module';


import { MapaPage } from './mapa.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MapaRoutingModule,
    ],
    declarations: [MapaPage]
})
export class MapaPageModule { }
