function Drops(escena, sprites) {
		this.scene = escena;
		this.pistola = sprites[1];
		this.escopeta = sprites[2];
		this.subfusil = sprites[3];
		this.puñoamericano = sprites[4];
		this.batebeisbol = sprites[5];
		this.sprite = new Array();
		var that = this;

	this.initPos = function(){
		var arrayPos = [Math.random()*this.scene.game.canvas.width,Math.random()*this.scene.game.canvas.height]
		return arrayPos;
		//that.game.setGravity(-0.98);
	}

	/*this.init = function(){
		y += this.game.getGravity();

	}
	*/
	
	this.preload = function(){

		that.scene.load.image('Pistola', that.pistola);
		that.scene.load.image('Escopeta', that.escopeta);
		that.scene.load.image('Subfusil', that.subfusil);
		that.scene.load.image('Puño Americano', that.puñoamericano);
		that.scene.load.image('Bate de Beisbol', that.batebeisbol);


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
		var armapos = that.initPos();
		var armapw = that.scene.physics.add.sprite(armapos[0],armapos[1], that.selectID());
		that.sprite.push(armapw);
		if(that.sprite.length > 5){
			var s = that.sprite.shift();
			s.destroy();
		}
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