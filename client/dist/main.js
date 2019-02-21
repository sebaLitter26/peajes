(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"identity\" class=\"navigation col-lg-1\">\n\t<h1 class=\"head-title\">\n\t\t<a [routerLink]=\"['/']\">\n\t\t\t<span class=\"glyphicon glyphicon-music\" aria-hidden=\"true\"></span>\n\t   \t\t{{title}}\n\t\t</a>\n\t</h1>\n\t<nav id=\"navigation\">\n\t\t<a href=\"#\">\n\t\t\t<span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span>\n\t\t\tBuscar\n\t\t</a>\n\t\t<a [routerLink]=\"['/artistas', 1]\" [routerLinkActive]=\"['actived']\">\n\t\t\t<span class=\"glyphicon glyphicon-star\" aria-hidden=\"true\"></span>\n\t\t\tArtistas\n\t\t</a>\n\t\t<a href=\"#\">\n\t\t\t<span class=\"glyphicon glyphicon-book\" aria-hidden=\"true\"></span>\n\t\t\tAlbums\n\t\t</a>\n\t</nav>\n\n\t<nav id=\"user_logged\">\n\t\t<div class=\"user-image\">\n\t\t\t<img id=\"image-logged\" src=\"{{url + 'get-image-user/' + identity.image}}\"/>\n\t\t</div>\n\t\t<span id=\"identity_name\">\n\t\t\t{{identity.name}}\n\t\t</span>\n\n\t\t<a [routerLink]=\"['/mis-datos']\" [routerLinkActive]=\"['actived']\">\n\t\t\t<span class=\"glyphicon glyphicon-cog\" aria-hidden=\"true\"></span>\n\t\t\tMis datos\n\t\t</a>\n\t\t<a (click)=\"logout()\" class=\"btn-logout\">\n\t\t\t<span class=\"glyphicon glyphicon-log-out\" aria-hidden=\"true\"></span>\n\t\t\tSalir\n\t\t</a>\n\t</nav>\n</div>\n\n<div [class.hidden]=\"!identity\" class=\"central col-lg-11\">\n\t<router-outlet></router-outlet>\n\n\t<div class=\"clearfix\"></div>\n\t<player class=\"player\" *ngIf=\"identity\"></player>\n</div>\n\n<div class=\"col-lg-11\" *ngIf=\"!identity\">\n\t<div class=\"col-lg-6\">\n\t\t<h1>Identificate</h1>\n\t\t<div *ngIf=\"errorMessage\">\n\t\t\t<div class=\"alert alert-info\">\n\t\t\t  <strong>Error</strong> {{errorMessage}}\n\t\t\t</div>\n\t\t</div>\n\t\t<form #loginForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" class=\"col-md-7\">\n\t\t\t<p>\n\t\t\t\t<label>Correo electrónico:</label>\n\t\t\t\t<input type=\"email\" #email=\"ngModel\" name=\"email\" [(ngModel)]=\"user.email\" class=\"form-control\" required />\n\t\t\t\t<span *ngIf=\"!email.valid && email.touched\">\n\t\t\t\t\tEl email es obligatorio\n\t\t\t\t</span>\n\t\t\t</p>\n\n\t\t\t<p>\n\t\t\t\t<label>Contraseña:</label>\n\t\t\t\t<input type=\"password\" #password=\"ngModel\" name=\"password\" [(ngModel)]=\"user.password\" class=\"form-control\" required />\n\t\t\t</p>\n\n\t\t\t<input type=\"submit\" value=\"Entrar\" class=\"btn btn-primary\" />\n\t\t</form>\n\t</div>\n\n\t<div class=\"col-lg-6\">\n\t\t<h1>Registrate</h1>\n\t\t<div *ngIf=\"alertRegister\">\n\t\t\t<div class=\"alert alert-info\">\n\t\t\t  {{alertRegister}}\n\t\t\t</div>\n\t\t</div>\n\t\t<form #registerForm=\"ngForm\" (ngSubmit)=\"onSubmitRegister()\" class=\"col-md-10\">\n\t\t\t<p>\n\t\t\t\t<label>Nombre:</label>\n\t\t\t\t<input type=\"text\" #name=\"ngModel\" name=\"name\" [(ngModel)]=\"user_register.name\" class=\"form-control\" required />\n\t\t\t\t<span *ngIf=\"!name.valid && name.touched\">\n\t\t\t\t\tEl nombre es obligatorio\n\t\t\t\t</span>\n\t\t\t</p>\n\n\t\t\t<p>\n\t\t\t\t<label>Apellidos:</label>\n\t\t\t\t<input type=\"text\" #surname=\"ngModel\" name=\"surname\" [(ngModel)]=\"user_register.surname\" class=\"form-control\" required />\n\t\t\t\t<span *ngIf=\"!surname.valid && surname.touched\">\n\t\t\t\t\tLos apellidos son obligatorios\n\t\t\t\t</span>\n\t\t\t</p>\n\n\t\t\t<p>\n\t\t\t\t<label>Correo electrónico:</label>\n\t\t\t\t<input type=\"email\" #email=\"ngModel\" name=\"email\" [(ngModel)]=\"user_register.email\" class=\"form-control\" required />\n\t\t\t\t<span *ngIf=\"!email.valid && email.touched\">\n\t\t\t\t\tEl email es obligatorio\n\t\t\t\t</span>\n\t\t\t</p>\n\n\t\t\t<p>\n\t\t\t\t<label>Contraseña:</label>\n\t\t\t\t<input type=\"password\" #password=\"ngModel\" name=\"password\" [(ngModel)]=\"user_register.password\" class=\"form-control\" required />\n\t\t\t\t<span *ngIf=\"!password.valid && password.touched\">\n\t\t\t\t\tLa contraseña es obligatoria\n\t\t\t\t</span>\n\t\t\t</p>\n\n\t\t\t<input type=\"submit\" value=\"Regristrarse\" class=\"btn btn-primary\" />\n\n\t\t</form> \n\t</div>\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/user */ "./src/app/models/user.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(_route, _router, _userService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this.title = 'MUSIFY';
        this.user = new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"]('', '', '', '', '', 'ROLE_USER', '');
        this.user_register = new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"]('', '', '', '', '', 'ROLE_USER', '');
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        console.log(this.identity);
        console.log(this.token);
    };
    AppComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.user);
        // Conseguir los datos del usuario identificado
        this._userService.signup(this.user).subscribe(function (response) {
            var identity = response.user;
            _this.identity = identity;
            console.log(_this.identity);
            if (!_this.identity._id) {
                alert("El usuario no está correctamente identificado");
            }
            else {
                // Crear elemento en el localstorage para tener al usuario sesión
                localStorage.setItem('identity', JSON.stringify(identity));
                // Conseguir el token para enviarselo a cada petición http
                _this._userService.signup(_this.user, 'true').subscribe(function (response) {
                    var token = response.token;
                    _this.token = token;
                    if (_this.token.length <= 0) {
                        alert("El token no se ha generado correctamente");
                    }
                    else {
                        // Crear elemento en el localstorage para tener token disponible
                        localStorage.setItem('token', token);
                        _this.user = new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"]('', '', '', '', '', 'ROLE_USER', '');
                    }
                }, function (error) {
                    var errorMessage = error;
                    if (errorMessage != null) {
                        var body = JSON.parse(error._body);
                        _this.errorMessage = body.message;
                        console.log(error);
                    }
                });
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                _this.errorMessage = body.message;
                console.log(error);
            }
        });
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        localStorage.clear();
        this.identity = null;
        this.token = null;
        this._router.navigate(['/']);
    };
    AppComponent.prototype.onSubmitRegister = function () {
        var _this = this;
        console.log(this.user_register);
        this._userService.register(this.user_register).subscribe(function (response) {
            var user = response.user;
            _this.user_register = user;
            if (!user._id) {
                _this.alertRegister = 'Error al registrarse';
            }
            else {
                _this.alertRegister = 'El registro se ha realizado correctamente, identificate con ' + _this.user_register.email;
                _this.user_register = new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"]('', '', '', '', '', 'ROLE_USER', '');
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                _this.alertRegister = body.message;
                console.log(error);
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/home.component */ "./src/app/components/home.component.ts");
/* harmony import */ var _components_user_edit_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/user-edit.component */ "./src/app/components/user-edit.component.ts");
/* harmony import */ var _components_artist_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/artist-list.component */ "./src/app/components/artist-list.component.ts");
/* harmony import */ var _components_artist_add_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/artist-add.component */ "./src/app/components/artist-add.component.ts");
/* harmony import */ var _components_artist_edit_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/artist-edit.component */ "./src/app/components/artist-edit.component.ts");
/* harmony import */ var _components_artist_detail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/artist-detail.component */ "./src/app/components/artist-detail.component.ts");
/* harmony import */ var _components_album_add_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/album-add.component */ "./src/app/components/album-add.component.ts");
/* harmony import */ var _components_album_edit_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/album-edit.component */ "./src/app/components/album-edit.component.ts");
/* harmony import */ var _components_album_detail_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/album-detail.component */ "./src/app/components/album-detail.component.ts");
/* harmony import */ var _components_song_add_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/song-add.component */ "./src/app/components/song-add.component.ts");
/* harmony import */ var _components_song_edit_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/song-edit.component */ "./src/app/components/song-edit.component.ts");
/* harmony import */ var _components_player_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/player.component */ "./src/app/components/player.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// general


