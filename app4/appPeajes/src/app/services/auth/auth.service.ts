import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
//import { Device } from '@ionic-native/device/ngx';
import { BehaviorSubject } from 'rxjs';

import Auth0Cordova from '@auth0/cordova';
import Auth0 from 'auth0-js';

const auth0Config = {
    clientID: 'v60_endG_GtSBkttRrhkFOIRr3_SMhfq',
    domain: 'sebalitter.auth0.com',
    responseType: 'token id_token',
    audience: 'https://sebalitter.auth0.com/userinfo',
    scope: 'openid',
    redirectUri: location.href,//location.origin + '/login',
    //callbackURL: location.href,
};

const STORE_KEY = 'App-Peajes';

const TOKEN_KEY = 'id_token';
const TOKEN_EXPIRES = 'expires_at';
const TOKEN_ACCESS = 'access_token';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticationState = new BehaviorSubject(false);

    auth0 = new Auth0.WebAuth(auth0Config);

    session: any = null;

    constructor(
        private storage: Storage,
        private platform: Platform,
        //private device: Device,
        public jwt: JwtHelperService
    ) {

        this.platform.ready().then(() => {
            this.checkToken();
        });
    }

    // ...
    public isAuthenticated(): boolean {

        this.storage.get('token').then(token => {
            console.log('token isAuthenticated', token);
            return !this.jwt.isTokenExpired(token);
        });
        return this.authenticationState.value;
        // Check whether the token is expired and return
        // true or false
        //return !this.jwt.isTokenExpired(token);

        /*if(this.authenticationState.value && new Date().getTime() < this.session[TOKEN_EXPIRES])
           return this.authenticationState.value;
           */
    }


    checkToken() {


        this.storage.get(STORE_KEY).then(res => {
            console.log('dato_login', this.session, res);
            if (res && !this.jwt.isTokenExpired(res[TOKEN_KEY])) {
                console.log('dato_guardado', this.session, res);
                this.session = res;
                this.authenticationState.next(true);

            }
        });
    }

    login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            console.log('handleAuthentication authResult', authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
                //const loggedIn = this.isLoggedIn = true;
                //this.authenticationState.next(true);
                //this.isLoggedIn$.next(loggedIn);
                //this.router.navigate(['/tabs']);
            } else if (err) {
                this.logout();
                //const loggedIn = this.isLoggedIn = false;
                //this.isLoggedIn$.next(loggedIn);
                //this.authenticationState.next(false);
                //this.router.navigate(['/login']);
            }
            //console.log(this.isLoggedIn);
        });
    }



    setSession(authResult): void {
        console.log('authResult', authResult);
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        let session = {
            nombre: 'Sebastian',
            access_token: authResult.accessToken,
            id_token: authResult.idToken,
            expires_at: expiresAt,
            //uuid: this.device.uuid,
            //platform: this.device.platform,
            //version: this.device.version,
        };

        /*
                console.log('Device UUID is: ' + this.device.uuid);
                console.log('Device platform is: ' + this.device.platform);
                console.log('Device verision is: ' + this.device.version);
        */

        this.storage.set(STORE_KEY, session).then((resp) => {
            this.session = session;
            console.log('dato_guardado', this.session, resp);
            this.authenticationState.next(true);
        });
        //this.authenticationState.next(this.session[TOKEN_KEY] != null);

    }

    logout(): void {
        //this.authenticationState.next(!this.store(STORE_KEY, 'remove'));
        this.storage.remove(STORE_KEY).then((resp) => {
            this.session = null;
            console.log('dato_eliminado', this.session, resp);
            this.authenticationState.next(false);
        });


    }


    store(campo: string, accion: string, valor = null) {
        var resultado = false;
        let es_pc = this.platform.is('cordova');

        switch (accion) {
            case 'remove':
                if (es_pc) {
                    localStorage.removeItem(campo);
                    this.session = null;
                    resultado = true;

                } else {
                    this.storage.remove(campo).then(() => {
                        this.session = null;
                        resultado = true;
                    });
                }

                break;
            case 'editar':
                let dato = JSON.stringify(valor);
                if (es_pc) {
                    let dato_guardado = localStorage.setItem(campo, dato);
                    console.log('dato_guardado', dato_guardado);
                    if (dato_guardado)
                        resultado = valor;

                } else {
                    this.storage.set(campo, dato).then(() => {
                        resultado = valor;
                        console.log('dato_guardado', resultado, es_pc);
                    });
                }

                break;
            case 'leer':
                if (es_pc) {
                    resultado = JSON.parse(localStorage.getItem(campo));
                } else {
                    this.storage.get(campo).then((resp) => {

                        resultado = JSON.parse(resp);
                        console.log('dato_leido', resultado, es_pc);
                    });
                }

                break;
            default:
                resultado = false;
        }
        return resultado;
    }

}
