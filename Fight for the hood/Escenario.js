class MainEscenario extends Phaser.Scene {
    
	constructor(){
		super({key:"MainEscenario"});
        var sprite = ["Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png"]
        this.avatar = new Avatar("a",this,400,400,sprite);
        this.jugador = new Jugador(this.avatar,controles2); //elegir controles 1 o controles 2
        this.plataformas;
        this.suelo;
        this.tanque;
        this.pared;
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
    //plataformasCortas = this.physics.add.staticGroup();
    this.suelo = this.physics.add.staticGroup();
    this.tanque = this.physics.add.staticGroup();
    this.pared = this.physics.add.staticGroup();
    

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


    this.jugador.create();
    //colisiones
    this.physics.add.collider(this.jugador.avatar.sprite, this.suelo); //con suelo
    this.physics.add.collider(this.jugador.avatar.sprite,this.plataformas); //con plataformas
    this.physics.add.collider(this.jugador.avatar.sprite, this.pared); //con la pared derecha
    this.jugador.avatar.sprite.body.collideWorldBounds = true; //con bordes
    
    //las plataformas no son colisionables desde abajo (si ejecuta estalla)
    //this.plataformas.setAll('body.collideDown', false);
    //plataformas.collideDown=false; //este no hace nada, pero no estalla
	}
update(){
    this.jugador.update();
    this.atravesarplataformaspersonaje(this.jugador.avatar.sprite,this.plataformas);
    }
}
