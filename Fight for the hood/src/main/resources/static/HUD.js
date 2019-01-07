'use strict'
	//El HUD (HEAD-UP DISPLAY) muestra en la parte baja de la pantalla la barra de vida, tiempo restante, arma escogida y rondas ganadas
   function HUD(escena, sprites,jugadores){
   	this.spritearmas = sprites;
   	this.scene = escena;
   	this.jugadores = jugadores;
		this.Municiones = new Array(2);			  //munición de cada jugador
		this.ArmasMostradas = new Array(2);		//arma seleccionada
		this.BarrasVidas = new Array(2);		  //vida restante
		this.RondasVictoria = new Array(2);   //rondas ganadas por cada jugador
		this.Clock;								            //tiempo restante
		this.MostrarReloj;  					        //visualización del tiempo
		var that = this;



	this.preload=function(){   // Preload de todas las armas en un sprite de armas.
		that.scene.load.image(' Pistola', that.spritearmas[0]);
		that.scene.load.image(' Escopeta', that.spritearmas[1]);
		that.scene.load.image(' Subfusil', that.spritearmas[2]);
		that.scene.load.image(' Puñoamericano', that.spritearmas[3]);
		that.scene.load.image(' Bate', that.spritearmas[4]);
		that.scene.load.image(' ', that.spritearmas[5]);		
	}

	this.create = function (clock){
		that.ArmasMostradas[0] = that.scene.add.sprite(140, 680, " "+ that.jugadores[0].arma); //Crea el sprite arma del jugador 1.       
	    that.ArmasMostradas[1] = that.scene.add.sprite(890, 680, " "+ that.jugadores[1].arma); //Crea el sprite del arma del juagdor 2.

	    that.Clock = clock; //temporizador controlado por el Escenario (escena)

	    that.MostrarReloj = that.scene.add.text(484,602, (Math.trunc(91 - that.Clock.getElapsedSeconds())).toString(), { fill: '#FFFFFF', font: '52px Impact', align: 'center'});

        //Indica munición
        that.Municiones[0] = that.scene.add.text(115, 716, that.jugadores[1].municiones.toString(), { fill: '#FFFFFF', font: '28px Impact', align: 'left'}).setScale(1);   	//Crea la munición del jugador 1
        that.Municiones[1] = that.scene.add.text(875, 716, that.jugadores[0].municiones.toString(), { fill: '#FFFFFF', font: '28px Impact', align: 'right'}).setScale(1);
        //Barras de vida
        that.BarrasVidas[0] = that.scene.add.graphics({x:0,y:0});
        that.BarrasVidas[1] = that.scene.add.graphics({x:0,y:0});   //Crea la munición del jugador 2
        //Indica las rondas ganadas (victorias)
        that.RondasVictoria[0] = that.scene.add.graphics({x:0,y:0});
        that.RondasVictoria[1] = that.scene.add.graphics({x:0,y:0});
	}

	this.VictoriaUpdate = function(){
		//Se indican las rondas ganadas con tantos círculos como victorias obtenidas

		//Victorias J1
  		that.RondasVictoria[0].clear();
  		that.RondasVictoria[0].fillStyle='#FFAC00';

  		if(victorias[0]==1){
  		that.RondasVictoria[0].beginPath();
  		that.RondasVictoria[0].arc(445, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[0].closePath();
  		that.RondasVictoria[0].fillPath();
  		}
  		if(victorias[0]==2){
  		//victoria 1
  		that.RondasVictoria[0].beginPath();
  		that.RondasVictoria[0].arc(445, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[0].closePath();
  		that.RondasVictoria[0].fillPath();
  		//victoria 2
  		that.RondasVictoria[0].beginPath();
  		that.RondasVictoria[0].arc(415, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[0].closePath();
  		that.RondasVictoria[0].fillPath();
  		}
  		if(victorias[0]==3){
  		//victoria 1
  		that.RondasVictoria[0].beginPath();
  		that.RondasVictoria[0].arc(445, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[0].closePath();
  		that.RondasVictoria[0].fillPath();
  		//victoria 2
  		that.RondasVictoria[0].beginPath();
  		that.RondasVictoria[0].arc(415, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[0].closePath();
  		that.RondasVictoria[0].fillPath();
  		//victoria 3
  		that.RondasVictoria[0].beginPath();
  		that.RondasVictoria[0].arc(385, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[0].closePath();
  		that.RondasVictoria[0].fillPath();
  		}


  		//Victorias J2
  		that.RondasVictoria[1].clear();
  		that.RondasVictoria[1].fillStyle='#FFAC00'; //575,605,635

  		if(victorias[1]==1){
  		that.RondasVictoria[1].beginPath();
  		that.RondasVictoria[1].arc(575, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[1].closePath();
  		that.RondasVictoria[1].fillPath();
  		}
  		if(victorias[1]==2){
  		//victoria 1
  		that.RondasVictoria[1].beginPath();
  		that.RondasVictoria[1].arc(575, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[1].closePath();
  		that.RondasVictoria[1].fillPath();
  		//victoria 2
  		that.RondasVictoria[1].beginPath();
  		that.RondasVictoria[1].arc(605, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[1].closePath();
  		that.RondasVictoria[1].fillPath();
  		}
  		if(victorias[1]==3){
  		//victoria 1
  		that.RondasVictoria[1].beginPath();
  		that.RondasVictoria[1].arc(575, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[1].closePath();
  		that.RondasVictoria[1].fillPath();
  		//victoria 2
  		that.RondasVictoria[1].beginPath();
  		that.RondasVictoria[1].arc(605, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[1].closePath();
  		that.RondasVictoria[1].fillPath();
  		//victoria 3
  		that.RondasVictoria[1].beginPath();
  		that.RondasVictoria[1].arc(635, 643, 12, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(45), true, true); //dibuja círculo
  		that.RondasVictoria[1].closePath();
  		that.RondasVictoria[1].fillPath();
	}
}
	//actualización de todos los valores
	this.update = function(){
	  	that.ArmasMostradas[0].setTexture(" "+ that.jugadores[0].arma); 
	  	that.ArmasMostradas[1].setTexture(" "+ that.jugadores[1].arma);
      //Si la munición es 0, se indica con un mensaje aparte
   
      //Muestra munición
      if(that.jugadores[0].municiones.toString() == "0"){
      that.Municiones[0].setText("NO AMMO");
      }else{
      that.Municiones[0].setText(that.jugadores[0].municiones.toString());
      }

      if(that.jugadores[1].municiones.toString() == "0"){
        that.Municiones[1].setText("NO AMMO"); 
      }else{
        that.Municiones[1].setText(that.jugadores[1].municiones.toString());
      }

	  	that.MostrarReloj.setText((Math.trunc(91 - that.Clock.getElapsedSeconds())).toString()); //91 segundos (para que aparezcan en pantalla '90' segundos)
	  	that.VictoriaUpdate();
	  
	  	that.BarrasVidas[0].clear();
	  	that.BarrasVidas[0].fillStyle(0xFFAC00, 1.0);
	  	that.BarrasVidas[0].fillRect(460-that.jugadores[0].vida*4.5, 605,that.jugadores[0].vida*4.5,20); //volteo: desplazo tanto como reduzco
	  	
        that.BarrasVidas[1].clear();
        that.BarrasVidas[1].fillStyle(0xFFAC00, 1.0);
        that.BarrasVidas[1].fillRect(560, 605,that.jugadores[1].vida*4.5,20); 
  	}
}