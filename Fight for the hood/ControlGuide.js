class ControlGuide extends Phaser.Scene {
	constructor(){
		super({key:"ControlGuide"});
		this.check;
		this.back1;
		this.back2;
	}
	
	controlmenu(){

		this.check = false;

		var controls = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'controls').setScale(1);

		this.back1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
		this.back2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

		this.back1.isDown=false;
		this.back2.isDown=false;



		
	}
	preload(){
		var controls = this.load.image('controls','Recursos/Imagenes/GuiaControles.png');
	}

	create(){
		this.controlmenu();
	}

	actualizarPosArray(){	
		if(this.back1.isDown){
			this.check = true;
			
		}

		if(this.back2.isDown){
			this.check = true;
		}
		//console.log("aaaa")
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