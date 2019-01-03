//Cada jugador selecciona el aspecto con el que aparecerá su personaje

var SoloMandarUnaVez = false;

//Posición inicial J1X  J1Y  J2X J2Y
var posInicial = [400, 400, 600, 400]

class CharapterSelectionOnline extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelectionOnline"});
		this.pmap1 = new Array();
		this.checkplayer1;
		this.checkplayer2;
		this.p1;
		this.check;

		this.posArrayP1;
		this.posArrayP2;

		//this.derecha1;
		this.derecha2;
		//this.izquierda1;
		this.izquierda2;
		//this.confirmar1;
		this.confirmar2;
		this.textoSalir;
		this.salir;
		this.textoModo;

		this.textoControles;
		this.fondo;

		this.ready = new Array(2);
		this.ready1;
		this.ready2; 

		var that = this;
	}

	selection(){

		//comprueba si se ha elegido o no
		this.checkplayer1 = false;
		this.checkplayer2 = false;

		///Variable websocket inicializacion
		GetReady = this.checkplayer2;
		//selección
		this.posArrayP1=0;

		//sprites
		var title = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(150/600),'title').setScale(0.5);
		//var subtitle = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(250/600),'subtitle').setScale(1);
		var character2 = this.add.image(this.game.canvas.width*(4/6),this.game.canvas.height*(4/6),'character1').setScale(2).setInteractive();
		var character1 = this.add.image(this.game.canvas.width*(2/6),this.game.canvas.height*(4/6),'character2').setScale(2).setInteractive();
		//guarda las imágenes en arrays
		this.pmap1.push(character1);
		this.pmap1.push(character2);
		//imagen de miniatura del personaje
		this.p1 = this.add.sprite((this.pmap1[this.posArrayP1].x - 75), (this.pmap1[this.posArrayP1].y - 75),'P1');
		//engloba las imágenes
		var container = this.add.container(0,0);
		container.add(title);
		//container.add(subtitle); 
		container.add(character1); 
		container.add(character2); 

		//teclas disponibles
		//this.derecha1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.derecha2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		//this.izquierda1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.izquierda2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		//this.confirmar1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.confirmar2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		//inicializa las teclas a no pulsadas (para evitar acarreros de pantallas anteriores)
		//this.confirmar1.isDown=false;
		this.confirmar2.isDown=false;
		this.salir.isDown=false;
	}

	seleccionaravatar(posArray){
		var spriteHojalocal;

		//hojas de sprite disponibles
		//cambian en función de la posición seleccionada
		if(posArray==0){
			spriteHojalocal = ["Recursos/Imagenes/Sprites_Personaje2/SpritePersonajeIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePersonajeDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpritePistolaIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePistolaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteEscopetaIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteEscopetaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteThomsomIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteThomsomDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpritePersonajePuñoAmericanoIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePersonajePuñoAmericanoDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteBateIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteBateDerecha.png"]

		}else if(posArray==1){
			spriteHojalocal = ["Recursos/Imagenes/Sprites_Personaje/SpritePersonajeIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajeDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpritePistolaIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePistolaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteEscopetaIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteEscopetaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteThomsomIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteThomsomDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpritePersonajePuñoAmericanoIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajePuñoAmericanoDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteBateIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteBateDerecha.png"]
		}
		return spriteHojalocal;
	}

	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png');
		//var subtitle = this.load.image('subtitle','Recursos/Imagenes/subtitle.png');
		var character1 = this.load.image('character1','Recursos/Imagenes/Character1.png');
		var character2 = this.load.image('character2','Recursos/Imagenes/Character2.png');
		var p1 		   = this.load.image('P1','Recursos/Imagenes/Flecha.png');
		this.load.image('menuCharacterFondo','Recursos/Imagenes/menuCharacterFondo.png');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuCharacterFondo').setScale(1.3);
		this.selection();
		this.textModo = this.add.text(50, 50, "Online mode", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		//indicación de los controles
		this.textoControles = this.add.text(110, 540, "\nselect\naccept", { fill: '#FFFFFF', font: '30px Impact', align: 'center'});
		this.textoControles = this.add.text(20, 510, "control", { fill: '#FFAC00', font: '30px Impact', align: 'center'});
		this.textoControles = this.add.text(20, 540, "\nA,D\nSPACE", { fill: '#FFAC00', font: '32px Impact', align: 'center'});
		this.subtitulo 		= this.add.text(360, 350, "CHOOSE YOUR FIGHTER", { fill: '#FFAC00', font: '38px Impact', align: 'center'});
		this.textoSalir     = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
	
		//indicación de si está listo el jugador
		this.ready[0]="";
		this.ready[1]="\nPlayers are ready,\ngame will start...";

		//texto invisible
		this.ready1 =this.add.text(0, 0, this.ready[0], { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		this.ready1 =this.add.text(0, 0, this.ready[0], { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		this.check = getComp();

		conection();
        Skin = sprite2;
	
		var that=this;
		//comprobación del estado del servidor
		if(this.check>5){
			this.time.addEvent({delay:100, loop:true,
		    callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})
		}

		//Actualiza si el otro jugador ha elegido personaje a traves de websocket
    	this.time.addEvent({delay:1000 ,loop:true ,
        callback: function(){that.checkplayer2 = GetReady} });

    	//Actualiza si el cliente es Host o no 
    	var IsHostText = this.add.text(100, 100, "", { fill: '#FFAC00', font: '38px Impact', align: 'center'});
    	

    	this.time.addEvent({delay:2000, loop: true, 
    	callback: function(){
    		var messageHost = {protocolo: "Host"}
    		connectionTiempo.send(JSON.stringify(messageHost));
    		if(IsHost!=null){
    			IsHostText.text="You are the Host";

    		}
    	}})

    	//Envía la posición inicial correspondiente al segundo jugador (no host)
    	this.time.addEvent({delay:1000, loop:true, 
    	callback: function(){
    		var messagePosicion = {protocolo: "Posicion"}
    		connectionDrops.send(JSON.stringify(messagePosicion)); console.log("POS" + PosicionWS);
    		if(PosicionWS!=null){
            posInicial = PosicionWS.posicion;
            }
    	}})
	}

	//actualiza las imágenes de la flecha de selección
	actualizarP1P2(){
		this.p1.setPosition(this.pmap1[this.posArrayP1].x - 75, this.pmap1[this.posArrayP1].y - 75);
	
	}

	//actualiza las posiciones según lo seleccionado
	actualizarPosArray(){

		var that = this;

		if(this.derecha2.isDown && (this.posArrayP1<1) && !this.checkplayer1 ){
			this.posArrayP1++; //mueve cursor a la derecha
		}else if(this.izquierda2.isDown && (this.posArrayP1>0) && !this.checkplayer1){
			this.posArrayP1--; //mueve cursor a la izquierda
		}else if(this.confirmar2.isDown && (IsHost!=null || this.checkplayer2)){
				
		
				this.checkplayer1 = true; //confirmación y bloqueo
				var data = {ready : that.checkplayer1 };
				var message = {protocolo: "GetReady", ready : data };
				connectionJugador.send(JSON.stringify(message))
				
            
			//this.ready2 = this.add.text(470, 390, "\n\n\n"+this.ready[1], { fill: '#FFFFFF', font: '32px Impact', align: 'center'});
			sprite=this.seleccionaravatar(this.posArrayP1);

		
		}

	}

startPartida () {
	this.scene.start('EscenarioOnline');

}

//da paso a la pantalla seleccionada sólo si los dos jugadores han elegido o si se decide salir


	scenechange(){
		var that=this;


		if(this.salir.isDown){
			this.scene.start('MainMenu');
		}
		if(this.confirmar2.isDown && (IsHost!=null || this.checkplayer2)){

			this.add.text(490, 390, "\n\n"+"Ready", {fill: '#00853A', font: '24px Impact'});
		}

		/*
		if(this.checkplayer1=true) {
        this.add.text(420, 390, "Player1 is ready", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});

		}
		if(this.checkplayer2=true) {
	    this.add.text(420, 390, "Player2 is ready", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});         
		}
		*/

		if(this.checkplayer1 && this.checkplayer2){
            this.add.text(490, 390, "\n"+"Ready", {fill: '#930A0A', font: '24px Impact'}).alpha = 0.06;
			this.ready2 = this.add.text(420, 390, "\n\n\n"+this.ready[1], { fill: '#F4FFF3', font: '24px Arial', align: 'center'}).alpha = 0.06;

           if(SoloMandarUnaVez == false){

            SoloMandarUnaVez = true;
            var MySkin = {skin : sprite};
		    var messagee = {protocolo: "Skin", skin : MySkin };
		    connectionJugador.send(JSON.stringify(messagee))
		    //console.log(SoloMandarUnaVez);
           }
 
            sprite2 = Skin.skin;

			this.time.addEvent({delay:7000, 
			callback: function(){that.startPartida()}}); //Quiero añadir un texto que ponga la partida va a comenzar... 
			//cuando seleccionen listo los dos jugadores y un timer to start 
			
		}
		
		var that = this;
		if(this.check){
			console.log("furrula")
			this.time.addEvent({delay:100, loop:true,
		    callback: function(){that.scene.start('EscenarioError');}})
		}

	
	}

	update(){
		this.scenechange();
		this.actualizarP1P2();
		this.actualizarPosArray();
		
	}
}