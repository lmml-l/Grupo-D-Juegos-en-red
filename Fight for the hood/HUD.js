'use strict'
   function HUD(escena, sprites,jugadores){
   	    this.spritearmas = sprites;
   	    this.scene = escena;
   	    this.jugadores = jugadores;
		this.Municiones = new Array(2);
		this.ArmasMostradas = new Array(2);
		this.BarrasVidas = new Array(2);  
		this.Clock;
		this.MostrarReloj;  
		var that = this;



	this.preload=function(){   // Preload de todas las armas en un sprite de armas.
		that.scene.load.image(' Pistola', that.spritearmas[0]);
		that.scene.load.image(' Escopeta', that.spritearmas[1]);
		that.scene.load.image(' Subfusil', that.spritearmas[2]);
		that.scene.load.image(' Puñoamericano', that.spritearmas[3]);
		that.scene.load.image(' Bate', that.spritearmas[4]);
		that.scene.load.image(' ', that.spritearmas[5]);		
	}

	this.create = function (){
		that.ArmasMostradas[0] = that.scene.add.sprite(140, 680, " "+ that.jugadores[0].arma); //Crea el sprite arma del jugador 1.       
	    that.ArmasMostradas[1] = that.scene.add.sprite(890, 680, " "+ that.jugadores[1].arma); //Crea el sprite del arma del juagdor 2.

	    that.Clock = that.scene.time.addEvent({delay:120000});

	    that.MostrarReloj = that.scene.add.text(476,605, (Math.trunc(120 - that.Clock.getElapsedSeconds())).toString(), { fill: '#FFFFFF', font: '52px Impact', align: 'center'});

      
        that.Municiones[0] = that.scene.add.text(115, 716, that.jugadores[1].municiones.toString()).setScale(2);   //Crea la munición del jugador 1.
        that.Municiones[1] = that.scene.add.text(875, 716, that.jugadores[0].municiones.toString()).setScale(2);

        that.BarrasVidas[0] = that.scene.add.graphics({x:0,y:0});
        that.BarrasVidas[1] = that.scene.add.graphics({x:0,y:0});   //Crea la munición del jugador 2
	}


	this.update = function(){
	  	that.ArmasMostradas[0].setTexture(" "+ that.jugadores[0].arma); 
	  	that.ArmasMostradas[1].setTexture(" "+ that.jugadores[1].arma);
	  	that.Municiones[0].setText(that.jugadores[0].municiones.toString());
	  	that.Municiones[1].setText(that.jugadores[1].municiones.toString());

	  	that.MostrarReloj.setText((Math.trunc(120 - that.Clock.getElapsedSeconds())).toString());

	  
	  	that.BarrasVidas[0].clear();
	  	that.BarrasVidas[0].fillStyle(0xFFAC00, 1.0);
	  	that.BarrasVidas[0].fillRect(10, 605,that.jugadores[0].vida*4.5,20);
	  	
	  	
        that.BarrasVidas[1].clear();
        that.BarrasVidas[1].fillStyle(0xFFAC00, 1.0);
        that.BarrasVidas[1].fillRect(1010-that.jugadores[1].vida*4.5, 605,that.jugadores[1].vida*4.5,20); //volteo: desplazo tanto como reduzco
  
	}
}

