function game() {
  this.canvas = null;
  this.context = null;
  this.width = 288;
  this.height = 512;

  // item
  this.bg = null;
  this.bird = null;
  this.base = null;
  this.pipe = null;
  this.gameOverImg = null;

  // status
  this.lose = false;

  const self = this;

  this.init = function() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);

    // create bird
    this.bird = new bird(this);
    this.bird.init();

    // create bg
    this.bg = new bg(this);
    this.bg.init();

    // create base
    this.base = new base(this);
    this.base.init();

    // create pipe
    this.pipe = new pipe(this);
    this.pipe.init();

    // create gameOverImage
    this.gameOverImg = new Image();
    this.gameOverImg.src = "./images/gameover.png";

    // Event press
    this.mouseClickEvent();
    this.keyboardPressEvent();

    this.loop();
  };

  this.loop = () => {
    if (this.lose) {
      this.context.drawImage(this.gameOverImg, 50, 150);
      return;
    }
    this.update();
    this.draw();
    setTimeout(this.loop, 16);
  };

  this.update = function() {
    this.bird.update();
    this.bg.update();
    this.base.update();
    this.pipe.update();
  };

  this.draw = function() {
    this.bg.draw();
    this.pipe.draw();
    this.bird.draw();
    this.base.draw();
  };

  this.mouseClickEvent = function() {
    this.canvas.addEventListener("click", () => {
      this.bird.flap();
    });
  };

  this.keyboardPressEvent = () => {
    document.body.addEventListener("keydown", () => {
      this.bird.flap();
    });
  };
}

const g = new game();
g.init();
