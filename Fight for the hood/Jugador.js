//La clase jugador sera un controlador de personaje
'use strict'

//Teclas para controlar a los personajes
//Jugador 1
var controles1 = {
	salto: Phaser.Input.Keyboard.KeyCodes.UP,
	movder: Phaser.Input.Keyboard.KeyCodes.RIGHT,
	movizq: Phaser.Input.Keyboard.KeyCodes.LEFT,
	movabajo: Phaser.Input.Keyboard.KeyCodes.DOWN,
	disparo: Phaser.Input.Keyboard.KeyCodes.P,
	recarma: Phaser.Input.Keyboard.KeyCodes.O,
	//recargar: Phaser.Input.Keyboard.KeyCodes.P,
	escudo: Phaser.Input.Keyboard.KeyCodes.R
}
//Jugador 2
var controles2 = {
	salto: Phaser.Input.Keyboard.KeyCodes.W,
	movder: Phaser.Input.Keyboard.KeyCodes.D,
	movizq: Phaser.Input.Keyboard.KeyCodes.A,
	movabajo: Phaser.Input.Keyboard.KeyCodes.S,
	disparo: Phaser.Input.Keyboard.KeyCodes.T,
	recarma: Phaser.Input.Keyboard.KeyCodes.R,
	//recargar: Phaser.Input.Keyboard.KeyCodes.R,
	escudo: Phaser.Input.Keyboard.KeyCodes.SHIFT
}

function Jugador(avatar,controles,proyectiles){
	this.avatar = avatar;
	this.arma ="";
	this.escudo;
	this.controles=controles;
	this.vida=100;
	this.proyectiles = proyectiles;
	this.municiones = "";



	var that = this;
	//acciones
	var keysalto;
	var keymovder;
	var keymovizq;
	var keymovabajo;
	var keydisparo;
	var keyrecargar;
	var keyrecarma;
	var keyescudo;

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
	   	keysalto = this.avatar.scene.input.keyboard.addKey(that.controles.salto);
	   	keymovder = this.avatar.scene.input.keyboard.addKey(that.controles.movder);
	   	keymovizq = this.avatar.scene.input.keyboard.addKey(that.controles.movizq);
	   	keymovabajo = this.avatar.scene.input.keyboard.addKey(that.controles.movabajo);
	   	keydisparo = this.avatar.scene.input.keyboard.addKey(that.controles.disparo);
	   	keyrecargar = this.avatar.scene.input.keyboard.addKey(that.controles.recargar);
	   	keyrecarma = this.avatar.scene.input.keyboard.addKey(that.controles.recarma);
	   	keyescudo = this.avatar.scene.input.keyboard.addKey(that.controles.escudo);

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
			case "Puñoamericano":
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
		if(that.avatar.sprite.body.touching.down){
			that.avatar.vely(0);
		}else {
			that.avatar.vely(that.avatar.getvely()+ 9.8);
		}
	}

	//control del personaje según la tecla y orientación
	this.controldepersonaje = function(){
		var animacionactual = that.avatar.getanim();
		if(keymovder.isDown){
			if(animacionactual != that.avatar.names + that.arma + ' right' ){
				that.avatar.stopanim();
			}
			that.avatar.walkright(that.arma);
			that.avatar.velx(120);
		}
		else if (keymovizq.isDown){
			if(animacionactual != that.avatar.names + that.arma + ' left' ){
				that.avatar.stopanim();
			}
			that.avatar.walkleft(that.arma);
			that.avatar.velx(-120);
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

		if(keysalto.isDown && (that.avatar.sprite.body.touching.down || that.avatar.sprite.body.onFloor())){
			that.avatar.vely(-375);
		}
		
		if(keyescudo.isDown){
			
		}
		if(keyrecarma.isDown){
			
		}
	}

	//disparo según arma y orientación
	//disminución de munición
	this.disparar = function (arma,scene,avatar){
		if((keydisparo.isDown) && (keydispararsoltad) && ((this.municiones > 0 || ((this.arma=="")||(this.arma=="Bate")||(this.arma=="Puñoamericano"))))){
			that.proyectiles.create(arma,scene,avatar);
			
		switch(arma){
			case "Escopeta":
				that.municiones -= 8;
				break;
			case "Pistola":
				that.municiones -= 1;
				break;
			case "Subfusil":
				that.municiones -= 3;
				break;
		}
			keydispararsoltad = false;
			that.avatar.scene.time.addEvent({delay:625 , callback:function(){keydispararsoltad=true;}})//cooldown al disparar
		}
	}
	this.cambiararma = function(dropss){

		if((keyrecarma.isDown) && (keyrecarmasoltada)){
			that.selectarma(dropss,60); //distancia para coger el arma
			keyrecarmasoltada = false;
		}
	}
	this.teclasoltada = function(){
		if(keyrecarma.isUp){
			keyrecarmasoltada=true;
		}
	}

	this.update=function(dropss){
		that.gravedad();
		that.controldepersonaje();
		
		that.cambiararma(dropss);
		that.disparar(that.arma,that.avatar.scene,that.avatar);

		that.teclasoltada();
	}

}