//Cada jugador selecciona el aspecto con el que aparecerá su personaje
class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
		this.pmap1 = new Array();
		this.pmap2 = new Array();
		this.checkplayer1;
		this.checkplayer2;
		this.p1;
		this.p2;
		this.posArrayP1;
		this.posArrayP2;
		this.check;
		this.musica;
		
		this.derecha1;
		this.derecha2;
		this.izquierda1;
		this.izquierda2;
		this.confirmar1;
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
		//selección
		this.posArrayP1=0;
		this.posArrayP2=1;

		//sprites
		var title = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(150/600),'title').setScale(0.5);
		//var subtitle = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(250/600),'subtitle').setScale(1);
		var character2 = this.add.image(this.game.canvas.width*(4/6),this.game.canvas.height*(4/6),'character1').setScale(2).setInteractive();
		var character1 = this.add.image(this.game.canvas.width*(2/6),this.game.canvas.height*(4/6),'character2').setScale(2).setInteractive();
		//guarda las imágenes en arrays
		this.pmap1.push(character1);
		this.pmap1.push(character2);
		this.pmap2.push(character1);
		this.pmap2.push(character2);
		//imagen de miniatura del personaje
		this.p1 = this.add.sprite((this.pmap1[this.posArrayP1].x - 75), (this.pmap1[this.posArrayP1].y - 75),'P1').setScale(1.5);
		this.p2 = this.add.sprite((this.pmap2[this.posArrayP2].x + 75), (this.pmap2[this.posArrayP2].y - 75),'P2').setScale(1.5);
		//engloba las imágenes
		var container = this.add.container(0,0);
		container.add(title);
		//container.add(subtitle); 
		container.add(character1); 
		container.add(character2); 

		//teclas disponibles
		this.derecha1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.derecha2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.izquierda1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.izquierda2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.confirmar1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.confirmar2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		//inicializa las teclas a no pulsadas (para evitar acarreros de pantallas anteriores)
		this.confirmar1.isDown=false;
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
        "Recursos/Imagenes/Sprites_Personaje2/SpritePersonajePunoAmericanoIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePersonajePunoAmericanoDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteBateIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteBateDerecha.png"]

		}else if(posArray==1){
			spriteHojalocal = ["Recursos/Imagenes/Sprites_Personaje/SpritePersonajeIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajeDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpritePistolaIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePistolaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteEscopetaIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteEscopetaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteThomsomIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteThomsomDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpritePersonajePunoAmericanoIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajePunoAmericanoDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteBateIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteBateDerecha.png"]
		}
		return spriteHojalocal;
	}

	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png');
		//var subtitle = this.load.image('subtitle','Recursos/Imagenes/subtitle.png');
		var character1 = this.load.image('character1','Recursos/Imagenes/Character1.png');
		var character2 = this.load.image('character2','Recursos/Imagenes/Character2.png');
		var p1 		   = this.load.image('P1','Recursos/Imagenes/P1.png');
		var p2 		   = this.load.image('P2','Recursos/Imagenes/P2.png');
		this.load.image('menuCharacterFondo','Recursos/Imagenes/menuCharacterFondo.png');
		this.load.audio('musicacharacterselection','Recursos/Audio/CharacterSelection.mp3');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuCharacterFondo').setScale(1.3);
		this.selection();

		this.musica = this.game.sound.add('musicacharacterselection');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		this.musica.play();
		//indicación de los controles
		this.textoControles = this.add.text(470, 540, "\nselect\naccept", { fill: '#FFFFFF', font: '30px Impact', align: 'center'});
		this.textoControles = this.add.text(470, 540, "control", { fill: '#FFAC00', font: '30px Impact', align: 'center'});
		this.textoControles = this.add.text(300, 540, "\nA,D\nSPACE", { fill: '#FFAC00', font: '32px Impact', align: 'center'});
		this.textoControles = this.add.text(650, 540, "\n←,→\nENTER", { fill: '#FFAC00', font: '32px Impact', align: 'center'});
		this.subtitulo 		= this.add.text(360, 350, "CHOOSE YOUR FIGHTER", { fill: '#FFAC00', font: '38px Impact', align: 'center'});
		this.textoSalir     = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
	
		//indicación de si está listo el jugador
		this.ready[0]="";
		this.ready[1]="READY";

		//texto invisible
		this.ready1 =this.add.text(0, 0, this.ready[0], { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
		this.ready1 =this.add.text(0, 0, this.ready[0], { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
	
		var that=this;
		
	}

	//actualiza las imágenes de los iconos J1 y J2
	actualizarP1P2(){
		this.p1.setPosition(this.pmap1[this.posArrayP1].x - 75, this.pmap1[this.posArrayP1].y - 75);
		this.p2.setPosition(this.pmap2[this.posArrayP2].x + 75, this.pmap2[this.posArrayP2].y - 75);
	}

	//actualiza las posiciones según lo seleccionado
	actualizarPosArray(){
		if(this.derecha1.isDown && (this.posArrayP2<1) && !this.checkplayer2){
			this.posArrayP2++; //mueve cursor a la derecha
		}else if(this.izquierda1.isDown && (this.posArrayP2>0) && !this.checkplayer2){
			this.posArrayP2--; //mueve cursor a la izquierda
		}else if(this.confirmar1.isDown){
			this.checkplayer2 = true; //confirmación y bloqueo
			this.ready1 = this.add.text(650, 540, "\n\n\n"+this.ready[1], { fill: '#FFFFFF', font: '32px Impact', align: 'center'});
			sprite2=this.seleccionaravatar(this.posArrayP2);
		}

		if(this.derecha2.isDown && (this.posArrayP1<1) && !this.checkplayer1 ){
			this.posArrayP1++; //mueve cursor a la derecha
		}else if(this.izquierda2.isDown && (this.posArrayP1>0) && !this.checkplayer1){
			this.posArrayP1--; //mueve cursor a la izquierda
		}else if(this.confirmar2.isDown){
			this.checkplayer1 = true; //confirmación y bloqueo
			this.ready2 = this.add.text(300, 540, "\n\n\n"+this.ready[1], { fill: '#FFFFFF', font: '32px Impact', align: 'center'});
			sprite=this.seleccionaravatar(this.posArrayP1);
		}
	}
//da paso a la pantalla seleccionada sólo si los dos jugadores han elegido o si se decide salir
	scenechange(){
		if(this.salir.isDown){
			this.scene.start('MainMenu');
			this.musica.stop();
		}
		if(this.checkplayer1 && this.checkplayer2){
			this.scene.start('MainEscenario');
			this.musica.stop();
		}
		var that = this;
		if(this.check){
			this.time.addEvent({delay:100, loop:true,
		    callback: function(){
		    	that.scene.start('EscenarioError');
		    this.musica.stop();}})
		}
	}

	update(){
		this.scenechange();
		this.actualizarP1P2();
		this.actualizarPosArray();

	}
}