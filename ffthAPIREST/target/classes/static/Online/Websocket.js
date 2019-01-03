////WEBSOCKETS////
//Variables para coger los datos recibidos en el onmessage , en los create correspondientes se les dara un valor inicial y
//actualizaran atributos propios de las escenas en ciertos momentos.

var Jugador;
var GetReady;
var DropsWS = null;
var Tiempo  = null;
var Skin;

//Tipos de conexión websocket
var connectionJugador;
var connectionDrops;
var connectionTiempo;

function conection (){
	//Tres websockets: Jugador, Drops y Tiempo
	connectionJugador  = new WebSocket('ws://'+ location.host +'/echo');
	connectionDrops    = new WebSocket('ws://'+ location.host +'/drops');
	connectionTiempo   = new WebSocket('ws://'+ location.host +'/tiempo');

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

	//DROPS
		connectionDrops.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Drops":
			DropsWS = datosGuardadosComoObjeto.drops;
			break;
			default:
		}
	}
	connectionDrops.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}

	//TIEMPO
		connectionTiempo.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Tiempo":
			Tiempo = datosGuardadosComoObjeto.tiempo; console.log("TIEMPO:" + Tiempo)
			break;
			default:
		}
	}
	connectionTiempo.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}
}



/////////////////