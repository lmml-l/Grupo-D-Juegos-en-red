'use strict'

    //DEFINICIÓN DE VARIABLES GLOBALES
    //----------------------------------------------------------------------------------------
    /*
    var victorias=new Array(2); //Almacena el nº de partidas ganadas por cada jugador
    victorias[0]=0; victorias[1]=0;

    var colisionesjugadoresbalas = new Array();
    var colisionesescenariobalas = new Array();

        var sprite = ["Recursos/Imagenes/Sprites_Personaje/SpritePersonajeIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajeDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpritePistolaIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePistolaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteEscopetaIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteEscopetaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteThomsomIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteThomsomDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpritePersonajePuñoAmericanoIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajePuñoAmericanoDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteBateIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteBateDerecha.png"]

        var sprite2 = ["Recursos/Imagenes/Sprites_Personaje2/SpritePersonajeIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePersonajeDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpritePistolaIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePistolaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteEscopetaIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteEscopetaDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteThomsomIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteThomsomDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpritePersonajePuñoAmericanoIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpritePersonajePuñoAmericanoDerecha.png",
        "Recursos/Imagenes/Sprites_Personaje2/SpriteBateIzquierda.png","Recursos/Imagenes/Sprites_Personaje2/SpriteBateDerecha.png"]

        var spritearmas = ["Recursos/Imagenes/Sprites_Armas/Pistola/PistolaPixelizada.png",
        "Recursos/Imagenes/Sprites_Armas/Escopeta/EscopetaPixelizada.png",
        "Recursos/Imagenes/Sprites_Armas/Thompson/ThompsonPixelizado.png",
        "Recursos/Imagenes/Sprites_Armas/Puno_Americano/PuñoAmericanoPixelizado.png",
        "Recursos/Imagenes/Sprites_Armas/Bate_de_Beisbol/BateBeisbolPixelizado.png"]

        var spriteproyectiles = ["Recursos/Imagenes/Sprites_Proyectiles/balaEscopeta.png",
        "Recursos/Imagenes/Sprites_Proyectiles/bala.png",
        "Recursos/Imagenes/Sprites_Proyectiles/GolpeBatePixelizadoAjustado.png",
        "Recursos/Imagenes/Sprites_Proyectiles/GolpePuño.png",
        "Recursos/Imagenes/Sprites_Proyectiles/GolpePuño.png"]
        
        var Hud = ["Recursos/Imagenes/Sprites_Armas/ArmasHUD/PistolaHUD.png",
        "Recursos/Imagenes/Sprites_Armas/ArmasHUD/EscopetaHUD.png",
        "Recursos/Imagenes/Sprites_Armas/ArmasHUD/ThompsonHUD.png",
        "Recursos/Imagenes/Sprites_Armas/ArmasHUD/PuñoAmericanoHUD.png",
        "Recursos/Imagenes/Sprites_Armas/ArmasHUD/BateHUD.png",
        "Recursos/Imagenes/Sprites_Armas/Puños/PuñoPixelizado.png"]

    */
//----------------------------------------------------------------------------------------

//La clase escenario sirve para colocar los elementos de la partida y como controlador de la misma
class EscenarioOnline extends Phaser.Scene {

