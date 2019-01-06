////WEBSOCKETS////

//Variables para coger los datos recibidos en el onmessage , en los create correspondientes se les dara un valor inicial y
//actualizaran atributos propios de las escenas en ciertos momentos.
var Jugador;
var GetReady;
var DropsWS 	= null; //inicialización a null para distinguir entre clientes
var Tiempo  	= null;
var IsHost  	= null
var PosicionWS  = null;
var Skin;
//var check 		= 0;
//var comp 		= false;
var Puntuacion;

//Tipos de conexión websocket
var connectionJugador;
var connectionDrops;
var connectionTiempo;
var connectionPuntuacion;

function conection (){
	//Cuatro websockets: Jugador, Drops, Tiempo y Puntuación
	connectionJugador  		= new WebSocket('ws://'+ location.host +'/echo');
	connectionDrops    		= new WebSocket('ws://'+ location.host +'/drops');
	connectionTiempo   		= new WebSocket('ws://'+ location.host +'/tiempo');
	connectionPuntuacion   	= new WebSocket('ws://'+ location.host +'/puntuacion');
	comp = false;

	//JUGADOR
	connectionJugador.onmessage = function(msg) {
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



	//DROPS (también se aprovecha para la posición inicial)
		connectionDrops.onmessage = function(msg) {
		var datosGuardadosComoObjeto = JSON.parse(msg.data);
		switch(datosGuardadosComoObjeto.protocolo){
			case "Drops":
			DropsWS = datosGuardadosComoObjeto.drops;
			break;
			case "Posicion":
			PosicionWS = datosGuardadosComoObjeto.posicion;
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

	//TIEMPO (también se aprovecha para indicar quién es el host)
		connectionTiempo.onmessage = function(msg) {
		putCheck(0);
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
		//sumCheck();
		//if(getCheck()>=3){
			//console.log(check)
			//setComp(true);
			//console.log(comp)
		//}
	}
}

/*
function sumCheck(){
	this.check++;
	return this.check;
}

function putCheck(checker){
	this.check = 0;
}

function getCheck(){
	return this.check;
}

function getComp(){
	return this.comp;
}

function setComp(bool){
	this.comp = bool;
}
*/


/////////////////