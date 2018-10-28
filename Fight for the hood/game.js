'use strict'
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
    //Orden de escenas
    scene: [CharapterSelection,MainEscenario,MainMenu] 
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
