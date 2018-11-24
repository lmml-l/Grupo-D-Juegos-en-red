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
	}
	
	controlmenu(){

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
		this.texts[2] = this.add.text(80, 370, "Fulanito123456", { fill: '#FFAC00', font: '54px Impact', align: 'center'}); //máximo de 15 letras
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

	preload(){
		this.load.image('menuLobbyFondo','Recursos/Imagenes/menuLobbyFondo.png');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuLobbyFondo').setScale(1.3);
		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.controlmenu();
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
		}

	}


	update(){
		this.retroceder();
		this.scenechange();
	}
}