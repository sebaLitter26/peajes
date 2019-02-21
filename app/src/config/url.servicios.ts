
export const URL_SERVICIOS = "http://desa.avelo.com.ar/ws/";
//export const URL_SERVICIOS = "http://192.168.2.142/desptaxis/ws/";
//export const URL_SERVICIOS = "http://localhost/desptaxis/ws/";  //local
//export const URL_SERVICIOS = "http://admin.avelo.com.ar/ws/";

//export const URL_SERVICIOS = "http://192.168.0.18/rest/index.php";
//export const URL_IMAGENES = "http://192.168.0.18/rest/public/img/productos/";


export const URL_REGISTRO = URL_SERVICIOS + "registro";
export const URL_ACTIVAR = URL_SERVICIOS + "activar";
export const URL_REACTIVAR = URL_SERVICIOS + "reactivar";
export const URL_EMPRESAS = URL_SERVICIOS + "empresas";
export const URL_CONECTARPANTALLA = URL_SERVICIOS + "loginPantalla";
export const URL_DESCONECTARPANTALLA = URL_SERVICIOS + "logoutPantalla";


export const URL_NOTIFICACIONES = URL_SERVICIOS + "deviceToken";
export const URL_NOTIFICACIONES_MSQ = URL_SERVICIOS + "respuestaMSQ";
export const URL_NOTIFICACIONES_MSJ = URL_SERVICIOS + "respuestaMSJ";
export const URL_NOTIFICACIONES_MSU = URL_SERVICIOS + "respuestaMSU";
export const URL_NOTIFICACIONES_ACK = URL_SERVICIOS + "ackPush";
export const URL_NOTIFICACIONES_EVT = URL_SERVICIOS + "evtPush";

export const URL_LLAMADA = URL_SERVICIOS + "deviceLlamadaToken";

export const URL_PARADA = URL_SERVICIOS + "getParada";
export const URL_VIAJE = URL_SERVICIOS + "getViaje";

type MyType = {
    letra: any;
    leyenda: string;
}

export const ABREVIACIONES: MyType[] = [
    { letra: '%o', leyenda: "OK" },
    { letra: '%c', leyenda: "Cancelar" },
    { letra: '%s', leyenda: "SI" },
    { letra: '%n', leyenda: "NO" },
    { letra: '%A', leyenda: "Aceptado" },
    { letra: '%X', leyenda: "Cancelado" },
    { letra: '%e', leyenda: "Espere..." },
    { letra: '%C', leyenda: "¿Está seguro?" },
    { letra: '%a', leyenda: "Aceptar" },
    { letra: '%m', leyenda: "Esperando mensaje..." },
    { letra: '%N', leyenda: "Nuevo Mensaje" },
    { letra: '%r', leyenda: "Rechazar" },
    { letra: '%t', leyenda: "Viaje ya tomado" },
    { letra: '%v', leyenda: "Nuevo Viaje" },
    { letra: '%f', leyenda: "Viaje confirmado" },
    { letra: '%b', leyenda: "¿Puede cubrirlo?" },
    { letra: '%d', leyenda: "Viaje a cuenta" },
    { letra: '%B', leyenda: "Cubra:&" },
    { letra: '%D', leyenda: "Avenida" },
    { letra: '%F', leyenda: "cambio de " },
    { letra: '%P', leyenda: "Parada" },

];




//loginPantalla   candado   licencia del movil
//sendpush msq msg
//respuestamsQ si   llega otro  respuestamsJ

