import { Component } from '@angular/core';
//import { NavParams, ViewController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";


@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html'
})
export class BrowserPage {


  url: string;

  constructor(private iab: InAppBrowser) { }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      //location:'no'
    }

    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create(url, '_self', options);
    browser.show();

   // Inject scripts, css and more with browser.X
  }


}
