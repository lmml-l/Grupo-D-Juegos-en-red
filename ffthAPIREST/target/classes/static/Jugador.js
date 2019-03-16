//La clase jugador sera un controlador de personaje
'use strict'

//Teclas para controlar a los personajes
//Jugador 1
var controles1 = {
	salto: 		Phaser.Input.Keyboard.KeyCodes.UP,
	movder: 	Phaser.Input.Keyboard.KeyCodes.RIGHT,
	movizq: 	Phaser.Input.Keyboard.KeyCodes.LEFT,
	movabajo: 	Phaser.Input.Keyboard.KeyCodes.DOWN,
	disparo: 	Phaser.Input.Keyboard.KeyCodes.P,
	recarma: 	Phaser.Input.Keyboard.KeyCodes.O,
	escudo: 	Phaser.Input.Keyboard.KeyCodes.R
}
//Jugador 2
var controles2 = {
	salto: 		Phaser.Input.Keyboard.KeyCodes.W,
	movder: 	Phaser.Input.Keyboard.KeyCodes.D,
	movizq: 	Phaser.Input.Keyboard.KeyCodes.A,
	movabajo: 	Phaser.Input.Keyboard.KeyCodes.S,
	disparo: 	Phaser.Input.Keyboard.KeyCodes.T,
	recarma: 	Phaser.Input.Keyboard.KeyCodes.R,
	escudo: 	Phaser.Input.Keyboard.KeyCodes.SHIFT
}

