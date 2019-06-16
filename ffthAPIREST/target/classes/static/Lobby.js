//SALA DE ESPERA DE LOS JUGADORES HASTA LLENAR LA SALA (2 JUGADORES)
//DA PASO AL SELECTOR DE PERSONAJES
var ipsLobby = new Array();
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
		this.estadoConexion = new Array(2);	//estado de la conexión en todo momento (conectado o desconectado)
		this.textoBusqueda;
		this.jugadorDesc1;
		this.estadoDesc1;
		this.jugadorDesc2;
		this.estadoDesc2;
		this.estadoBusqueda; 				//buscando o encontrado
		this.nombreRival = new Array(2); 	//conocido o desconocido
		this.textoPartidas;
		this.listlp;
		this.mymatch;
		this.scene;
		this.fondo;
		this.salir;
		this.musica;
	}
	
	controlmenu(){
		
		this.check1 = false;
		this.check2 = false;

		this.nombreRival[0]=""
		this.nombreRival[1]="";

		//Valor de conexión
		this.estadoConexion[0]="disconnected";
		this.estadoConexion[1]="connected";

		//Buscando jugador o ya encontrado
		this.estadoBusqueda="Looking for rivals...";
		this.estadoDesc1="";
		this.estadoDesc2="";

		//Textos
		this.textModo      = this.add.text(50, 50, "Online Mode", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		this.textoSalir    = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		this.textoConexion = this.add.text(650, 730, "Connection status: " + this.estadoConexion[1], { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		//this.textoBusqueda = this.add.text(380, 480, this.estadoBusqueda[0], { fill: '#FFFFFF', font: '36px Impact', align: 'center'});
		
		////////////////////////
		this.texts[0] = this.add.text(312, 400, "" ,{ fill: '#FFFFFF', font: '36px Impact', align: 'center'});
		this.texts[1] = this.add.text(490, 370, "VS", { fill: '#FFFFFF', font: '54px Impact', align: 'center'});
		this.texts[2] = this.add.text(100, 370, this.nombreRival[0], { fill: '#FFAC00', font: '54px Impact', align: 'center'}); //máximo de 15 letras
		this.texts[3] = this.add.text(600, 370, this.nombreRival[1], { fill: '#FFAC00', font: '54px Impact', align: 'center'});
		this.texts[4] = this.add.text(320, 190, "PREPARE TO FIGHT!", { fill: '#FFFFFF', font: '54px Impact', align: 'center'});
		////////////////////////
	
		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.back  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

		this.enter.isDown=false;
		this.back.isDown=false;
	}

	preload(){
		this.load.image('menuLobbyFondo','Recursos/Imagenes/menuLobbyFondo.png');
		this.load.audio('musicacontrol','Recursos/Audio/CharacterSelection.mp3');
	}

	create(){
		ipsLobby = new Array();
		var that = this;
		var i = 0;
		this.fondo  = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuLobbyFondo').setScale(1.3);
		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.controlmenu();

		this.musica = this.game.sound.add('musicacontrol');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		//this.musica.play();

		conection();
		
		var that = this;
		//comprobación del estado del servidor
		this.time.addEvent({delay:1000, loop:true,
		    callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})

		this.time.addEvent({delay:1000,loop:true, callback: function(){getIPs(function(arrayjugadores)
			{ipsLobby= arrayjugadores;
			that.nombreRival[0]=arrayjugadores[0];
			that.nombreRival[1]=arrayjugadores[1];

			if(ipsLobby.length == 2){
				that.time.addEvent({delay:1000, callback: function(){	
					that.scene.start('CharapterSelectionOnline');
					//that.musica.stop();
				}})
			}
			});

			}})//ips jugadores en la sala

		that.textoBusqueda = that.add.text(380, 480, that.estadoBusqueda, { fill: '#FFFFFF', font: '36px Impact', align: 'center'});
		that.jugadorDesc1  = that.add.text(80, 370, that.estadoDesc1, { fill: '#A52019', font: '40px Impact', align: 'center'});
		that.jugadorDesc2  = that.add.text(600, 370, that.estadoDesc2, { fill: '#A52019', font: '40px Impact', align: 'center'});

		//mensaje de iniciar partida
		this.time.addEvent({delay:2000,loop:true, callback: function(){
			if(ipsLobby.length == 2){
				that.textoBusqueda.text = "Starting fight...";
				that.jugadorDesc1.text  = "";
				that.jugadorDesc2.text  = "";
			}else if(ipsLobby.length == 1){
				that.textoBusqueda.text = "Looking for rivals...";
				that.jugadorDesc1.text  = "";
				that.jugadorDesc2.text  = "Please wait..."
			}else{
				that.textoBusqueda.text = "Looking for rivals...";
				that.jugadorDesc1.text  = "Please wait...";
				that.jugadorDesc2.text  = "Please wait..."
			}
		}})
	}

	//botón para retroceder
	retroceder(){
		var that = this;
		if(this.escape.isDown){
			IsHost = null;
            ipsLobby = new Array();

			connectionDrops.close();
			connectionJugador.close();
   			connectionPuntuacion.close();
   			connectionTiempo.close();
			//that.musica.stop();
			that.scene.start('MainMenu');
			
			that.escape.isDown=false;
		}
	}

	update(){
		this.retroceder();

		this.texts[2].text=this.nombreRival[0];
		this.texts[3].text=this.nombreRival[1];
	}
}