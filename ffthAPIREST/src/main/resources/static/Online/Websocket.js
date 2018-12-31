////WEBSOCKETS////
//Variables para coger los datos recibidos en el onmessage , en los create correspondientes se les dara un valor inicial y
//actualizaran atributos propios de las escenas en ciertos momentos.

var Jugador;
var GetReady;
var Drops;

var connection;
function conection (){
	connection = new WebSocket('ws://'+ location.host +'/echo');
	connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Jugador":
			Jugador = datosGuardadosComoObjeto.jugador;
			break;
			case "GetReady":
			GetReady = datosGuardadosComoObjeto.ready;
			break;
			case "Drops":
			Drops = datosGuardadosComoObjeto.drops;
			break;
			default:
		}
	}
	connection.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}
}

/////////////////