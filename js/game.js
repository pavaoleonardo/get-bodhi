let game;
class GameCanvas {
  constructor() {
    this.canvasWidth = 700;
    this.canvasHeight = 700;
    this.ctx = document.getElementById("canvas").getContext("2d");

    this.background = new Background(
      this.ctx,
      this.canvasWidth,
      this.canvasHeight
    );

    this.johnny = new Johnny(this.ctx, this.canvasHeight);
    this.bodhi = new Bodhi(this.ctx, this.canvasHeight);

    this.birds = new Birds(this.ctx, this.canvasWidth);

    this.scoreboard = new Scoreboard(this.ctx, this.canvasHeight);

    this.fps = 60;
    this.framesCounter = 0;
    this.score = 3;
    this.birds = [];
    this.counter = 0;
    this.intervalId;
  }

  rendenring() {
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.drawAll();
      this.moveAll();
      this.moveBirds();

      this.gameOver(); // if (this.checkCollision()) this.gameOver();

      if (this.framesCounter % 60 == 0) {
        //velocidad de la aparición de pajaros
        this.generateBird();
      }

      this.checkCollision(this.birds, "bird");
      this.clearBird();

      this.framesCounter =
        this.framesCounter > 1000 ?
        (this.framesCounter = 0) :
        this.framesCounter;
    }, 1000 / this.fps);
  }

  drawAll() {
    this.background.draw();

    this.scoreboard.draw(this.score);

    this.johnny.draw();
    this.bodhi.draw(this.framesCounter);

    this.birds.forEach(function (e) {
      e.drawBirds(this.framesCounter);
    }.bind(this));
  }

  moveAll() {
    this.background.move();
  }

  checkCollision(arrayColision, value) {
    if (this.isCollision(arrayColision)) {
      //añadir todo lo que quieras que pase cuando haga colision
      if (value == "bird") {
        this.johnny.framesCounter = 1;
      }
    }
    setTimeout(
      function () {
        //reciba la segunda imagen y le aplica el tiempo en cambiar
        this.johnny.framesCounter = 0;
      }.bind(this),
      500
    );
  }

  isCollision(arrayCollision) {
    //pinta las colisiones
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return arrayCollision.some(
      function (birds) {
        var collision =
          this.johnny.x + this.johnny.width >= birds.x &&
          this.johnny.x <= birds.x + birds.width &&
          this.johnny.y + this.johnny.height >= birds.y &&
          birds.y + birds.height >= this.johnny.y;
        if (collision) {
          birds.hit = true;
          this.score--;
          console.log(this.score);
        }
        return collision;
      }.bind(this)
    );
  }


  moveBirds() {
    //Array de los pajaros
    this.birds.forEach(
      function (e) {
        e.moveBirds();
      }.bind(this)
    );
  }

  generateBird() {
    this.birds.push(new Birds(this.ctx)); //dibuja el array vacio this.birds[]
  }

  clearBird() {
    this.birds = this.birds.filter(
      function (birds) {
        return birds.y < this.canvasHeight, this.canvasWidth && !birds.hit;
      }.bind(this)
    );
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }


  gameOver() {
    if (this.score === 0) {
      clearInterval(this.interval);
    }
  }
}