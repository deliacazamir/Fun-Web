var load_state={

    preload:function(){
    
    game.load.tilemap('firstlevel','assets/map.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1','assets/magecity.png');
    game.load.image('tileset2','assets/town02.png');
    game.load.spritesheet('king','assets/king.png',32,64,24);
    game.load.image('bullet', 'assets/purple_ball.png');
    
    },

    create:function(){

        game.state.start('lobby1',lobby_1);
    }



};