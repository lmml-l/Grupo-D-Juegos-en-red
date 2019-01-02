//Pantalla para preguntar por el nombre del jugador
//Ese dato se envía al servidor y se pasa a buscar partida

var NombreFinal;
var ip;

var genteensala;
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
		this.textoEstadosala;
		this.ipsjugadoressala;
		this.arrayjugadores;
		this.salir;
		this.fondo;
	}

	preload(){
		this.load.image('menuNombreFondo','Recursos/Imagenes/menuNombreFondo.png');
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
			if(this.textoNombre.text==="Insert your name"){ //Nombre anónimo
					this.textoNombre.text="Anonymous";
				}
			NombreFinal = this.textoNombre.text;
			

			var myinfo =
			{
				ip: ip,
				apodo: NombreFinal
			}

			putMyInfo(myinfo);

			this.enter.isDown=false;

			var that = this; 
			if(this.ipsjugadoressala.length < 2){ //Hay espacio en partida
				addPlayertoRoom(myinfo.ip);
				getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores})
				if(this.ipsjugadoressala.length == 1){
					var arrayconips = [myinfo.ip,this.ipsjugadoressala[0]];
					addMatchtoHistory(arrayconips);
				}
				this.scene.start('Lobby');
			}
			else{
				console.log("The server is full");
				this.textoEstadosala = this.add.text(450, 515, "The server is full", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
			}
			
		}
	}


	create(){
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuNombreFondo').setScale(1.3);
		
		this.textoEstadosala = this.add.text(390, 515, "", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});

		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.enter  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para aceptar

		this.textoSalir = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});

		this.textoVersion = this.add.text(340, 300, "What's your name?", { fill: '#FFAC00', font: '48px Impact', align: 'center'});
		this.textoVersion = this.add.text(390, 415, "Press ENTER to search a match", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		this.textoVersion = this.add.text(50, 50,   "Online Mode", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		this.textoNombre  = this.add.text(380, 370, "Insert your name", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		
		var that = this;
		getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores})

		
		getMyIP(function(data){ip = data.ip});

		if(function(){getCheckerStatus()}=="0"){
			this.time.addEvent({delay:100, loop:true,
		    callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})
		}

		this.time.addEvent({delay:400 , callback: function(){console.log(ip+"abc")}})
		
		this.time.addEvent({delay:500,  //tiempo que tarda hasta reiniciar
    	callback: function(){getApodo(function(data){that.textoNombre.text=data},ip)}})
		
		this.time.addEvent({delay:2000,loop:true,
    	callback: function(){getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores});}})

			this.input.keyboard.on('keydown',function(event){
			if(that.textoNombre.text === "Insert your name" &&  event.keyCode >=48 && event.keyCode < 90 || event.keyCode == 32){
				that.textoNombre.text = event.key;
			}
			else if(event.keyCode === 8 && that.textoNombre.text.length>0){
				that.textoNombre.text = that.textoNombre.text.substr(0,that.textoNombre.text.length-1)
			}
			else if(event.keyCode == 32 || event.keyCode >=48 && event.keyCode < 90 && that.textoNombre.text.length<15){
				that.textoNombre.text += event.key;
			}
		}
		)

		var that=this;
		//comprobación del estado del servidor
		//this.time.addEvent({delay:100, loop:true,
    	//callback: function(){getServerStatus(function(){that.scene.start('EscenarioError');})}})


	}

	update(){
		this.retroceder();
		this.aceptar();
		var that = this;
		//getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores})
		//console.log(this.ipsjugadoressala);

		//comprobación del estado del servidor
		


	}
}

//Para retroceder se pulsa escape, el cuadro de texto y la pregunta