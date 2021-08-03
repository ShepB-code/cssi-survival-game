class Player {
  constructor() {
    this.sprite = createSprite(100, 100, 50, 50);
    this.xSpeed = 3;
    this.ySpeed = 3;
    this.inventory;
    this.playerItem = null;
  }

  showSelf() {
    drawSprite(this.sprite);
    if (this.inventory.currentItem != null) {
      this.inventory.currentItem.showSelf();
    }
  }
  moveSelf(xIncrement, yIncrement) {
    this.sprite.position.x += xIncrement;
    this.sprite.position.y += yIncrement;
  }

  handleMovement() {
    let xIncrement = 0;
    let yIncrement = 0;
    if (keyIsDown(87)) {
      //key = w
      yIncrement += -this.ySpeed;
    }
    if (keyIsDown(83)) {
      //key = s
      yIncrement += this.ySpeed;
    }
    if (keyIsDown(65)) {
      //key = a
      xIncrement += -this.xSpeed;
    }
    if (keyIsDown(68)) {
      //key = d
      xIncrement += this.xSpeed;
    }
    this.moveSelf(xIncrement, yIncrement);

    return [xIncrement, yIncrement];
  }
}
