function base(game) {
  this.game = game;
  this.width = 336;
  this.height = 112;
  this.image = null;
  this.loaded = false;
  this.x = 0;

  const self = this;

  this.init = function() {
    this.loadImage();
  };

  this.loadImage = function() {
    this.image = new Image();
    this.image.onload = function() {
      self.loaded = true;
    };
    this.image.src = "./images/base.png";
  };

  this.update = function() {
    this.x -= 1.5;
    if (this.x <= -336) this.x = 0;
  };

  this.draw = function() {
    if (self.loaded == false) return;
    this.game.context.drawImage(
      this.image,
      this.x,
      this.game.height - this.height
    );
    this.game.context.drawImage(
      this.image,
      this.x + this.game.width,
      this.game.height - this.height
    );
  };
}
