class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
		this.pmap1 = new Array();
		this.pmap2 = new Array();
		this.checkplayer1;
		this.checkplayer2;
		this.p1;
		this.p2;
		this.posArrayP1;
		this.posArrayP2;
		/*
		this.pos1 = new Array[2];
		this.pos2 = new Array[2];
		*/
		var that = this;
	}

	selection(){
		this.checkplayer1 = false;
		this.checkplayer2 = false;

		this.posArrayP1=0;
		this.posArrayP2=1;

		var title = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(100/600),'title').setScale(0.5);
		var subtitle = this.add.image(this.game.canvas.width*(3/6),this.game.canvas.height*(250/600),'subtitle').setScale(0.75);
		var character1 = this.add.image(this.game.canvas.width*(4/6),this.game.canvas.height*(4/6),'character1').setScale(1).setInteractive();
		var character2 = this.add.image(this.game.canvas.width*(2/6),this.game.canvas.height*(4/6),'character2').setScale(1).setInteractive();
		
		this.pmap1.push(character1);
		this.pmap1.push(character2);
		this.pmap2.push(character2);
		this.pmap2.push(character1);

		this.p1 = this.add.image((this.pmap1[this.posArrayP1].x - 50), (this.pmap1[this.posArrayP1].y - 50),'P1').setScale(1);
		this.p2 = this.add.image((this.pmap2[this.posArrayP2].x + 50), (this.pmap2[this.posArrayP2].y - 50),'P2').setScale(1);

		var container = this.add.container(0,0);
		container.add(title);
		container.add(subtitle); 
		container.add(character1); 
		container.add(character2);  

		

		//initPos();

		/*
		var map1 = selectormap(pmap1,0.5);
		var map2 = selectormap(pmap2,-0.5);
		*/


	}

	/*
	initPos(){
		this.pos1[0]=that.game.canvas.width*(4.5/6);
		this.pos1[1]=that.game.canvas.height*(3/6);
		this.pos2[0]=that.game.canvas.width*(1.5/6);
		this.pos2[1]=that.game.canvas.height*(3/6);
	}
	*/

	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png');
		var subtitle = this.load.image('subtitle','Recursos/Imagenes/subtitle.png');
		var character1 = this.load.image('character1','Recursos/Imagenes/Character1.png');
		var character2 = this.load.image('character2','Recursos/Imagenes/Character2.png');
		var p1 = this.load.image('P1','Recursos/Imagenes/P1.png');
		var p2 = this.load.image('P2','Recursos/Imagenes/P2.png');
	}

	create(){
		this.selection();
		
	}

	/*
	selectormap(pmap,extra){
		pmap[0] = that.game.canvas.width*((4+extra)/6);
		pmap[1] = that.game.canvas.height*(3/6);
		pmap[2] = that.game.canvas.width*((2+extra)/6);
		pmap[3] = that.game.canvas.height*(3/6);
		return pmap;
	}
	*/

	actualizarP1P2(){
		this.p1.setPosition(this.pmap1[this.posArrayP1].x - 50, this.pmap1[this.posArrayP1].y - 50);
		this.p2.setPosition(this.pmap2[this.posArrayP2].x + 50, this.pmap2[this.posArrayP2].y - 50);
	}

	actualizarPosArray(){
		if(Phaser.Input.Keyboard.KeyCodes.RIGHT.isDown && (this.posArrayP2<2) && this.checkplayer2){
			this.posArrayP2++;
		}else if(Phaser.Input.Keyboard.KeyCodes.LEFT.isDown && (this.posArrayP2>0) && this.checkplayer2){
			this.posArrayP2--;
		}else if(Phaser.Input.Keyboard.KeyCodes.P.isDown){
			this.checkplayer2 = true;
		}

		if(Phaser.Input.Keyboard.KeyCodes.A.isDown && (this.posArrayP1<2) && this.checkplayer1){
			this.posArrayP1++;
		}else if(Phaser.Input.Keyboard.KeyCodes.D.isDown && (this.posArrayP1>0) && this.checkplayer1){
			this.posArrayP1--;
		}else if(Phaser.Input.Keyboard.KeyCodes.T.isDown){
			this.checkplayer1 = true;
		}
	}

	scenechange(){
		if(this.checkplayer1 == true && this.checkplayer2 == true){
			this.scene.start('MainEscenario');
		}else{
			this.actualizarPosArray();
		}
	}

	update(){
		this.scenechange();
		this.actualizarP1P2();
	}
}