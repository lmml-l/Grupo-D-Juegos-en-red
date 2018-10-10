class MainEscenario extends Phaser.Scene {

	constructor(){
		super({key:"MainEscenario"});
        var sprite = ["Recursos/Imagenes/Sprite2.png","Recursos/Imagenes/Sprite2.png"]
        this.avatar = new Avatar("a",this,400,400,sprite);
        this.jugador = new Jugador(this.avatar,controles2);
	}



preload(){

    this.jugador.preload();
	this.load.image('fondo', 'Recursos/Imagenes/stage.png')
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
    

	var plataformas;
	var suelo;
    var tanque;
    var pared;

    //IMPORTANTE: LA POSICIÓN (0,0) ES EL CENTRO DEL ESCENARIO.
    //            EN PHOTOSHOP ES LA ESQUINA SUPERIOR IZQUIERDA


		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(512, 215, 'fondo'); //sprite del escenario
        
		//this.add.sprite(0, 0, 'Plat2')

	plataformas = this.physics.add.staticGroup();  //Hace solidas las plataformas
    //plataformasCortas = this.physics.add.staticGroup();
    suelo = this.physics.add.staticGroup();
    tanque = this.physics.add.staticGroup();
    pared = this.physics.add.staticGroup();
    

	//Suelo
    //platformas.create(x, y, 'suelo').setScale(2).refreshBody();
    suelo.create(512, 592, 'sueloPixel');


    //LAS COORDENADAS SON RESPECTO A LA VENTANA DEL TAMAÑO DEL ESCENARIO

    //escaleras de emergencia
    //izquierda 
    plataformas.create(319, 63,  'plat2');
    plataformas.create(319, 153, 'plat2');
    plataformas.create(319, 241, 'plat2');
    plataformas.create(319, 328, 'plat2');
    plataformas.create(319, 416, 'plat2');
    //derecha
    plataformas.create(866, 141, 'plat2');
    plataformas.create(866, 229, 'plat2');
    plataformas.create(866, 317, 'plat2');
    plataformas.create(866, 404, 'plat2');
    //sueltas
    plataformas.create(455, 276, 'platShort');
    plataformas.create(520, 362, 'platShort');
    plataformas.create(520, 468, 'platShort');
    plataformas.create(686, 276, 'platShort');
    plataformas.create(686, 364, 'platShort');
    //techos
    plataformas.create(158, 305, 'techoApixel');
    plataformas.create(376, 60, 'techoBpixel');
    plataformas.create(624, 192, 'techoCpixel');
    plataformas.create(824, 130, 'techoDpixel');
    //pared derecha
    pared.create(925, 215, 'paredPixel');
    //toldos
    plataformas.create(159, 480, 'toldoLPixel'); //izquierdo
    plataformas.create(878, 480, 'toldoRPixel'); //derecho
    //tubería
    plataformas.create(605, 116, 'tuboPixel');
    //tanque de agua
    tanque.create(831, 97, 'tanquePixel');
    //cartel
    plataformas.create(60, 385, 'cartelPixel'); //izquierdo
    plataformas.create(726, 443, 'cartelPixel'); //derecho


    this.jugador.create();
    //colisiones
    this.physics.add.collider(this.jugador.avatar.sprite, suelo); //con suelo
    this.physics.add.collider(this.jugador.avatar.sprite, plataformas); //con plataformas
    this.physics.add.collider(this.jugador.avatar.sprite, pared); //con la pared derecha
    this.jugador.avatar.sprite.body.collideWorldBounds = true; //con bordes
    
    //las plataformas no son colisionables desde abajo (si ejecuta estalla)
    //this.plataformas.setAll('body.collideDown', false);
    //plataformas.collideDown=false; //este no hace nada, pero no estalla

    //hacemos los sprites transparentes

	}
update(){
    this.jugador.update();
    }
}
