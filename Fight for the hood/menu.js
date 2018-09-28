class MainMenu extends Phaser.Scene {
	constructor(){
		super({key:"MainMenu"});
	}
	
	menu(){
		var title = this.add.image((this.game.canvas.width/2),(this.game.canvas.height/2),'title').setScale(1);
		//var buttonlocal = this.add.image(600,300,'buttonlocal');
		//var buttononline = this.add.image(700,200,'buttononline');
		//var controles = this.add.image(800,200,'controles');
		console.log("reading this");
	}
	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png')
		var buttonlocal = this.load.image('buttonlocal','Recursos/Imagenes/plain-button-500x500.jpg');
		var buttononline = this.load.image('buttononline','Recursos/Imagenes/plain-button-500x500.jpg');
		var controles = this.load.image('controles','Recursos/Imagenes/plain-button-500x500.jpg');
	}
	//this.add.image(400,300,)

	create(){
		this.menu();
	}

	
}