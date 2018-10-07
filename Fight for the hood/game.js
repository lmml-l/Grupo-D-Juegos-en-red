var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 10 },
            debug: false
        }
    },
    scene: [MainMenu,CharapterSelection]
         
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