// user

// artist




//album



// song



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _components_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                _components_user_edit_component__WEBPACK_IMPORTED_MODULE_7__["UserEditComponent"],
                _components_artist_list_component__WEBPACK_IMPORTED_MODULE_8__["ArtistListComponent"],
                _components_artist_add_component__WEBPACK_IMPORTED_MODULE_9__["ArtistAddComponent"],
                _components_artist_edit_component__WEBPACK_IMPORTED_MODULE_10__["ArtistEditComponent"],
                _components_artist_detail_component__WEBPACK_IMPORTED_MODULE_11__["ArtistDetailComponent"],
                _components_album_add_component__WEBPACK_IMPORTED_MODULE_12__["AlbumAddComponent"],
                _components_album_edit_component__WEBPACK_IMPORTED_MODULE_13__["AlbumEditComponent"],
                _components_album_detail_component__WEBPACK_IMPORTED_MODULE_14__["AlbumDetailComponent"],
                _components_song_add_component__WEBPACK_IMPORTED_MODULE_15__["SongAddComponent"],
                _components_song_edit_component__WEBPACK_IMPORTED_MODULE_16__["SongEditComponent"],
                _components_player_component__WEBPACK_IMPORTED_MODULE_17__["PlayerComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_3__["HttpModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_4__["routing"]
            ],
            providers: [_app_routing__WEBPACK_IMPORTED_MODULE_4__["appRoutingProviders"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: appRoutingProviders, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutingProviders", function() { return appRoutingProviders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/home.component */ "./src/app/components/home.component.ts");
/* harmony import */ var _components_user_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/user-edit.component */ "./src/app/components/user-edit.component.ts");
/* harmony import */ var _components_artist_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/artist-list.component */ "./src/app/components/artist-list.component.ts");
/* harmony import */ var _components_artist_add_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/artist-add.component */ "./src/app/components/artist-add.component.ts");
/* harmony import */ var _components_artist_edit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/artist-edit.component */ "./src/app/components/artist-edit.component.ts");
/* harmony import */ var _components_artist_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/artist-detail.component */ "./src/app/components/artist-detail.component.ts");
/* harmony import */ var _components_album_add_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/album-add.component */ "./src/app/components/album-add.component.ts");
/* harmony import */ var _components_album_edit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/album-edit.component */ "./src/app/components/album-edit.component.ts");
/* harmony import */ var _components_album_detail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/album-detail.component */ "./src/app/components/album-detail.component.ts");
/* harmony import */ var _components_song_add_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/song-add.component */ "./src/app/components/song-add.component.ts");
/* harmony import */ var _components_song_edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/song-edit.component */ "./src/app/components/song-edit.component.ts");

// import user


// import artist




// import album



// import song


var appRoutes = [
    { path: '', component: _components_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] },
    { path: 'artistas/:page', component: _components_artist_list_component__WEBPACK_IMPORTED_MODULE_3__["ArtistListComponent"] },
    { path: 'crear-artista', component: _components_artist_add_component__WEBPACK_IMPORTED_MODULE_4__["ArtistAddComponent"] },
    { path: 'editar-artista/:id', component: _components_artist_edit_component__WEBPACK_IMPORTED_MODULE_5__["ArtistEditComponent"] },
    { path: 'artista/:id', component: _components_artist_detail_component__WEBPACK_IMPORTED_MODULE_6__["ArtistDetailComponent"] },
    { path: 'crear-album/:artist', component: _components_album_add_component__WEBPACK_IMPORTED_MODULE_7__["AlbumAddComponent"] },
    { path: 'editar-album/:id', component: _components_album_edit_component__WEBPACK_IMPORTED_MODULE_8__["AlbumEditComponent"] },
    { path: 'album/:id', component: _components_album_detail_component__WEBPACK_IMPORTED_MODULE_9__["AlbumDetailComponent"] },
    { path: 'crear-tema/:album', component: _components_song_add_component__WEBPACK_IMPORTED_MODULE_10__["SongAddComponent"] },
    { path: 'editar-tema/:id', component: _components_song_edit_component__WEBPACK_IMPORTED_MODULE_11__["SongEditComponent"] },
    { path: 'mis-datos', component: _components_user_edit_component__WEBPACK_IMPORTED_MODULE_2__["UserEditComponent"] },
    { path: '**', component: _components_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"] }
];
var appRoutingProviders = [];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes);


/***/ }),

/***/ "./src/app/components/album-add.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/album-add.component.ts ***!
  \***************************************************/
/*! exports provided: AlbumAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlbumAddComponent", function() { return AlbumAddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_artist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/artist.service */ "./src/app/services/artist.service.ts");
/* harmony import */ var _services_album_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/album.service */ "./src/app/services/album.service.ts");
/* harmony import */ var _models_album__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/album */ "./src/app/models/album.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AlbumAddComponent = /** @class */ (function () {
    function AlbumAddComponent(_route, _router, _userService, _albumService, _artistService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._albumService = _albumService;
        this._artistService = _artistService;
        this.titulo = 'Crear nuevo album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.album = new _models_album__WEBPACK_IMPORTED_MODULE_6__["Album"]('', '', 2017, '', '');
    }
    AlbumAddComponent.prototype.ngOnInit = function () {
        console.log('album-add.component.ts cargado');
    };
    AlbumAddComponent.prototype.onSubmit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var artist_id = params['artist'];
            _this.album.artist = artist_id;
            _this._albumService.addAlbum(_this.token, _this.album).subscribe(function (response) {
                if (!response.album) {
                    _this.alertMessage = 'Error en el servidor';
                }
                else {
                    _this.alertMessage = '¡El album se ha creado correctamente!';
                    _this.album = response.album;
                    _this._router.navigate(['/editar-album', response.album._id]);
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    _this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    AlbumAddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'album-add',
            template: __webpack_require__(/*! ../views/album-add.html */ "./src/app/views/album-add.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"], _services_album_service__WEBPACK_IMPORTED_MODULE_5__["AlbumService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_album_service__WEBPACK_IMPORTED_MODULE_5__["AlbumService"],
            _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"]])
    ], AlbumAddComponent);
    return AlbumAddComponent;
}());



/***/ }),

/***/ "./src/app/components/album-detail.component.ts":
/*!******************************************************!*\
  !*** ./src/app/components/album-detail.component.ts ***!
  \******************************************************/
