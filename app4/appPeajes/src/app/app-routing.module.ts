import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    //{ path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },//, canActivate: [AuthGuard] },
    {
        path: 'login',
        //outlet: 'login',
        loadChildren: './pages/login/login.module#LoginPageModule'
    },
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'maps', loadChildren: './pages/mapa/mapa.module#MapaPageModule' },//, canActivate: [AuthGuard] },
    { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },//, canActivate: [AuthGuard] },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
