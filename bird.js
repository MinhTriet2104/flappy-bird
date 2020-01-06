function bird(game) {
  this.game = game;
  this.width = 34;
  this.height = 24;
  this.images = [];
  this.img1Loaded = false;
  this.img2Loaded = false;
  this.img3Loaded = false;

  this.currentImage = 0;
  this.currentFrame = 0;

  this.x = Math.floor(this.game.width / 4);
  this.y = Math.floor(this.game.width / 2);
  this.speedY = 0;
  this.acceleration = 0.5;

  const self = this;

  this.init = function() {
    this.loadImages();
  };

  this.loadImages = function() {
    const img1 = new Image();
    const img2 = new Image();
    const img3 = new Image();

    img1.onload = function() {
      self.img1Loaded = true;
    };

    img2.onload = function() {
      self.img2Loaded = true;
    };

    img3.onload = function() {
      self.img3Loaded = true;
    };

    // Load all img
    img1.src = "./images/bird-up.png";
    img2.src = "./images/bird-mid.png";
    img3.src = "./images/bird-down.png";

    this.images.push(img1);
    this.images.push(img2);
    this.images.push(img3);
  };

  this.update = () => {
    this.currentFrame++;
    if (this.currentFrame === 30) {
      this.currentFrame = 0;
    }

    if (this.currentFrame == 9) {
      this.currentImage = 0;
    } else if (this.currentFrame == 19) {
      this.currentImage = 1;
    } else if (this.currentFrame == 29) {
      this.currentImage = 2;
    }

    const yOut = this.game.height - this.height - this.game.base.height;
    if (this.y <= yOut) {
      this.speedY += this.acceleration;
      this.y += this.speedY;
    }
    if (this.y >= yOut) {
      this.y = yOut;
      this.game.lose = true;
    }

    for (let i = 0; i < 2; i++) {
      if (
        this.x >= this.game.pipe.pipes[i].x &&
        this.x <= this.game.pipe.pipes[i].x + this.game.pipe.width &&
        this.y + this.height >= this.game.pipe.pipes[i].y
      ) {
        this.game.lose = true;
      }

      if (
        this.x >= this.game.pipe.pipes[i].x &&
        this.x <= this.game.pipe.pipes[i].x + this.game.pipe.width &&
        this.y <= this.game.pipe.pipes[i].y - this.game.pipe.space
      ) {
        this.game.lose = true;
      }

      if (
        this.x + this.width >= this.game.pipe.pipes[i].x &&
        this.x + this.width <=
          this.game.pipe.pipes[i].x + this.game.pipe.width &&
        this.y + this.height >= this.game.pipe.pipes[i].y
      ) {
        this.game.lose = true;
      }

      if (
        this.x + this.width >= this.game.pipe.pipes[i].x &&
        this.x + this.width <=
          this.game.pipe.pipes[i].x + this.game.pipe.width &&
        this.y <= this.game.pipe.pipes[i].y - this.game.pipe.space
      ) {
        this.game.lose = true;
      }
    }
  };

  this.draw = () => {
    if (this.img1Loaded && this.img2Loaded && this.img3Loaded) {
      this.game.context.drawImage(
        this.images[this.currentImage],
        this.x,
        this.y
      );
    }
  };

  this.flap = function() {
    if (this.game.lose) return;
    this.speedY = -7;
  };
}
