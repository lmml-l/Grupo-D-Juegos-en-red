class CharapterSelection extends Phaser.Scene {
	constructor(){
		super({key:"CharapterSelection"});
	}
	preload ()
	{
	}

	create ()
	{
		var sprite = ["../Imagenes/SpritePasos1.png","../Imagenes/SpritePasos2.png"]
		var avatar = new Avatar(sprite,100,100);

		avatar.anims.play('right')
	}

	update ()
	{
	}
}
