var hp = function(game , configuration)
{
    this.game = game
    this.setupConfiguration(configuration);
    this.setPosition(this.config.x,this.config.y);
    this.drawBackground();
    this.drawHp();
    this.setFixedToCamera(this.config.isFixedToCamera);
};

hp.prototype.constructor = hp;
hp.prototype.setupConfiguration = function (configuration)

{
    this.config = this.mergeWithDefaultConfiguration(configuration);
    this.flipped = this.config.flipped;

};

hp.prototype.mergeWithDefaultConfiguration = function ( NewCfg)

{
    var DefaultCfg = 
    {
        width: 200,
        height: 30,
        x: 20,
        y: 20,
        bgcolor: { color: '#8B0000'},
        hpcolor: {color :'#008000'},
        animationDuration : 150,
        flipped: false,
        isFixedToCamera : false

    };

    return mergeObjects(DefaultCfg, newCfg,);
};

function mergeObjects(targetObj, newObj)
{
    for (var point in newObj)
    {
        try
        {
            targetObj[point] = newObj[point].constructor == Object ? mergeObjects (targetObj[point], newObj[point]) : newObj[point];
        }
            catch(Exception)
        {
            targetObj[point]=newObj[point];
        }
    }
    return targetObj;
}

hp.prototype.drawBackground = function() {
    var bmd = this.game.add.bitmapData(this.configuration.width, this.configuration.height);
    bmd.ctx.fillStyle = this.configuration.bgcolor.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.configuration.width, this.configuration.height);
    bmd.ctx.fill();

    this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
    this.bgSprite.anchor.set(0.5);
};

hp.prototype.drawHp = function() {
    var bmd = this.game.add.bitmapData(this.configuration.width, this.configuration.height);
    bmd.ctx.fillStyle = this.configuration.bar.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();

    this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
    this.barSprite.anchor.y = 0.5;
    if (this.flipped){
      this.barSprite.anchor.x = 1;
      this.barSprite.position.x = this.bgSprite.position.x + this.configuration.width * this.bgSprite.anchor.x;
    }
};

hp.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;

    if(this.bgSprite !== undefined && this.barSprite !== undefined){
        this.bgSprite.position.x = x;
        this.bgSprite.position.y = y;

        this.barSprite.position.x = this.bgSprite.position.x - this.configuration.width * this.bgSprite.anchor.x;
        this.barSprite.position.y = y;
        if (this.flipped){
          this.barSprite.position.x = this.bgSprite.position.x;
        }
    }
};


hp.prototype.setPercent = function(newValue){
    if(newValue < 0) newValue = 0;
    if(newValue > 100) newValue = 100;

    var newWidth =  (newValue * this.configuration.width) / 100;

    this.setWidth(newWidth);
};

hp.prototype.setWidth = function(newWidth){
    this.game.add.tween(this.barSprite).to( { width: newWidth }, this.configuration.animationDuration, Phaser.Easing.Linear.None, true);
};

hp.prototype.setFixedToCamera = function(fixedToCamera) {
    this.bgSprite.fixedToCamera = fixedToCamera;
    this.barSprite.fixedToCamera = fixedToCamera;
};

hp.prototype.setAnchor = function(xAnchor, yAnchor) {
    this.bgSprite.anchor.set(xAnchor, yAnchor);
    this.barSprite.position.x = this.bgSprite.position.x - this.configuration.width * this.bgSprite.anchor.x;    
    this.barSprite.anchor.y = yAnchor;
    if (this.flipped){
      this.barSprite.anchor.x = 1;
      this.barSprite.position.x = this.bgSprite.position.x;
    }
};

hp.prototype.kill = function() {
    this.bgSprite.kill();
    this.barSprite.kill();
};
