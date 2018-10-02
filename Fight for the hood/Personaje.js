class P1 extends Phaser.Sprite {
	constructor(){
		super({key:"Personaje"});
	}
	
	preload(){
		this.load.spritesheet('p1l','Recursos/Imagenes/Logo.png');
		this.load.spritesheet('p1r','Recursos/Imagenes/Logo.png');

	}
	create(){
		this.anims.create({
    	key: 'left',
   		frames: this.anims.generateFrameNumbers('p1l', { start: 0, end: 3 }),
    	frameRate: 10,
    	repeat: -1
		});

		this.anims.create({
    	key: 'right',
   		frames: this.anims.generateFrameNumbers('p1r', { start: 0, end: 3 }),
    	frameRate: 10,
    	repeat: -1
		});
	}
}