/*! exports provided: AlbumDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlbumDetailComponent", function() { return AlbumDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_album_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/album.service */ "./src/app/services/album.service.ts");
/* harmony import */ var _services_song_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/song.service */ "./src/app/services/song.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AlbumDetailComponent = /** @class */ (function () {
    function AlbumDetailComponent(_route, _router, _userService, _albumService, _songService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._albumService = _albumService;
        this._songService = _songService;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
    }
    AlbumDetailComponent.prototype.ngOnInit = function () {
        console.log('album-detail.component.ts cargado');
        // Sacar album de la bbdd
        this.getAlbum();
    };
    AlbumDetailComponent.prototype.getAlbum = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._albumService.getAlbum(_this.token, id).subscribe(function (response) {
                if (!response.album) {
                    _this._router.navigate(['/']);
                }
                else {
                    _this.album = response.album;
                    // Sacar las canciones
                    _this._songService.getSongs(_this.token, response.album._id).subscribe(function (response) {
                        if (!response.songs) {
                            _this.alertMessage = 'Este album no tiene canciones';
                        }
                        else {
                            _this.songs = response.songs;
                        }
                    }, function (error) {
                        var errorMessage = error;
                        if (errorMessage != null) {
                            var body = JSON.parse(error._body);
                            //this.alertMessage = body.message;
                            console.log(error);
                        }
                    });
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    AlbumDetailComponent.prototype.onDeleteConfirm = function (id) {
        this.confirmado = id;
    };
    AlbumDetailComponent.prototype.onCancelSong = function () {
        this.confirmado = null;
    };
    AlbumDetailComponent.prototype.onDeleteSong = function (id) {
        var _this = this;
        this._songService.deleteSong(this.token, id).subscribe(function (response) {
            if (!response.song) {
                alert('Error ene el servidor');
            }
            _this.getAlbum();
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;
                console.log(error);
            }
        });
    };
    AlbumDetailComponent.prototype.startPlayer = function (song) {
        var song_player = JSON.stringify(song);
        var file_path = this.url + 'get-song-file/' + song.file;
        var image_path = this.url + 'get-image-album/' + song.album.image;
        localStorage.setItem('sound_song', song_player);
        document.getElementById("mp3-source").setAttribute("src", file_path);
        document.getElementById("player").load();
        document.getElementById("player").play();
        document.getElementById('play-song-title').innerHTML = song.name;
        document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
        document.getElementById('play-image-album').setAttribute('src', image_path);
    };
    AlbumDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'album-detail',
            template: __webpack_require__(/*! ../views/album-detail.html */ "./src/app/views/album-detail.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_album_service__WEBPACK_IMPORTED_MODULE_4__["AlbumService"], _services_song_service__WEBPACK_IMPORTED_MODULE_5__["SongService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_album_service__WEBPACK_IMPORTED_MODULE_4__["AlbumService"],
            _services_song_service__WEBPACK_IMPORTED_MODULE_5__["SongService"]])
    ], AlbumDetailComponent);
    return AlbumDetailComponent;
}());



/***/ }),

/***/ "./src/app/components/album-edit.component.ts":
/*!****************************************************!*\
  !*** ./src/app/components/album-edit.component.ts ***!
  \****************************************************/
/*! exports provided: AlbumEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlbumEditComponent", function() { return AlbumEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/upload.service */ "./src/app/services/upload.service.ts");
/* harmony import */ var _services_album_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/album.service */ "./src/app/services/album.service.ts");
/* harmony import */ var _models_album__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/album */ "./src/app/models/album.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AlbumEditComponent = /** @class */ (function () {
    function AlbumEditComponent(_route, _router, _userService, _uploadService, _albumService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._uploadService = _uploadService;
        this._albumService = _albumService;
        this.titulo = 'Editar album';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.album = new _models_album__WEBPACK_IMPORTED_MODULE_6__["Album"]('', '', 2017, '', '');
        this.is_edit = true;
    }
    AlbumEditComponent.prototype.ngOnInit = function () {
        console.log('album-edit.component.ts cargado');
        // Conseguir el album
        this.getAlbum();
    };
    AlbumEditComponent.prototype.getAlbum = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._albumService.getAlbum(_this.token, id).subscribe(function (response) {
                if (!response.album) {
                    _this._router.navigate(['/']);
                }
                else {
                    _this.album = response.album;
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    console.log(error);
                }
            });
        });
    };
    AlbumEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._albumService.editAlbum(_this.token, id, _this.album).subscribe(function (response) {
                if (!response.album) {
                    _this.alertMessage = 'Error en el servidor';
                }
                else {
                    _this.alertMessage = '¡El album se ha actualizado correctamente!';
                    if (!_this.filesToUpload) {
                        // Redirigir
                        _this._router.navigate(['/artista', response.album.artist]);
                    }
                    else {
                        // Subir la imagen del alblum
                        _this._uploadService.makeFileRequest(_this.url + 'upload-image-album/' + id, [], _this.filesToUpload, _this.token, 'image')
                            .then(function (result) {
                            _this._router.navigate(['/artista', response.album.artist]);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    _this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    AlbumEditComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    AlbumEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'album-edit',
            template: __webpack_require__(/*! ../views/album-add.html */ "./src/app/views/album-add.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_album_service__WEBPACK_IMPORTED_MODULE_5__["AlbumService"], _services_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"],
            _services_album_service__WEBPACK_IMPORTED_MODULE_5__["AlbumService"]])
    ], AlbumEditComponent);
    return AlbumEditComponent;
}());



/***/ }),

/***/ "./src/app/components/artist-add.component.ts":
/*!****************************************************!*\
  !*** ./src/app/components/artist-add.component.ts ***!
  \****************************************************/
/*! exports provided: ArtistAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArtistAddComponent", function() { return ArtistAddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_artist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/artist.service */ "./src/app/services/artist.service.ts");
/* harmony import */ var _models_artist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/artist */ "./src/app/models/artist.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ArtistAddComponent = /** @class */ (function () {
    function ArtistAddComponent(_route, _router, _userService, _artistService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._artistService = _artistService;
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.artist = new _models_artist__WEBPACK_IMPORTED_MODULE_5__["Artist"]('', '', '');
    }
    ArtistAddComponent.prototype.ngOnInit = function () {
        console.log('artist-add.component.ts cargado');
    };
    ArtistAddComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.artist);
        this._artistService.addArtist(this.token, this.artist).subscribe(function (response) {
            if (!response.artist) {
                _this.alertMessage = 'Error en el servidor';
            }
            else {
                _this.alertMessage = '¡El artista se ha creado correctamente!';
                _this.artist = response.artist;
                _this._router.navigate(['/editar-artista', response.artist._id]);
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                _this.alertMessage = body.message;
                console.log(error);
            }
        });
    };
    ArtistAddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'artist-add',
            template: __webpack_require__(/*! ../views/artist-add.html */ "./src/app/views/artist-add.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"]])
    ], ArtistAddComponent);
    return ArtistAddComponent;
}());



/***/ }),

/***/ "./src/app/components/artist-detail.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/artist-detail.component.ts ***!
  \*******************************************************/
/*! exports provided: ArtistDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArtistDetailComponent", function() { return ArtistDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_artist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/artist.service */ "./src/app/services/artist.service.ts");
/* harmony import */ var _services_album_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/album.service */ "./src/app/services/album.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ArtistDetailComponent = /** @class */ (function () {
    function ArtistDetailComponent(_route, _router, _userService, _artistService, _albumService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._artistService = _artistService;
        this._albumService = _albumService;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
    }
    ArtistDetailComponent.prototype.ngOnInit = function () {
        console.log('artist-edit.component.ts cargado');
        // Llamar al metodo del api para sacar un artista en base a su id getArtist
        this.getArtist();
    };
    ArtistDetailComponent.prototype.getArtist = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._artistService.getArtist(_this.token, id).subscribe(function (response) {
                if (!response.artist) {
                    _this._router.navigate(['/']);
                }
                else {
                    _this.artist = response.artist;
                    // Sacar los albums del artista
                    _this._albumService.getAlbums(_this.token, response.artist._id).subscribe(function (response) {
                        if (!response.albums) {
                            _this.alertMessage = 'Este artista no tiene albums';
                        }
                        else {
                            _this.albums = response.albums;
                        }
                    }, function (error) {
                        var errorMessage = error;
                        if (errorMessage != null) {
                            var body = JSON.parse(error._body);
                            //this.alertMessage = body.message;
                            console.log(error);
                        }
                    });
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    ArtistDetailComponent.prototype.onDeleteConfirm = function (id) {
        this.confirmado = id;
    };
    ArtistDetailComponent.prototype.onCancelAlbum = function () {
        this.confirmado = null;
    };
    ArtistDetailComponent.prototype.onDeleteAlbum = function (id) {
        var _this = this;
        this._albumService.deleteAlbum(this.token, id).subscribe(function (response) {
            if (!response.album) {
                alert('Error en el servidor');
            }
            _this.getArtist();
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;
                console.log(error);
            }
        });
    };
    ArtistDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'artist-detail',
            template: __webpack_require__(/*! ../views/artist-detail.html */ "./src/app/views/artist-detail.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"], _services_album_service__WEBPACK_IMPORTED_MODULE_5__["AlbumService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"],
            _services_album_service__WEBPACK_IMPORTED_MODULE_5__["AlbumService"]])
    ], ArtistDetailComponent);
    return ArtistDetailComponent;
}());



