//Muestra los controles del juego. Funcionamiento análogo al resto de menús (menu.js y CharapterSelection.js)
class Pausa extends Phaser.Scene {
	constructor(){
		super({key:"Pausa"});
		this.check;
		this.salir; //salir con escape
		this.texto
		this.fondoSalir;
	}
	
	controlmenu(){

		this.check = false;

		//var controls = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'controls').setScale(1);

		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.volverMenu = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

		this.salir.isDown 		= false;
		this.volverMenu.isDown 	= false;
	}

	preload(){
		//var controls = this.load.image('controls','Recursos/Imagenes/GuiaControles.png');
		this.load.image('menuControlFondo','Recursos/Imagenes/menuControlesFondo.png');
		//IMAGEN DEL TECLADO PROVENIENTE DE https://beconnected.esafety.gov.au/topic-library/essentials/the-absolute-basics/what-is-a-computer/what-is-a-keyboard#
		//MODIFICADA POR NOSOTROS (color y botones)
	}

	create(){
		this.fondo 		= this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuControlFondo').setScale(1.3);
		this.controlmenu();
		this.texto 		= this.add.text(200, 500, "Press Z for back to menu", { fill: '#FFAC00', font: '28px Impact', align: 'left'});
		this.textoSalir = this.add.text(200, 500, "\nPress ESC to resume", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});
	
		var that=this;
	}

	actualizarPosArray(){	
		if(this.salir.isDown){
			this.check = true;
			this.salir.isDown = false;
			//this.salir.isDown = false;
		}
		if(this.volverMenu.isDown){
			this.volverMenu.isDown = false;
			this.scene.stop('MainEscenario');
			this.scene.switch('MainMenu');
			this.scene.stop('Pausa');
		}
	}

	scenechange(){
		if(this.check){
			//this.time.clearPendingEvents();
    		//this.time.removeAllEvents();
    		pausado 	= false;
    		this.check 	= false;
			this.scene.wake('MainEscenario');
			//this.scene.switch('MainEscenario');
		}
	}

	update(){
		this.scenechange();
		this.actualizarPosArray();

	}
}