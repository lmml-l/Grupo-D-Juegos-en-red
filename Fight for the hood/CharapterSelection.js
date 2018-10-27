class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
		this.pmap1 = new Array[4];
		this.pmap2 = new Array[4];
		this.pos1 = new Array[2];
		this.pos2 = new Array[2];
		var that = this;
	}

	selection(){
		var title = this.add.image(0,this.game.canvas.height*(50/600),'title').setScale(0.25);
		var subtitle = this.add.image(0,this.game.canvas.height*(150/600),'subtitle').setScale(0.25);
		var character1 = this.add.image(this.game.canvas.width*(4/6),this.game.canvas.height*(4/6),'character1').setScale(0.5).setInteractive();
		var character2 = this.add.image(this.game.canvas.width*(2/6),this.game.canvas.height*(4/6),'character2').setScale(0.5).setInteractive();
		var p1 = this.add.image(this.game.canvas.width*(4.5/6),this.game.canvas.height*(3/6),'P1').setScale(0.25);
		var p2 = this.add.image(this.game.canvas.width*(1.5/6),this.game.canvas.height*(3/6),'P2').setScale(0.25);

		initPos();

		var checkplayer1 = false;
		var checkplayer2 = false;

		var map1 = selectormap(pmap1,0.5);
		var map2 = selectormap(pmap2,-0.5);

		var container = this.add.container(0,0);
		container.add(title);
		container.add(subtitle); 
		container.add(character1); 
		container.add(character2);  
		container.setX(this.game.canvas.width/2);

		if(checkplayer1 == true && checkplayer2 == true){
			this.scene.start('MainEscenario');
		}else{
			checker(pos1, pos2, map1, map2);
		}

	}

	initPos(){
		this.pos1[0]=that.game.canvas.width*(4.5/6);
		this.pos1[1]=that.game.canvas.height*(3/6);
		this.pos2[0]=that.game.canvas.width*(1.5/6);
		this.pos2[1]=that.game.canvas.height*(3/6);
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

	checker(pos1, pos2, map1, map2, checkplayer1, checkplayer2){
		if(/*keypressed.keyCode de a && pos1[0] == map1[0]*/){
			//no pasa nada puesto que ya estás en la izquierda y no puedes ir más a la izquierda
		}else if(/*keypressed.keyCode de a && pos1[0] == map1[2]*/){
			pos1[0]=map1[0];
			p1.setX(pos1[0]);
		}

		if(/*keypressed.keyCode de d && pos1[0] == map1[0]*/){
			pos1[0]=map1[2];
			p1.setX(pos1[0]);
		}else if(/*keypressed.keyCode de d && pos1[0] == map1[2]*/){
			//no pasa nada puesto que ya estás en la derecha y no puedes ir más a la derecha
		}

		if(/*keypressed.keyCode de flecha izquierda && pos2[0] == map2[0]*/){
			//no pasa nada puesto que ya estás en la izquierda y no puedes ir más a la izquierda
		}else if(/*keypressed.keyCode de flecha izquierda && pos2[0] == map2[2]*/){
			pos2[0]=map2[0];
			p2.setX(pos2[0]);
		}

		if(/*keypressed.keyCode de flecha derecha && pos2[0] == map2[0]*/){
			pos2[0]=map2[2];
			p2.setX(pos2[0]);
		}else if(/*keypressed.keyCode de flecha derecha && pos2[0] == map2[2]*/){
			//no pasa nada puesto que ya estás en la derecha y no puedes ir más a la derecha
		}

		if(/*keypressed.keyCode de espacio*/){
			this.checkplayer1 = true;
			return checkplayer1;
		}else if(/*keypressed.keyCode de o*/){
			this.checkplayer2 = true;
			return checkplayer2;
		}
	}

	selectormap(pmap,extra){
		pmap[0] = that.game.canvas.width*((4+extra)/6);
		pmap[1] = that.game.canvas.height*(3/6);
		pmap[2] = that.game.canvas.width*((2+extra)/6);
		pmap[3] = that.game.canvas.height*(3/6);
		return pmap;
	}
}