/***/ }),

/***/ "./src/app/components/artist-edit.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/artist-edit.component.ts ***!
  \*****************************************************/
/*! exports provided: ArtistEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArtistEditComponent", function() { return ArtistEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/upload.service */ "./src/app/services/upload.service.ts");
/* harmony import */ var _services_artist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/artist.service */ "./src/app/services/artist.service.ts");
/* harmony import */ var _models_artist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/artist */ "./src/app/models/artist.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ArtistEditComponent = /** @class */ (function () {
    function ArtistEditComponent(_route, _router, _userService, _uploadService, _artistService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._uploadService = _uploadService;
        this._artistService = _artistService;
        this.titulo = 'Editar artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.artist = new _models_artist__WEBPACK_IMPORTED_MODULE_6__["Artist"]('', '', '');
        this.is_edit = true;
    }
    ArtistEditComponent.prototype.ngOnInit = function () {
        console.log('artist-edit.component.ts cargado');
        // Llamar al metodo del api para sacar un artista en base a su id getArtist
        this.getArtist();
    };
    ArtistEditComponent.prototype.getArtist = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._artistService.getArtist(_this.token, id).subscribe(function (response) {
                if (!response.artist) {
                    _this._router.navigate(['/']);
                }
                else {
                    _this.artist = response.artist;
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    ArtistEditComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.artist);
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._artistService.editArtist(_this.token, id, _this.artist).subscribe(function (response) {
                if (!response.artist) {
                    _this.alertMessage = 'Error en el servidor';
                }
                else {
                    _this.alertMessage = '¡El artista se ha actualizado correctamente!';
                    if (!_this.filesToUpload) {
                        _this._router.navigate(['/artista', response.artist._id]);
                    }
                    else {
                        //Subir la imagen del artista
                        _this._uploadService.makeFileRequest(_this.url + 'upload-image-artist/' + id, [], _this.filesToUpload, _this.token, 'image')
                            .then(function (result) {
                            _this._router.navigate(['/artista', response.artist._id]);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    _this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    ArtistEditComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    ArtistEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'artist-edit',
            template: __webpack_require__(/*! ../views/artist-add.html */ "./src/app/views/artist-add.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_artist_service__WEBPACK_IMPORTED_MODULE_5__["ArtistService"], _services_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"],
            _services_artist_service__WEBPACK_IMPORTED_MODULE_5__["ArtistService"]])
    ], ArtistEditComponent);
    return ArtistEditComponent;
}());



/***/ }),

/***/ "./src/app/components/artist-list.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/artist-list.component.ts ***!
  \*****************************************************/
/*! exports provided: ArtistListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArtistListComponent", function() { return ArtistListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_artist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/artist.service */ "./src/app/services/artist.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ArtistListComponent = /** @class */ (function () {
    function ArtistListComponent(_route, _router, _artistService, _userService) {
        this._route = _route;
        this._router = _router;
        this._artistService = _artistService;
        this._userService = _userService;
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.next_page = 1;
        this.prev_page = 1;
    }
    ArtistListComponent.prototype.ngOnInit = function () {
        console.log('artist-list.component.ts cargado');
        // Conseguir el listado de artistas
        this.getArtists();
    };
    ArtistListComponent.prototype.getArtists = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var page = +params['page'];
            if (!page) {
                page = 1;
            }
            else {
                _this.next_page = page + 1;
                _this.prev_page = page - 1;
                if (_this.prev_page == 0) {
                    _this.prev_page = 1;
                }
            }
            _this._artistService.getArtists(_this.token, page).subscribe(function (response) {
                if (!response.artists) {
                    _this._router.navigate(['/']);
                }
                else {
                    _this.artists = response.artists;
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    ArtistListComponent.prototype.onDeleteConfirm = function (id) {
        this.confirmado = id;
    };
    ArtistListComponent.prototype.onCancelArtist = function () {
        this.confirmado = null;
    };
    ArtistListComponent.prototype.onDeleteArtist = function (id) {
        var _this = this;
        this._artistService.deleteArtist(this.token, id).subscribe(function (response) {
            if (!response.artist) {
                alert('Error en el servidor');
            }
            _this.getArtists();
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;
                console.log(error);
            }
        });
    };
    ArtistListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'artist-list',
            template: __webpack_require__(/*! ../views/artist-list.html */ "./src/app/views/artist-list.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_artist_service__WEBPACK_IMPORTED_MODULE_4__["ArtistService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], ArtistListComponent);
    return ArtistListComponent;
}());



/***/ }),

/***/ "./src/app/components/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/components/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(_route, _router) {
        this._route = _route;
        this._router = _router;
        this.titulo = 'Artistas';
    }
    HomeComponent.prototype.ngOnInit = function () {
        console.log('home.component.ts cargado');
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'home',
            template: __webpack_require__(/*! ../views/home.html */ "./src/app/views/home.html")
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/player.component.ts":
/*!************************************************!*\
  !*** ./src/app/components/player.component.ts ***!
  \************************************************/
/*! exports provided: PlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerComponent", function() { return PlayerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_song__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/song */ "./src/app/models/song.ts");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlayerComponent = /** @class */ (function () {
    function PlayerComponent() {
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
    }
    PlayerComponent.prototype.ngOnInit = function () {
        console.log('player cargado');
        var song = JSON.parse(localStorage.getItem('sound_song'));
        if (song) {
            this.song = song;
        }
        else {
            this.song = new _models_song__WEBPACK_IMPORTED_MODULE_1__["Song"](1, "", "", "", "");
        }
    };
    PlayerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'player',
            template: "\n\t<div class=\"album-image\">\n\t\t<span *ngIf=\"song.album\">\n\t\t\t<img id=\"play-image-album\" src=\"{{ url + 'get-image-album/' + song.album.image}}\" />\n\t\t</span>\n\n\t\t<span *ngIf=\"!song.album\">\n\t\t\t<img id=\"play-image-album\" src=\"assets/images/default.jpg\" />\n\t\t</span>\n\t</div>\n\n\t<div class=\"audio-file\">\n\t\t<p>Reproduciendo</p>\n\t\t<span id=\"play-song-title\">\n\t\t\t{{song.name}}\n\t\t</span>\n\t\t|\n\t\t<span id=\"play-song-artist\">\n\t\t\t<span *ngIf=\"song.album.artist\">\n\t\t\t\t{{song.album.artist.name}}\n\t\t\t</span>\n\t\t</span>\n\t\t<audio controls id=\"player\">\n\t\t\t<source id=\"mp3-source\" src=\"{{ url + 'get-song-file/' + song.file }}\" type=\"audio/mpeg\">\n\t\t\tTu navegador no es compatible con HTML5\n\t\t</audio>\n\t</div>\n\n\t"
        }),
        __metadata("design:paramtypes", [])
    ], PlayerComponent);
    return PlayerComponent;
}());



/***/ }),

/***/ "./src/app/components/song-add.component.ts":
/*!**************************************************!*\
  !*** ./src/app/components/song-add.component.ts ***!
  \**************************************************/
