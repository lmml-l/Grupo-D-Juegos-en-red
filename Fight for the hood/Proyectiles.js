'use strict'
function Proyectiles (escena, jugador, sprites){
	this.scene = escena;
	this.proyec = sprites;
	this.nombre = jugador.arma;
	var that = this;
	

	this.preload=function(){
		that.scene.load.image('Perdigón', that.proyec[0]);
		that.scene.load.image('Bala', that.proyec[1]);
		that.scene.load.image('GolpeBate', that.proyec[2]);
		that.scene.load.image('GolpePuñoA', that.proyec[3]);
		that.scene.load.image('GolpePuño', that.proyec[4]);
	}


	this.checkpos=function(){
		var pos = new Array(2);
		if(that.jugador.avatar.sprite.texture.key.includes('left')){
			pos[0]=(that.jugador.avatar.sprite.x - ((that.jugador.avatar.sprite.anims.currentFrame.width)/2));
		}else if(that.jugador.avatar.sprite.texture.key.includes('right')){
			pos[0]=(that.jugador.avatar.sprite.x + ((that.jugador.avatar.sprite.anims.currentFrame.width)/2));
		}

		pos[1] = that.jugador.avatar.sprite.y;

		return pos;
	}


	this.update=function(){

	}


	this.animaciones=function(balas){
		var select;
		switch(select){
			case "Escopeta":
				if(that.jugador.avatar.sprite.texture.key.includes('left')){
					for(var i = 0; i < balas.length ; i++){
						balas[i].setRotation((225-(i*(11.25))).DEG_TO_RAD);
					}
				}else if(that.jugador.avatar.sprite.texture.key.includes('right')){
					for(var i = 0; i < balas.length ; i++){
						balas[i].setRotation((315+(i*(11.25))).DEG_TO_RAD);
					}
				}
			break;
			case "Pistola":
				if(that.jugador.avatar.sprite.texture.key.includes('left')){
				
				}else if(that.jugador.avatar.sprite.texture.key.includes('right')){
					
				}
			break;
			case "Subfusil":
				
				if(that.jugador.avatar.sprite.texture.key.includes('left')){
					for(var i = 0; i < balas.length ; i++){
						
					}
				}else if(that.jugador.avatar.sprite.texture.key.includes('right')){
					for(var i = 0; i < balas.length ; i++){
						
					}
				}
			break;
		}
	}


	this.create=function(){
		var balas;
		switch(that.jugador.arma){
			case 'Escopeta':
				var perdigones = new Array(8);
				for(var i=0; i<8; i++){
					perdigones[i] = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Perdigón').setScale(1);
				}
				balas=perdigones;
			break;
			case 'Pistola':
				balas = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Bala').setScale(1);
			break;
			case 'Subfusil':
				var ráfaga = new Array(3);
				for(var i = 0; i<3; i++){
					ráfaga[i] = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'Bala').setScale(1);
				}	
				balas=ráfaga;
			break;
			case 'Bate':
				balas = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'GolpeBate').setScale(1);
			break;
			case 'Puñoamericano':
				balas = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'GolpePuñoA').setScale(1);
			break;
			default:
				balas = that.scene.physics.add.sprite(that.checkpos()[0],that.checkpos()[1],'GolpePuño').setScale(1);
			break;

		}
		return balas;
	}

}
