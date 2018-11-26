
var ipsLobby = new Array();
var partidaactual;
class Lobby extends Phaser.Scene {
	constructor(){
		super({key:"Lobby"});
		this.check1;
		this.check2;
		this.enter;
		this.back;
		this.texts = new Array(5);
		this.textoModo;
		this.textoSalir;
		this.textoConexion;
		this.estadoConexion = new Array(2); //estado de la conexión en todo momento (conectado o desconectado)
		this.textoBusqueda;
		this.estadoBusqueda = new Array(2); 	//buscando o encontrado
		this.nombreRival = new Array(2); 	//conocido o desconocido
		this.textoPartidas;
		this.historialPartidas = new Array(5);
		this.listlp;
		this.mymatch;
		this.scene;
		this.fondo;
		this.salir;
		//this.archive;
	}
	
	controlmenu(){

		//this.archive = new ReaderWriter(//conseguir esta vaina con un getter primero ----> historialPartidas);
		
		this.check1 = false;
		this.check2 = false;

		this.nombreRival[0]="?"
		this.nombreRival[1]="Fulanita123456";

		//Valor de conexión
		this.estadoConexion[0]="disconnected";
		this.estadoConexion[1]="connected";

		//Buscando jugador o ya encontrado
		this.estadoBusqueda[0]="Looking for rivals...";
		this.estadoBusqueda[1]="READY\nPRESS SPACE TO GO";

		//Textos
		this.textModo      = this.add.text(50, 50, "Online Mode", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		this.textoSalir    = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		this.textoConexion = this.add.text(650, 730, "Connection status: " + this.estadoConexion[0], { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		this.textoBusqueda = this.add.text(380, 480, this.estadoBusqueda[1], { fill: '#FFFFFF', font: '36px Impact', align: 'center'});

		//PARTIDAS DE PRUEBA/////////////////////////////
		this.historialPartidas[0]="soyFalangista - pene";
		this.historialPartidas[1]="CarreroBlanco - Caudillo";
		this.historialPartidas[2]="Luismi - LaChupa";
		this.historialPartidas[3]="pollaGorda - elrubius69";
		this.historialPartidas[4]="Murcia - soterrada";
		/////////////////////////////////////////////////

		//Historial de partidas
		this.textoPartidas = this.add.text(50, 580, "Last matches:", 		   { fill: '#FFAC00', font: '24px Impact', align: 'center'});
		this.textoPartidas = this.add.text(50, 600, this.historialPartidas[0], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //0
		this.textoPartidas = this.add.text(50, 620, this.historialPartidas[1], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //1
		this.textoPartidas = this.add.text(50, 640, this.historialPartidas[2], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //2
		this.textoPartidas = this.add.text(50, 660, this.historialPartidas[3], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //3
		this.textoPartidas = this.add.text(50, 680, this.historialPartidas[4], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //4
		
		//ejemplo para la maquetación con textos fijos
		////////////////////////
		this.texts[0] = this.add.text(312, 400, "" ,{ fill: '#FFFFFF', font: '36px Impact', align: 'center'});
		this.texts[1] = this.add.text(490, 370, "VS", { fill: '#FFFFFF', font: '54px Impact', align: 'center'});
		this.texts[2] = this.add.text(80, 370, this.nombreRival[0], { fill: '#FFAC00', font: '54px Impact', align: 'center'}); //máximo de 15 letras
		this.texts[3] = this.add.text(600, 370, this.nombreRival[1], { fill: '#FFAC00', font: '54px Impact', align: 'center'});
		this.texts[4] = this.add.text(320, 190, "PREPARE TO FIGHT!", { fill: '#FFFFFF', font: '54px Impact', align: 'center'});
		////////////////////////
	/*
		this.texts[0] = this.add.text(312, 400, "" ,{ fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[1] = this.add.text(712, 400, "this.getRivalIp(mymatch)", { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[2] = this.add.text(312, 600, "this.getApodo(this.mymatch", { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[3] = this.add.text(712, 600, "this.getApodo(this.mymatch", { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[4] = this.add.text(512, 100, "Partida 1v1", { fill: '#FFFFFF', font: '30px Impact', align: 'center'}).setScale(2);
	*/
		//this.listlp = this.getListaApodos();

		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

		this.enter.isDown=false;
		this.back.isDown=false;
	}

	/*
	enfrentamientoactual(){
		if(ipsLobby.length == 2){
			if(partidaactual != ipsLobby){//partida actual se refiere a las ips que hemos mandado antes al historial
				addMatchtoHistory(ipsLobby[0] + " vs " + ipsLobby[1]);
				partidaactual=ipsLobby
			}
		}
	}
	*/

	preload(){
		this.load.image('menuLobbyFondo','Recursos/Imagenes/menuLobbyFondo.png');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuLobbyFondo').setScale(1.3);
		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.controlmenu();
		var that = this;
		//window.setInterval(that.enfrentamientoactual(),1);
		//this.time.addEvent({delay:260, loop:true ,//se tarda un poco en actualizar en nombre del primer jugador de la sala
    	//callback: function(){that.enfrentamientoactual()}})
	}

	actualizarPosArray(){	
		if(this.back.isDown){
			this.check1 = true;
		}
	}

	//botón para retroceder
	retroceder(){
		if(this.escape.isDown){
			this.scene.start('MainMenu');
			this.escape.isDown=false;
		}
	}

	scenechange(){
		if(this.check1){
			this.scene.start('MainMenu');
			//this.archive.Escritor(historialPartidas, myinfo, rivalinfo);
			//hacer un put del historialPartidas para guardarlo en servidor
		}

	}
	

	update(){
		this.retroceder();
		this.scenechange();

		var that=this;
		
		getIPs(function(arrayjugadores){ipsLobby= arrayjugadores});//ips jugadores en la sala

		this.time.addEvent({delay:250,  //se tarda un poco en actualizar en nombre del primer jugador de la sala
    	callback: function(){getApodo(function(data){that.nombreRival[0]=data},ipsLobby[0].substring(1,ipsLobby[0].length-1));}})

		//Como no se sabe si hay un segundo jugador para poner el nombre se comprueba si existe o no , y en funcion de eso se cambia que url debe coger
		var url2 = function(){if(ipsLobby[1]==null){ 
			return ipsLobby[1];
		}else{
			return ipsLobby[1].substring(1,ipsLobby[1].length-1);
		}}

		//Se tarda un tiempo en tener el segundo nombre por eso se tarda en actualizar
    	this.time.addEvent({delay:250,  //tiempo que tarda hasta reiniciar
    	callback: function(){getApodo(function(data){that.nombreRival[1]=data},url2());}})
		
    	//Se cambian los contenidos de los  textos que muestran los nombres por los apodos de los jugadores actuales.
		this.texts[2].text=this.nombreRival[0];
		this.texts[3].text=this.nombreRival[1];

		
	}
}