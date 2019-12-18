class Bodhi {
  constructor(ctx, canvasHeight) {
    this.ctx = ctx;
    this.canvasHeight = canvasHeight;

    this.width = 68;
    this.height = 48;
    this.x = 200;
    this.y = this.canvasHeight / 2 - this.height / 2;

    this.image = new Image();
    this.image.src = "./img/bodhi.png";

    this.frames = 3;
    this.framesIndex = 0;

    this.y0 = this.ctx.canvasHeight * 0.8;

    this.vx = 30; //velocidad de movimiento
    this.hasGameStarted = false;
  }

  draw(frameCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}