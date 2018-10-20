'use strict'
function Proyectiles (sprites){
	this.proyec = sprites;
	//this.jugador = player;
	var that = this;
	

	this.preload=function(scene){
		scene.load.image('Perdigón', that.proyec[0]);
		scene.load.image('Bala', that.proyec[1]);
		scene.load.image('GolpeBate', that.proyec[2]);
		scene.load.image('GolpePuñoA', that.proyec[3]);
		scene.load.image('GolpePuño', that.proyec[4]);
	}


	this.checkpos=function(avatar){
		var pos = new Array(2);
		if(avatar.sprite.texture.key.includes('left')){
			pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.width)/2));
		}else if(avatar.sprite.texture.key.includes('right')){
			pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.width)/2));
		}

		pos[1] = avatar.sprite.y;

		return pos;
	}
	this.crearproyectiles=function(arma,scene){
		var balas;
		switch(arma){
			case 'Escopeta':
				var perdigones = new Array(8);
				for(var i=0; i<8; i++){
					perdigones[i] = scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Perdigón').setScale(1);
				}
				balas=perdigones;
			break;
			case 'Pistola':
				balas = avatar.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Bala').setScale(1);
			break;
			case 'Subfusil':
				//var ráfaga = new Array(3);
				//for(var i = 0; i<3; i++){
					//ráfaga[i] = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Bala').setScale(1);
				//}	
				//balas=ráfaga;
				balas= scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Bala').setScale(1);
			break;
			case 'Bate':
				balas = scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'GolpeBate').setScale(1);
			break;
			case 'Puñoamericano':
				balas = scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'GolpePuñoA').setScale(1);
			break;
			case '':
				balas = scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'GolpePuño').setScale(1);
			break;
			default:

		}
		return balas;
	}
	this.fisicasproyectil=function(arma,avatar,balas){
		//var select;
		switch(arma){
			case "Escopeta":
				if(avatar.sprite.texture.key.includes('left')){
					for(var i = 0; i < balas.length ; i++){
						var vector = new Vector2(1,0);
						var matrix = new Matrix3();
						var angle = (225-(i*(11.25))).DEG_TO_RAD;
						var array = [Math.cos(angle),-1*Math.sen(angle),0,Math.sen(angle),Math.cos(angle),0,0,0,1];
						matrix.fromArray(array);
						console.log(matrix);
						vector.transformMat3(matrix);

						balas[i].setRotation(angle);
						balas[i].setVelocity(vector*5);
					}
				}else if(avatar.sprite.texture.key.includes('right')){
					for(var i = 0; i < balas.length ; i++){
						var vector = new Vector2(1,0);
						var matrix = new Matrix3();
						var angle = (315+(i*(11.25))).DEG_TO_RAD;
						var array = [Math.cos(angle),-1*Math.sen(angle),0,Math.sen(angle),Math.cos(angle),0,0,0,1];
						matrix.fromArray(array);
						console.log(matrix);
						vector.transformMat3(matrix);

						balas[i].setRotation(angle);
						balas[i].setVelocity(vector*5);
					}
				}
			break;
			case "Pistola":
				if(avatar.sprite.texture.key.includes('left')){
					var vector = new Vector2(-1,0);
					balas.setVelocity(vector*5);

				}else if(avatar.sprite.texture.key.includes('right')){
					var vector = new Vector2(1,0);
					balas.setVelocity(vector*5);
				}
			break;
			case "Subfusil":
				
				if(avatar.sprite.texture.key.includes('left')){
					var vector = new Vector2(-1,0);
					balas.setVelocity(vector*5);
				}else if(avatar.sprite.texture.key.includes('right')){
					var vector = new Vector2(1,0);
					balas.setVelocity(vector*5);
				}
			break;
			default:
		}
	}


	
	this.create = function(arma,scene,avatar){
		switch(arma){
			case 'Subfusil':
			
			that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene));
			scene.time.addEvent(
				{delay:5 ,repeat:2 ,
        		callback: function(){that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene))}});

			break;
			default:
			that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene));
		}
		

	}
	this.update=function(){

	}
}
