class EscenarioError extends Phaser.Scene {

	constructor(){
		super({key:"EscenarioError"});
		this.esc;
		this.enter;
//botón para retroceder
}
	retroceder(){
		if(esc.isDown){
		this.scene.start('MainMenu');
		}
	}

	aceptar(){
		if(enter.isDown){
			this.scene.start('MainMenu');
		}
		
	}


create (){

    this.esc   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);	//tecla para salir del menú de error
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para salir el menú de error y salir


    this.textoVersion = this.add.text(500, 500, "Te has desconectado del servidor.", { fill: '#9B111E', font: '24px Lucida Console', align: 'center'});
    this.textoVersion = this.add.text(50, 700, "Pulse ENTER o ESC para aceptar", { fill: '#F4FFF3', font: '16px Lucida Console', align: 'center'});	

     }



update(){
		this.retroceder();
		this.aceptar();
	}

}






