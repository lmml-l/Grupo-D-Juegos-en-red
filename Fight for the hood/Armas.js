class Drops extends Phaser.Physics.Arcade.Image {
	constructor(sprites){
		this.pistola = sprites[1];
		this.escopeta = sprites[2];
		this.subfusil = sprites[3];
		this.puñoamericano = sprites[4];
		this.batebeisbol = sprites[5];
		this.pickcommand = "SoltarRecoger";
		this.lastWeapon = //Aqui necesito saber si el personaje guarda un identificador para el arma que lleva o si solo se indica si lleva o no arma;
		this.newArma = "none";
		this.callbackID = "none";
	}

	initPos(){
		var x;
		var y = this.game.canvas.height;
		this.game.setGravity(-0.98);
	}

	init(){
		y += this.game.getGravity();

	}

	select(){
		var s = Math.random()*this.game.canvas.width;
		x = s;

		var e = Math.floor(Math.random()*4);
		switch(e){
			case 0:
				printWeapon(esc);
			break;

			case 1:
				printWeapon(pst);
			break;

			case 2:
				printWeapon(sbf);
			break;

			case 3:
				printWeapon(pa);
			break;

			case 4:
				printWeapon(bb);
			break;
		}
	}

	printWeapon(idarma){
		switch(idarma){
			case esc:
				this.load.spritesheet('Escopeta',escopeta);
				this.newArma = "escopeta";
			break;
				
			case pst:
				this.load.spritesheet('Pistola',pistola);
				this.newArma = "pistola";
			break;

			case sbf:
				this.load.spritesheet('Subfusil',subfusil);
				this.newArma = "subfusil";
			break;

			case pa:
				this.load.spritesheet('PuñoAmericano',puñoamericano);
				this.newArma = "puño americano";
			break;

			case bb:
				this.load.spritesheet('BateBeisbol',batebeisbol);
				this.newArma = "bate de beisbol";
			break;
		}

		
		
		
		
	}

	pickndrop(scene, newArma){
		this.Drops.destroy(this.scene);
		this.callbackID = this.newArma;
		printWeapon(this.lastWeapon);
	}

	setnewID(){
		return this.callbackID;
	}
}