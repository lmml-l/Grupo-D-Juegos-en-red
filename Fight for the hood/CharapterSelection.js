class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
	}

	selection(){
		var title = this.add.image(0,this.game.canvas.height*(50/600),'title').setScale(0.25);
		var subtitle = this.add.image(0,this.game.canvas.height*(150/600),'subtitle').setScale(0.25);
		var character1 = this.add.image(this.game.canvas.width*(4/6),this.game.canvas.height*(4/6),'character1').setScale(0.5).setInteractive();
		var character2 = this.add.image(this.game.canvas.width*(2/6),this.game.canvas.height*(4/6),'character2').setScale(0.5).setInteractive();
		var p1 = this.add.image(this.game.canvas.width*(4.5/6),this.game.canvas.height*(3/6),'P1').setScale(0.25);
		var p2 = this.add.image(this.game.canvas.width*(1.5/6),this.game.canvas.height*(3/6),'P2').setScale(0.25);
		var checkplayer1 = false;
		var checkplayer2 = false;

		var container = this.add.container(0,0);
		container.add(title);
		container.add(subtitle); 
		container.add(character1); 
		container.add(character2);  
		container.setX(this.game.canvas.width/2);

		if(checkplayer1 == true && checkplayer2 == true){
			this.scene.start('MainEscenario');
		}

	}

	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png')
		var subtitle = this.load.image('subtitle','Recursos/Imagenes/subtitle.png')
		var character1 = this.load.image('character1','Recursos/Imagenes/Character1.png');
		var character2 = this.load.image('character2','Recursos/Imagenes/Character2.png');
		var p1 = this.load.image('P1','Recursos/Imagenes/P1.png');
		var p2 = this.load.image('P2','Recursos/Imagenes/P2.png');
	}

	create(){
		this.selection();
		
	}

	checker(){
		
	}

}