/*

    var funcRegistro = "registro";
    var funcActivar = "activar";



    var funcEmpresas = "empresas";
    var funcEmpresaStatus = "empresaStatus";


    var funcEliminarUsuario = "eliminarUsuario";
    var funcDomicilios = "domicilios";
    var funcNuevoViaje = "nuevoViaje";
    var funcEstadoViaje = "viaje";
    var funcConfirmarViaje = "confirmarViaje";
    var funcRechazarChofer = "rechazarChofer";
    var funcCancelarViaje = "cancelarViaje";
    var funcReactivar = "reactivar";
    var funcCalificarViaje = "calificarViaje";
    var funcKeepAlive = "keepAlive";
    var funcPlaceSuggestion = "getCalle";
    var funcValidarAltura = "getNumeral";
    var funcValidarInterseccion = "getInterseccion";

    //LO UTIL
    var funcRespuetaMSQ = "respuestaMSQ";
    var funcLoginPantalla = "loginPantalla";
    var funcLogoutPantalla = "logoutPantalla";
    var funcParada = "getParada";
    var funcViaje = "getViaje";


    return {
        setUrlBase: function(value) {
            baseUrl = value;
            //baseUrl = adminBaseUrl; // ******
        },
        getUrlBase: function() {
            return baseUrl;
        },
        getUrlEmpresas: function() {
            return adminBaseUrl + funcEmpresas;
        },
        getUrlEmpresaStatus: function(empresaId) {
            return baseUrl + funcEmpresaStatus + "/" + empresaId;
        },
        getUrlRegistro: function() {
            return baseUrl + funcRegistro;
            //return "http://teki.avelo.com.ar/ws/registro";
        },
        getUrlActivar: function() {
            return baseUrl + funcActivar;
        },
        getUrlEliminarUsuario: function(usuario, clave) {
            return baseUrl + funcEliminarUsuario + "/" + usuario + "/" + clave;
        },
        getUrlDomicilios: function(usuario, clave) {
            return baseUrl + funcDomicilios + "/" + usuario + "/" + clave;
        },
        getUrlNuevoViaje: function(usuario, clave) {
            return baseUrl + funcNuevoViaje + "/" + usuario + "/" + clave;
        },
        getUrlEstadoViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcEstadoViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlConfirmarViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcConfirmarViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlRechazarChofer: function(idViaje, usuario, clave) {
            return baseUrl + funcRechazarChofer + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlCancelarViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcCancelarViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlReactivar: function() {
            return baseUrl + funcReactivar;
        },
        getUrlCalificarViaje: function(idViaje, usuario, clave) {
            return baseUrl + funcCalificarViaje + "/" + idViaje + "/" + usuario + "/" + clave;
        },
        getUrlKeepAlive: function(usuario, clave) {
            return baseUrl + funcKeepAlive + "/" + usuario + "/" + clave;
        },
        getUrlPlaceSuggestion: function(usuario, clave) {
            return baseUrl + funcPlaceSuggestion + "/" + usuario + "/" + clave;
            //return "http://teki.avelo.com.ar/ws/getCalle/34/5c31bcfa932c53bd35b85e54b598b022";
        },
        getUrlValidarAltura: function(usuario, clave) {
            return baseUrl + funcValidarAltura + "/" + usuario + "/" + clave;
            //return "http://teki.avelo.com.ar/ws/getCalle/34/5c31bcfa932c53bd35b85e54b598b022";
        },
        getUrlValidarInterseccion: function(usuario, clave) {
            return baseUrl + funcValidarInterseccion + "/" + usuario + "/" + clave;
            //return "http://teki.avelo.com.ar/ws/getCalle/34/5c31bcfa932c53bd35b85e54b598b022";
        },
	getUrlRespuestaMSQ: function (usuario, clave) {
		return baseUrl + funcRespuetaMSQ + "/" + usuario + "/" + clave;
	},
	getUrlLoginPantalla: function (usuario, clave) {
		return baseUrl + funcLoginPantalla + "/" + usuario + "/" + clave;
	},
	getUrlLogoutPantalla: function (usuario, clave) {
		return baseUrl + funcLogoutPantalla + "/" + usuario + "/" + clave;
	},
	getUrlParada: function (usuario, clave) {
		return baseUrl + funcParada+ "/" + usuario + "/" + clave;
	},
	getUrlViaje: function (usuario, clave) {
		return baseUrl + funcViaje+ "/" + usuario + "/" + clave;
	},
    }

    */
