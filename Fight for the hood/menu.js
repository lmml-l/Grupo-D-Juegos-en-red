class MainMenu extends Phaser.Scene {
	constructor(){
		super({key:"MainMenu"});
	}
	preload(){
		this.load.image('title','Recursos/Imagenes/Logo.png');
		this.load.image('buttonlocal','');
		this.load.image('buttononline','')
		this.load.image('controles','')
	}


}