/*! exports provided: SongAddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongAddComponent", function() { return SongAddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_song_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/song.service */ "./src/app/services/song.service.ts");
/* harmony import */ var _models_song__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/song */ "./src/app/models/song.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SongAddComponent = /** @class */ (function () {
    function SongAddComponent(_route, _router, _userService, _songService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._songService = _songService;
        this.titulo = 'Crear nueva canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.song = new _models_song__WEBPACK_IMPORTED_MODULE_5__["Song"](1, '', '', '', '');
    }
    SongAddComponent.prototype.ngOnInit = function () {
        console.log('song-add.component.ts cargado');
    };
    SongAddComponent.prototype.onSubmit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var album_id = params['album'];
            _this.song.album = album_id;
            _this._songService.addSong(_this.token, _this.song).subscribe(function (response) {
                if (!response.song) {
                    _this.alertMessage = 'Error en el servidor';
                }
                else {
                    _this.alertMessage = '¡La canción se ha creado correctamente!';
                    _this.song = response.song;
                    _this._router.navigate(['/editar-tema', response.song._id]);
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    _this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    SongAddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'song-add',
            template: __webpack_require__(/*! ../views/song-add.html */ "./src/app/views/song-add.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_song_service__WEBPACK_IMPORTED_MODULE_4__["SongService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_song_service__WEBPACK_IMPORTED_MODULE_4__["SongService"]])
    ], SongAddComponent);
    return SongAddComponent;
}());



/***/ }),

/***/ "./src/app/components/song-edit.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/song-edit.component.ts ***!
  \***************************************************/
/*! exports provided: SongEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongEditComponent", function() { return SongEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_upload_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/upload.service */ "./src/app/services/upload.service.ts");
/* harmony import */ var _services_song_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/song.service */ "./src/app/services/song.service.ts");
/* harmony import */ var _models_song__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/song */ "./src/app/models/song.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SongEditComponent = /** @class */ (function () {
    function SongEditComponent(_route, _router, _userService, _uploadService, _songService) {
        this._route = _route;
        this._router = _router;
        this._userService = _userService;
        this._uploadService = _uploadService;
        this._songService = _songService;
        this.titulo = 'Editar canción';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
        this.song = new _models_song__WEBPACK_IMPORTED_MODULE_6__["Song"](1, '', '', '', '');
        this.is_edit = true;
    }
    SongEditComponent.prototype.ngOnInit = function () {
        console.log('song-edit.component.ts cargado');
        // Sacar la canción a editar
        this.getSong();
    };
    SongEditComponent.prototype.getSong = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._songService.getSong(_this.token, id).subscribe(function (response) {
                if (!response.song) {
                    _this._router.navigate(['/']);
                }
                else {
                    _this.song = response.song;
                    console.log(_this.song);
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    //this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    SongEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this._route.params.forEach(function (params) {
            var id = params['id'];
            _this._songService.editSong(_this.token, id, _this.song).subscribe(function (response) {
                if (!response.song) {
                    _this.alertMessage = 'Error en el servidor';
                }
                else {
                    _this.alertMessage = '¡La canción se ha actualizamos correctamente!';
                    if (!_this.filesToUpload) {
                        _this._router.navigate(['/album', response.song.album]);
                    }
                    else {
                        // Subir el fichero de audio
                        _this._uploadService.makeFileRequest(_this.url + 'upload-file-song/' + id, [], _this.filesToUpload, _this.token, 'file')
                            .then(function (result) {
                            _this._router.navigate(['/album', response.song.album]);
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            }, function (error) {
                var errorMessage = error;
                if (errorMessage != null) {
                    var body = JSON.parse(error._body);
                    _this.alertMessage = body.message;
                    console.log(error);
                }
            });
        });
    };
    SongEditComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    SongEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'song-edit',
            template: __webpack_require__(/*! ../views/song-add.html */ "./src/app/views/song-add.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _services_song_service__WEBPACK_IMPORTED_MODULE_5__["SongService"], _services_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _services_upload_service__WEBPACK_IMPORTED_MODULE_4__["UploadService"],
            _services_song_service__WEBPACK_IMPORTED_MODULE_5__["SongService"]])
    ], SongEditComponent);
    return SongEditComponent;
}());



/***/ }),

/***/ "./src/app/components/user-edit.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/user-edit.component.ts ***!
  \***************************************************/
/*! exports provided: UserEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserEditComponent", function() { return UserEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/global */ "./src/app/services/global.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(_userService) {
        this._userService = _userService;
        this.titulo = 'Actualizar mis datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = _services_global__WEBPACK_IMPORTED_MODULE_1__["GLOBAL"].url;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        console.log('user-edit.component.ts cargado');
    };
    UserEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this._userService.updateUser(this.user).subscribe(function (response) {
            if (!response.user) {
                _this.alertMessage = 'El usuario no se ha actualizado';
            }
            else {
                //this.user = response.user;
                localStorage.setItem('identity', JSON.stringify(_this.user));
                document.getElementById("identity_name").innerHTML = _this.user.name;
                if (!_this.filesToUpload) {
                    // Redireccion
                }
                else {
                    _this.makeFileRequest(_this.url + 'upload-image-user/' + _this.user._id, [], _this.filesToUpload).then(function (result) {
                        _this.user.image = result.image;
                        localStorage.setItem('identity', JSON.stringify(_this.user));
                        var image_path = _this.url + 'get-image-user/' + _this.user.image;
                        document.getElementById('image-logged').setAttribute('src', image_path);
                    });
                }
                _this.alertMessage = 'Datos actualizados correctamente';
            }
        }, function (error) {
            var errorMessage = error;
            if (errorMessage != null) {
                var body = JSON.parse(error._body);
                _this.alertMessage = body.message;
                console.log(error);
            }
        });
    };
    UserEditComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    UserEditComponent.prototype.makeFileRequest = function (url, params, files) {
        var token = this.token;
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append('image', files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    };
    UserEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'user-edit',
            template: __webpack_require__(/*! ../views/user-edit.html */ "./src/app/views/user-edit.html"),
            providers: [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]]
        }),
        __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], UserEditComponent);
    return UserEditComponent;
}());



/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! exports provided: AppComponent, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]; });

/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.module */ "./src/app/app.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return _app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]; });





/***/ }),

/***/ "./src/app/models/album.ts":
/*!*********************************!*\
  !*** ./src/app/models/album.ts ***!
  \*********************************/
/*! exports provided: Album */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Album", function() { return Album; });
var Album = /** @class */ (function () {
    function Album(title, description, year, image, artist) {
        this.title = title;
        this.description = description;
        this.year = year;
        this.image = image;
        this.artist = artist;
    }
    return Album;
}());



/***/ }),

/***/ "./src/app/models/artist.ts":
/*!**********************************!*\
  !*** ./src/app/models/artist.ts ***!
  \**********************************/
/*! exports provided: Artist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Artist", function() { return Artist; });
var Artist = /** @class */ (function () {
    function Artist(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }
    return Artist;
}());



/***/ }),

/***/ "./src/app/models/song.ts":
/*!********************************!*\
  !*** ./src/app/models/song.ts ***!
  \********************************/
/*! exports provided: Song */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Song", function() { return Song; });
var Song = /** @class */ (function () {
    function Song(number, name, duration, file, album) {
        this.number = number;
        this.name = name;
        this.duration = duration;
        this.file = file;
        this.album = album;
    }
    return Song;
}());



/***/ }),

/***/ "./src/app/models/user.ts":
/*!********************************!*\
  !*** ./src/app/models/user.ts ***!
  \********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var User = /** @class */ (function () {
    function User(_id, name, surname, email, password, role, image) {
        this._id = _id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.image = image;
    }
    return User;
}());



/***/ }),

/***/ "./src/app/services/album.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/album.service.ts ***!
  \*******************************************/
