
'use strict'

function Avatar (nam,scen,posx,posy,spritesheet) {
		
		this.name = nam;
		this.left=spritesheet[0];
		this.right=spritesheet[1];
		this.names=nam;
		this.x=posx;
		this.y=posy;
		this.scene=scen;
		this.sprite;
		
		var that = this;

		this.preload=function(){
			that.scene.load.spritesheet(that.nam +'p1l',that.left,{ frameWidth: 130, frameHeight: 161 });
			that.scene.load.spritesheet(that.nam +'p1r',that.right,{ frameWidth: 130, frameHeight: 161 });
			//that.scene.game.load.start();
		}

		this.animaciones=function(){
		that.scene.anims.create({
    			key: that.nam +'left',
   				frames: that.scene.anims.generateFrameNumbers(that.nam + 'p1l', { start: 0, end: 4 }),
    			frameRate: 9,
    			repeat: -1
			});

		that.scene.anims.create({
    			key: that.nam + 'right',
   				frames: that.scene.anims.generateFrameNumbers(that.nam + 'p1r', { start: 0, end: 4 }),
    			frameRate: 9,
    			repeat: -1
			})
		}
		this.spawnavatar=function(){
			that.sprite = that.scene.physics.add.sprite(that.x,that.y,that.nam + 'p1l');
		}

		this.walkright=function(){
			that.sprite.anims.play(that.nam +'right');
		}
		this.walkleft=function(){
			that.sprite.anims.play(that.nam +'left');
		}
	}
		