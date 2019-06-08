'use strict'
//Controla las armas que aparecen sueltas por el escenario (drops)
//Las armas se colocan aleatoriamente en cinco posiciones fijas
function Drops(escena, sprites) {
		this.scene 			= escena;
		this.pistola 		= sprites[0];
		this.escopeta 		= sprites[1];
		this.subfusil 		= sprites[2];
		this.punoamericano 	= sprites[3];
		this.batebeisbol 	= sprites[4];
		this.sprite 		= new Array();
		var that = this;

	this.initPos = function(){
		//posición aleatoria
		var r = Math.floor(Math.random() * 5)  ; //5 posiciones aleatorias de drop
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
		
		return rPos;
	}
	
	this.preload = function(){
		that.scene.load.image('Pistola', that.pistola);
		that.scene.load.image('Escopeta', that.escopeta);
		that.scene.load.image('Subfusil', that.subfusil);
		that.scene.load.image('Punoamericano', that.punoamericano);
		that.scene.load.image('Bate', that.batebeisbol);
	}

	this.create = function(){
		this.sprite = new Array();
	}

	//selecciona aleatoriamente el arma que aparecerá
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
				name = "Punoamericano";
			break;

			case 4:
				name = "Bate";
			break;
		}
		return name;
	}

	this.spawnarma = function(){
		if(that.sprite!=null){
			
		var armapos = that.initPos();
		var check = true;
		var i = 0;

		//comprueba que la posición marcada en initPos() no está ocupada
		//si es válida se añade a la escena
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
		
		//se descarta el arma que no se añade
		if(that.sprite.length > 5){
			var s = that.sprite.shift();
			s.destroy();
		}
		}
	}

	this.toJSON = function(){
		var data = {
			sprite: that.sprite
		}
		return data;
	}
}