/*! exports provided: AlbumService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlbumService", function() { return AlbumService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AlbumService = /** @class */ (function () {
    function AlbumService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["GLOBAL"].url;
    }
    AlbumService.prototype.getAlbums = function (token, artistId) {
        if (artistId === void 0) { artistId = null; }
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        if (artistId == null) {
            return this._http.get(this.url + 'albums', options)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
        }
        else {
            return this._http.get(this.url + 'albums/' + artistId, options)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
        }
    };
    AlbumService.prototype.getAlbum = function (token, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.get(this.url + 'album/' + id, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    AlbumService.prototype.addAlbum = function (token, album) {
        var params = JSON.stringify(album);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'album', params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    AlbumService.prototype.editAlbum = function (token, id, album) {
        var params = JSON.stringify(album);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'album/' + id, params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    AlbumService.prototype.deleteAlbum = function (token, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.delete(this.url + 'album/' + id, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    AlbumService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], AlbumService);
    return AlbumService;
}());



/***/ }),

/***/ "./src/app/services/artist.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/artist.service.ts ***!
  \********************************************/
/*! exports provided: ArtistService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArtistService", function() { return ArtistService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArtistService = /** @class */ (function () {
    function ArtistService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["GLOBAL"].url;
    }
    ArtistService.prototype.getArtists = function (token, page) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.get(this.url + 'artists/' + page, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    ArtistService.prototype.getArtist = function (token, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.get(this.url + 'artist/' + id, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    ArtistService.prototype.addArtist = function (token, artist) {
        var params = JSON.stringify(artist);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'artist', params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    ArtistService.prototype.editArtist = function (token, id, artist) {
        var params = JSON.stringify(artist);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'artist/' + id, params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    ArtistService.prototype.deleteArtist = function (token, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.delete(this.url + 'artist/' + id, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    ArtistService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], ArtistService);
    return ArtistService;
}());



/***/ }),

/***/ "./src/app/services/global.ts":
/*!************************************!*\
  !*** ./src/app/services/global.ts ***!
  \************************************/
/*! exports provided: GLOBAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL", function() { return GLOBAL; });
var GLOBAL = {
    url: 'http://35.227.126.56:3977/api/',
    ip: '127.0.0.1'
};


/***/ }),

/***/ "./src/app/services/song.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/song.service.ts ***!
  \******************************************/
/*! exports provided: SongService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongService", function() { return SongService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SongService = /** @class */ (function () {
    function SongService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["GLOBAL"].url;
    }
    SongService.prototype.getSongs = function (token, albumId) {
        if (albumId === void 0) { albumId = null; }
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        if (albumId == null) {
            return this._http.get(this.url + 'songs', options)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
        }
        else {
            return this._http.get(this.url + 'songs/' + albumId, options)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
        }
    };
    SongService.prototype.getSong = function (token, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.get(this.url + 'song/' + id, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    SongService.prototype.addSong = function (token, song) {
        var params = JSON.stringify(song);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'song', params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    SongService.prototype.editSong = function (token, id, song) {
        var params = JSON.stringify(song);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'song/' + id, params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    SongService.prototype.deleteSong = function (token, id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({ headers: headers });
        return this._http.delete(this.url + 'song/' + id, options)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    SongService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], SongService);
    return SongService;
}());



/***/ }),

/***/ "./src/app/services/upload.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/upload.service.ts ***!
  \********************************************/
/*! exports provided: UploadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadService", function() { return UploadService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadService = /** @class */ (function () {
    function UploadService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_2__["GLOBAL"].url;
    }
    UploadService.prototype.makeFileRequest = function (url, params, files, token, name) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    };
    UploadService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UploadService);
    return UploadService;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/app/services/global.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = _global__WEBPACK_IMPORTED_MODULE_3__["GLOBAL"].url;
    }
    UserService.prototype.signup = function (user_to_login, gethash) {
        if (gethash === void 0) { gethash = null; }
        if (gethash != null) {
            user_to_login.gethash = gethash;
        }
        var json = JSON.stringify(user_to_login);
        var params = json;
        console.log('user_to_login', params, this.url + 'login');
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'login', params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    UserService.prototype.register = function (user_to_register) {
        var params = JSON.stringify(user_to_register);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({ 'Content-Type': 'application/json' });
        return this._http.post(this.url + 'register', params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    UserService.prototype.updateUser = function (user_to_update) {
        var params = JSON.stringify(user_to_update);
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        return this._http.put(this.url + 'update-user/' + user_to_update._id, params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) { return res.json(); }));
    };
    UserService.prototype.getIdentity = function () {
        var identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined") {
            this.identity = identity;
        }
        else {
            this.identity = null;
        }
        return this.identity;
    };
    UserService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        }
        else {
            this.token = null;
        }
        return this.token;
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/views/album-add.html":
/*!**************************************!*\
  !*** ./src/app/views/album-add.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-6\" *ngIf=\"identity && identity.role == 'ROLE_ADMIN'\">\r\n\t<h1>{{titulo}}</h1>\r\n\r\n\t<div *ngIf=\"alertMessage\">\r\n\t\t<div class=\"alert alert-info\">\r\n\t\t  {{alertMessage}}\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<form #formAlbum=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\r\n\t\t<p>\r\n\t\t\t<label>Titulo</label>\r\n\t\t\t<input type=\"text\" #title=\"ngModel\" name=\"title\" [(ngModel)]=\"album.title\" required class=\"form-control\"/>\r\n\t\t\t<span *ngIf=\"!title.valid && title.touched\">\r\n\t\t\t\tEl titulo es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Descripción</label>\r\n\t\t\t<textarea #description=\"ngModel\" name=\"description\" [(ngModel)]=\"album.description\" required class=\"form-control\"></textarea>\r\n\t\t\t<span *ngIf=\"!description.valid && description.touched\">\r\n\t\t\t\tLa descripción es obligatoria\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Año</label>\r\n\t\t\t<input type=\"text\" #year=\"ngModel\" name=\"year\" [(ngModel)]=\"album.year\" required class=\"form-control\"/>\r\n\t\t\t<span *ngIf=\"!year.valid && year.touched\">\r\n\t\t\t\tEl año es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<div *ngIf=\"is_edit\">\r\n\t\t\t<div class=\"album_image_for_edit\" *ngIf=\"album.image && album.image != 'null'\">\r\n\t\t\t\t<img src=\"{{url + 'get-image-album/' + album.image }}\" />\r\n\t\t\t</div>\r\n\r\n\t\t\t<p>\r\n\t\t\t\t<label> Sube la imagen del album</label>\r\n\t\t\t\t<input type=\"file\" placeholder=\"Subir imagen...\" (change)=\"fileChangeEvent($event)\" />\r\n\t\t\t</p>\r\n\t\t</div>\r\n\r\n\t\t<input type=\"submit\" value=\"{{titulo}}\" [disabled]=\"!formAlbum.form.valid\" class=\"btn btn-success\"/>\r\n\r\n\t</form>\r\n</div>"

/***/ }),

