function pipe(game) {
  this.game = game;
  this.width = 52;
  this.height = 320;
  this.imageTop = null;
  this.imageBottom = null;
  this.loadedTop = false;
  this.loadedBottom = false;
  this.space = 100;
  this.x = 400;
  // this.y = 150 + Math.random() * 200;
  this.pipes = [{}];

  const self = this;

  this.init = function() {
    this.loadImage();
    for (let i = 0; i < 3; i++) {
      const p = {
        x: this.x + 150 * i,
        y: 150 + Math.random() * 200
      };
      this.pipes[i] = p;
    }
  };

  this.loadImage = function() {
    this.imageTop = new Image();
    this.imageTop.onload = function() {
      self.loadedTop = true;
    };
    this.imageTop.src = "./images/pipeTop.png";

    this.imageBottom = new Image();
    this.imageBottom.onload = function() {
      self.loadedBottom = true;
    };
    this.imageBottom.src = "./images/pipeBottom.png";
  };

  this.update = function() {
    for (let i = 0; i < 3; i++) {
      this.pipes[i].x -= 1.5;
      if (this.pipes[i].x + this.width <= 0) {
        const p = {
          x: this.pipes[2].x + 150,
          y: 150 + Math.random() * 200
        };
        this.pipes.push(p);
        this.pipes.shift();
      }
    }
  };

  this.draw = () => {
    if (this.loadedTop === false && this.loadedBottom === false) return;

    for (let i = 0; i < 3; i++) {
      this.game.context.drawImage(
        this.imageTop,
        this.pipes[i].x,
        this.pipes[i].y - this.height - this.space
      );

      this.game.context.drawImage(
        this.imageBottom,
        this.pipes[i].x,
        this.pipes[i].y
      );
    }
  };
}
