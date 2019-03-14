//Pantalla para preguntar por el nombre del jugador
//Ese dato se envía al servidor y se pasa a buscar partida

//var NombreFinal;
//var ContrasenaFinal;
var ip;
var islogininfocorrect;
var textoModificable;
class nameMenu extends Phaser.Scene {
	constructor(){
		super({key:"nameMenu"});
		this.escape;
		this.enter;		
		this.textoPregunta;
		this.textoRepetir;
		this.textoSalir;
		//this.textoNombre;
		this.textoEstadosala;
		this.ipsjugadoressala;
		this.arrayjugadores;
		this.salir;
		this.fondo;
		this.musica;

		//Nuevas Variables Junio
		this.textoPasswordLogin;
		this.textoPasswordNew;
		this.textoNombreLogin;
		this.textoNombreNew;
		this.arriba
		this.abajo;
		this.izquierda;
		this.derecha;
		////////////////////////
	}

	preload(){
		this.load.image('menuNombreFondo','Recursos/Imagenes/menuNombreFondo.png');
		this.load.audio('musicacontrol','Recursos/Audio/CharacterSelection.mp3');
	}

	//botón para retroceder
	retroceder(){
		if(this.escape.isDown){
		this.scene.start('MainMenu');
		this.musica.stop();
		this.escape.isDown=false;
		}
	}

	
	aceptar(){
		var that = this;
		if(this.enter.isDown) {
			////////////Login///////////
			if(textoModificable == this.textoPasswordLogin || textoModificable == this.textoNombreLogin){

				var myinfo =
				{
				ip: ip,
				apodo: that.textoNombreLogin.text,
				contrasena: that.textoPasswordLogin.text, 
				}

				//Comprobacion de la contrasena//
				console.log(islogininfocorrect);
				
				
				login(myinfo,function(data){islogininfocorrect=data});//se devuelve bool para saber si la informacion es correcta
				////////////////////////////////

			}
			else{
			////////////SignUp///////////
				if(textoModificable == this.textoPasswordNew || textoModificable == this.textoNombreNew){
					var myinfo =
					{
					ip: ip,
					apodo: that.textoNombreNew.text,
					contrasena: that.textoPasswordNew.text, 
					}

					signup(myinfo,function(data){})
				}
			}
			this.enter.isDown=false;
		}
	}




	create(){

		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuNombreFondo').setScale(1.3);
		
		this.musica = this.game.sound.add('musicacontrol');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		this.musica.play();

		this.textoEstadosala = this.add.text(390, 515, "", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});

		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.enter  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para aceptar

		this.textoSalir = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});

		this.textoVersion = this.add.text(340, 300, "What's your name?", { fill: '#FFAC00', font: '48px Impact', align: 'center'});
		this.textoVersion = this.add.text(390, 415, "Press ENTER to search a match", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		this.textoVersion = this.add.text(50, 50,   "Online Mode", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		
		
		var that = this;
		//Nuevo Junio
		this.arriba 			= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.abajo 				= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.izquierda 			= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.derecha 			= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		this.textoNombreLogin  	= this.add.text(380, 320, "Insert your name", { fill: '#F4FFF3', font: '32px Impact', align: 'center'})
		this.textoPasswordLogin = this.add.text(380, 400, "Insert your password", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		
		this.textoNombreNew  	= this.add.text(80, 320, "Insert your name", { fill: '#F4FFF3', font: '32px Impact', align: 'center'})
		this.textoPasswordNew	= this.add.text(80, 400, "Insert your password", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		
		textoModificable = that.textoNombreLogin;//En funcion de que texto se vaya a modificar , si es contraseña o nombre esta variable apunta a eso
		//this.textoLogin = this.add.text(380, 400, "Insert your password", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		//this.textoNombre.on('pointerdown',function(){textoModificable = that.textoNombre});
		//this.textoPassword.on('pointerdown',function(){textoModificable = that.textoPassword});
		
		////////////////////////

		getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores})


		//Actualiza la ip (variable global) una vez al crearse y luego cada 2s
		getMyIP(function(data){ip = data.ip});

		this.time.addEvent({delay:2000,loop:true,
    	callback: function(){getIPs(function(arrayjugadores){that.ipsjugadoressala = arrayjugadores});}})

		//Server Caido (ACTUALIZA CADA 1s)
		this.time.addEvent({delay:1000, loop:true,
		   callback: function(){getServerStatus(function(){
		    that.scene.start('EscenarioError');
			this.musica.stop();})}})

		//En el caso de que la ip ya este registrada se actualiza el nombre de usuario.
		this.time.addEvent({delay:500,  //tiempo que tarda hasta reiniciar
    		callback: function(){getApodo(function(data){that.textoNombreLogin.text=data},ip)}})
		
		//Escribir texto para poner nombre de usuario.
		this.input.keyboard.on('keydown',function(event){
			if(textoModificable!=null){
				if((textoModificable.text === "Insert your name" || textoModificable.text === "Insert your password" ) &&  event.keyCode >=48 && event.keyCode < 90 || event.keyCode == 32){
					textoModificable.text = event.key;
				}
				else if(event.keyCode === 8 && textoModificable.text.length>0){
					textoModificable.text = textoModificable.text.substr(0,textoModificable.text.length-1);
				}
				else if(event.keyCode == 32 || event.keyCode >=48 && event.keyCode < 90 && textoModificable.text.length<15){
					textoModificable.text += event.key;
				}
				}
			})

		/////////////Nuevo Junio//////////
		this.time.addEvent({delay:1000,loop:true,callback:function(){
			if(islogininfocorrect){
				that.scene.start('Lobby');
				that.musica.stop();
			}
		}})
		//////////////////////////////////
		
	}


	seleccionContraseñaONombre(){
	//Máquina de estados para apuntar a distintos campos de texto
	//Puedes elegir entre contraseña y nombre para registrarse (new) y 

		var that = this;

		if(that.derecha.isDown){
			if(textoModificable == that.textoPasswordNew){
				textoModificable   = that.textoPasswordLogin;
			} 
			if(textoModificable == that.textoNombreNew){
				textoModificable  = that.textoNombreLogin;
			}
			that.derecha.isDown = false;
		}
		if(that.izquierda.isDown){
			if(textoModificable == that.textoPasswordLogin){
				textoModificable 	= that.textoPasswordNew;
			}
			if(textoModificable == that.textoNombreLogin){
				textoModificable  = that.textoNombreNew;
			}
			that.izquierda.isDown = false;
		}
		if(this.arriba.isDown){
			if(textoModificable == that.textoPasswordLogin){
				textoModificable = this.textoNombreLogin;
			}
            if(textoModificable == that.textoPasswordNew){
            	textoModificable = this.textoNombreNew;
            }
            this.arriba.isDown = false;
        }
        if(this.abajo.isDown){
            if(textoModificable == that.textoNombreNew){
				textoModificable = this.textoPasswordNew;
			}
            if(textoModificable == that.textoNombreLogin){
            	textoModificable = this.textoPasswordLogin;
            }
            this.abajo.isDown = false;
        }
    }
    
	update(){
		this.retroceder();
		this.aceptar();
		this.seleccionContraseñaONombre();
	}
}

