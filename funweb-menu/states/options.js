var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: 260,
    startX: "center"
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
    var playSound = sound.mute;
    var playMusic = music.mute;
    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);
    this.addMenuOption(playMusic ? 'Play Music' : 'Mute Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Play Music' : 'Mute Music';
      music.mute = playMusic;
      console.log("Music is playing:",playMusic);
    });
    this.addMenuOption(playSound ? 'Play Sound' : 'Mute Sound', function (target) {
      playSound = !playSound;
      sound.mute = playSound;
      target.text = playSound ? 'Play Sound' : 'Mute Sound';
      console.log("Sound is playing:",playMusic);
  });
    this.addMenuOption('<- Back', function () {
      game.state.start("GameMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
