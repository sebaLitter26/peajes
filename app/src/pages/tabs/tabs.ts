import { Component } from '@angular/core';

import { HomePage, MapaPage, HistorialPage, CallPage, BluetoothPage, BrowserPage } from "../index.paginas";

// servicios / providers
import { PushnotificationService } from "../../providers/pushnotification";

@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {

    constructor(
        private _pushProvider: PushnotificationService,
    ) {

    }



    //tab1 = LoginPage;
    tab1 = HomePage;
    //tab2 = CategoriasPage;
    //tab3 = OrdenesPage;
    //tab4 = "Busqueda";
    tab2 = MapaPage;
    tab3 = HistorialPage;
    tab4 = CallPage;
    tab5 = BluetoothPage;
    tab6 = BrowserPage;


}
