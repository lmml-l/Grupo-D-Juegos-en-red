//Muestra los ccreditos del juego
class Creditos extends Phaser.Scene {
	constructor(){
		super({key:"Creditos"});
		this.check;
		this.salir; //salir con esc
		this.texto;
		this.fondoSalir;
		this.musica;
	}
	
	controlmenu(){

		this.check = false;

		

		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		this.salir.isDown=false;
	}

	preload(){
		this.load.image('menuControlFondo','Recursos/Imagenes/menuControlesFondo.png');
		
		this.load.audio('musicacontrol','Recursos/Audio/Menu.mp3');
	}

	create(){
		this.fondo 		= this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuControlFondo').setScale(1.3);
		this.controlmenu();
		this.musica = this.game.sound.add('musicacontrol');
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