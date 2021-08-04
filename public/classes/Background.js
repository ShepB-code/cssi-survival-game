class Background {
  constructor(img1, img2, slideSpeed) {
    this.img1 = img1; //starts in frame
    this.img2 = img2; //starts out of frame
    this.img1X = 0;
    this.img2X = this.img1X - 928; //it's on the left side to start
    this.slideSpeed = slideSpeed;
  }

  showSelf() {
    image(this.img1, this.img1X, 0); //always at y = 0;
    image(this.img2, this.img2X, 0); //always at y = 0;
  }

  moveSelf(forward, canvasX) {
    let canvasLeftBound = canvasX - 926;
    let canvasRightBound = canvasX + 926;

    //check img1X
    if (this.img1X < canvasLeftBound) {
      this.img1X = canvasRightBound;
    }

    if (this.img1X > canvasRightBound) {
      this.img1X = canvasLeftBound;
    }

    if (this.img2X < canvasLeftBound) {
      this.img2X = canvasRightBound;
    }
    if (this.img2X > canvasRightBound) {
      this.img2X = canvasLeftBound;
    }

    if (forward) {
      //<---
      this.img1X += -this.slideSpeed;
      this.img2X += -this.slideSpeed;
    } else {
      // --->
      this.img1X += this.slideSpeed;
      this.img2X += this.slideSpeed;
    }
  }
}