/***/ "./src/app/views/album-detail.html":
/*!*****************************************!*\
  !*** ./src/app/views/album-detail.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"album-box\" *ngIf=\"album\">\r\n\t<div id=\"album-head-card\">\r\n\t\t<div class=\"image\">\r\n\t\t\t<img src=\"{{ url + 'get-image-album/' + album.image }}\" />\r\n\t\t</div>\r\n\t\t<div class=\"data\">\r\n\t\t\t<h1>{{album.title}}</h1>\r\n\t\t\t<p><strong>{{album.artist.name}}</strong></p>\r\n\t\t\t<p>{{album.year}}</p>\r\n\t\t\t<p>{{album.description}}</p>\r\n\r\n\t\t\t<a [routerLink]=\"['/crear-tema', album._id]\" class=\"btn btn-default\" *ngIf=\"identity.role == 'ROLE_ADMIN'\">\r\n\t\t\t\tAñadir canción\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"clearfix\"></div>\r\n\t<div id=\"gallery-songs\" *ngIf=\"songs\">\r\n\t\t<ul id=\"songs-list\">\r\n\t\t\t<li *ngFor=\"let song of songs\" class=\"song-item\">\r\n\t\t\t\t<div class=\"title\">\r\n\t\t\t\t\t<a class=\"btn btn-success\" (click)=\"startPlayer(song)\">\r\n\t\t\t\t\t\t<span class=\"glyphicon glyphicon-play\" aria-hidden=\"true\"></span>\r\n\t\t\t\t\t</a>\r\n\r\n\t\t\t\t\t{{song.number + '. '+ song.name + ' - '+ song.duration}}\r\n\r\n\t\t\t\t\t<div class=\"buttons\" *ngIf=\"identity && identity.role == 'ROLE_ADMIN'\">\r\n\t\t\t\t\t\t<a [routerLink]=\"['/editar-tema', song._id]\" class=\"btn btn-warning\">\r\n\t\t\t\t\t\t\tEditar\r\n\t\t\t\t\t\t</a>\r\n\r\n\t\t\t\t\t\t<a (click)=\"onDeleteConfirm(song._id)\" class=\"btn btn-danger\">\r\n\t\t\t\t\t\t\tBorrar\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class=\"seguro seguro-song\" *ngIf=\"confirmado == song._id\">\r\n\t\t\t\t\t\t<a (click)=\"onDeleteSong(song._id)\" class=\"btn btn-danger\">\r\n\t\t\t\t\t\t\tEliminar\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t<a (click)=\"onCancelSong()\" class=\"btn btn-primary\">\r\n\t\t\t\t\t\t\tCancelar\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/views/artist-add.html":
/*!***************************************!*\
  !*** ./src/app/views/artist-add.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-6\" *ngIf=\"identity && identity.role == 'ROLE_ADMIN'\">\r\n\t<h1>{{titulo}}</h1>\r\n\r\n\t<div *ngIf=\"alertMessage\">\r\n\t\t<div class=\"alert alert-info\">\r\n\t\t  {{alertMessage}}\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<form #formArtist=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\t\t<p>\r\n\t\t\t<label>Nombre</label>\r\n\t\t\t<input type=\"text\" #name=\"ngModel\" name=\"name\" [(ngModel)]=\"artist.name\" required class=\"form-control\"/>\r\n\t\t\t<span *ngIf=\"!name.valid && name.touched\">\r\n\t\t\t\tEl nombre es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Descripción</label>\r\n\t\t\t<textarea #description=\"ngModel\" name=\"description\" [(ngModel)]=\"artist.description\" required class=\"form-control\"></textarea>\r\n\t\t\t<span *ngIf=\"!description.valid && description.touched\">\r\n\t\t\t\tLa descripción es obligatoria\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<div *ngIf=\"is_edit\">\r\n\t\t\t<div class=\"artist_image_for_edit\" *ngIf=\"artist.image && artist.image != 'null'\">\r\n\t\t\t\t<img src=\"{{url + 'get-image-artist/' + artist.image }}\" />\r\n\t\t\t</div>\r\n\r\n\t\t\t<p>\r\n\t\t\t\t<label> Sube la imagen del artista</label>\r\n\t\t\t\t<input type=\"file\" placeholder=\"Subir imagen...\" (change)=\"fileChangeEvent($event)\" />\r\n\t\t\t</p>\r\n\t\t</div>\r\n\r\n\t\t<input type=\"submit\" value=\"{{titulo}}\" [disabled]=\"!formArtist.form.valid\" class=\"btn btn-success\"/>\r\n\t</form>\r\n</div>\r\n\r\n<div class=\"col-lg-6\" *ngIf=\"!identity || identity.role != 'ROLE_ADMIN'\">\r\n\t<h1>Error</h1>\r\n\t<p>No tienes acceso a esta parte de la aplicación</p>\r\n</div>"

/***/ }),

/***/ "./src/app/views/artist-detail.html":
/*!******************************************!*\
  !*** ./src/app/views/artist-detail.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"artist\" class=\"artist-box\">\r\n\r\n\t<div id=\"artist-head-card\">\r\n\t\t<div class=\"image\">\r\n\t\t\t<img src=\"{{ url + 'get-image-artist/' + artist.image }}\" *ngIf=\"artist.image && artist.image !== 'null'\"/>\r\n\t\t</div>\r\n\t\t<div class=\"data\">\r\n\t\t\t<h1>{{artist.name}}</h1>\r\n\t\t\t<p class=\"description\">{{artist.description}}</p>\r\n\r\n\t\t\t<a *ngIf=\"identity.role == 'ROLE_ADMIN'\" [routerLink]=\"['/crear-album', artist._id]\" class=\"btn btn-default\">\r\n\t\t\t\tAñadir album\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"clearfix\"></div>\r\n\t\r\n\t<div id=\"gallery-albums\" *ngIf=\"albums\">\r\n\t\t<!-- LISTAR LOS ALBUMS -->\r\n\t\t<ul class=\"album-list\">\r\n\t\t\t<li *ngFor=\"let album of albums\" class=\"col-lg-4 album-item\">\r\n\t\t\t\t<div class=\"album-image\">\r\n\t\t\t\t\t<img src=\"{{url + 'get-image-album/' + album.image}}\" />\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"album-name\">\r\n\t\t\t\t\t<p>\r\n\t\t\t\t\t\t<a [routerLink]=\"['/album', album._id]\">\r\n\t\t\t\t\t\t\t{{album.title}}\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</p>\r\n\r\n\t\t\t\t\t<p>\r\n\t\t\t\t\t\t<a [routerLink]=\"['/artista', album.artist._id]\">\r\n\t\t\t\t\t\t\t{{album.artist.name}}\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</p>\r\n\r\n\t\t\t\t\t<div class=\"buttons\" *ngIf=\"identity.role == 'ROLE_ADMIN'\">\r\n\t\t\t\t\t\t<a [routerLink]=\"['/editar-album', album._id]\" class=\"btn btn-sm btn-warning\">Editar</a>\r\n\t\t\t\t\t\t<a (click)=\"onDeleteConfirm(album._id)\" class=\"btn btn-sm btn-danger\">\r\n\t\t\t\t\t\t\tBorrar\r\n\t\t\t\t\t\t</a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<div class=\"seguro seguro-album\" *ngIf=\"confirmado == album._id\">\r\n\t\t\t\t\t<a (click)=\"onDeleteAlbum(album._id)\" class=\"btn btn-sm btn-danger\">\r\n\t\t\t\t\t\tEliminar\r\n\t\t\t\t\t</a>\r\n\t\t\t\t\t<a (click)=\"onCancelAlbum()\" class=\"btn btn-sm btn-primary\">\r\n\t\t\t\t\t\tCancelar\r\n\t\t\t\t\t</a>\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/views/artist-list.html":
/*!****************************************!*\
  !*** ./src/app/views/artist-list.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"head-page\">\r\n\t<h1>{{titulo}}</h1>\r\n\r\n\t<a [routerLink]=\"['/crear-artista']\" *ngIf=\"identity && identity.role == 'ROLE_ADMIN'\" class=\"btn btn-default\">\r\n\t\tAñadir artista\r\n\t</a>\r\n\r\n\t<ul class=\"pagination pull-right\">\r\n\t\t<li><a [routerLink]=\"['/artistas', prev_page]\">&laquo;</a></li>\r\n\t\t<li><a [routerLink]=\"['/artistas', next_page]\">&raquo;</a></li>\r\n\t</ul>\r\n</div>\r\n\r\n<div class=\"clearfix\"></div>\r\n<ul class=\"artist-list\" *ngIf=\"identity\">\r\n\t<li *ngFor=\"let artist of artists\" class=\"col-lg-3 artist-item\">\r\n\t\t<div class=\"artist-image\">\r\n\t\t\t<img src=\"{{ url + 'get-image-artist/' + artist.image }}\"/>\r\n\t\t</div>\r\n\t\t<div class=\"artist-name\">\r\n\t\t\t<a [routerLink]=\"['/artista', artist._id]\">\r\n\t\t\t\t{{artist.name}}\r\n\t\t\t</a>\r\n\r\n\t\t\t<div class=\"buttons\" *ngIf=\"identity.role == 'ROLE_ADMIN'\">\r\n\t\t\t\t<a [routerLink]=\"['/editar-artista', artist._id]\" class=\"btn btn-sm btn-warning\">Editar</a>\r\n\t\t\t\t<a (click)=\"onDeleteConfirm(artist._id)\" class=\"btn btn-sm btn-danger\">\r\n\t\t\t\t\tBorrar\r\n\t\t\t\t</a>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"seguro\" *ngIf=\"confirmado == artist._id\">\r\n\t\t\t\t<a (click)=\"onDeleteArtist(artist._id)\" class=\"btn btn-sm btn-danger\">\r\n\t\t\t\t\tEliminar\r\n\t\t\t\t</a>\r\n\t\t\t\t<a (click)=\"onCancelArtist()\" class=\"btn btn-sm btn-primary\">\r\n\t\t\t\t\tCancelar\r\n\t\t\t\t</a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</li>\r\n</ul>"

/***/ }),

