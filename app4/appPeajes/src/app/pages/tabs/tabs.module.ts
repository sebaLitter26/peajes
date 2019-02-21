import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TabsRoutingModule } from './tabs-routing.module';


import { TabsPage } from './tabs.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsRoutingModule,
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {

}
