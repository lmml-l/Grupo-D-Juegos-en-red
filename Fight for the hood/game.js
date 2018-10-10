var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768, //768
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 20 },
            debug: false
        }
    },
    //Orden de escenas
    scene: [MainEscenario,MainMenu,CharapterSelection] 
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
