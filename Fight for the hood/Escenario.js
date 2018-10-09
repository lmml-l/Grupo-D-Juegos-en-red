class MainEscenario extends Phaser.Scene {

	constructor(){
		super({key:"EscenaPrincipal"});
	}



preload(){

	this.load.image('Fondo', 'assets/background.png'); 
	this.load.image('Suelo', '');


}

create(){
	var platformas;
	var Suelo;


		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(0, 0, 'Fondo');
		this.add.sprite(0, 0, 'Suelo');

	platformas = this.physics.add.staticGroup();  //Hace solidas las plataformas

    platformas.create(x, y, 'Suelo').setScale(2).refreshBody();

    platformas.create(x, y, 'Suelo');


	}