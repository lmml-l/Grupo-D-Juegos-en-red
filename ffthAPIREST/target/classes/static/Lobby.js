
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
		this.estadoConexion = new Array(2); //estado de la conexión en todo momento (conectado o desconectado)
		this.textoBusqueda;
		this.jugadorDesc1;
		this.estadoDesc1;
		this.jugadorDesc2;
		this.estadoDesc2;
		this.estadoBusqueda; 	//buscando o encontrado
		this.nombreRival = new Array(2); 	//conocido o desconocido
		this.textoPartidas;
		this.historialPartidas = new Array(5);
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

		//PARTIDAS POR DEFECTO/////////////////////////////
		this.historialPartidas[0]="-";
		this.historialPartidas[1]="-";
		this.historialPartidas[2]="-";
		this.historialPartidas[3]="-";
		this.historialPartidas[4]="-";
		/////////////////////////////////////////////////

		//Historial de partidas
		this.textoPartidas = this.add.text(50, 580, "Last matches:", 		   { fill: '#FFAC00', font: '24px Impact', align: 'center'});
		this.textoPartidas1 = this.add.text(50, 600, this.historialPartidas[0], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //0
		this.textoPartidas2 = this.add.text(50, 620, this.historialPartidas[1], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //1
		this.textoPartidas3 = this.add.text(50, 640, this.historialPartidas[2], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //2
		this.textoPartidas4 = this.add.text(50, 660, this.historialPartidas[3], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //3
		this.textoPartidas5 = this.add.text(50, 680, this.historialPartidas[4], { fill: '#F4FFF3', font: '20px Impact', align: 'center'}); //4
		
		////////////////////////
		this.texts[0] = this.add.text(312, 400, "" ,{ fill: '#FFFFFF', font: '36px Impact', align: 'center'});
		this.texts[1] = this.add.text(490, 370, "VS", { fill: '#FFFFFF', font: '54px Impact', align: 'center'});
		this.texts[2] = this.add.text(100, 370, this.nombreRival[0], { fill: '#FFAC00', font: '54px Impact', align: 'center'}); //máximo de 15 letras
		this.texts[3] = this.add.text(600, 370, this.nombreRival[1], { fill: '#FFAC00', font: '54px Impact', align: 'center'});
		this.texts[4] = this.add.text(320, 190, "PREPARE TO FIGHT!", { fill: '#FFFFFF', font: '54px Impact', align: 'center'});
		////////////////////////
	

		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

		this.enter.isDown=false;
		this.back.isDown=false;
	}

	preload(){
		this.load.image('menuLobbyFondo','Recursos/Imagenes/menuLobbyFondo.png');
		this.load.audio('musicacontrol','Recursos/Audio/CharacterSelection.mp3');
	}

	create(){
		var that = this;
		var i = 0;
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuLobbyFondo').setScale(1.3);
		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.controlmenu();

		this.musica = this.game.sound.add('musicacontrol');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		this.musica.play();

		var that = this;
		//comprobación del estado del servidor
			this.time.addEvent({delay:1000, loop:true,
		    callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})


		
		this.time.addEvent({delay:1000,loop:true, callback: function(){getIPs(function(arrayjugadores)
			{ipsLobby= arrayjugadores;
			that.nombreRival[0]=arrayjugadores[0];
			that.nombreRival[1]=arrayjugadores[1];});
			}})//ips jugadores en la sala

		//this.time.addEvent({delay:1100,loop:true, callback: function(){putTime(ip,ip)}})
		that.textoBusqueda = that.add.text(380, 480, that.estadoBusqueda, { fill: '#FFFFFF', font: '36px Impact', align: 'center'});
		that.jugadorDesc1 = that.add.text(80, 370, that.estadoDesc1, { fill: '#A52019', font: '40px Impact', align: 'center'});
		that.jugadorDesc2 = that.add.text(600, 370, that.estadoDesc2, { fill: '#A52019', font: '40px Impact', align: 'center'});


		//se entra automáticamente a local cuando los dos jugadores están
		this.time.addEvent({delay:3000,loop:true, callback: function(){
			if(ipsLobby.length == 2){
				that.time.addEvent({delay:1000, callback: function(){
					that.musica.stop();
					that.time.clearPendingEvents();
	        		that.time.removeAllEvents(); 
					that.scene.start('CharapterSelectionOnline');
			}})
		}
		}})

		//mensaje de iniciar partida
		this.time.addEvent({delay:2000,loop:true, callback: function(){
			if(ipsLobby.length == 2){
				that.textoBusqueda.text = "Starting fight...";
				that.jugadorDesc1.text = "";
				that.jugadorDesc2.text = "";
			}else if(ipsLobby.length == 1){
				that.textoBusqueda.text = "Looking for rivals...";
				that.jugadorDesc1.text = "";
				that.jugadorDesc2.text = "Please wait..."
			}else{
				that.textoBusqueda.text = "Looking for rivals...";
				that.jugadorDesc1.text = "Please wait...";
				that.jugadorDesc2.text = "Please wait..."
			}
		}})
	
    	//Se cambian los contenidos de los  textos que muestran los nombres por los apodos de los jugadores actuales.
		
		this.time.addEvent({delay:1000,loop:true,  //tiempo que tarda hasta reiniciar
    	callback: function(){getHistorial(function(data){that.historialPartidas = data})}})
	}

	//botón para retroceder
	retroceder(){
		var that = this;
		if(this.escape.isDown){
			//deletePlayerofRoom(ip) //SE DEBE VOLVER A ACTIVAR CUANDO SE CUMPLA LO PUESTO EN REQUEST.JS
			that.musica.stop();
			that.time.clearPendingEvents();
	        that.time.removeAllEvents(); 
			that.scene.start('MainMenu');
			
			that.escape.isDown=false;
		}
	}


	update(){
		this.retroceder();
		////////////////////////////////////
		this.texts[2].text=this.nombreRival[0];
		this.texts[3].text=this.nombreRival[1];

    	if(this.historialPartidas[this.historialPartidas.length-1]!= null){
    		this.textoPartidas1.text = this.historialPartidas[this.historialPartidas.length-1]
    	}
		if(this.historialPartidas[this.historialPartidas.length-2]!= null){
    		this.textoPartidas2.text = this.historialPartidas[this.historialPartidas.length-2]
    	}
    	if(this.historialPartidas[this.historialPartidas.length-3]!= null){
    		this.textoPartidas3.text = this.historialPartidas[this.historialPartidas.length-3]
    	}
    	if(this.historialPartidas[this.historialPartidas.length-4]!= null){
    		this.textoPartidas4.text = this.historialPartidas[this.historialPartidas.length-4]
    	}
    	if(this.historialPartidas[this.historialPartidas.length-5]!= null){
    		this.textoPartidas5.text = this.historialPartidas[this.historialPartidas.length-5]
    	}
	}
}