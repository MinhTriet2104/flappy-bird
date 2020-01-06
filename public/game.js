function game() {
  this.canvas = null;
  this.context = null;
  this.width = 288;
  this.height = 512;
  this.isStart = false;

  // item
  this.bg = null;
  this.bird = null;
  this.base = null;
  this.pipe = null;
  this.gameOverImg = null;
  this.menu = null;

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

    // create menu start
    this.menu = new Image();
    this.menu.src = "./images/message.png";

    // Event press
    this.mouseClickEvent();
    this.keyboardPressEvent();

    // Start event
    if (!this.isStart) {
      this.canvas.addEventListener("click", this.startGame);
      document.body.addEventListener("keydown", this.startGame);
    }

    this.loop();
  };

  this.loop = () => {
    if (this.lose) {
      this.context.drawImage(this.gameOverImg, 50, 150);
      if (confirm("Game Over! Bạn có muốn chơi lại ?")) {
        document.body.removeChild(
          document.body.childNodes[document.body.childNodes.length - 1]
        );
        const g = new game();
        g.init();
      }
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
    if (this.isStart) this.pipe.update();
  };

  this.draw = function() {
    this.bg.draw();
    if (this.isStart) this.pipe.draw();
    this.bird.draw();
    this.base.draw();
    if (!this.isStart) this.context.drawImage(this.menu, 50, 30);
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

  this.startGame = () => {
    this.isStart = true;
  };
}

const g = new game();
g.init();
