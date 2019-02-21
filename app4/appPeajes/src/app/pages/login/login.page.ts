
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private auth: AuthService) {
        console.log('--LOGIN---');
    }

    ngOnInit() {

        console.log('--LOGIN---');
    }
    /*
        login() {
            this.auth.login();
        }
    */
}
