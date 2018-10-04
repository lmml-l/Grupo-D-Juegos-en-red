class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
	}
	preload ()
	{
		this.load.image('p1l',"Recursos/Imagenes/SpritePasos1.png");
	}

	create ()
	{
		
		var sprite = ["Recursos/Imagenes/SpritePasos1.png","Recursos/Imagenes/SpritePasos2.png"]
		var avatar = new Avatar("a",this,200,200,sprite);
		avatar.preload();
		avatar.create();
		//this.add(avatar);

		//this.sprite = new Phaser.Gameobjects.Sprite(this,100,100,'p1l',2).setScale(4);
		//var a = this.add.image(150,150,'p1l').setScale(1);
	}

	update ()
	{
	}
}
