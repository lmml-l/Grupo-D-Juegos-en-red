//ACCESO AL MODO ONLINE MEDIANTE NICKNAME Y CONTRASEÑA
//Los nombres de usuario y sus contraseñas se almacenan en un .txt
//Sólo podrá entrar si está en esa lista. Si no, se podrá registrar para ingresar

var islogininfocorrect;				//comprobación del par nombre/contraseña
var volverAIntentarloguear = true;	//bloqueo del login hasta que se compruebe el acceso
var textoModificable;
class nameMenu extends Phaser.Scene {
	constructor(){
		super({key:"nameMenu"});
		this.escape;
		this.enter;		
		this.textoPregunta;
		this.textoRepetir;
		this.textoSalir;
		this.textoEstadosala;
		this.ipsjugadoressala;
		this.arrayjugadores;
		this.salir;
		this.fondo;
		this.musica;

		//Nuevas Variables Junio
		this.textoPasswordLogin;
		this.textoComprobacion;
		this.textoPasswordNew;
		this.textoControles;
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
			////////////Login (acceso de usuario ya registrado)///////////
			if((textoModificable == this.textoPasswordLogin || textoModificable == this.textoNombreLogin) && volverAIntentarloguear==true){

				volverAIntentarloguear=false; //bloqueo del login hasta que se compruebe el acceso

				var myinfo =
				{
					apodo: that.textoNombreLogin.text,
					contrasena: that.textoPasswordLogin.text, 
				}
				
				var that = this;

				login(myinfo,function(data){islogininfocorrect=data
					if(islogininfocorrect == false){
						that.textoComprobacion.text = "Incorrect password or/and username";
					}else if(islogininfocorrect == "OK"){
						that.textoComprobacion.text = "Connecting...";
					}else if(islogininfocorrect == "UsuarioYaLogueado"){
						that.textoComprobacion.text = "User already logged in";
					}else if(islogininfocorrect == "ApodoInvalido"){
						that.textoComprobacion.text = "Incorrect/non-existing username";
					}else if(islogininfocorrect == "ContrasenaInvalida"){
						that.textoComprobacion.text = "Incorrect password";
					}});//se devuelve bool para saber si la informacion es correcta
				
				this.enter.isDown=false;

				this.time.addEvent({delay:2000,  //tiempo que tarda hasta poder volver a pulsar
    			callback: function(){volverAIntentarloguear = true;}})
				////////////////////////////////

			}
			else{
			////////////SignUp (nuevo registro)///////////
				if(textoModificable == this.textoPasswordNew || textoModificable == this.textoNombreNew){
					var myinfo =
					{
						apodo: that.textoNombreNew.text,
						contrasena: that.textoPasswordNew.text, 
					}

					this.enter.isDown=false;

					signup(myinfo,function(data){
						if(data==true){
							that.textoComprobacion.text = "Username already in use";//nombre ya en la lista
						}else{
							that.textoComprobacion.text = "Succesfully registered";	//registro completado
						}
					})
				}
			}
		}
	}

	create(){
		volverAIntentarloguear = true;
		islogininfocorrect=""
		
		this.fondo = this.add.image(this.game.canvas.width/2,this.game.canvas.height/2,'menuNombreFondo').setScale(1.3);
		
		this.musica = this.game.sound.add('musicacontrol');
		this.musica.setLoop(true);
		this.musica.setVolume(0.5);
		this.musica.play();

		this.textoEstadosala = this.add.text(390, 515, "", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});

		this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir
		this.enter  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para aceptar

		this.textoSalir   = this.add.text(50, 730, "ESC to exit", { fill: '#F4FFF3', font: '24px Impact', align: 'center'});

		this.textoVersion = this.add.text(350, 210, "What's your name?", { fill: '#FFAC00', font: '48px Impact', align: 'center'});
		this.textoVersion = this.add.text(390, 500, "Press ENTER to search a match", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		this.textoVersion = this.add.text(50, 50,   "Online Mode", { fill: '#F4FFF3', font: '20px Impact', align: 'center'});
		
		this.textoControles = this.add.text(160, 540, "\nselect\naccept", { fill: '#FFFFFF', font: '30px Impact', align: 'center'});
		this.textoControles = this.add.text(60, 540, "\nW,A,S,D\nENTER", { fill: '#FFAC00', font: '32px Impact', align: 'center'});
		var that = this;

		//Nuevo Junio
		this.arriba 			= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.abajo 				= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.izquierda 			= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.derecha 			= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		this.textoComprobacion  = this.add.text(270, 550, "", { fill: '#FD0000', font: '40px Impact', align: 'center'});
		this.textoNombreLogin  	= this.add.text(520, 320, "Insert your name", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		this.textoPasswordLogin = this.add.text(520, 400, "Insert your password", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		
		this.textoNombreNew  	= this.add.text(220, 320, "Insert your name", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		this.textoPasswordNew	= this.add.text(220, 400, "Insert your password", { fill: '#F4FFF3', font: '32px Impact', align: 'center'});
		
		textoModificable = that.textoNombreLogin;//En funcion de que texto se vaya a modificar , si es contraseña o nombre esta variable apunta a eso
		
		//Server Caido (ACTUALIZA CADA 1s)
		this.time.addEvent({delay:1000, loop:true,
		   callback: function(){getServerStatus(function(){
		    that.scene.start('EscenarioError');
			this.musica.stop();})}})
		
		//Escribir texto para poner nombre de usuario.
		this.input.keyboard.on('keydown',function(event){
			if(textoModificable!=null){
				if((textoModificable.text === "Insert your name" || textoModificable.text === "Insert your password" ) &&  event.keyCode >=48 && event.keyCode < 90 || event.keyCode == 32){
					that.textoComprobacion.text = "";
					textoModificable.text = event.key;
				}
				else if(event.keyCode === 8 && textoModificable.text.length>0){
					that.textoComprobacion.text = "";
					textoModificable.text = textoModificable.text.substr(0,textoModificable.text.length-1);
				}
				else if(event.keyCode == 32 || event.keyCode >=48 && event.keyCode < 90 && textoModificable.text.length<15){
					that.textoComprobacion.text = "";
					textoModificable.text += event.key;
				}
			}
		})

		/////////////Nuevo Junio//////////
		this.time.addEvent({delay:1000,loop:true,callback:function(){
			if(islogininfocorrect=="OK"){
				that.textoComprobacion.text = "";
				that.scene.start('Lobby');
				that.musica.stop();
			}
		}})
		this.enter.isDown=false;
		//////////////////////////////////
	}

	seleccionContraseñaONombre(){
	//Máquina de estados para apuntar a distintos campos de texto
	//Puedes elegir entre contraseña y nombre para registrarse (new)
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