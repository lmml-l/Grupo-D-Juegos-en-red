class Avatar extends Phaser.GameObjects.Sprite {
	constructor(spritesheet,posx,posy){
		super({key:"Personaje",x:x,y:posy});
		this.left=spritesheet[1];
		this.right=spritesheet[2];
	}
	
	preload(){
		this.load.spritesheet('p1l',left);
		this.load.spritesheet('p1r',right);

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