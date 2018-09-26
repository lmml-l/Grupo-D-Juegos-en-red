class MainMenu extends Phaser.Scene {
	constructor(){
		super({key:"MainMenu"});
	}
	preload(){
		var title = this.load.image('title','Logo.png');
		var buttonlocal = this.load.image('buttonlocal','Recursos/Imagenes/plain-button-500x500.png');
		var buttononline = this.load.image('buttononline','Recursos/Imagenes/plain-button-500x500.jpg')
		var controles = this.load.image('controles','Recursos/Imagenes/plain-button-500x500.jpg')
	}
	//this.add.image(400,300,)
	create(){
		var title = this.add.image(300,400,'title');
		var buttonlocal = this.add.image(600,300,'buttonlocal');
		var buttononline = this.add.image(700,200,'buttononline');
		var controles = this.add.image(800,200,'controles');
		console.log("reading this");
	}
}