import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AuthGuardService as AuthGuard } from '../../services/auth/auth-guard.service';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { MapaPage } from '../mapa/mapa.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        //canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                outlet: 'home',
                //component: HomePage
                loadChildren: '../home/home.module#HomePageModule'
            },
            {
                path: 'mapa',
                outlet: 'mapa',
                //component: MapaPage
                loadChildren: '../mapa/mapa.module#MapaPageModule'
            },



        ]
    },
    {
        path: 'tabs',
        redirectTo: '/tabs/(home:home)',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule { }
