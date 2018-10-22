'use strict'
  
function Proyectiles (sprites){
	this.proyec = sprites;
	//this.jugador = player;
	this.proyectilesenescane = new Array();
	

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
		var offset = 5;    //esto es la medida en píxeles      0,18 cm aprox
		switch(arma){
			case 'Escopeta':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.frame.width)/2) - offset);
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.frame.width)/2) + offset);
				}
				print(avatar.sprite.anims.currentFrame.frame.width);
				pos[1] = avatar.sprite.y + 14;    //pixeles     0,49 cm aprox

			break;

			case 'Pistola':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.frame.width)/2) - offset);
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.frame.width)/2) + offset);
				}
				print(avatar.sprite.anims.currentFrame.frame.width);
				pos[1] = avatar.sprite.y - 2;    //pixeles     0,07 cm aprox

			break;

			case 'Subfusil':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.frame.width)/2) - offset);
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.frame.width)/2) + offset);
				}
				print(avatar.sprite.anims.currentFrame.frame.width);
				pos[1] = avatar.sprite.y + 11;   //pixeles     0,39
			break;

			case 'Bate':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.frame.width)/2));
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.frame.width)/2));
				}

				pos[1] = avatar.sprite.y;
			break;

			case 'Puñoamericano':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.frame.width)/2));
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.frame.width)/2));
				}

				pos[1] = avatar.sprite.y;
			break;
			
			case '':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - ((avatar.sprite.anims.currentFrame.frame.width)/2));
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + ((avatar.sprite.anims.currentFrame.frame.width)/2));
				}

				pos[1] = avatar.sprite.y;
			break;
		}
		return pos;
	}
	this.crearproyectiles=function(arma,scene,avatar){
		var balas;
		switch(arma){
			case 'Escopeta':
				var perdigones = new Array(8);
				for(var i=0; i<8; i++){
					perdigones[i] = scene.physics.add.sprite(that.checkpos(avatar)[0],that.checkpos(avatar)[1],'Perdigón').setScale(1);
				}
				balas=perdigones;
			break;
			case 'Pistola':
				balas = avatar.scene.physics.add.sprite(that.checkpos(avatar)[0],that.checkpos(avatar)[1],'Bala').setScale(1);
			break;
			case 'Subfusil':
				balas= scene.physics.add.sprite(that.checkpos(avatar)[0],that.checkpos(avatar)[1],'Bala').setScale(1);
			break;
			case 'Bate':
				balas = scene.physics.add.sprite(that.checkpos(avatar)[0],that.checkpos(avatar)[1],'GolpeBate').setScale(1);
			break;
			case 'Puñoamericano':
				balas = scene.physics.add.sprite(that.checkpos(avatar)[0],that.checkpos(avatar)[1],'GolpePuñoA').setScale(1);
			break;
			case '':
				balas = scene.physics.add.sprite(that.checkpos(avatar)[0],that.checkpos(avatar)[1],'GolpePuño').setScale(1);
			break;
			default:

		}
		return balas;
	}
	this.fisicasproyectil=function(arma,avatar,balas){
		//var select;
		switch(arma){
			case "Escopeta":
				if(avatar.getanim().includes('left')){
					for(var i = 0; i < balas.length ; i++){
						var vector = new Phaser.Math.Vector3(100,0,1);
						var matrix = new Phaser.Math.Matrix3();
						var angle = Phaser.Math.DEG_TO_RAD * (135+(i*(11.25)));
						var array = [Math.cos(angle),-1*Math.sin(angle),0,Math.sin(angle),Math.cos(angle),0,0,0,1];
						matrix.fromArray(array);
						//console.log(matrix);
						vector.transformMat3(matrix);


						balas[i].setVelocity(vector.x,vector.y);
					}
				}else if(avatar.getanim().includes('right')){
					for(var i = 0; i < balas.length ; i++){
						var vector = new Phaser.Math.Vector2(100,0,1);
						var matrix = new Phaser.Math.Matrix3();
						var angle = Phaser.Math.DEG_TO_RAD * (45-(i*(11.25)));
						var array = [Math.cos(angle),-1*Math.sin(angle),0,Math.sin(angle),Math.cos(angle),0,0,0,1];
						matrix.fromArray(array);
						//console.log(matrix);
						vector.transformMat3(matrix);


						balas[i].setVelocity(vector.x,vector.y);
					}
				}
			break;
			case "Pistola":
				if(avatar.getanim().includes('left')){
					var vector = new Phaser.Math.Vector2(-100,0);
					balas.setVelocity(vector.x,vector.y);

				}else if(avatar.getanim().includes('right')){
					var vector = new Phaser.Math.Vector2(100,0);
					balas.setVelocity(vector.x,vector.y);
				}
			break;
			case "Subfusil":
				
				if(avatar.getanim().includes('left')){
					var vector = new Phaser.Math.Vector2(-100,0);
					balas.setVelocity(vector.x,vector.y);
				}else if(avatar.getanim().includes('right')){
					var vector = new Phaser.Math.Vector2(100,0);
					balas.setVelocity(vector.x,vector.y);
				}
			break;
			default:
		}

		return balas;
	}


	
	this.create = function(arma,scene,avatar){
		 

		switch(arma){
			case 'Subfusil':

			var disp = function(){that.proyectilesenescane.push(that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene,avatar)))};
			disp();
			scene.time.addEvent(
				{delay:500 , repeat:1, callback: disp });

			break;
			default:
			that.proyectilesenescane.push(that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene,avatar)));
		}

	}
	this.update=function(){
	
	}
}
