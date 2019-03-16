//Muestra los controles del juego. Funcionamiento análogo al resto de menús (menu.js y CharapterSelection.js)
class ControlGuide extends Phaser.Scene {
	constructor(){
		super({key:"ControlGuide"});
		this.check;
		this.salir; //salir con escape
		this.texto
		this.fondoSalir;
		this.musica;
	}
	
	controlmenu(){

		this.check = false;

		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		this.salir.isDown=false;
	}

	preload(){
		//var controls = this.load.image('controls','Recursos/Imagenes/GuiaControles.png');
		this.load.image('menuControlFondo','Recursos/Imagenes/menuControlesFondo.png');
		//IMAGEN DEL TECLADO PROVENIENTE DE https://beconnected.esafety.gov.au/topic-library/essentials/the-absolute-basics/what-is-a-computer/what-is-a-keyboard#
		this.load.audio('musicacontrol','Recursos/Audio/CharacterSelection.mp3');
	}

	create(){
		this.fondo 		= this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuControlFondo').setScale(1.3);
		this.controlmenu();
		this.texto 		= this.add.text(200, 500, "Player 1\nA,S\nW\nR\nT", { fill: '#FFAC00', font: '28px Impact', align: 'left'});
		this.texto 		= this.add.text(400, 500, "Controls\nMove\nJump\nGrap/Drop Weapon\nShoot", { fill: '#FFFFFF', font: '28px Impact', align: 'center'});
		this.texto 		= this.add.text(700, 500, "Player 2\n←,→\n↑\nO\nP", { fill: '#3FAEFF', font: '28px Impact', align: 'right'});

		this.musica = this.game.sound.add('musicacontrol');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		this.musica.play();

		this.textoSalir = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
	
		var that=this;
		//comprobación del estado del servidor
			this.time.addEvent({delay:1000, loop:true,
		    callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})
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