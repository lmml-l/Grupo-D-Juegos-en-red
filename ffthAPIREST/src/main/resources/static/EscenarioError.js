class EscenarioError extends Phaser.Scene {


constructor(){
        super({key:"EscenarioError"});
        this.texto;
        this.esc;
        this.enter;
        this.num=0;
//botón para retroceder
}

preload(){
        
    }

create (){

    var that=this;

    this.esc   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);    //tecla para salir del menú de error
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); //tecla para salir el menú de error y salir
    


    this.texto = this.add.text(50, 300, "You have been disconnected from the server", { fill: '#9B111E', font: '48px Impact', align: 'center'});
    this.texto = this.add.text(300, 300, "\n\n\nPlease wait to be reconnected", { fill: '#F4FFF3', font: '18px Impact', align: 'center'});

    //comprobación del estado del servidor
    this.time.addEvent({delay:5000, loop:true,
    callback: function(){getServerStatus(function(){
        that.num=0;
    })

    if(that.num >= 10){
        that.scene.start('MainMenu');
        }
    }})

	this.time.addEvent({delay:1000, loop:true,
    callback: function(){that.num++;}});
}






update(){

	}


}





