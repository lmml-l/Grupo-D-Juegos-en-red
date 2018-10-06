class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
		var sprite = ["Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png"]
		this.avatar = new Avatar("a",this,400,400,sprite);

		
	}
	preload ()
	{
		//this.load.image('p1l',"Recursos/Imagenes/HojadeSpriteBasica.png");
		//this.load.image('p1l',"Recursos/Imagenes/HojadeSpriteBasica.png");
		this.avatar.preload();
		
	}

	create ()
	{
		
		
		
		
		this.avatar.animaciones();
		this.avatar.spawnavatar();
		this.avatar.walkright();

		//this.sprite = new Phaser.Gameobjects.Sprite(this,100,100,'p1l',2).setScale(4);
		//var a = this.add.image(150,150,'p1l').setScale(1);
	}

	update ()
	{
	}
}