	constructor(){
		super({key:"EscenarioOnline"});
        
        //Posicionamos los personajes
        this.avatar = new Avatar("a",this,400,400,sprite);
        this.avatar1 = new Avatar("b",this,600,400,sprite2);
        //Asociamos proyectiles
        this.proyectiles = new Proyectiles(spriteproyectiles);
        this.proyectiles2 = new Proyectiles(spriteproyectiles);
        //Creamos controladores (jugadores) para cada personaje
        this.jugador = new Jugador(this.avatar,controles2,this.proyectiles);
        this.jugador1 = new Jugador(this.avatar1,controles1,this.proyectiles2); //elegir controles 1 o controles 2
        //creamos objetos
        this.plataformas;
        this.suelo;
        this.dropzone;

        this.drops = new Drops(this,spritearmas);

        this.hud = new HUD (this, Hud , [this.jugador,this.jugador1]);

        //textos
        this.ganadorTexto;
        this.finTiempoTexto;
        this.finPartidaTexto;
	}

//Reiniciamos el nivel
restartPartida(){
    var that=this;
    this.time.clearPendingEvents();
    this.time.removeAllEvents();
    this.time.addEvent({delay:1500,  //tiempo que tarda hasta reiniciar
    callback: function(){that.scene.restart()}});
}

//Comprobamos las condiciones para ganar
checkPartida(){
    var that=this;
    //Si algún jugador llega a 3 victorias gana la partida
    if(victorias[0]==3){                                    //jugador 1
        console.log('J1 GANA LA PARTIDA');
        this.finPartidaTexto.setText("J1 GANA LA PELEA");   //texto en pantalla
        victorias[0]=0; victorias[1]=0;                     //reseteo de rondasw
        this.time.addEvent({delay:3000,                     //tiempo que tarda hasta reiniciar
        callback: function(){that.restartPartida()}});
    }
    if(victorias[1]==3){                                    //jugador 2
        console.log('J2 GANA LA PARTIDA');
        this.finPartidaTexto.setText("J2 GANA LA PELEA");   //texto en pantalla
        victorias[0]=0; victorias[1]=0;                     //reseteo de rondas
        this.time.addEvent({delay:3000,                     //tiempo que tarda hasta reiniciar
        callback: function(){that.restartPartida()}});  
    }

    //Si los dos jugadores llegan a 0 al mismo tiempo
    if(this.jugador.vida<=0 && this.jugador1.vida<=0){
        console.log('Ganador aleatorio');
        var ganador = Math.floor(Math.random()*2);          //se elige aleatoriamente ganador
        //gana J1
        if(ganador==0){
            victorias[0]+=1;                                //suma una victoria
            console.log('Gana J1');
            this.ganadorTexto.setText("GANA J1");
            this.restartPartida();                          //reinicia el nivel
        }   
        //gana J2
        else if(ganador==1){
            victorias[1]+=1;                                //suma una victoria
            console.log('Gana J2');
            this.ganadorTexto.setText("GANA J2");
            this.restartPartida();                          //reinicia el nivel
        }
    }

    //Si algún jugador se queda sin vida
    else if(this.jugador.vida<=0 && this.jugador1.vida>0){  //jugador 1
        victorias[1]+=1;
        console.log('Gana J2');
        this.ganadorTexto.setText("GANA J2");
        this.restartPartida();
    }
    else if(this.jugador1.vida<=0 && this.jugador.vida>0){  //jugador 2
        victorias[0]+=1;
        console.log('Gana J1');
        this.ganadorTexto.setText("GANA J1");
        this.restartPartida();
    } 
    //Si acaba el tiempo
    if(91-this.Clock.getElapsedSeconds() == 0){             //comprobación de reloj (diferencia de tiempo) 
    this.finTiempoTexto.setText("SE ACABÓ\nEL TIEMPO");
    this.restartPartida();
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
	this.load.image('fondo', 'Recursos/Imagenes/stage.png');
	this.load.image('plat2', 'Recursos/Imagenes/plat2.png');
    this.load.image('platShort', 'Recursos/Imagenes/platShort.png');
    this.load.image('sueloPixel', 'Recursos/Imagenes/sueloPixel.png');
    this.load.image('techoApixel', 'Recursos/Imagenes/techoApixel.png');
    this.load.image('techoBpixel', 'Recursos/Imagenes/techoBpixel.png');
    this.load.image('techoCpixel', 'Recursos/Imagenes/techoCpixel.png');
    this.load.image('techoDpixel', 'Recursos/Imagenes/techoDpixel.png');
    this.load.image('cartelPixel', 'Recursos/Imagenes/cartelPixel.png');
    this.load.image('toldoLPixel', 'Recursos/Imagenes/toldoLPixel.png');
    this.load.image('toldoRPixel', 'Recursos/Imagenes/toldoRPixel.png');
    this.load.image('tuboPixel', 'Recursos/Imagenes/tuboPixel.png');
    this.load.image('dropzonePixel', 'Recursos/Imagenes/dropzone.png');
    this.load.image('HUD', 'Recursos/Imagenes/HUD.png');
}

create(){

	this.add.sprite(512, 215, 'fondo');
	this.add.sprite(512, 681, 'HUD');

	this.plataformas = this.physics.add.staticGroup();   //Hace sólidas las plataformas enfocadas al primer personaje
    this.suelo = this.physics.add.staticGroup();
    
    this.plataformas2 = this.physics.add.staticGroup();  //Hace sólidas las plataformas enfocadas al segundo personaje
    this.suelo2 = this.physics.add.staticGroup();
    
    this.plataformas3 = this.physics.add.staticGroup();  //Hace sólidas las plataformas enfocadas a las balas
    this.suelo3 = this.physics.add.staticGroup();

    this.dropzone = this.physics.add.staticGroup();     //Gace sólido la zona de drop (aparición de arma)

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
    this.jugador.create("right");
    this.jugador1.create("left");
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
    this.ganadorTexto =     this.add.text(480, 250, "", { fill: '#FFAC00', font: '52px Impact', align: 'center'});
    this.finPartidaTexto =  this.add.text(400, 250, "", { fill: '#E85C0D', font: '52px Impact', align: 'center'});
    this.finTiempoTexto =   this.add.text(480, 250, "", { fill: '#FFAC00', font: '52px Impact', align: 'center'});

    //time event spawndrop
    var that = this;

        var dropevent = this.time.addEvent({delay:2000 ,loop:true ,
        callback: function(){that.drops.spawnarma()
            //JSON
            var message = {protocolo: "Jugador" , jugador: that.jugador}
            connection.send(JSON.stringify(message));

            {
            that.jugador1.arma = Jugador.arma;
            that.jugador1.proyectiles.proyectilesenescane = Jugador.proyectiles.proyectilesenescane;
            that.jugador1.municiones = Jugador.municiones;
            that.jugador1.vida = Jugador.vida;
            that.jugador1.keysalto = Jugador.W;
            console.log(that.jugador1.keysalto);
            //that.jugador1.avatar.sprite.frame = Jugador.avatar.sprite.frame;
            }

        } });

        var restartescenaevent = this.time.addEvent({delay:300 ,loop:true ,
        callback: function(){that.checkPartida()} });

        Jugador = that.jugador1;
	}


update(){ //actualizaciones
    this.jugador.update(this.drops);
    this.jugador1.update(this.drops);
    this.atravesarplataformaspersonaje(this.jugador.avatar.sprite,this.plataformas);
    this.atravesarplataformaspersonaje(this.jugador1.avatar.sprite,this.plataformas2);
    
    this.colisionesbalasjugador(this.jugador,this.jugador1.proyectiles.proyectilesenescane);
    this.colisionesbalasjugador(this.jugador1,this.jugador.proyectiles.proyectilesenescane);

    this.colisionesbalaescenario(this.plataformas3,this.jugador.proyectiles.proyectilesenescane);
    this.colisionesbalaescenario(this.plataformas3,this.jugador1.proyectiles.proyectilesenescane);
    this.colisionesbalaescenario(this.suelo3,this.jugador.proyectiles.proyectilesenescane);
    this.colisionesbalaescenario(this.suelo3,this.jugador1.proyectiles.proyectilesenescane);

    this.hud.update();
    }
}
