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
		var pos1 = new Array(252,224);
		var pos2 = new Array(452,324);
		var pos3 = new Array(62,324);
		var pos4 = new Array(292,378);
		var pos5 = new Array(732,324);
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
		while(check = true && i<that.sprite.length){
			if(that.sprite[i].x == armapos[0] && that.sprite[i].y == armapos[1]){
				check = false;
			}
			i++;
		}
		if(check=true){
		var armapw = that.scene.physics.add.sprite(armapos[0],armapos[1], that.selectID()).setScale(1);
		that.sprite.push(armapw)
		}
		//var i = Math.floor(Math.random(5));
		//var s = that.sprite[i];
		//if(that.sprite[i]!=undefined){
			//s.destroy();
		//}
		
		//that.sprite[i]=armapw;

		if(that.sprite.length > 5){
			var s = that.sprite.shift();
			s.destroy();
		}
		
		return armapw;
	}

	/*this.printWeapon = function(idarma){
		switch(idarma){
			case esc:
				that.load.spritesheet('Escopeta',escopeta);
				that.newArma = "escopeta";
			break;
				
			case pst:
				that.load.spritesheet('Pistola',pistola);
				that.newArma = "pistola";
			break;

			case sbf:
				that.load.spritesheet('Subfusil',subfusil);
				that.newArma = "subfusil";
			break;

			case pa:
				that.load.spritesheet('PuñoAmericano',puñoamericano);
				that.newArma = "puño americano";
			break;

			case bb:
				that.load.spritesheet('BateBeisbol',batebeisbol);
				that.newArma = "bate de beisbol";
			break;
		}	
	}
	*/

	/*this.pickndrop = function(arma, scene, newArma){
		this.callbackID = this.newArma;
		this.sprite.destroy();
		printWeapon(arma);
	}
	*/

	/*this.setnewID = function(){
		this.Jugador.arma = this.callbackID;
	}
	*/
}