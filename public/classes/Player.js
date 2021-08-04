class Player {
  constructor() {
    this.sprite = createSprite(width / 2, height + 120, 50, 50);
    this.sprite.addAnimation(
      "idle",
      "../assets/player/idle.png",
      "../assets/player/idle2.png",
      "../assets/player/idle3.png"
    );
    this.sprite.addAnimation(
      "run",
      "../assets/player/run.png",
      "../assets/player/run2.png",
      "../assets/player/run3.png",
      "../assets/player/run4.png",
      "../assets/player/run5.png",
      "../assets/player/run6.png"
    );
    this.xSpeed = 1.5;
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
      //yIncrement += -this.ySpeed;
    }
    if (keyIsDown(83)) {
      //key = s
      //yIncrement += this.ySpeed;
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

  itemPlayerCollision(item) {
    if (
      collideRectRect(
        this.sprite.position.x,
        this.sprite.position.y,
        50,
        50,
        item.sprite.position.x,
        item.sprite.position.y,
        20,
        20
      )
    ) {
      return true;
    }
  }
}
