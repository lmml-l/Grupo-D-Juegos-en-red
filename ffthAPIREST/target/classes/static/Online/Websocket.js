////WEBSOCKETS////
//Variables para coger los datos recibidos en el onmessage , en los create correspondientes se les dara un valor inicial y
//actualizaran atributos propios de las escenas en ciertos momentos.

var Jugador;
var GetReady;
var DropsWS = null;
var Tiempo  = null;
var IsHost = null
var PosicionWS = null;
var Skin;
var check = 0;
var comp = false;
var Puntuacion;

//Tipos de conexión websocket
var connectionJugador;
var connectionDrops;
var connectionTiempo;
var connectionPuntuacion;

function conection (){
	//Tres websockets: Jugador, Drops y Tiempo
	connectionJugador  = new WebSocket('ws://'+ location.host +'/echo');
	connectionDrops    = new WebSocket('ws://'+ location.host +'/drops');
	connectionTiempo   = new WebSocket('ws://'+ location.host +'/tiempo');
	connectionPuntuacion   = new WebSocket('ws://'+ location.host +'/puntuacion');
	comp = false;

	//JUGADOR
	connectionJugador.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Jugador":
			Jugador = datosGuardadosComoObjeto.jugador;
			break;
			case "GetReady":
			GetReady = datosGuardadosComoObjeto.ready;
			break;
			case "Skin":
			Skin = datosGuardadosComoObjeto.skin;
			break;
			default:
		}
	}
	connectionJugador.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}


	//PUNTUACIÓN
	connectionPuntuacion.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Puntuacion":
			Puntuacion = datosGuardadosComoObjeto.jugador;
			break;
			default:
		}
	}
	connectionPuntuacion.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}



	//DROPS (también se usa para la posición inicial)
		connectionDrops.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Drops":
			DropsWS = datosGuardadosComoObjeto.drops;
			break;
			case "Posicion":
			PosicionWS = datosGuardadosComoObjeto.posicion;
			console.log(PosicionWS);
			if(PosicionWS!= undefined){
			posInicial = PosicionWS;
			}
			break;
			default:
		}
	}
	connectionDrops.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}

	//TIEMPO (también se usa para indicar quién es el host)
		connectionTiempo.onmessage = function(msg) {
		putCheck(0);
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Tiempo":
			Tiempo = datosGuardadosComoObjeto.tiempo; 
			break;
			case "Host":
			IsHost = datosGuardadosComoObjeto.ishost;
			default:
		}
	}
	connectionTiempo.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
		sumCheck();
		if(getCheck()>5){
			setComp(true);
		}
	}
}

function sumCheck(){
	this.check++;
	console.log("negros" + this.check)
	return this.check;
}

function putCheck(checker){
	this.check = 0;
	console.log("negros a 0")
}

function getCheck(){
	console.log("negros" + this.check)
	return this.check;
}

function getComp(){
	return this.comp;
}

function setComp(bool){
	this.comp = bool;
	console.log(comp)
}



/////////////////