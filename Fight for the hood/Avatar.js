function Avatar (name,scene,posx,posy,spritesheet) {
		
	
		this.left=spritesheet[0];
		this.right=spritesheet[1];
		this.names=name;
		this.x=posx;
		this.y=posy;
		this.scene=scene;
		this.sprite;
		
		var that = this;

		this.preload = function(){
			that.scene.load.spritesheet('p1l',Avatar.left);
			that.scene.load.spritesheet('p1r',Avatar.right);
		}

		this.create=function(){
			scene.anims.create({
    			key:'left',
   				frames: scene.anims.generateFrameNumbers('p1l', { start: 0, end: 3 }),
    			frameRate: 10,
    			repeat: -1
			});

			scene.anims.create({
    			key: 'right',
   				frames: scene.anims.generateFrameNumbers('p1r', { start: 0, end: 3 }),
    			frameRate: 10,
    			repeat: -1
			});

		that.sprite = that.scene.add.sprite(that.posx,that.posy,'p1l');

		}
	}
		