
'use strict'

function Avatar (nam,scen,posx,posy,spritesheet) {
		
		this.names = nam;
		this.left=spritesheet[0];
		this.right=spritesheet[1];
		this.x=posx;
		this.y=posy;
		this.scene=scen;
		this.sprite;
		
		var that = this;

		this.preload=function(){
			that.scene.load.spritesheet(that.names +'p1l',that.left,{ frameWidth: 130, frameHeight: 161 });
			that.scene.load.spritesheet(that.names +'p1r',that.right,{ frameWidth: 130, frameHeight: 161 });
			//that.scene.game.load.start();
		}

		this.animaciones=function(){
		that.scene.anims.create({
    			key: that.names +'left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1l', { start: 0, end: 3 }),
    			frameRate: 9,
    			repeat: -1
			});

		that.scene.anims.create({
    			key: that.names + 'right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1r', { start: 0, end: 3 }),
    			frameRate: 9,
    			repeat: -1
			})

		that.scene.anims.create({
    			key: that.names + 'idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1r', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})

			that.scene.anims.create({
    			key: that.names + 'idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1l', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})

		}
		this.spawnavatar=function(){
			that.sprite = that.scene.physics.add.sprite(that.x,that.y,that.names + 'p1l').setScale(0.40);
		}


		this.walkright=function(){
			that.sprite.anims.play(that.names +'right',true);
		}
		this.walkleft=function(){
			that.sprite.anims.play(that.names +'left',true);
		}
		this.idleleft=function(){
			that.sprite.anims.play(that.names +'idle left',true);
		}
		this.idleright=function(){
			that.sprite.anims.play(that.names +'idle right',true);
		}


		this.stopanim=function(){
			that.sprite.anims.stop();
		}
		this.getanim=function(){
			return that.sprite.anims.getCurrentKey();
		}
		this.velx=function(vel){
			that.sprite.body.velocity.x=vel;
		}
		this.vely=function(vel){
			that.sprite.body.velocity.y=vel;
		}

		this.getvelx=function(){
			return that.sprite.body.velocity.x;
		}
		this.getvely=function(){
			return that.sprite.body.velocity.y;
		}
	}
		