class Lobby extends Phaser.Scene {
	constructor(){
		super({key:"Lobby"});
		this.check1;
		this.check2;
		this.enter;
		this.back;
		this.texts = new Array(5);
		this.listlp;
		this.mymatch;
		this.scene;
	}
	
	controlmenu(){

		this.check1 = false;
		this.check2 = false;

		this.texts[0] = this.scene.add.text(312, 400, this.getMyIP(request), { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[1] = this.scene.add.text(712, 400, this.getRivalIp(mymatch), { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[2] = this.scene.add.text(312, 600, this.getApodo(this.mymatch, this.getMyIP(request)), { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[3] = this.scene.add.text(712, 600, this.getApodo(this.mymatch, this.getRivalIp(mymatch)), { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		this.texts[4] = this.scene.add.text(512, 100, "Partida 1v1", { fill: '#FFFFFF', font: '30px Impact', align: 'center'}).setScale(2);

		this.listlp = this.getListaApodos(mymatch);

		this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);

		this.enter.isDown=false;
		this.back.isDown=false;
	}

	preload(){
		
	}

	create(){
		this.controlmenu();
	}

	actualizarPosArray(){	
		if(this.back.isDown){
			this.check1 = true;
			
		}
		if(this.enter.isDown){
			this.check2 = true;
		}

	}

	scenechange(){
		if(this.check1){
			this.scene.start('MainMenu');
		}

		if(this.check2){
			this.scene.add.text(312, 400, this.listlp, { fill: '#FFFFFF', font: '18px Impact', align: 'center'}).setScale(2);
		}
	}


	update(){
		this.scenechange();
		this.actualizarPosArray();

	}
}