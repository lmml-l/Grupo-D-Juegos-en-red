class MainEscenario extends Phaser.Scene {

	constructor(){
		super({key:"MainEscenario"});
	}



preload(){

	this.load.image('fondo', 'Recursos/Imagenes/stage.png')
	this.load.image('plat2', 'Recursos/Imagenes/plat2.png'); //atravesables
    this.load.image('sueloPixel', 'Recursos/Imagenes/sueloPixel.png');

}

create(){
	var plataformas;
	var plataformasMetal;
	var suelo;
    var techoA; var techoB; var techoC; var techoD;


    //IMPORTANTE: LA POSICIÓN (0,0) ES EL CENTRO DEL ESCENARIO.
    //            EN PHOTOSHOP ES LA ESQUINA SUPERIOR IZQUIERDA


		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(512, 215, 'fondo'); //sprite del escenario
        
		//this.add.sprite(0, 0, 'Plat2')

	plataformas = this.physics.add.staticGroup();  //Hace solidas las plataformas
	plataformasMetal = this.physics.add.staticGroup();
    suelo = this.physics.add.staticGroup();
    techoA = this.physics.add.staticGroup();
    techoB = this.physics.add.staticGroup();
    techoC = this.physics.add.staticGroup();
    techoD = this.physics.add.staticGroup();

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
    plataformasMetal.create(319, 63,  'plat2');
    plataformasMetal.create(319, 153, 'plat2');
    plataformasMetal.create(319, 241, 'plat2');
    plataformasMetal.create(319, 328, 'plat2');
    plataformasMetal.create(319, 416, 'plat2');
    //derecha
    plataformasMetal.create(866, 141, 'plat2');
    plataformasMetal.create(866, 229, 'plat2');
    plataformasMetal.create(866, 317, 'plat2');
    plataformasMetal.create(866, 404, 'plat2');
    //sueltas
    plataformasMetal.create(471, 275, 'plat2');
    plataformasMetal.create(536, 361, 'plat2');
    plataformasMetal.create(536, 467, 'plat2');
    plataformasMetal.create(702, 275, 'plat2');
    plataformasMetal.create(703, 363, 'plat2');
	}
}

	//QUEDAN MÁS PLATAFORMAS POR PONER, DE DISTINTOS TAMAÑOS