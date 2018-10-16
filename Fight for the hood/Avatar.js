
'use strict';

function Avatar (nam,scen,posx,posy,spritesheet) {
		
		this.names = nam;
		//this.left=spritesheet[0];
		//this.right=spritesheet[1];
		this.hojadespritesheet=spritesheet;
		this.x=posx;
		this.y=posy;
		this.scene=scen;
		this.sprite;
		
		var that = this;

		this.preload=function(){
			that.scene.load.spritesheet(that.names +'p1l',that.hojadespritesheet[0],{ frameWidth: 87, frameHeight: 133 });
			that.scene.load.spritesheet(that.names +'p1r',that.hojadespritesheet[1],{ frameWidth: 87, frameHeight: 133 });
			that.scene.load.spritesheet(that.names +'p1lp',that.hojadespritesheet[2],{ frameWidth: 87, frameHeight: 134 });
			that.scene.load.spritesheet(that.names +'p1rp',that.hojadespritesheet[3],{ frameWidth: 87, frameHeight: 134 });
			that.scene.load.spritesheet(that.names +'p1le',that.hojadespritesheet[4],{ frameWidth: 110, frameHeight: 135 });
			that.scene.load.spritesheet(that.names +'p1re',that.hojadespritesheet[5],{ frameWidth: 110, frameHeight: 135 });
			that.scene.load.spritesheet(that.names +'p1lt',that.hojadespritesheet[6],{ frameWidth: 87, frameHeight: 134 });
			that.scene.load.spritesheet(that.names +'p1rt',that.hojadespritesheet[7],{ frameWidth: 87, frameHeight: 134 });
			that.scene.load.spritesheet(that.names +'p1lpa',that.hojadespritesheet[8],{ frameWidth: 87, frameHeight: 133 });
			that.scene.load.spritesheet(that.names +'p1rpa',that.hojadespritesheet[9],{ frameWidth: 87, frameHeight: 133 });
			that.scene.load.spritesheet(that.names +'p1lb',that.hojadespritesheet[10],{ frameWidth: 111, frameHeight: 134 });
			that.scene.load.spritesheet(that.names +'p1rb',that.hojadespritesheet[11],{ frameWidth: 111, frameHeight: 134 });
			//that.scene.game.load.start();
		}

		this.animaciones=function(){
		that.scene.anims.create({
    			key: that.names +' left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1l', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			});

		that.scene.anims.create({
    			key: that.names + ' right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1r', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})

		that.scene.anims.create({
    			key: that.names + ' idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1r', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})

		that.scene.anims.create({
    			key: that.names + ' idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1l', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Subfusil left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lt', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Subfusil right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rt', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Subfusil idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lt', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Subfusil idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rt', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Escopeta left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1le', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Escopeta right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1re', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Escopeta idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1le', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Escopeta idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1re', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Pistola left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lp', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Pistola right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rp', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Pistola idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lp', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Pistola idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rp', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Puñoamericano left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lpa', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Puñoamericano right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rpa', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Puñoamericano idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lpa', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Puñoamericano idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rpa', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Bate left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lb', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Bate right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rb', { start: 0, end: 2 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Bate idle left',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1lb', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		that.scene.anims.create({
    			key: that.names + 'Bate idle right',
   				frames: that.scene.anims.generateFrameNumbers(that.names + 'p1rb', { start: 1, end: 1 }),
    			frameRate: 9,
    			repeat: -1
			})
		}
		this.spawnavatar=function(){
			that.sprite = that.scene.physics.add.sprite(that.x,that.y,that.names + 'p1l').setScale(0.40);
		}


		this.walkright=function(armaequipada){
			that.sprite.anims.play(that.names + armaequipada +' right',true);
		}
		this.walkleft=function(armaequipada){
			that.sprite.anims.play(that.names + armaequipada +' left',true);
		}
		this.idleleft=function(armaequipada){
			that.sprite.anims.play(that.names + armaequipada +' idle left',true);
		}
		this.idleright=function(armaequipada){
			that.sprite.anims.play(that.names + armaequipada +' idle right',true);
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
		