//Muestra los controles del juego. Funcionamiento análogo al resto de menús (menu.js y CharapterSelection.js)
class ControlGuide extends Phaser.Scene {
	constructor(){
		super({key:"ControlGuide"});
		this.check;
		this.salir; //salir con escape
		this.fondo;
	}
	
	controlmenu(){

		this.check = false;

		//var controls = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'controls').setScale(1);

		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

		this.salir.isDown=false;
	}

	preload(){
		//var controls = this.load.image('controls','Recursos/Imagenes/GuiaControles.png');
		this.load.image('menuControlFondo','Recursos/Imagenes/menuLobbyFondo.png');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuControlFondo').setScale(1.3);
		this.controlmenu();
	}

	actualizarPosArray(){	
		if(this.salir.isDown){
			this.check = true;
		}
	}

	scenechange(){
		if(this.check){
			this.scene.start('MainMenu');
		}
	}

	update(){
		this.scenechange();
		this.actualizarPosArray();

	}
}