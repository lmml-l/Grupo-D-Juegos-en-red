function Drop(escena, sprites) {
		this.scene = escena;
		this.pistola = sprites[1];
		this.escopeta = sprites[2];
		this.subfusil = sprites[3];
		this.puñoamericano = sprites[4];
		this.batebeisbol = sprites[5];
		this.sprite;
		var that = this;

	this.initPos = function(){
		return Math.random()*this.game.canvas.width;
		//that.game.setGravity(-0.98);
	}

	/*this.init = function(){
		y += this.game.getGravity();

	}
	*/
	
	this.preload = function(){

		that.scene.load.sprite('Pistola', that.pistola);
		that.scene.load.sprite('Escopeta', that.escopeta);
		that.scene.load.sprite('Subfusil', that.subfusil);
		that.scene.load.sprite('Puño Americano', that.puñoamericano);
		that.scene.load.sprite('Bate de Beisbol', that.batebeisbol);


	}

	this.selectID = function(){
		var name;
		var e = Math.floor(Math.random()*4);
		switch(e){
			case 0:
				name = "Escopeta";
			break;

			case 1:
				name = "Pistola";
			break;

			case 2:
				name = "Subfusil";
			break;

			case 3:
				name = "Puño Americano";
			break;

			case 4:
				name = "Bate de Beisbol";
			break;
		}
		return name;
	}

	this.spawnarma = function(){
		var x = that.initPos();
		that.sprite = that.scene.physics.add.sprite(x, 0, that.selectID());
	}

	/*this.printWeapon = function(idarma){
		switch(idarma){
			case esc:
				that.load.spritesheet('Escopeta',escopeta);
				that.newArma = "escopeta";
			break;
				
			case pst:
				that.load.spritesheet('Pistola',pistola);
				that.newArma = "pistola";
			break;

			case sbf:
				that.load.spritesheet('Subfusil',subfusil);
				that.newArma = "subfusil";
			break;

			case pa:
				that.load.spritesheet('PuñoAmericano',puñoamericano);
				that.newArma = "puño americano";
			break;

			case bb:
				that.load.spritesheet('BateBeisbol',batebeisbol);
				that.newArma = "bate de beisbol";
			break;
		}	
	}
	*/

	/*this.pickndrop = function(arma, scene, newArma){
		this.callbackID = this.newArma;
		this.sprite.destroy();
		printWeapon(arma);
	}
	*/

	/*this.setnewID = function(){
		this.Jugador.arma = this.callbackID;
	}
	*/
}