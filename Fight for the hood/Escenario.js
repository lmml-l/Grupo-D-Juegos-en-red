class MainEscenario extends Phaser.Scene {

	constructor(){
		super({key:"EscenaPrincipal"});
	}



preload(){

	this.load.image('Fondo', 'imagenes/stage.png');
	this.load.image('Plat2', 'assets/plat2.png'); //atravesables


}

create(){
	var plataformas;
	var plataformasMetal;
	var suelo;


		//this.Escenario(); (No se sabe si funciona así)
		this.add.sprite(0, 0, 'Fondo');
		
		//this.add.sprite(0, 0, 'Plat2')

	plataformas = this.physics.add.staticGroup();  //Hace solidas las plataformas
	plataformasMetal = this.physics.add.staticGroup();

	//las plataformas de metal no son colisionables desde abajo
	this.plataformasMetal.setAll('body.collideDown', false);


	//Suelo
    //platformas.create(x, y, 'suelo').setScale(2).refreshBody();
    plataformas.create(0, 696, 'suelo');


    //LAS COORDENADAS SON RESPECTO A LA VENTANA DEL TAMAÑO DEL ESCENARIO
    //coloco plataformas fijas no atravesables (techos)
    //aquí

    //coloco plataformas fijas atravesables
    //escaleras de emergencia
    //izquierda
    plataformasMetal.create(263, 224, 'plat2');
    plataformasMetal.create(263, 314, 'plat2');
    plataformasMetal.create(263, 402, 'plat2');
    plataformasMetal.create(263, 489, 'plat2');
    plataformasMetal.create(263, 577, 'plat2');
    //derecha
    plataformasMetal.create(803, 301, 'plat2');
    plataformasMetal.create(803, 389, 'plat2');
    plataformasMetal.create(803, 564, 'plat2');
    //sueltas
    plataformasMetal.create(415, 436, 'plat2');
    plataformasMetal.create(480, 522, 'plat2');
    plataformasMetal.create(480, 628, 'plat2');
    plataformasMetal.create(646, 436, 'plat2');
    plataformasMetal.create(647, 524, 'plat2');
	}
}

	//QUEDAN MÁS PLATAFORMAS POR PONER, DE DISTINTOS TAMAÑOS