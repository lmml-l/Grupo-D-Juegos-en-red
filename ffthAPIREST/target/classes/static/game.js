'use strict'
//CONFIGURACIÓN DEL JUEGO EN PHASER 3
var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768, //768
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    //Orden de escenas
    scene: [MainMenu,ControlGuide,nameMenu,Lobby,CharapterSelection,CharapterSelectionOnline,Pausa,MainEscenario,EscenarioOnline,EscenarioError,] //scene: [MainMenu,ControlGuide,nameMenu,Lobby,CharapterSelection,MainEscenario]
};

var game = new Phaser.Game(config);

function preload ()
{

}

function create ()
{

}

function update ()
{
}
