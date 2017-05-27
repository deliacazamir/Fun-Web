var game = new Phaser.Game(960,960,Phaser.AUTO,'game_div');

game.state.add('boot',boot_state);
game.state.add('load',load_state);
game.state.add('lobby1',lobby_1);
game.state.add('lobby2',lobby_2);
// game.state.add('first_level',first_level);

game.state.start('boot',boot_state);
