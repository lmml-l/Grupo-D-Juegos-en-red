class MainMenu extends Phaser.Scene {
	constructor(){
		super({key:"MainMenu"});
		this.smap = new Array();
		this.check;
		this.selector;
		this.posArray;
		this.arriba1;
		this.abajo1;
		this.go1;
		this.arriba2;
		this.abajo2;
		this.go2;
		this.lock1;
		this.lock2;
		this.lock3;
		this.lock4;
	}
	
	menu(){

		this.lock1 = true;
		this.lock2 = true;
		this.lock3 = true;
		this.lock4 = true;
		this.check = false;

		this.posArray=0;

		var title = this.add.image(0,this.game.canvas.height*(150/600),'title').setScale(0.5);
		var buttonlocal = this.add.image(0,this.game.canvas.height*(3/6),'buttonlocal').setScale(0.5).setInteractive();
		var buttononline = this.add.image(0,this.game.canvas.height*(4/6),'buttononline').setScale(0.5).setInteractive();
		var controles = this.add.image(0,(this.game.canvas.height*(5/6)),'controles').setScale(0.5).setInteractive();
		
		this.smap.push(buttonlocal);
		this.smap.push(buttononline);
		this.smap.push(controles);

		this.selector = this.add.sprite((this.smap[this.posArray].x + 800), this.smap[this.posArray].y, 'Selector').setScale(1);

		/*
		buttonlocal.on('pointerdown', function(event){this.scene.start('CharapterSelection')},this); 
		buttononline.on('pointerdown', function(event){this.scene.start('CharapterSelection')},this);
		controles.on('pointerdown', function(event){this.scene.start('CharapterSelection')},this); 
		*/
	
		var container = this.add.container(this.game.canvas.width/2, 0);
		container.add(title);
		container.add(buttonlocal); 
		container.add(buttononline); 
		container.add(controles);  
		container.setX(this.game.canvas.width/2);


		this.arriba1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.arriba2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.abajo1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.abajo2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.go1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.go2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.go1.isDown=false;
		this.go2.isDown=false;


		
	}
	preload(){
		var title = this.load.image('title','Recursos/Imagenes/Logo.png')
		var buttonlocal = this.load.image('buttonlocal','Recursos/Imagenes/Jugar_Local.png');
		var buttononline = this.load.image('buttononline','Recursos/Imagenes/Jugar_Online.png');
		var controles = this.load.image('controles','Recursos/Imagenes/Controles.png');
		var selector = this.load.image('Selector','Recursos/Imagenes/Selector.png');
	}

	create(){
		this.menu();
	}

	teclasoltada(){
		if(this.arriba1.isUp){
			this.lock1=true;
		}
		if(this.arriba2.isUp){
			this.lock2=true;
		}
		if(this.abajo1.isUp){
			this.lock3=true;
		}
		if(this.abajo2.isUp){
			this.lock4=true;
		}
	}

	actualizarSelector(){
		this.selector.setPosition(this.smap[this.posArray].x + 800, this.smap[this.posArray].y);
	}

	actualizarPosArray(){	
		if(this.abajo1.isDown && (this.posArray<2) && !this.check && this.lock3){
			this.posArray++;
			this.lock3=false;
		}else if(this.arriba1.isDown && (this.posArray>0) && !this.check && this.lock1){
			this.posArray--;
			this.lock1=false;
		}else if(this.go1.isDown){
			this.check = true;
			
		}

		if(this.abajo2.isDown && (this.posArray<2) && !this.check && this.lock4){
			this.posArray++;
			this.lock4=false;
		}else if(this.arriba2.isDown && (this.posArray>0) && !this.check && this.lock2){
			this.posArray--;
			this.lock2=false;
		}else if(this.go2.isDown){
			this.check = true;
		}
		//console.log("aaaa")
	}

	scenechange(){
		if(this.posArray<2 && this.check){
			this.scene.start('CharapterSelection');
		}else if(this.posArray==2 && this.check){
			this.scene.start('ControlGuide');
		}
	}


	update(){
		this.scenechange();
		this.actualizarSelector();
		this.actualizarPosArray();
		this.teclasoltada();

	}
}