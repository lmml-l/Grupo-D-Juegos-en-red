class MainEscenario extends Phaser.Scene {
	constructor(){
		super({key:"MainEscenario"});
	}

Escenario{


}

preload(){

	this.load.image('background', 'assets/background.png'); 


}

create(){
		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(0, 0, 'background');
	}