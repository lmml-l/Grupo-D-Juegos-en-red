class MainMenu extends Phaser.Scene {
	constructor(){
		super({key:"MainMenu"});
	}
	
	menu(){
		var title = this.add.image(0,150,'title').setScale(0.5);
		var buttonlocal = this.add.image(0,300,'buttonlocal').setScale(0.5).setInteractive();
		var buttononline = this.add.image(0,400,'buttononline').setScale(0.5).setInteractive();
		var controles = this.add.image(0,500,'controles').setScale(0.5).setInteractive();
		
		buttonlocal.on('pointerdown', function(event){this.scene.start(CharapterSelection)},this); 
		buttononline.on('pointerdown', function(event){this.scene.start(CharapterSelection)},this);
		controles.on('pointerdown', function(event){this.scene.start(CharapterSelection)},this); 

		var container = this.add.container(0,0);
		container.add(title);
		container.add(buttonlocal); 
		container.add(buttononline); 
		container.add(controles);  
		container.setX(this.game.canvas.width/2);
		
	}
	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png')
		var buttonlocal = this.load.image('buttonlocal','Recursos/Imagenes/Jugar_Local.png');
		var buttononline = this.load.image('buttononline','Recursos/Imagenes/Jugar_Online.png');
		var controles = this.load.image('controles','Recursos/Imagenes/Controles.png');
	}

	create(){
		this.menu();
	}

	
}