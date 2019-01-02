////WEBSOCKETS////
//Variables para coger los datos recibidos en el onmessage , en los create correspondientes se les dara un valor inicial y
//actualizaran atributos propios de las escenas en ciertos momentos.

var Jugador;
var GetReady;
var DropsWS = null;
var Skin;



var connectionJugador;
var connectionDrops;
function conection (){
	//Dos websockets, uno para Jugador y otro para Drops
	connectionJugador = new WebSocket('ws://'+ location.host +'/echo');
	connectionDrops   = new WebSocket('ws://'+ location.host +'/drops');

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
			//console.log(DropsWS.sprite + "Tiene que ser un puto array de mierda valeeeee");
			break;
			default:
		}
	}
	connectionDrops.onclose = function() {
		setTimeout(conection(),1000);
		console.log("Closing socket");
	}
}

/////////////////