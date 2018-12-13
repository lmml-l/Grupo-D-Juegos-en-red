////WEBSOCKETS////
var connection = new WebSocket('ws://127.0.0.1:8080/echo');

connection.onmessage = function(msg) {
		console.log("WS message: " + msg.data);
}
/////////////////

//Pantalla inicial. Da acceso a la selección de personajes, pantalla de controles y, en versiones futuras, juego online
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

		this.textoControles;
		this.textoVersion;
		this.fondo;
		
		//this.archive;
	}
	
	menu(){
		

		//Lista de partidas para usar posteriormente
		//this.archive = new ReaderWriter(//conseguir esta vaina con un getter primero ----> historialPartidas);
		//this.archive.Lector(historialPartidas);
		
		//bloqueos de botón (obliga a soltar la tecla)
		this.lock1 = true;
		this.lock2 = true;
		this.lock3 = true;
		this.lock4 = true;
		this.check = false;

		//índice de la seleccion
		this.posArray=0;

		//creación de las imágenes
		var title = this.add.image(0,this.game.canvas.height*(150/600),'title').setScale(0.5);
		var buttonlocal = this.add.image(0,this.game.canvas.height*(3/6),'buttonlocal').setScale(0.5).setInteractive();
		var buttononline = this.add.image(0,this.game.canvas.height*(4/6),'buttononline').setScale(0.5).setInteractive();
		var controles = this.add.image(0,(this.game.canvas.height*(5/6)),'controles').setScale(0.5).setInteractive();
		//se añaden al array
		this.smap.push(buttonlocal);
		this.smap.push(buttononline);
		this.smap.push(controles);
		//sprite que indica la selección
		this.selector = this.add.sprite((this.smap[this.posArray].x + 800), this.smap[this.posArray].y, 'Selector').setScale(1);

		//engloba los botones
		var container = this.add.container(this.game.canvas.width/2, 0);
		container.add(title);
		container.add(buttonlocal); 
		container.add(buttononline); 
		container.add(controles);  
		container.setX(this.game.canvas.width/2);

		//teclas disponibles
		this.arriba1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.arriba2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.abajo1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.abajo2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.go1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.go2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.salir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		//inicializa las teclas a no pulsadas (para evitar acarreros de pantallas anteriores)
		this.go1.isDown=false;
		this.go2.isDown=false;
		this.salir.isDown=false;


		
	}
	preload(){
		this.load.image('fondoMenu','Recursos/Imagenes/menuFondo.png');
		var title = this.load.image('title','Recursos/Imagenes/Logo.png')
		var buttonlocal = this.load.image('buttonlocal','Recursos/Imagenes/Jugar_Local.png');
		var buttononline = this.load.image('buttononline','Recursos/Imagenes/Jugar_Online.png');
		var controles = this.load.image('controles','Recursos/Imagenes/Controles.png');
		var selector = this.load.image('Selector','Recursos/Imagenes/Selector.png');
	}

	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'fondoMenu').setScale(1.3);
		this.menu();
		//textos de apoyo
		this.textoControles = this.add.text(50, 710, "Use W/D or arrows to select\nPress SPACE or ENTER to go", {  fill: '#F4FFF3', font: '24px Impact', align: 'left'});
		this.textoVersion = this.add.text(700, 710, "v.0.35 preAlpha fase 3_una_semana", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'}); //760, 710
	
		var that=this;
		//comprobación del estado del servidor
		this.time.addEvent({delay:100, loop:true,
    	callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})

    	///WEBSOCKETS
    	connection.send(JSON.stringify("Me llamo WILLYREXXXXXXXXXXXXXXXXXXX"));
    	///////////
	}

	//comprueba que la tecla no está siendo apretada
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
		this.selector.setPosition(this.smap[this.posArray].x + 700, this.smap[this.posArray].y); //800
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
	}

	//da paso a la pantalla seleccionada
	scenechange(){
		if(this.salir.isDown){
			this.scene.start('MainMenu');
		}
		if(this.posArray==0 && this.check){
			this.scene.start('CharapterSelection');
			this.go1.isDown=false;
			this.go2.isDown=false;
		}else if(this.posArray==1 && this.check){
			this.scene.start('nameMenu');
			this.go1.isDown=false;
			this.go2.isDown=false;
		}else if(this.posArray==2 && this.check){
			this.scene.start('ControlGuide');
			this.go1.isDown=false;
			this.go2.isDown=false;
		}
	}

	update(){
		this.scenechange();
		this.actualizarSelector();
		this.actualizarPosArray();
		this.teclasoltada();
	}
}