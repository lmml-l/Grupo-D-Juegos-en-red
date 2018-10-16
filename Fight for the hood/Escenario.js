class MainEscenario extends Phaser.Scene {
    
	constructor(){
		super({key:"MainEscenario"});
        var sprite = ["Recursos/Imagenes/Sprites_Personaje/SpritePersonajeIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpritePersonajeDerecha.png",
        "Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png",
        "Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png",
        "Recursos/Imagenes/Sprites_Personaje/SpriteThomsomIzquierda.png","Recursos/Imagenes/Sprites_Personaje/SpriteThomsomDerecha.png",
        "Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png",
        "Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png"]

        var spritearmas = ["Recursos/Imagenes/Sprites_Armas/Pistola/PistolaPixelizada.png",
        "Recursos/Imagenes/Sprites_Armas/Escopeta/EscopetaPixelizada.png",
        "Recursos/Imagenes/Sprites_Armas/Thompson/ThompsonPixelizado.png",
        "Recursos/Imagenes/Sprites_Armas/Puno_Americano/PunoAmericanoPixelizado.png",
        "Recursos/Imagenes/Sprites_Armas/Bate_de_Beisbol/BateBeisbolPixelizado.png"]

        this.avatar = new Avatar("a",this,400,400,sprite);
        this.avatar1 = new Avatar("b",this,600,400,sprite);
        this.jugador = new Jugador(this.avatar,controles2);
        this.jugador1 = new Jugador(this.avatar1,controles1); //elegir controles 1 o controles 2
        this.plataformas;
        this.suelo;
        this.tanque;
        this.pared;

        this.drops = new Drops(this,spritearmas);
       

	}

atravesarplataformaspersonaje(jugador,plataforma){
        var array = plataforma.getChildren();
        for(var i = 0; i<plataforma.getLength(); i++){
            if(jugador.y < array[i].y){
                //console.log("Toca por arriba")
                array[i].enableBody();
            }
            else{
                //console.log("Toca por abajo")
                array[i].disableBody();
            }
        }
        
    }


preload(){

    this.jugador.preload();
    this.jugador1.preload();
    this.drops.preload();


	this.load.image('fondo', 'Recursos/Imagenes/stage.png');
	this.load.image('plat2', 'Recursos/Imagenes/plat2.png'); //atravesables
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
    this.load.image('tanquePixel', 'Recursos/Imagenes/tanquePixel.png');
    this.load.image('paredPixel', 'Recursos/Imagenes/paredPixel.png');

}

create(){
    //var that = this;

	//var plataformas;
	//var suelo;
    //var tanque;
    //var pared;

    //IMPORTANTE: LA POSICIÓN (0,0) ES EL CENTRO DEL ESCENARIO.
    //            EN PHOTOSHOP ES LA ESQUINA SUPERIOR IZQUIERDA


		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(512, 215, 'fondo'); //sprite del escenario
        
		//this.add.sprite(0, 0, 'Plat2')

	this.plataformas = this.physics.add.staticGroup();  //Hace solidas las plataformas
    this.suelo = this.physics.add.staticGroup();
    this.tanque = this.physics.add.staticGroup();
    this.pared = this.physics.add.staticGroup();
    
    this.plataformas2 = this.physics.add.staticGroup();  //Hace solidas las plataformas
    this.suelo2 = this.physics.add.staticGroup();
    this.tanque2 = this.physics.add.staticGroup();
    this.pared2 = this.physics.add.staticGroup();

	//Suelo
    //platformas.create(x, y, 'suelo').setScale(2).refreshBody();
    this.suelo.create(512, 592, 'sueloPixel').alpha=0;


    //LAS COORDENADAS SON RESPECTO A LA VENTANA DEL TAMAÑO DEL ESCENARIO

    //plataformas invisibles
    //escaleras de emergencia
    //izquierda 
    this.plataformas.create(319, 63,  'plat2').alpha=0;
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
    this.plataformas.create(824, 130, 'techoDpixel').alpha=0;
    //pared derecha
    this.pared.create(925, 215, 'paredPixel').alpha=0;
    //toldos
    this.plataformas.create(159, 480, 'toldoLPixel').alpha=0; //izquierdo
    this.plataformas.create(878, 480, 'toldoRPixel').alpha=0; //derecho
    //tubería
    this.plataformas.create(605, 116, 'tuboPixel').alpha=0;
    //tanque de agua
    this.tanque.create(831, 97, 'tanquePixel').alpha=0;
    //cartel
    this.plataformas.create(60, 385, 'cartelPixel').alpha=0; //izquierdo
    this.plataformas.create(726, 443, 'cartelPixel').alpha=0; //derecho

    //AHORA SE HACEN LO MISMO PARA EL PERSONAJE DOS
    this.suelo2.create(512, 592, 'sueloPixel').alpha=0;

    this.plataformas2.create(319, 63,  'plat2').alpha=0;
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
    this.plataformas2.create(824, 130, 'techoDpixel').alpha=0;
    //pared derecha
    this.pared2.create(925, 215, 'paredPixel').alpha=0;
    //toldos
    this.plataformas2.create(159, 480, 'toldoLPixel').alpha=0; //izquierdo
    this.plataformas2.create(878, 480, 'toldoRPixel').alpha=0; //derecho
    //tubería
    this.plataformas2.create(605, 116, 'tuboPixel').alpha=0;
    //tanque de agua
    this.tanque2.create(831, 97, 'tanquePixel').alpha=0;
    //cartel
    this.plataformas2.create(60, 385, 'cartelPixel').alpha=0; //izquierdo
    this.plataformas2.create(726, 443, 'cartelPixel').alpha=0; //derecho

    this.jugador.create();
    this.jugador1.create();
    //colisiones jugador 1
    this.physics.add.collider(this.jugador.avatar.sprite, this.suelo); //con suelo
    this.physics.add.collider(this.jugador.avatar.sprite,this.plataformas); //con plataformas
    this.physics.add.collider(this.jugador.avatar.sprite, this.pared); //con la pared derecha
    this.jugador.avatar.sprite.body.collideWorldBounds = true; //con bordes
    //colisiones jugador 2
    this.physics.add.collider(this.jugador1.avatar.sprite, this.suelo2); //con suelo
    this.physics.add.collider(this.jugador1.avatar.sprite,this.plataformas2); //con plataformas
    this.physics.add.collider(this.jugador1.avatar.sprite, this.pared2); //con la pared derecha
    this.jugador1.avatar.sprite.body.collideWorldBounds = true; //con bordes
    //las plataformas no son colisionables desde abajo (si ejecuta estalla)
    //this.plataformas.setAll('body.collideDown', false);
    //plataformas.collideDown=false; //este no hace nada, pero no estalla

    //time event spawndrop
    var that = this;
    //var functionevent = function(){
           // var obj = that.drops.spawnarma();
            //that.physics.add.overlap(that.jugador1.avatar.sprite,obj); 
            //that.physics.add.overlap(that.jugador.avatar.sprite,obj); 
      //  }

    var dropevent = this.time.addEvent({delay:10000 ,loop:true ,
        callback: that.drops.spawnarma })
	}

    
update(){
    this.jugador.update(this.drops);
    this.jugador1.update(this.drops);
    this.atravesarplataformaspersonaje(this.jugador.avatar.sprite,this.plataformas);
    this.atravesarplataformaspersonaje(this.jugador1.avatar.sprite,this.plataformas2);
    
    }
}
