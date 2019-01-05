'use strict'
  
function Proyectiles (sprites){
	this.proyec = sprites;
	this.proyectilesenescane = new Array();
	

	var that = this;
	

	this.preload=function(scene){
		//cada tipo de proyectil se agrupa en un array
		scene.load.image('Perdigón', that.proyec[0]);
		scene.load.image('Bala', that.proyec[1]);
		scene.load.image('GolpeBate', that.proyec[2]);
		scene.load.image('GolpePuñoA', that.proyec[3]);
		scene.load.image('GolpePuño', that.proyec[4]);
	}

	//marca el sentido del disparo según la orientáción del personaje
	this.checkpos=function(avatar,arma){ 
		var pos = new Array(2);
		switch(arma){
			case 'Escopeta':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - 30); //pixeles     1,975 cm aprox
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + 30); 
				}
				
				pos[1] = avatar.sprite.y + 8;    //pixeles     0,582 cm aprox

			break;

			case 'Pistola':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - 25.5); //pixeles     0,9 cm aprox
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + 25.5); 
				}
				
				pos[1] = avatar.sprite.y + 3;    //pixeles     0,105 cm aprox

			break;

			case 'Subfusil':
				if(avatar.getanim().includes('left')){
					pos[0]=(avatar.sprite.x - 35); //pixeles     1,535 cm aprox
				}else if(avatar.getanim().includes('right')){
					pos[0]=(avatar.sprite.x + 35); 
				}
				
				pos[1] = avatar.sprite.y + 6;   //pixeles     0,42
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
			

			break;
		}
		return pos;
	}

	//asocia las balas a los distintos tipos de disparo
	this.crearproyectiles=function(arma,scene,avatar){
		var balas;
		switch(arma){
			case 'Escopeta':
				var perdigones = new Array(8);
				for(var i=0; i<8; i++){
					perdigones[i] = scene.physics.add.sprite(that.checkpos(avatar,arma)[0],that.checkpos(avatar,arma)[1],'Perdigón').setScale(1);
				}
				balas=perdigones;
			break;
			case 'Pistola':
				balas = avatar.scene.physics.add.sprite(that.checkpos(avatar,arma)[0],that.checkpos(avatar,arma)[1],'Bala').setScale(1);
			break;
			case 'Subfusil':
				balas= scene.physics.add.sprite(that.checkpos(avatar,arma)[0],that.checkpos(avatar,arma)[1],'Bala').setScale(1);
			break;
			case 'Bate':
				balas = scene.physics.add.sprite(that.checkpos(avatar,arma)[0],that.checkpos(avatar,arma)[1],'GolpeBate').setScale(1);
			break;
			case 'Puñoamericano':
				balas = scene.physics.add.sprite(that.checkpos(avatar,arma)[0],that.checkpos(avatar,arma)[1],'GolpePuñoA').setScale(1);
			break;
			default:

		}
		return balas;
	}

	//velocidad y dirección de disparo
	this.fisicasproyectil=function(arma,avatar,balas){
		//var select;
		switch(arma){
			case "Escopeta":
				if(avatar.getanim().includes('left')){
					for(var i = 0; i < balas.length ; i++){
						var vector = new Phaser.Math.Vector3(420,0,1); //velocidad de disparo
						var matrix = new Phaser.Math.Matrix3();
						var angle = Phaser.Math.DEG_TO_RAD * (135+(i*(11.25)));
						var array = [Math.cos(angle),-1*Math.sin(angle),0,Math.sin(angle),Math.cos(angle),0,0,0,1];
						matrix.fromArray(array);
						vector.transformMat3(matrix);


						balas[i].setVelocity(vector.x,vector.y);
					}
				}else if(avatar.getanim().includes('right')){
					for(var i = 0; i < balas.length ; i++){
						var vector = new Phaser.Math.Vector2(420,0,1);//velocidad de disparo
						var matrix = new Phaser.Math.Matrix3();
						var angle = Phaser.Math.DEG_TO_RAD * (45-(i*(11.25)));
						var array = [Math.cos(angle),-1*Math.sin(angle),0,Math.sin(angle),Math.cos(angle),0,0,0,1];
						matrix.fromArray(array);
						vector.transformMat3(matrix);


						balas[i].setVelocity(vector.x,vector.y);
					}
				}
			break;
			case "Pistola":
				if(avatar.getanim().includes('left')){
					var vector = new Phaser.Math.Vector2(-1400,0); //velocidad de disparo
					balas.setVelocity(vector.x,vector.y);

				}else if(avatar.getanim().includes('right')){
					var vector = new Phaser.Math.Vector2(1400,0); //velocidad de disparo
					balas.setVelocity(vector.x,vector.y);
				}
			break;
			case "Subfusil":
				
				if(avatar.getanim().includes('left')){
					var vector = new Phaser.Math.Vector2(-1200,0); //velocidad de disparo
					balas.setVelocity(vector.x,vector.y);
				}else if(avatar.getanim().includes('right')){
					var vector = new Phaser.Math.Vector2(1200,0); //velocidad de disparo
					balas.setVelocity(vector.x,vector.y);
				}
			break;
			default:
				if(avatar.getanim().includes('left')){
					balas.setFlipX(true);
				}else if(avatar.getanim().includes('right')){}
		}

		return balas;
	}


	//añade balas a la escena según el arma
	this.create = function(arma,scene,avatar){

		switch(arma){
			case 'Escopeta':
			var balasdeescopetaarray = that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene,avatar));
			for(var i = 0 ; i< balasdeescopetaarray.length ; i++){
				var balaescopeta = balasdeescopetaarray[i];
				that.proyectilesenescane.push(balaescopeta);
			}
				scene.time.addEvent({delay:175, callback:function(){ //el delay es el alcance
					for(var i = 0 ; i< balasdeescopetaarray.length ; i++){
						for(var j in that.proyectilesenescane){
							if(that.proyectilesenescane[j]==balasdeescopetaarray[i]){
								that.proyectilesenescane.splice(j,1);
							}
						}
						balasdeescopetaarray[i].destroy();
					}
				}});
			break;

			case 'Subfusil':
			var disp = function(){
				var balasubfusil = that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene,avatar))
				that.proyectilesenescane.push(balasubfusil);
				scene.time.addEvent({delay:300, callback: function(){
					for(var j in that.proyectilesenescane){
							if(that.proyectilesenescane[j]==balasubfusil){
								that.proyectilesenescane.splice(j,1);
							}
						}
					balasubfusil.destroy()}});
			};

			disp();
			scene.time.addEvent(
				{delay:150 , repeat:1, callback: disp }); //tiempo entre balas por ráfagas

			break;

			case 'Pistola':
			var balapistola = that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene,avatar))
			that.proyectilesenescane.push(balapistola);
			scene.time.addEvent({delay:1300, callback: function(){
				for(var j in that.proyectilesenescane){
							if(that.proyectilesenescane[j] == balapistola){
								that.proyectilesenescane.splice(j,1);
							}
						}
				balapistola.destroy()}});
			break;

			case "":
			break;

			default:
			var baladefault = that.fisicasproyectil(arma,avatar,that.crearproyectiles(arma,scene,avatar))
			that.proyectilesenescane.push(baladefault);
			scene.time.addEvent({delay:300, callback: function(){
				for(var j in that.proyectilesenescane){
							if(that.proyectilesenescane[j]==baladefault){
								that.proyectilesenescane.splice(j,1);
							}
						}
				baladefault.destroy()}});
		}

	}
	this.update=function(){
	
	}
}
