class MainEscenario extends Phaser.Scene {

	constructor(){
		super({key:"MainEscenario"});
	}



preload(){

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
    this.load.image('tuboPixel', 'Recursos/Imagenes/stage.png');

}

create(){
	var plataformas;
	var suelo;

    //IMPORTANTE: LA POSICIÓN (0,0) ES EL CENTRO DEL ESCENARIO.
    //            EN PHOTOSHOP ES LA ESQUINA SUPERIOR IZQUIERDA


		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(512, 215, 'fondo'); //sprite del escenario
        
		//this.add.sprite(0, 0, 'Plat2')

	plataformas = this.physics.add.staticGroup();  //Hace solidas las plataformas
    //plataformasCortas = this.physics.add.staticGroup();
    suelo = this.physics.add.staticGroup();
    
 
	//las plataformas de metal no son colisionables desde abajo
	//this.plataformasMetal.setAll('body.collideDown', false);


	//Suelo
    //platformas.create(x, y, 'suelo').setScale(2).refreshBody();
    suelo.create(512, 592, 'sueloPixel');


    //LAS COORDENADAS SON RESPECTO A LA VENTANA DEL TAMAÑO DEL ESCENARIO
    //coloco plataformas fijas no atravesables (techos)
    //aquí

    //coloco plataformas fijas atravesables
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
    plataformas.create(455, 276, 'platShort'); //-16
    plataformas.create(520, 362, 'platShort');
    plataformas.create(520, 468, 'platShort');
    plataformas.create(686, 276, 'platShort');
    plataformas.create(686, 364, 'platShort');
    //toldos
    plataformas.create(159, 480, 'toldoLPixel'); //izquierdo 85 646
    plataformas.create(686, 364, 'toldoRPixel'); //derecho
    //tubería

    //tanque de agua
	}
}

	//QUEDAN MÁS PLATAFORMAS POR PONER, DE DISTINTOS TAMAÑOS