function bg(game) {
  this.game = game;
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
    this.image.src = "./images/background.png";
  };

  this.update = function() {
    this.x -= 0.5;
    if (this.x <= -288) this.x = 0;
  };

  this.draw = function() {
    if (self.loaded == false) return;
    this.game.context.drawImage(this.image, this.x, 0);
    this.game.context.drawImage(this.image, this.x + this.game.width, 0);
  };
}
