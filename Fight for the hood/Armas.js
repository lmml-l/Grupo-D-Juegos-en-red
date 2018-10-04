class Armas extends Phaser.Sprite {
	constructor(){
		super({key:"Drop"});
	}

	position(){
		var x;
		var y = this.game.canvas.height;
	}

	init(){
		var s = Math.random()*this.game.canvas.width;
		x = s;
	}

	preload(){
		var e = Math.floor(Math.random()*5);
		switch(e){
			case 1:

		}
	}

}