/***/ "./src/app/views/home.html":
/*!*********************************!*\
  !*** ./src/app/views/home.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-8 col-lg-offset-2\">\r\n\t<div class=\"jumbotron\">\r\n\t  <h1>Bienvenido a MUSIFY</h1>\r\n\t  <p>Empieza a escuchar música de tus artistas favoritos y descubre nuevos hits :D</p>\r\n\t  <p><a class=\"btn btn-primary btn-lg\" [routerLink]=\"['/artistas', 1]\" role=\"button\">Ver artistas</a></p>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/views/song-add.html":
/*!*************************************!*\
  !*** ./src/app/views/song-add.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-6\" *ngIf=\"identity && identity.role == 'ROLE_ADMIN'\">\r\n\t<h1>{{titulo}}</h1>\r\n\r\n\t<div *ngIf=\"alertMessage\">\r\n\t\t<div class=\"alert alert-info\">\r\n\t\t  {{alertMessage}}\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<form #formSong=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n\t\t<p>\r\n\t\t\t<label>Número</label>\r\n\t\t\t<input type=\"text\" #number=\"ngModel\" name=\"number\" [(ngModel)]=\"song.number\" required class=\"form-control\"/>\r\n\t\t\t<span *ngIf=\"!number.valid && number.touched\">\r\n\t\t\t\tEl número de la canción es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Titulo</label>\r\n\t\t\t<input type=\"text\" #name=\"ngModel\" name=\"name\" [(ngModel)]=\"song.name\" required class=\"form-control\"/>\r\n\t\t\t<span *ngIf=\"!name.valid && name.touched\">\r\n\t\t\t\tEl titulo es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Duración</label>\r\n\t\t\t<input type=\"text\" #duration=\"ngModel\" name=\"duration\" [(ngModel)]=\"song.duration\" required class=\"form-control\" />\r\n\t\t\t<span *ngIf=\"!duration.valid && duration.touched\">\r\n\t\t\t\tLa duración es obligatoria\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<div *ngIf=\"is_edit\">\r\n\t\t\t<div class=\"song_file_for_edit\" *ngIf=\"song.file && song.file != 'null'\">\r\n\t\t\t\t<audio controls>\r\n\t\t\t\t\t<source src=\"{{ url + 'get-song-file/' + song.file }}\" type=\"audio/mpeg\" />\r\n\t\t\t\t\t\tEl navegador web no soporta la reproducción de audio\r\n\t\t\t\t</audio>\r\n\t\t\t</div>\r\n\r\n\t\t\t<p>\r\n\t\t\t\t<label> Sube el fichero de audio</label>\r\n\t\t\t\t<input type=\"file\" placeholder=\"Subir fichero...\" (change)=\"fileChangeEvent($event)\" />\r\n\t\t\t</p>\r\n\t\t</div>\r\n\r\n\t\t<input type=\"submit\" value=\"{{titulo}}\" [disabled]=\"!formSong.form.valid\" class=\"btn btn-success\"/>\r\n\t</form>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/views/user-edit.html":
/*!**************************************!*\
  !*** ./src/app/views/user-edit.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-6\">\r\n\t<h1>{{titulo}}</h1>\r\n\r\n\t<div *ngIf=\"alertMessage\">\r\n\t\t<div class=\"alert alert-info\">\r\n\t\t  {{alertMessage}}\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<form #userUpdateForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" class=\"col-md-10\">\r\n\t\t<p>\r\n\t\t\t<label>Nombre:</label>\r\n\t\t\t<input type=\"text\" #name=\"ngModel\" name=\"name\" [(ngModel)]=\"user.name\" class=\"form-control\" required />\r\n\t\t\t<span *ngIf=\"!name.valid && name.touched\">\r\n\t\t\t\tEl nombre es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Apellidos:</label>\r\n\t\t\t<input type=\"text\" #surname=\"ngModel\" name=\"surname\" [(ngModel)]=\"user.surname\" class=\"form-control\" required />\r\n\t\t\t<span *ngIf=\"!surname.valid && surname.touched\">\r\n\t\t\t\tLos apellidos son obligatorios\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Correo electrónico:</label>\r\n\t\t\t<input type=\"email\" #email=\"ngModel\" name=\"email\" [(ngModel)]=\"user.email\" class=\"form-control\" required />\r\n\t\t\t<span *ngIf=\"!email.valid && email.touched\">\r\n\t\t\t\tEl email es obligatorio\r\n\t\t\t</span>\r\n\t\t</p>\r\n\r\n\t\t<div class=\"image_for_edit\" *ngIf=\"user.image && user.image != 'null'\">\r\n\t\t\t<img src=\"{{url + 'get-image-user/' + user.image}}\" style=\"width: 50px;\"/>\r\n\t\t</div>\r\n\r\n\t\t<p>\r\n\t\t\t<label>Sube tu foto:</label>\r\n\t\t\t<input type=\"file\" placeholder=\"Subir imagen...\" (change)=\"fileChangeEvent($event)\" />\r\n\t\t</p>\r\n\r\n\t\t<input type=\"submit\" value=\"Actualizar mis datos\" class=\"btn btn-primary\" />\r\n\r\n\t</form> \r\n</div>"

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfills_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfills.ts */ "./src/polyfills.ts");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/ */ "./src/app/index.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app___WEBPACK_IMPORTED_MODULE_4__["AppModule"]);


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/es6/symbol */ "./node_modules/core-js/es6/symbol.js");
/* harmony import */ var core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/es6/object */ "./node_modules/core-js/es6/object.js");
/* harmony import */ var core_js_es6_object__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_object__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/es6/function */ "./node_modules/core-js/es6/function.js");
/* harmony import */ var core_js_es6_function__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_function__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/es6/parse-int */ "./node_modules/core-js/es6/parse-int.js");
/* harmony import */ var core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_int__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/es6/parse-float */ "./node_modules/core-js/es6/parse-float.js");
/* harmony import */ var core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_parse_float__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/es6/number */ "./node_modules/core-js/es6/number.js");
/* harmony import */ var core_js_es6_number__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_number__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/es6/math */ "./node_modules/core-js/es6/math.js");
/* harmony import */ var core_js_es6_math__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_math__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/es6/string */ "./node_modules/core-js/es6/string.js");
/* harmony import */ var core_js_es6_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/es6/date */ "./node_modules/core-js/es6/date.js");
/* harmony import */ var core_js_es6_date__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_date__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/es6/array */ "./node_modules/core-js/es6/array.js");
/* harmony import */ var core_js_es6_array__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_array__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/es6/regexp */ "./node_modules/core-js/es6/regexp.js");
/* harmony import */ var core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_regexp__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/es6/map */ "./node_modules/core-js/es6/map.js");
/* harmony import */ var core_js_es6_map__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_map__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/es6/set */ "./node_modules/core-js/es6/set.js");
/* harmony import */ var core_js_es6_set__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_set__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/es6/reflect */ "./node_modules/core-js/es6/reflect.js");
/* harmony import */ var core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_es6_reflect__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/es7/reflect */ "./node_modules/core-js/es7/reflect.js");
/* harmony import */ var core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_es7_reflect__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_15__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.


















/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/seba/Desktop/proyectos-personales/fiestas-eventos-2/client/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map