function Jugador(avatar,controles,proyectiles){
	this.avatar = avatar;
	this.arma ="";
	this.escudo;
	this.controles=controles;
	this.vida=100;
	this.proyectiles = proyectiles;
	this.municiones = "";
	this.shotCheck;
	this.dropCheck;
	this.keysalto;
	this.keymovder;
	this.keymovizq;
	this.keymovabajo;
	this.keydisparo;
	this.keyrecargar;
	this.keyrecarma;
	this.keyescudo;

	var that = this;
	//acciones
	var keyrecarmasoltada;
	var keydispararsoltad;

	//carga el avatar y los proyectiles
	this.preload=function(){
		that.avatar.preload();
		that.proyectiles.preload(that.avatar.scene);
	}
	this.create=function(lado){
		that.avatar.animaciones();
		that.avatar.spawnavatar();
		that.vida = 100;			//vida del personaje
        that.municiones = "";		//munición vacía por defecto
        that.arma = "";				//desarmado por defecto
        //animación de andar según orientación
		if(lado=="right"){
			that.avatar.walkright(that.arma);
		}
		else if(lado=="left"){
			that.avatar.walkleft(that.arma);
		}

		//asocia acciones a teclas
	   	that.keysalto 		= this.avatar.scene.input.keyboard.addKey(that.controles.salto);
	   	that.keymovder 		= this.avatar.scene.input.keyboard.addKey(that.controles.movder);
	   	that.keymovizq 		= this.avatar.scene.input.keyboard.addKey(that.controles.movizq);
	   	that.keymovabajo 	= this.avatar.scene.input.keyboard.addKey(that.controles.movabajo);
	   	that.keydisparo 	= this.avatar.scene.input.keyboard.addKey(that.controles.disparo);
	   	that.keyrecargar 	= this.avatar.scene.input.keyboard.addKey(that.controles.recargar);
	   	that.keyrecarma 	= this.avatar.scene.input.keyboard.addKey(that.controles.recarma);
	   	that.keyescudo 		= this.avatar.scene.input.keyboard.addKey(that.controles.escudo);

	   	keydispararsoltad = true;


	}
	//marca la cantidad de munición con la que cuenta cada arma
	//las armas cuerpo a cuerpo no necesitan munición
	this.selectmunicion = function(arma){
		var municiones;
		switch(arma){
			case "Bate":
			 	municiones = "";
			 	break;
			case "Punoamericano":
				municiones = "";
				break;
			case "Escopeta":
				municiones = 32;
				break;
			case "Pistola":
				municiones = 12;
				break;
			case "Subfusil":
				municiones = 21;
				break;
		}
		return municiones;
	}
	//gestiona el cambio de arma en partida
	this.selectarma = function(armasdrops,offset){
		var i = 0
		var armaactual = this.arma;
		var cambiadoarma = false;
        while((i < armasdrops.sprite.length)&& (!cambiadoarma) ){
            if((Math.abs(armasdrops.sprite[i].x-that.avatar.sprite.x))< offset){
                if((Math.abs(armasdrops.sprite[i].y-that.avatar.sprite.y))<offset){
                    that.arma = armasdrops.sprite[i].texture.key;
                    var armarecogida = armasdrops.sprite[i];
                    armarecogida.destroy();
                    armasdrops.sprite.splice(i,1);
                    this.municiones=this.selectmunicion(this.arma);
                    cambiadoarma=true;
                    switch(this.arma){
						case "Bate":
						 	that.dropCheck = 2;
						 	break;
						case "Punoamericano":
							that.dropCheck = 3;
							break;
						case "Escopeta":
							that.dropCheck = 4;
							break;
						case "Pistola":
							that.dropCheck = 5;
							break;
						case "Subfusil":
							that.dropCheck = 6;
							break;
					}
                }
                else{
                    this.arma="";
                    this.municiones=""
                }
            }
            else{
                this.arma="";
                this.municiones=""
            }
            i++;
        }
    }
	
	//el personaje es empujado hacia abajo, excepto si está tocando algo por debajo
	//simulación de la gravedad
	this.gravedad=function(){
	if(that.avatar.sprite.body!=null){
		if(that.avatar.sprite.body.touching.down){
			that.avatar.vely(0);
		}else {
			that.avatar.vely(that.avatar.getvely()+ 9.8);
		}
	}
	}

	//control del personaje según la tecla y orientación
	this.controldepersonaje = function(){
		var that = this;
		var animacionactual = that.avatar.getanim();
	if(that.keymovder!=null && that.keymovizq!=null ){
		if(that.keymovder.isDown){
			if(animacionactual != that.avatar.names + that.arma + ' right' ){
				that.avatar.stopanim();
			}
			that.avatar.walkright(that.arma);
			that.avatar.velx(175);
		}
		else if (that.keymovizq.isDown){
			if(animacionactual != that.avatar.names + that.arma + ' left' ){
				that.avatar.stopanim();
			}
			that.avatar.walkleft(that.arma);
			that.avatar.velx(-175);
		}
		else{
			if(animacionactual.includes(' left')){
				that.avatar.stopanim();
				that.avatar.idleleft(that.arma);
			}
			else if(animacionactual.includes(' right')){
				that.avatar.stopanim();
				that.avatar.idleright(that.arma);
			}
			that.avatar.velx(0);
		}
	}
		if(that.keysalto!=null){
			if(that.keysalto.isDown && (that.avatar.sprite.body.touching.down || that.avatar.sprite.body.onFloor())){
			that.avatar.vely(-375);
			}
		}

		if(that.keyescudo!=null){
			if(that.keyescudo.isDown){
			
			}
		}
		if(that.keyrecarma!=null){
			if(that.keyrecarma.isDown){
			
			}
		}
	}

	//disparo según arma y orientación
	//disminución de munición
	this.disparar = function (arma,scene,avatar){
	if(that.keydisparo!=null){
		if((that.keydisparo.isDown) && (keydispararsoltad) && ((this.municiones > 0 || ((this.arma=="")||(this.arma=="Bate")||(this.arma=="Punoamericano"))))){
			that.proyectiles.create(arma,scene,avatar);
			
		switch(arma){
			case "Escopeta":
				that.municiones -= 8;
				that.shotCheck = 2;
				break;
			case "Pistola":
				that.municiones -= 1;
				that.shotCheck = 3;
				break;
			case "Subfusil":
				that.municiones -= 3;
				that.shotCheck = 4;
				break;
			case "Bate":
				that.shotCheck = 5;
				break;
			case "Punoamericano":
				that.shotCheck = 6;
				break;
		}
			keydispararsoltad = false;
			that.avatar.scene.time.addEvent({delay:625 , callback:function(){keydispararsoltad=true;}})//cooldown al disparar
		}
	}

	}
	this.cambiararma = function(dropss){
		if(that.keyrecarma!=null){
			if((that.keyrecarma.isDown) && (keyrecarmasoltada)){
			that.selectarma(dropss,60); //distancia para coger el arma
			keyrecarmasoltada = false;
			}
		}
	}
	this.teclasoltada = function(){
		if(that.keyrecarma!=null){
			if(that.keyrecarma.isUp){
				keyrecarmasoltada=true;
			}
		}
	}

	this.update=function(dropss){
		that.gravedad();
		that.controldepersonaje();
		
		that.cambiararma(dropss);
		that.disparar(that.arma,that.avatar.scene,that.avatar);

		that.teclasoltada();
	}

	this.toJSON = function(){
		var data = {
			avatar: that.avatar,
			arma: that.arma,
			escudo: that.escudo,
			vida: that.vida,
			proyectiles: that.proyectiles,
			municiones: that.municiones,
			W: that.keysalto,
			A: that.keymovizq,
			D: that.keymovder,
			R: that.keyrecarma,
			T: that.keydisparo
		}
		return data;
	}

}