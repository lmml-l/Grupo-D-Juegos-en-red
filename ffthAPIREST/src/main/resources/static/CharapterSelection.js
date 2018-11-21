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

		this.derecha1;
		this.derecha2;
		this.izquierda1;
		this.izquierda2;
		this.confirmar1;
		this.confirmar2;

		this.textoControles;

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
		var title = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(100/600),'title').setScale(0.5);
		var subtitle = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(250/600),'subtitle').setScale(1);
		var character2 = this.add.image(this.game.canvas.width*(4/6),this.game.canvas.height*(4/6),'character1').setScale(1).setInteractive();
		var character1 = this.add.image(this.game.canvas.width*(2/6),this.game.canvas.height*(4/6),'character2').setScale(1).setInteractive();
		//guarda las imágenes en arrays
		this.pmap1.push(character1);
		this.pmap1.push(character2);
		this.pmap2.push(character1);
		this.pmap2.push(character2);
		//imagen de miniatura del personaje
		this.p1 = this.add.sprite((this.pmap1[this.posArrayP1].x - 50), (this.pmap1[this.posArrayP1].y - 50),'P1').setScale(1);
		this.p2 = this.add.sprite((this.pmap2[this.posArrayP2].x + 50), (this.pmap2[this.posArrayP2].y - 50),'P2').setScale(1);
		//engloba las imágenes
		var container = this.add.container(0,0);
		container.add(title);
		container.add(subtitle); 
		container.add(character1); 
		container.add(character2);  

		//teclas disponibles
		this.derecha1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.derecha2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.izquierda1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.izquierda2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.confirmar1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.confirmar2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
		//inicializa las teclas a no pulsadas (para evitar acarreros de pantallas anteriores)
		this.confirmar1.isDown=false;
		this.confirmar2.isDown=false;

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
		var subtitle = this.load.image('subtitle','Recursos/Imagenes/subtitle.png');
		var character1 = this.load.image('character1','Recursos/Imagenes/Character1.png');
		var character2 = this.load.image('character2','Recursos/Imagenes/Character2.png');
		var p1 = this.load.image('P1','Recursos/Imagenes/J1.png');
		var p2 = this.load.image('P2','Recursos/Imagenes/J2.png');
	}

	create(){
		this.selection();
		//indicación de los controles
		this.textoControles = this.add.text(10, 625, "Control\n           J1: W,D     T\n           J2: ←,→    P", { fill: '#FF8D24', font: '32px Times New Roman', align: 'center'});
	}

	//actualiza las imágenes de los iconos J1 y J2
	actualizarP1P2(){
		this.p1.setPosition(this.pmap1[this.posArrayP1].x - 50, this.pmap1[this.posArrayP1].y - 50);
		this.p2.setPosition(this.pmap2[this.posArrayP2].x + 50, this.pmap2[this.posArrayP2].y - 50);
	}

	//actualiza las posiciones según lo seleccionado
	actualizarPosArray(){
		if(this.derecha1.isDown && (this.posArrayP2<1) && !this.checkplayer2){
			this.posArrayP2++; //mueve cursor a la derecha
		}else if(this.izquierda1.isDown && (this.posArrayP2>0) && !this.checkplayer2){
			this.posArrayP2--; //mueve cursor a la izquierda
		}else if(this.confirmar1.isDown){
			this.checkplayer2 = true; //confirmación y bloqueo
			sprite2=this.seleccionaravatar(this.posArrayP2);
			
		}

		if(this.derecha2.isDown && (this.posArrayP1<1) && !this.checkplayer1 ){
			this.posArrayP1++; //mueve cursor a la derecha
		}else if(this.izquierda2.isDown && (this.posArrayP1>0) && !this.checkplayer1){
			this.posArrayP1--; //mueve cursor a la izquierda
		}else if(this.confirmar2.isDown){
			this.checkplayer1 = true; //confirmación y bloqueo
			sprite=this.seleccionaravatar(this.posArrayP1);
		}
	}
//da paso a la pantalla seleccionada sólo si los dos jugadores han elegido 
	scenechange(){
		if(this.checkplayer1 && this.checkplayer2){
			this.scene.start('MainEscenario');
		}
	}

	update(){
		this.scenechange();
		this.actualizarP1P2();
		this.actualizarPosArray();

	}
}