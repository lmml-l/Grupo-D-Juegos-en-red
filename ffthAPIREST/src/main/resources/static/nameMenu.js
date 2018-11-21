//Pantalla para preguntar por el nombre del jugador
//Ese dato se envía al servidor y se pasa a buscar partida

var NombreFinal;

class nameMenu extends Phaser.Scene {
	constructor(){
		super({key:"nameMenu"});
		this.nombre;
		this.escape;
		this.enter;		
		this.textoPregunta;
		this.textoRepetir;
		this.textoSalir;
		this.textoNombre;
		this.ipsjugadoressala;
		this.arrayjugadores;
	}

	preload(){

	}

	//botón para retroceder
	retroceder(){
		if(this.escape.isDown){
		this.scene.start('MainMenu');
		this.escape.isDown=false;
		}
	}

	
	aceptar(){
		if(this.enter.isDown){
			if(this.arrayjugadores.length < 2){
			this.scene.start('Lobby');
			this.enter.isDown=false;
			NombreFinal = this.textoNombre.text;
			}
			else{
				console.log("Servidor lleno");
			}
			
		}
	}

	create(){
		//nombre por defecto si no se pone nada

		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.enter  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para aceptar

		this.textoVersion = this.add.text(400, 500, "¿Cómo te llamas?", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});
		this.textoVersion = this.add.text(50, 700, "Pulse ENTER para aceptar", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});
		this.textoVersion = this.add.text(50, 730, "Pulse ESC para salir", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});
		this.textoNombre = this.add.text(400, 200, "Anónimo", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});
		
		var that = this;
		getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores})
		
		
		
		this.input.keyboard.on('keydown',function(event){
			if(event.keyCode === 8 && that.textoNombre.text.length>0){
				that.textoNombre.text = that.textoNombre.text.substr(0,that.textoNombre.text.length-1)
			}
			else if(event.keyCode == 32 || event.keyCode >=48 && event.keyCode < 90){
				that.textoNombre.text += event.key;
			}

		}
		)
	}

	update(){
		this.retroceder();
		this.aceptar();
		var that = this;
		getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores})
		console.log(this.ipsjugadoressala);
	}
}

//Para retroceder se pulsa escape, el cuadro de texto y la pregunta