var game = new Phaser.Game(960,960,Phaser.AUTO,'game_div',{preload:preload,create:create,update:update,});

function preload(){
    game.load.tilemap('secondlevel','assets/mash.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1','assets/magecity.png');
    game.load.image('tileset2','assets/town02.png');
    game.load.spritesheet('king','assets/king.png',32,64,24);
    game.load.image('bullet', 'assets/purple_ball.png');
}

var map;
var layer;
var layer2;
var player;
var keyboard;

function create() {

map = game.add.tilemap('secondlevel');
game.physics.startSystem(Phaser.Physics.ARCADE);
game.stage.backgroundColor = '#313131';

map.addTilesetImage('magecity', 'tileset1');
map.addTilesetImage('town02','tileset2');

layer = map.createLayer(0);
layer.resizeWorld();

layer2 = map.createLayer(1);
map.setCollision()
}