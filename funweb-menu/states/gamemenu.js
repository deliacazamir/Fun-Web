var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "FunWeb", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {
/*
    if (music.name !== "dangerous" && playMusic) {
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }

    if (sound.name !== "pistol" && playSound) {
      sound.stop();
      sound = game.add.audio('pistol');
      sound.loop = false;
      sound.play();
    }
*/
    //music = game.add.audio('dangerous');
    wall = game.add.audio('wall');
    sword = game.add.audio('sword');
    pistol = game.add.audio('pistol');
    steps = game.add.audio('steps');

    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
      game.state.start("Game");
       sound.play();
    });
    this.addMenuOption('Options', function () {
      game.state.start("Options");
       sound.play();
    });
    this.addMenuOption('Credits', function () {
      game.state.start("Credits");
       sound.play();
    });
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
