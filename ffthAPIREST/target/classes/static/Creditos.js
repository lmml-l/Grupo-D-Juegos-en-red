//Muestra los creditos del juego
class Creditos extends Phaser.Scene {
	constructor(){
		super({key:"Creditos"});
		this.check;
		this.salir; //salir con esc
		this.texto;
		this.creditoss;
		this.fondoSalir;
		this.musica;
		this.fondo;
	}
	
	controlmenu(){
		this.check = false;
		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.salir.isDown=false;
	}

	preload(){
		this.load.image('fondoMenu2','Recursos/Imagenes/menuCharacterFondo.png');
		this.load.image('Credits','Recursos/Imagenes/Creditos.png');
		this.load.audio('musicafinal','Recursos/Audio/CharacterSelection.mp3');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'fondoMenu2').setScale(1.3);
		this.creditoss =  this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'Credits');
		this.controlmenu();
		this.musica = this.game.sound.add('musicafinal');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		this.musica.play();

		this.textoSalir = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
	
		var that=this;
	}

	actualizarPosArray(){	
		if(this.salir.isDown){
			this.check = true;

		}
	}

	//cambio de escena
	scenechange(){
		if(this.check){
			this.time.clearPendingEvents();
    		this.time.removeAllEvents();
			this.scene.start('MainMenu');
			this.musica.stop();
		}
	}

	update(){
		this.scenechange();
		this.actualizarPosArray();

	}
}