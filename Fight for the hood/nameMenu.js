//Pantalla para preguntar por el nombre del jugador
//Ese dato se envía al servidor y se pasa a buscar partida
class nameMenu extends Phaser.Scene {
	constructor(){
		super({key:"nameMenu"});
		this.nombre;
		this.escape;
		this.enter;
		this.textoPregunta;
		this.textoRepetir;
		this.textoSalir;

	}

	preload(){

	}

	//botón para retroceder
	retroceder(){
		if(escape.isDown){
		this.scene.start('MainMenu');
		}
	}

	aceptar(){
		if(enter.isDown){
			this.nombre =this.nombreBox.value; //??
			nombre.appendChild();
			this.scene.start('Lobby');
		}
	}

	create(){
		this.nombre="Anónimo"; //nombre por defecto si no se pone nada

		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.enter  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para aceptar

		this.textoVersion = this.add.text(500, 500, "¿Cómo te llamas?", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});
		this.textoVersion = this.add.text(50, 700, "Pulse ENTER para aceptar", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});
		this.textoVersion = this.add.text(50, 730, "Pulse ESC para salir", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});

		//caja para introducir el nombre
		this.nombreBox = document.createElement("INPUT");
		nombreBox.setAttribute("type", "text");
		nombreBox.setAttribute("value", "Introduzca su nombre");
		this.nombre = prompt("Introduzca su nombre","Anónimo");
		
	}

	update(){
		this.retroceder();
		this.aceptar();
	}
}

//Para retroceder se pulsa escape, el cuadro de texto y la pregunta