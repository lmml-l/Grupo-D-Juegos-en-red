class EscenarioError extends Phaser.Scene {


constructor(){
        super({key:"EscenarioError"});
        this.texto;
        this.esc;
        this.enter;
//botón para retroceder
}

preload(){
        
    }

create (){

  
    this.esc   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);    //tecla para salir del menú de error
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para salir el menú de error y salir
    


    this.texto = this.add.text(50, 300, "You have been disconnected from the server.", { fill: '#9B111E', font: '48px Impact', align: 'center'})
    this.texto = this.add.text(50, 700, "Restart this page.", { fill: '#F4FFF3', font: '16px Impact', align: 'center'});
}
	







update(){

	}


}





