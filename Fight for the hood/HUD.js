'use strict'
class HUD extends Phaser.Scene {
	constructor(){
		super({key:"HUD"});
		//this.vida = new                       //Recibe la vida de la clase personaje 
		//this.munición = new                   //Recibe la munición de la clase arma
		this.arma = new Arma (this.escena,arma);//Recibe el arma de la clase arma

		
		
	}
	preload ()
	{
		this.load.image('arma1', 'Recursos/Imagenes/...');      //Carga cada cosa del HUD
		this.load.image('arma2', 'Recursos/Imagenes/...'); 
		this.load.image('arma3', 'Recursos/Imagenes/...'); 
		this.load.image('arma4', 'Recursos/Imagenes/...'); 
		this.load.image('arma5', 'Recursos/Imagenes/...');     
		this.load.image('municion', 'Recursos/Imagenes/...');
		this.load.image('vida', 'Recursos/Imagenes/');
		this.load.image('FondoHUD', 'Recursos/Imagenes/...');
		
		
	}

	create ()
	{


		
		this.add.sprite(512, 215, 'FondoHUD'); //sprite del escenario
		
		this.add.image(400, 300, 'sky');           
		this.vida.create();

		this.add.image(400, 300, 'sky');
		this.munucion.create();

		this.add.image(400, 300, 'sky');
		this.arma.create();

		
		
		//this.avatar.walkright();

		//this.sprite = new Phaser.Gameobjects.Sprite(this,100,100,'p1l',2).setScale(4);
		//var a = this.add.image(150,150,'p1l').setScale(1);
	}

	update ()
	{
	  	this.arma.update()
	  	this.municion.update()
	  	this.vida.update()

	}
}