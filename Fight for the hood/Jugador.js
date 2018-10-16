//La clase jugadro sera un controlador de personaje
'use strict'


var controles1 = {
	salto: Phaser.Input.Keyboard.KeyCodes.UP,
	movder: Phaser.Input.Keyboard.KeyCodes.RIGHT,
	movizq: Phaser.Input.Keyboard.KeyCodes.LEFT,
	movabajo: Phaser.Input.Keyboard.KeyCodes.DOWN,
	disparo: Phaser.Input.Keyboard.KeyCodes.L,
	recarma: Phaser.Input.Keyboard.KeyCodes.O,
	recargar: Phaser.Input.Keyboard.KeyCodes.P,
	escudo: Phaser.Input.Keyboard.KeyCodes.R
}

var controles2 = {
	salto: Phaser.Input.Keyboard.KeyCodes.W,
	movder: Phaser.Input.Keyboard.KeyCodes.D,
	movizq: Phaser.Input.Keyboard.KeyCodes.A,
	movabajo: Phaser.Input.Keyboard.KeyCodes.S,
	disparo: Phaser.Input.Keyboard.KeyCodes.SPACE,
	recarma: Phaser.Input.Keyboard.KeyCodes.E,
	recargar: Phaser.Input.Keyboard.KeyCodes.R,
	escudo: Phaser.Input.Keyboard.KeyCodes.SHIFT
}

function Jugador(avatar,controles){
	this.avatar = avatar;
	this.arma ="";
	this.escudo;
	this.controles=controles;
	this.vida=100;

	

	var that = this;

	var keysalto;
	var keymovder;
	var keymovizq;
	var keymovabajo;
	var keydisparo;
	var keyrecargar;
	var keyrecarma;
	var keyescudo;

	var keyrecarmasoltada;

	this.preload=function(){
		that.avatar.preload();
	}
	this.create=function(){
		that.avatar.animaciones();
		that.avatar.spawnavatar();

	   keysalto = this.avatar.scene.input.keyboard.addKey(that.controles.salto);
	   keymovder = this.avatar.scene.input.keyboard.addKey(that.controles.movder);
	   keymovizq = this.avatar.scene.input.keyboard.addKey(that.controles.movizq);
	   keymovabajo = this.avatar.scene.input.keyboard.addKey(that.controles.movabajo);
	   keydisparo = this.avatar.scene.input.keyboard.addKey(that.controles.disparo);
	   keyrecargar = this.avatar.scene.input.keyboard.addKey(that.controles.recargar);
	   keyrecarma = this.avatar.scene.input.keyboard.addKey(that.controles.recarma);
	   keyescudo = this.avatar.scene.input.keyboard.addKey(that.controles.escudo);
	}

	this.selectarma = function(armasdrops,offset){
		var i = 0
		var armaactual = this.arma;
		var cambiadoarma = false;
        while((i < armasdrops.sprite.length)&& (!cambiadoarma) ){
           //console.log("res:" + (Math.abs(armasdrops.sprite[i].x-that.avatar.sprite.x)))
            if((Math.abs(armasdrops.sprite[i].x-that.avatar.sprite.x))< offset){
                if((Math.abs(armasdrops.sprite[i].y-that.avatar.sprite.y))<offset){
                    that.arma = armasdrops.sprite[i].texture.key;
                    var armarecogida = armasdrops.sprite[i];
                    armarecogida.destroy();
                    armasdrops.sprite.splice(i,1);
                    cambiadoarma=true;
                }
                else{
                    this.arma="";
                }
            }
            else{
                this.arma="";
            }
            i++;
        }
    }
	
	this.gravedad=function(){
		if(that.avatar.sprite.body.touching.down){
			that.avatar.vely(0);
		}else {
			that.avatar.vely(that.avatar.getvely()+ 9.8);
		}
	}
	this.controldepersonaje = function(){
		var animacionactual = that.avatar.getanim();
		if(keymovder.isDown){
			if(animacionactual != that.avatar.names + that.arma + ' right' ){
				that.avatar.stopanim();
			}
			that.avatar.walkright(that.arma);
			that.avatar.velx(100);
		}
		else if (keymovizq.isDown){
			if(animacionactual != that.avatar.names + that.arma + ' left' ){
				that.avatar.stopanim();
			}
			that.avatar.walkleft(that.arma);
			that.avatar.velx(-100);
		}
		else{
			//var animacionactual = that.avatar.getanim(); 
			if(animacionactual == (that.avatar.names + that.arma + ' left')){
				that.avatar.stopanim();
				that.avatar.idleleft(that.arma);
			}
			else if(animacionactual == (that.avatar.names + that.arma + ' right')){
				that.avatar.stopanim();
				that.avatar.idleright(that.arma);
			}
			that.avatar.velx(0);
		}

		if(keysalto.isDown && that.avatar.sprite.body.touching.down){
			that.avatar.vely(-375);
		}
		if(keymovabajo.isDown){

		}
		if(keydisparo.isDown){

		}
		if(keyescudo.isDown){
			
		}
		if(keyrecarma.isDown){
			
		}
	}
	this.cambiararma = function(dropss){

		if((keyrecarma.isDown) && (keyrecarmasoltada)){
			that.selectarma(dropss,100);
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
		that.teclasoltada();
		that.cambiararma(dropss);
	}

}