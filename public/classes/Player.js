class Player {
  constructor() {
    this.sprite = createSprite(100, 100, 50, 50);
    this.xSpeed = 3;
    this.ySpeed = 3;
    this.inventory;
    this.playerItem;
    // this.playerItem = new Item(
    //this.sprite.position.x,
    //this.sprite.position.y,
    //"player"
    //);
  }

  showSelf() {
    drawSprite(this.sprite);
    if (this.inventory.currentItem != null) {
      this.playerItem = this.inventory.currentItem;
      this.playerItem.sprite.position.x = this.sprite.position.x;
      this.playerItem.sprite.position.y = this.sprite.position.y - 20;
      this.playerItem.showSelf();
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
    //this.moveSelf(xIncrement, yIncrement);

    return [xIncrement, yIncrement];
  }

  handleKeyPress(key) {
    if (key == "q") {
      this.playerItem.sprite.position.x = this.sprite.position.x; //setting the position one more time so it leaves with the player
      this.playerItem.sprite.position.y = this.sprite.position.y - 20;
      this.inventory.removeItem();
    }
  }
}
