//La clase jugadro sera un controlador de personaje
'use strict'


//var controles1 = {
	//salto: Phaser.Input.Keyboard.CursorKeys.up,
	//movder: Phaser.Input.Keyboard.CursorKeys.right,
	//movizq: Phaser.Input.Keyboard.CursorKeys.left,
	//movabajo: Phaser.Input.Keyboard.CursorKeys.down,
	//disparo: Phaser.Input.Keyboard.CursorKeys.space,
	//recarma: Phaser.Input.Keyboard.KeyCodes.E,
	//recargar: Phaser.Input.Keyboard.KeyCodes.R,
	//escudo: Phaser.Input.Keyboard.CursorKeys.shift
//}

var controles2 = {
	salto: Phaser.Input.Keyboard.KeyCodes.W,
	movder: Phaser.Input.Keyboard.KeyCodes.D,
	movizq: Phaser.Input.Keyboard.KeyCodes.A,
	movabajo: Phaser.Input.Keyboard.KeyCodes.S,
	disparo: Phaser.Input.Keyboard.KeyCodes.A,
	recarma: Phaser.Input.Keyboard.KeyCodes.A,
	recargar: Phaser.Input.Keyboard.KeyCodes.A,
	escudo: Phaser.Input.Keyboard.KeyCodes.A
}

function Jugador(avatar,controles){
	this.avatar = avatar;
	this.arma;
	this.controles=controles;
	this.vida=100;

	var that = this;

	this.preload=function(){
		that.avatar.preload();
	}
	this.create=function(){
		that.avatar.animaciones();
		that.avatar.spawnavatar();

	}
	this.update=function(){
		if(that.controles.salto.isDown){
		console.log("pulsas w ?")
		that.avatar.walkleft();
		
		}
		
	}
}