'use strict'

//La clase escenario sirve para colocar los elementos de la partida y como controlador de la misma
class EscenarioOnline extends Phaser.Scene {

	constructor(){
		super({key:"EscenarioOnline"});

        this.salir;

        //Posicionamos los personajes. Posición definida en CharacterSelection
        this.avatar         = new Avatar("a",this,posInicial[0],posInicial[1],sprite);   //Jugador host
        this.avatar1        = new Avatar("b",this,posInicial[2],posInicial[3],sprite2);  //Jugador cliente

        //Asociamos proyectiles
        this.proyectiles    = new Proyectiles(spriteproyectiles);
        this.proyectiles2   = new Proyectiles(spriteproyectiles);
        //Creamos controladores (jugadores) para cada personaje
        this.jugador        = new Jugador(this.avatar,controles2,this.proyectiles);
        this.jugador1       = new Jugador(this.avatar1,controles1,this.proyectiles2); //elegir controles 1 o controles 2
        //creamos objetos
        this.plataformas;
        this.suelo;
        this.dropzone;

        this.drops  = new Drops(this,spritearmas);

        this.hud    = new HUD (this, Hud , [this.jugador,this.jugador1]);

        //Musica y sonidos
        this.musica;
        this.victoria;
        this.disparosmg;
        this.disparopistola;
        this.disparoescopeta;
        this.golpepuno;
        this.golpebate;
        this.recogersmg
        this.recogerpistola
        this.recogerescopeta
        this.recogerpuno
        this.recogerbate

        //textos
        this.ganadorTexto;
        this.finTiempoTexto;
        this.finPartidaTexto;
        //this.pausaTexto;

        //pausa
        //this.pausar;
        //this.pausar.isDown=false; //inicialización a falso para evitar ciclos
	}

//Reiniciamos el nivel
restartPartida(){
    var that=this;
    this.time.clearPendingEvents();
    this.time.removeAllEvents();
    this.time.addEvent({delay:1500,
    callback: function(){
        that.scene.restart();
        //that.musica.stop();
    }});
}

//Comprobamos las condiciones para ganar
checkPartida(){
    var that=this;
    //Si algún jugador llega a 3 victorias gana la partida
    if(victorias[0]==3){                                        //jugador 1
        console.log('P1 WINS!');
        this.finPartidaTexto.setText("YOU RULE THE HOOD");      //texto en pantalla
        victorias[0]=0; victorias[1]=0;                         //reseteo de rondas

        this.time.addEvent({delay:1000,                        
        callback: function(){
        //that.musica.stop();

        that.time.addEvent({delay:500,  
        callback: function(){
            //that.time.clearPendingEvents();
            //that.time.removeAllEvents();
            that.victoria.play();}});

        that.time.addEvent({delay:3000, 
        callback: function(){
            IsHost = null;
            ipsLobby = new Array();
            that.scene.start('MainMenu'); that.musica.stop();}});
        }});
    }
    if(victorias[1]==3){                                        //jugador 2
        console.log('P2 WINS!');
        this.finPartidaTexto.setText("YOU ARE A LOSER");      //texto en pantalla
        victorias[0]=0; victorias[1]=0;                         //reseteo de rondas

        this.time.addEvent({delay:1000,                      
            callback: function(){
            //that.musica.stop();

        that.time.addEvent({delay:500,  
            callback: function(){
                  //that.time.clearPendingEvents();
                  //that.time.removeAllEvents();
                  that.victoria.play();
            }});

        that.time.addEvent({delay:3000,  
            callback: function(){
                IsHost = null;
                ipsLobby = new Array();
                that.scene.start('MainMenu'); //that.musica.stop();
            }});
        }});  
        var mensaje = {protocolo: "VACIAR SESIONES"}
        connectionDrops.send(JSON.stringify(mensaje));
        connectionTiempo.send(JSON.stringify(mensaje));
        connectionJugador.send(JSON.stringify(mensaje));
        connectionPuntuacion.send(JSON.stringify(mensaje));
    }

    //Si los dos jugadores llegan a 0 al mismo tiempo
    if(this.jugador.vida<=0 && this.jugador1.vida<=0){
        console.log('RandoWinner');
        var ganador = Math.floor(Math.random()*2);              //se elige aleatoriamente ganador
        //gana J1
        if(ganador==0){
            victorias[0]+=1;                                    //suma una victoria
            console.log('P1 WINS');
            this.finTiempoTexto.setText("KO");
            this.ganadorTexto.setText("\nYOU WIN");
            this.restartPartida();    
            //this.musica.stop();                                 //reinicia el nivel
        }   
        //gana J2
        else if(ganador==1){
            victorias[1]+=1;                                    //suma una victoria
            console.log('P2 WINS');
            this.finTiempoTexto.setText("KO");
            this.ganadorTexto.setText("\nYOU LOSE");
            this.restartPartida(); 
            //this.musica.stop();                                 //reinicia el nivel
        }
    }

//Si algún jugador se queda sin vida
    else if(this.jugador.vida<=0 && this.jugador1.vida>0){      //jugador 1
        victorias[1]+=1;
        console.log('Gana J2');
        this.finTiempoTexto.setText("KO");
        this.ganadorTexto.setText("\nYOU LOSE");
        this.restartPartida();
        //this.musica.stop();
    }
    else if(this.jugador1.vida<=0 && this.jugador.vida>0){      //jugador 2
        victorias[0]+=1;
        console.log('Gana J1');
        this.finTiempoTexto.setText("KO");
        this.ganadorTexto.setText("\nYOU WIN");
        this.restartPartida();
        //this.musica.stop();
    } 
    //Si acaba el tiempo
    if(91-this.Clock.getElapsedSeconds() == 0){                 //comprobación de reloj (diferencia de tiempo) 
    this.finTiempoTexto.setText("TIME OVER");
    if(this.jugador1.vida!=0 && this.jugador.vida!=0){
        //Gana J1 si tiene mayor vida
        if(this.jugador.vida > this.jugador1.vida){
            victorias[0]+=1;
            console.log('Gana J1');
            this.ganadorTexto.setText("\nYOU WIN");
            this.restartPartida();
            //this.musica.stop();
        }
        //Gana J2 si tiene mayor vida
        if(this.jugador.vida < this.jugador1.vida){
            victorias[1]+=1;
            console.log('Gana J2');
            this.ganadorTexto.setText("\nYOU LOSE");
            this.restartPartida();
            //this.musica.stop();
        }
        //Empate
        if(this.jugador.vida === this.jugador1.vida){
            console.log('Empate');
            this.ganadorTexto.setText("\nTIE");
            this.restartPartida();
            //this.musica.stop();
        }
    }
}
}


colisionesbalasjugador(jugador,balast){
    var that=this;
    var s = 0; //índice para recorrer el array
    //limpia el array de balas no definidas
    while(s < balast.length){
        if(balast[s]==undefined){
            balast.splice(s,1);
        }else{
            s++;
        }
    };

    var t = 0; //índice para recorrer el array
    //limpia el array de colisiones cuyo primer objeto es una bala no definida
    while(t < colisionesjugadoresbalas.length){
        if(colisionesjugadoresbalas[t].object1==undefined){
            colisionesjugadoresbalas.splice(t,1);
        }else{
            t++;
        }
    };

    //recorre el array de balas
    for(var j=0; j < balast.length ; j++){

        var i = 0;
        var colisionexistente = false;
        //comprueba que la bala no tiene colisiones definidas con los personajes
        while((i < colisionesjugadoresbalas.length) && (!colisionexistente)){
            if(colisionesjugadoresbalas[i].object1 === balast[j]){
                    colisionexistente=true;
            }
            i++;
        }
        //si no está en el array de colisiones, se añade
        if(!colisionexistente){
            //esta función se llama cuando se produce una colisión entre la bala y el personaje
            var funcioncallback = function(obj1,obje2){
                //limpia el array de balas
                for(var jd = 0 ; jd < balast.length ; jd++){
                    if(balast[jd] === obj1){
                        balast.splice(jd,1);
                    }
                }
                //limpia el array de colisiones
                for(var jd = 0 ; jd < colisionesjugadoresbalas.length ; jd++ ){
                    if(colisionesjugadoresbalas[jd].object1 === obj1){
                        colisionesjugadoresbalas.splice(jd,1);
                    }
                }
                //se borra la bala y se quita vida al personaje
                obj1.destroy();
                jugador.vida=jugador.vida-5; console.log(jugador.vida);
                if(jugador.vida<0){
                    jugador.vida=0;
                }
            };
            
            //añade la colisión
            var colisionActual = this.physics.add.overlap(balast[j],jugador.avatar.sprite,funcioncallback);
            //almacena la colisión en el array
            colisionesjugadoresbalas.push(colisionActual);
        }
    }
}

//misma estructura que la anterior
//entre balas y plataformas del escenario
colisionesbalaescenario(plataformas,balast){
    for(var j = 0 ; j < balast.length ; j++){
        var i = 0;
        var colisionexistente = false;

        while((i < colisionesescenariobalas.length) && (!colisionexistente)){
            if(colisionesescenariobalas[i].object1 === balast[j]){
                    colisionexistente=true;
            }
            i++;
        }
        if(!colisionexistente){
            var funcioncallback = function(obj1,obj2){
                for(var jd = 0 ; jd < balast.length ; jd++){
                    if(balast[jd] === obj1){
                        balast.splice(jd,1);
                    }
                }

                for(var jd = 0 ; jd < colisionesescenariobalas.length ; jd++ ){
                    if(colisionesescenariobalas[jd].object1 === obj1){
                        colisionesescenariobalas.splice(jd,1);
                    }
                }
                obj1.destroy();
            };

            var colisionActual = this.physics.add.overlap(balast[j],plataformas,funcioncallback);
            colisionesescenariobalas.push(colisionActual);
        }   
    }
}

noZero(jugador){
    //Aseguramos que la vida no baja de cero (prevención de errores)
    if(jugador.vida<0){
        jugador.vida=0;
    };
}

//permite al personaje atravesar una plataforma exclusivamente saltando de abajo a arriba
atravesarplataformaspersonaje(jugador,plataforma){
        var array = plataforma.getChildren();
        for(var i = 0; i<plataforma.getLength(); i++){  //colisión desde abajo
            if(jugador.y < array[i].y){
                array[i].enableBody();                  //activamos el body (no atravesable)
            }
            else{
                array[i].disableBody();                 //desactivamos el body (atravesable)
            }
        }
    }

/*
    pausar(){
    if(this.pausa.isDown){
        if(pausado === false){
            this.pausa.isDown       = false; //se inicia a false para que no vuelva a abrirse
            this.game.paused        = true;
            pausado                 = true;
            //this.scene.sleep(this.scene); //pausa la escena
            this.scene.switch('Pausa');
            this.musica.pause();

            //Puesta a false de controles de J1
            this.jugador.keysalto.isDown    = false;
            this.jugador.keymovder.isDown   = false;
            this.jugador.keymovizq.isDown   = false;
            this.jugador.keymovabajo.isDown = false;
            this.jugador.keydisparo.isDown  = false;
            this.jugador.keyrecargar.isDown = false;
            this.jugador.keyrecarma.isDown  = false;
            this.jugador.keyescudo.isDown   = false;

            //Puesta a false de controles de J2
            this.jugador1.keysalto.isDown    = false;
            this.jugador1.keymovder.isDown   = false;
            this.jugador1.keymovizq.isDown   = false;
            this.jugador1.keymovabajo.isDown = false;
            this.jugador1.keydisparo.isDown  = false;
            this.jugador1.keyrecargar.isDown = false;
            this.jugador1.keyrecarma.isDown  = false;
            this.jugador1.keyescudo.isDown   = false;
        }
    }
}
*/

preload(){
    //carga de hojas de sprites
    this.jugador.avatar.hojadespritesheet = sprite;
    this.jugador1.avatar.hojadespritesheet = sprite2;
    //carga de recursos de los personajes, HUD y drops
    this.jugador.preload();
    this.jugador1.preload();
    this.drops.preload();
    this.hud.preload();


    //SPRITES
	this.load.image('fondo',       'Recursos/Imagenes/stage.png');
	this.load.image('plat2',       'Recursos/Imagenes/plat2.png');
    this.load.image('platShort',    'Recursos/Imagenes/platShort.png');
    this.load.image('sueloPixel',   'Recursos/Imagenes/sueloPixel.png');
    this.load.image('techoApixel',  'Recursos/Imagenes/techoApixel.png');
    this.load.image('techoBpixel',  'Recursos/Imagenes/techoBpixel.png');
    this.load.image('techoCpixel',  'Recursos/Imagenes/techoCpixel.png');
    this.load.image('techoDpixel',  'Recursos/Imagenes/techoDpixel.png');
    this.load.image('cartelPixel',  'Recursos/Imagenes/cartelPixel.png');
    this.load.image('toldoLPixel',  'Recursos/Imagenes/toldoLPixel.png');
    this.load.image('toldoRPixel',  'Recursos/Imagenes/toldoRPixel.png');
    this.load.image('tuboPixel',    'Recursos/Imagenes/tuboPixel.png');
    this.load.image('dropzonePixel','Recursos/Imagenes/dropzone.png');
    this.load.image('HUD',          'Recursos/Imagenes/HUD.png');

    //AUDIO
    this.load.audio('musicabatalla',    'Recursos/Audio/Battle Theme.mp3');
    this.load.audio('musicavictory',    'Recursos/Audio/Victory.mp3');
    this.load.audio('disparosmg',       'Recursos/Audio/SMGShot.mp3');
    this.load.audio('disparopistola',   'Recursos/Audio/HandgunShot.mp3');
    this.load.audio('golpepuno',        'Recursos/Audio/PunchHit.mp3');
    this.load.audio('golpebate',        'Recursos/Audio/BaseballBatHit.mp3');
    this.load.audio('disparoescopeta',  'Recursos/Audio/ShotgunShot.mp3');
    this.load.audio('recogerpistola',   'Recursos/Audio/HandgunPickup.mp3');
    this.load.audio('recogersmg',       'Recursos/Audio/SMGPickup.mp3');
    this.load.audio('recogerescopeta',  'Recursos/Audio/ShotgunPickup.mp3');
    this.load.audio('recogerbate',      'Recursos/Audio/BaseballBatPickup.mp3');
    this.load.audio('recogerpuno',      'Recursos/Audio/PunchPickup.mp3');
}

create(){
    this.salir        = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.salir.isDown = false;

	this.add.sprite(512, 215, 'fondo');
	this.add.sprite(512, 681, 'HUD');

    pausado = false;

    //Música
    this.musica = this.game.sound.add('musicabatalla');
    this.musica.setVolume(0.15);
    this.musica.play();

    //Sonidos
    this.victoria           = this.game.sound.add('musicavictory');
    this.musica.setLoop(false);
    this.musica.setVolume(0.5);
    this.disparosmg         = this.game.sound.add('disparosmg');
    this.disparosmg.setVolume(1);
    this.disparopistola     = this.game.sound.add('disparopistola');
    this.disparopistola.setVolume(1);
    this.disparoescopeta    = this.game.sound.add('disparoescopeta');
    this.disparoescopeta.setVolume(1);
    this.golpepuno          = this.game.sound.add('golpepuno');
    this.golpepuno.setVolume(1);
    this.golpebate          = this.game.sound.add('golpebate');
    this.golpebate.setVolume(1);
    this.recogersmg         = this.game.sound.add('recogersmg');
    this.recogersmg.setVolume(1);
    this.recogerpistola     = this.game.sound.add('recogerpistola');
    this.recogerpistola.setVolume(1);
    this.recogerescopeta    = this.game.sound.add('recogerescopeta');
    this.recogerescopeta.setVolume(1);
    this.recogerpuno        = this.game.sound.add('recogerpuno');
    this.recogerpuno.setVolume(1);
    this.recogerbate        = this.game.sound.add('recogerbate');
    this.recogerbate.setVolume(1);

    //PLATAFORMAS
	this.plataformas    = this.physics.add.staticGroup();   //Hace sólidas las plataformas enfocadas al primer personaje
    this.suelo          = this.physics.add.staticGroup();
    
    this.plataformas2   = this.physics.add.staticGroup();   //Hace sólidas las plataformas enfocadas al segundo personaje
    this.suelo2         = this.physics.add.staticGroup();
    
    this.plataformas3   = this.physics.add.staticGroup();   //Hace sólidas las plataformas enfocadas a las balas
    this.suelo3         = this.physics.add.staticGroup();

    this.dropzone       = this.physics.add.staticGroup();   //Gace sólido la zona de drop (aparición de arma)

	//Suelo
    this.suelo.create(512, 585, 'sueloPixel').alpha=0;
    var sueloArray = this.suelo.getChildren();
    sueloArray[0].body.height=13475;

    //las plataformas son sprites invisibles encima del fondo

    //COLISIONES PARA EL PERSONAJE 2
    //escaleras de emergencia
    //izquierda 
    this.plataformas.create(319, 153, 'plat2').alpha=0;
    this.plataformas.create(319, 241, 'plat2').alpha=0;
    this.plataformas.create(319, 328, 'plat2').alpha=0;
    this.plataformas.create(319, 416, 'plat2').alpha=0;
    //derecha
    this.plataformas.create(866, 141, 'plat2').alpha=0;
    this.plataformas.create(866, 229, 'plat2').alpha=0;
    this.plataformas.create(866, 317, 'plat2').alpha=0;
    this.plataformas.create(866, 404, 'plat2').alpha=0;
    //sueltas
    this.plataformas.create(455, 276, 'platShort').alpha=0;
    this.plataformas.create(520, 362, 'platShort').alpha=0;
    this.plataformas.create(520, 468, 'platShort').alpha=0;
    this.plataformas.create(686, 276, 'platShort').alpha=0;
    this.plataformas.create(686, 364, 'platShort').alpha=0;
    //techos
    this.plataformas.create(158, 305, 'techoApixel').alpha=0;
    this.plataformas.create(376, 60, 'techoBpixel').alpha=0;
    this.plataformas.create(624, 192, 'techoCpixel').alpha=0;
    this.plataformas.create(841, 130, 'techoDpixel').alpha=0;
    //toldos
    this.plataformas.create(159, 480, 'toldoLPixel').alpha=0; //izquierdo
    this.plataformas.create(878, 480, 'toldoRPixel').alpha=0; //derecho
    //tubería
    this.plataformas.create(605, 116, 'tuboPixel').alpha=0;
    
    //cartel
    this.plataformas.create(60, 385, 'cartelPixel').alpha=0; //izquierdo
    this.plataformas.create(726, 443, 'cartelPixel').alpha=0; //derecho

    //COLISIONES PARA EL PERSONAJE 2
    this.suelo2.create(512, 585, 'sueloPixel').alpha=0;
    var suelo2Array = this.suelo2.getChildren();
    suelo2Array[0].body.height=1475;

    //plataformas
    //izquierda
    this.plataformas2.create(319, 153, 'plat2').alpha=0;
    this.plataformas2.create(319, 241, 'plat2').alpha=0;
    this.plataformas2.create(319, 328, 'plat2').alpha=0;
    this.plataformas2.create(319, 416, 'plat2').alpha=0;
    //derecha
    this.plataformas2.create(866, 141, 'plat2').alpha=0;
    this.plataformas2.create(866, 229, 'plat2').alpha=0;
    this.plataformas2.create(866, 317, 'plat2').alpha=0;
    this.plataformas2.create(866, 404, 'plat2').alpha=0;
    //sueltas
    this.plataformas2.create(455, 276, 'platShort').alpha=0;
    this.plataformas2.create(520, 362, 'platShort').alpha=0;
    this.plataformas2.create(520, 468, 'platShort').alpha=0;
    this.plataformas2.create(686, 276, 'platShort').alpha=0;
    this.plataformas2.create(686, 364, 'platShort').alpha=0;
    //techos
    this.plataformas2.create(158, 305, 'techoApixel').alpha=0;
    this.plataformas2.create(376, 60, 'techoBpixel').alpha=0;
    this.plataformas2.create(624, 192, 'techoCpixel').alpha=0;
    this.plataformas2.create(841, 130, 'techoDpixel').alpha=0;
    //toldos
    this.plataformas2.create(159, 480, 'toldoLPixel').alpha=0; //izquierdo
    this.plataformas2.create(878, 480, 'toldoRPixel').alpha=0; //derecho
    //tubería
    this.plataformas2.create(605, 116, 'tuboPixel').alpha=0;
    //cartel
    this.plataformas2.create(60, 385, 'cartelPixel').alpha=0; //izquierdo
    this.plataformas2.create(726, 443, 'cartelPixel').alpha=0; //derecho

    //this.suelo2.create(512, 585, 'sueloPixel').alpha=0;

    //COLISIONES PARA LAS BALAS
    //plataformas
    //izquierda
    this.plataformas3.create(319, 153, 'plat2').alpha=0;
    this.plataformas3.create(319, 241, 'plat2').alpha=0;
    this.plataformas3.create(319, 328, 'plat2').alpha=0;
    this.plataformas3.create(319, 416, 'plat2').alpha=0;
    //derecha
    this.plataformas3.create(866, 141, 'plat2').alpha=0;
    this.plataformas3.create(866, 229, 'plat2').alpha=0;
    this.plataformas3.create(866, 317, 'plat2').alpha=0;
    this.plataformas3.create(866, 404, 'plat2').alpha=0;
    //sueltas
    this.plataformas3.create(455, 276, 'platShort').alpha=0;
    this.plataformas3.create(520, 362, 'platShort').alpha=0;
    this.plataformas3.create(520, 468, 'platShort').alpha=0;
    this.plataformas3.create(686, 276, 'platShort').alpha=0;
    this.plataformas3.create(686, 364, 'platShort').alpha=0;
    //techos
    this.plataformas3.create(158, 305, 'techoApixel').alpha=0;
    this.plataformas3.create(376, 60, 'techoBpixel').alpha=0;
    this.plataformas3.create(624, 192, 'techoCpixel').alpha=0;
    this.plataformas3.create(841, 130, 'techoDpixel').alpha=0;
    //toldos
    this.plataformas3.create(159, 480, 'toldoLPixel').alpha=0; //izquierdo
    this.plataformas3.create(878, 480, 'toldoRPixel').alpha=0; //derecho
    //tubería
    this.plataformas3.create(605, 116, 'tuboPixel').alpha=0;
    //cartel
    this.plataformas3.create(60, 385, 'cartelPixel').alpha=0;   //izquierdo
    this.plataformas3.create(726, 443, 'cartelPixel').alpha=0;  //derecho

    this.suelo3.create(512, 585, 'sueloPixel').alpha=0;

    //zonas de dropeo (aparición de armas)
    this.dropzone.create(130, 302,'dropzonePixel');
    this.dropzone.create(500, 56,'dropzonePixel');
    this.dropzone.create(455, 265,'dropzonePixel'); 
    this.dropzone.create(857, 128,'dropzonePixel');
    this.dropzone.create(686, 353,'dropzonePixel');

    //límites del mundo (worldbounds)
    this.physics.world.setBounds(0,0,1024,585,true,true,false,true); //desactivada la colisión en el margen superior
    

    //jugadores
    if(IsHost!=null){//Distinto lugar a donde mirar si son el host o el cliente
    this.jugador.create("right");
    this.jugador1.create("left");
    }else {
    this.jugador.create("left");
    this.jugador1.create("right");
    }
    //colisiones jugador 1
    this.physics.add.collider(this.jugador.avatar.sprite, this.suelo);          //con suelo
    this.physics.add.collider(this.jugador.avatar.sprite,this.plataformas);     //con plataformas
    this.jugador.avatar.sprite.body.collideWorldBounds = true;                  //con bordes
    //colisiones jugador 2
    this.physics.add.collider(this.jugador1.avatar.sprite, this.suelo2);        //con suelo
    this.physics.add.collider(this.jugador1.avatar.sprite,this.plataformas2);   //con plataformas
    this.jugador1.avatar.sprite.body.collideWorldBounds = true;                 //con bordes


    //colisiones entre jugadores
    this.physics.add.collider(this.jugador.avatar.sprite, this.jugador1.avatar.sprite);
    this.drops.create();
    this.Clock = this.time.addEvent({delay:91000, //91 segundos
    callback: function(){} });

    //carga el HUD con la información del cronómetro
    this.hud.create(this.Clock); 

    //colocación de textos
    this.ganadorTexto    =  this.add.text(480, 250, "", { fill: '#FFAC00', font: '52px Impact', align: 'center'});
    this.finPartidaTexto =  this.add.text(400, 250, "", { fill: '#E85C0D', font: '52px Impact', align: 'center'});
    this.finTiempoTexto  =  this.add.text(480, 250, "", { fill: '#FFAC00', font: '52px Impact', align: 'center'});
    //this.pausaTexto         =   this.add.text(480, 250, "", { fill: '#E8330C', font: '52px Impact', align: 'center'});

    //time event spawndrop
    var that = this;

    var restartescenaevent = this.time.addEvent({delay:300 ,loop:true ,
        callback: function(){that.checkPartida()} });

///ACTUALIZACIONES DE OBJETOS RELACIONADOS CON WEBSOCKET
    
    var that=this;
	//comprobación del estado del servidor
		this.time.addEvent({delay:1000, loop:true,
	    callback: function(){getServerStatus(function(){
	    	that.time.clearPendingEvents();
	        that.time.removeAllEvents();
	    	that.scene.start('EscenarioError'); //that.musica.stop();
        })}})
    
    var message;            //Jugador
    var messageDrops;       //Drops
    var messageTiempo;      //Tiempo (cuenta atrás)
    var messagePuntuacion   //Puntuación para ganar

        message           = {protocolo: "Jugador" ,     jugador: that.jugador}
        messageDrops      = {protocolo: "Drops" ,       drops: that.drops}
        messageTiempo     = {protocolo: "Tiempo" ,      tiempo: that.Clock}
        messagePuntuacion = {protocolo: "Puntuacion" ,  puntuacion: victorias}

         var dropevent = this.time.addEvent({delay:2000 ,loop:true ,
        callback: function(){
            if(DropsWS==null){
            that.drops.spawnarma()
            }
            }});

        var actualizarMensajeDropYDrops = this.time.addEvent({delay:100 ,loop:true ,
        callback: function(){
            messageDrops = {protocolo: "Drops" , drops: that.drops}

                if(DropsWS!=null){
                     //Destruimos los sprite
                     for(var i = 0 ; i< that.drops.sprite.length ; i++){
                        that.drops.sprite[i].destroy();
                     }
                     //vaciamos el array
                     that.drops.sprite = new Array();

                     //Creamos los nuevos sprite y añadimos al array
                     for(var i = 0 ; i< DropsWS.sprite.length ; i++){
                        var armatemporal = that.physics.add.sprite(DropsWS.sprite[i].x,DropsWS.sprite[i].y,DropsWS.sprite[i].textureKey).setScale(1)
                        that.drops.sprite.push(armatemporal);
                     }
                }
            }});

        var actualizarMensajeParaJugador =this.time.addEvent({delay:10 ,loop:true ,
        callback: function(){
            message = {protocolo: "Jugador" , jugador: that.jugador}
                that.jugador1.arma       = Jugador.arma;
                that.jugador1.proyectiles.proyectilesenescane = Jugador.proyectiles.proyectilesenescane;
                that.jugador1.municiones = Jugador.municiones;
                that.jugador1.vida       = Jugador.vida;
                that.jugador1.keysalto   = Jugador.W;
                that.jugador1.keymovizq  = Jugador.A;
                that.jugador1.keymovder  = Jugador.D;
                that.jugador1.keyrecarma = Jugador.R;
                that.jugador1.keydisparo = Jugador.T;
        }});

        //Iguala el tiempo de ambos jugadores cada 2 segundos
        var actualizarTiempo = this.time.addEvent({delay:2000 ,loop:true ,
        callback: function(){
            message = {protocolo: "Tiempo" , tiempo: that.Clock}
            if(Tiempo != null){
                that.Clock.elapsed = Tiempo.elapsed;
            }

        }});

        var MandarWebsocket = this.time.addEvent({delay:10 ,loop:true ,
        callback: function(){
        if(connectionJugador.readyState==1){
        	connectionJugador.send(JSON.stringify(message));
        }
          
        }});

        var MandarWebsocketDrops = this.time.addEvent({delay:100 ,loop:true ,
        callback: function(){
        if(connectionDrops.readyState==1){
        	connectionDrops.send(JSON.stringify(messageDrops));
        }
          
        }});

        var MandarWebsocketTiempo = this.time.addEvent({delay:2000 ,loop:true ,
        callback: function(){
        if(connectionTiempo.readyState==1){
        	connectionTiempo.send(JSON.stringify(messageTiempo));
        }
          
        }});

        var MandarWebsocketPuntuacion = this.time.addEvent({delay:100 ,loop:true ,
        callback: function(){
        
        if(connectionPuntuacion.readyState==1){
        	connectionPuntuacion.send(JSON.stringify(messagePuntuacion));
        }
          
        }});
        //Nuevas Posiciones Iniciales en funcion de si eres Host o Cliente
        if(posInicial!=undefined){
        that.jugador.avatar.sprite.x = posInicial[0]
        that.jugador.avatar.sprite.y = posInicial[1]
        that.jugador1.avatar.sprite.x = posInicial[2]
        that.jugador1.avatar.sprite.y = posInicial[3]
        }
        
        Jugador = that.jugador1;

        var ActualizarPosJugadorLoop = this.time.addEvent({delay:2000 ,loop:true ,
        callback: function(){
        message = {protocolo: "Jugador" , jugador: that.jugador}
        that.jugador1.avatar.sprite.x = Jugador.avatar.sprite.x;
        that.jugador1.avatar.sprite.y = Jugador.avatar.sprite.y;

        }});
        
        /*var that = this;
		if(getComp()){
			this.time.addEvent({delay:100, loop:true,
		    callback: function(){that.scene.start('EscenarioError');}})
		}*/
//////////////////////////////////////////////////////////////
	}


update(){ //actualizaciones
    this.jugador.update(this.drops);
    this.jugador1.update(this.drops);

    this.sonidos(this.jugador);
    this.sonidos(this.jugador1);

    this.atravesarplataformaspersonaje(this.jugador.avatar.sprite,this.plataformas);
    this.atravesarplataformaspersonaje(this.jugador1.avatar.sprite,this.plataformas2);
    
    this.colisionesbalasjugador(this.jugador,this.jugador1.proyectiles.proyectilesenescane);
    this.colisionesbalasjugador(this.jugador1,this.jugador.proyectiles.proyectilesenescane);

    this.colisionesbalaescenario(this.plataformas3,this.jugador.proyectiles.proyectilesenescane);
    this.colisionesbalaescenario(this.plataformas3,this.jugador1.proyectiles.proyectilesenescane);
    this.colisionesbalaescenario(this.suelo3,this.jugador.proyectiles.proyectilesenescane);
    this.colisionesbalaescenario(this.suelo3,this.jugador1.proyectiles.proyectilesenescane);

    this.noZero(this.jugador);
    this.noZero(this.jugador1);

    //this.pausar();
    //if(pausado === false && (!this.pausa.isDown)){
    //    this.musica.resume();
    //}

    this.hud.update();

    if(this.salir.isDown){
        var messagee = {protocolo: "RESTART SALA"}
        connectionDrops.send(JSON.stringify(messagee))
        ipsLobby = new Array();
        deletePlayerofRoom(game.scene.getScene("nameMenu").textoNombreLogin.text)
        this.scene.start('MainMenu');
        //this.musica.stop();
    }
}

sonidos(jugador){
    if(jugador.shotCheck >= 1){
        switch(jugador.shotCheck){
            case 2:
                this.disparoescopeta.play();
                break;
            case 3:
                this.disparopistola.play();
                break;
            case 4:
                this.disparosmg.play();
                break;
            case 5:
                this.golpebate.play();
                break;
            case 6:
                this.golpepuno.play();
                break;
        }
        jugador.shotCheck = 1;
    }

    if(jugador.dropCheck >= 1){
        switch(jugador.dropCheck){
            case 2:
                this.recogerbate.play();
                break;
            case 3:
                this.recogerpuno.play();
                break;
            case 4:
                this.recogerescopeta.play();
                break;
            case 5:
                this.recogerpistola.play();
                break;
            case 6:
                this.recogersmg.play();
                break;
        }
        jugador.dropCheck = 1;
    }
}
}
