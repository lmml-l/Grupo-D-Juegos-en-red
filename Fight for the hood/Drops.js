'use strict'
function Drops(escena, sprites) {
		this.scene = escena;
		this.pistola = sprites[0];
		this.escopeta = sprites[1];
		this.subfusil = sprites[2];
		this.puñoamericano = sprites[3];
		this.batebeisbol = sprites[4];
		this.sprite = new Array();
		var that = this;

	this.initPos = function(){
		//posición aleatoria
		var r = Math.floor(Math.random() * 5)  ; //las posiciones que sean (de momento son 2 máximos) (de 0 a 2?)
		//posiciones de los drops
		var pos1 = new Array(135, 292);
		var pos2 = new Array(505, 46);
		var pos3 = new Array(460, 255);
		var pos4 = new Array(862, 118);
		var pos5 = new Array(691, 343);
		//array de posiciones posibles
		var arrayPos = new Array(pos1, pos2, pos3, pos4, pos5);
		//asignación de posición
		var rPos = arrayPos[r];
		//comprobación de posición no ocupada
		
		return rPos;
		//that.game.setGravity(-0.98);
	}
	
	this.preload = function(){

		that.scene.load.image('Pistola', that.pistola);
		that.scene.load.image('Escopeta', that.escopeta);
		that.scene.load.image('Subfusil', that.subfusil);
		that.scene.load.image('Puñoamericano', that.puñoamericano);
		that.scene.load.image('Bate', that.batebeisbol);


	}

	this.selectID = function(){
		var name;
		var e = Math.floor(Math.random()*5);
		switch(e){
			case 0:
				name = "Escopeta";
			break;

			case 1:
				name = "Pistola";
			break;

			case 2:
				name = "Subfusil";
			break;

			case 3:
				name = "Puñoamericano";
			break;

			case 4:
				name = "Bate";
			break;
		}
		return name;
	}

	this.spawnarma = function(){
		var armapos = that.initPos();
		var check = true;
		var i = 0;
		while(check && i<that.sprite.length){
			if(that.sprite[i].x == armapos[0] && that.sprite[i].y == armapos[1]){
				check = false;
			}
			i++;
		}

		if(check){
		var armapw = that.scene.physics.add.sprite(armapos[0],armapos[1], that.selectID()).setScale(1);
		that.sprite.push(armapw)
		}
		

		if(that.sprite.length > 5){
			var s = that.sprite.shift();
			s.destroy();
		}
	}
}
