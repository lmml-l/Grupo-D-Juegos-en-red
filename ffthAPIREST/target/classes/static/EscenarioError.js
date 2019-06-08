//PANTALLA DE ERROR CUANDO NO SE RECIBE RESPUESTA DEL SERVIDOR
//CUANDO LA RECUPERA, TE DEVUELVE AL MENÚ INICIAL
class EscenarioError extends Phaser.Scene {

constructor(){
        super({key:"EscenarioError"});
        this.texto;
        this.esc;
        this.enter;
        this.iknow="0";
        this.num=0;
//botón para retroceder
}

preload(){
    
}

create (){
    var that=this;

    this.texto = this.add.text(50, 300, "You have been disconnected from the server", { fill: '#9B111E', font: '48px Impact', align: 'center'});
    this.texto = this.add.text(50, 300, "\n\n\nPlease wait to be reconnected", { fill: '#F4FFF3', font: '18px Impact', align: 'center'});

    //comprobación del estado del servidor
    this.time.addEvent({delay:2000, loop:true,
    callback: function(){getServerStatus(function(){
        that.num=0;
    })
    //devuelve al menú inicial
    if(that.num >= 3){
        that.scene.start('MainMenu');
        }
    }})

	this.time.addEvent({delay:1000, loop:true,
    callback: function(){that.num++;}});
}

update(){}
}