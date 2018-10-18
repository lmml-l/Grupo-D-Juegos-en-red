'use strict'

   function HUD(escena, sprites) {
   	    this.Armas = {"",""};
   
		this.Escenario = escena; 
		this.Fondo;
		this.vida = vida;
		this.Municion=30;
		this.ArmasMostradas = new Array(2);

		var that = this;

}
    



//Hacer una función que reciba cada vez que dispares una vez y se reduzca.

	preload ()
	{
		that.Escenario.load.image('Pistola', spritearmas[0]);
		that.Escenario.load.image('Escopeta', spritearmas[1]);
		that.Escenario.load.image('Subfusil', spritearmas[2]);
		that.Escenario.load.image('Puñoamericano', spritearmas[3]);
		that.Escenario.load.image('Bate', spritearmas[4]);
		//that.Escenario.load.image("", );		
	}
    

    this.RecibirArma = function(arrayjugadores){  //Recoge las dos armas.

    	that.Armas[0] = arrayjugadores[0];
    	that.Armas[1] = arrayjugadores[1];

    }


	create ()
	{

		that.Escenario.add.sprite(512, 215, 'FondoHUD');   //Sprite del  HUD en el escenario.		
		this.ArmasMostradas[0] = that.Escenario.add.image(150, 200, this.Armas[0]); //Sprite arma1.       
	    this.ArmasMostradas[1] = that.Escenario.add.image(400, 300, this.Armas[1]); //Sprite arma2.

		
		//this.Municion		
		//this.avatar.walkright();
		//this.sprite = new Phaser.Gameobjects.Sprite(this,100,100,'p1l',2).setScale(4);
		//var a = this.add.image(150,150,'p1l').setScale(1);
	}

	update ()
	{
	  	this.ArmasMostradas[0].sprite(150,200,this.Armas[0]);
	  	this.ArmasMostradas[1].sprite(400,300,this.Armas[1]);
	  	
	}
