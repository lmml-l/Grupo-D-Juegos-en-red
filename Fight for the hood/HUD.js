'use strict'

   function HUD(escena, sprites) {
   	    this.Armas = ["",""];
   
		this.Escenario = escena; 
		this.Fondo;
		//this.vida = vida;
		//this.Municion=30;
		this.ArmasMostradas = new Array(2);
      
		var that = this;

}
    



//Hacer una función que reciba cada vez que dispares una vez y se reduzca.

	this.preload=function(Escenario)
	{
		that.Escenario.load.image('Pistola', that.spritearmas[0]);
		that.Escenario.load.image('Escopeta', that.spritearmas[1]);
		that.Escenario.load.image('Subfusil', that.spritearmas[2]);
		that.Escenario.load.image('Puñoamericano', that.spritearmas[3]);
		that.Escenario.load.image('Bate', that.spritearmas[4]);
		that.Escenario.load.image('FondoHUD', 'Recursos/Imagenes/HUD.png');
		//that.Escenario.load.image("", );		
	}
    

    this.RecibirArma = function(arrayjugadores){  //Recoge las dos armas.

    	that.Armas[0] = arrayjugadores[0];
    	that.Armas[1] = arrayjugadores[1];

    }


	create ()
	{

		that.Fondo.create(512, 685, 'FondoHUD');   //Sprite del  HUD en el escenario.		
		that.ArmasMostradas[0] = that.Escenario.add.image(512, 685, this.Armas[0]); //Sprite arma1.       
	    that.ArmasMostradas[1] = that.Escenario.add.image(512, 685, this.Armas[1]); //Sprite arma2.

		
		//this.Municion		
		//this.avatar.walkright();
		//this.sprite = new Phaser.Gameobjects.Sprite(this,100,100,'p1l',2).setScale(4);
		//var a = this.add.image(150,150,'p1l').setScale(1);
	}

	update ()
	{
		
	  	this.ArmasMostradas[0].sprite(512, 685,this.Armas[0]);
	  	this.ArmasMostradas[1].sprite(512, 685,this.Armas[1]);
	  	
	  	
	}