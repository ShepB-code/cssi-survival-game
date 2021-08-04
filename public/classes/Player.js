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
    this.sprite.addAnimation(
      "runLeft",
      "../assets/player/runLeft.png",
      "../assets/player/run2Left.png",
      "../assets/player/run3Left.png",
      "../assets/player/run4Left.png",
      "../assets/player/run5Left.png",
      "../assets/player/run6Left.png"
    );

    this.sprite.addAnimation(
      "jump",
      "../assets/player/jump.png",
      "../assets/player/jump2.png",
      "../assets/player/jump3.png",
      "../assets/player/jump4.png"
    );
    this.xSpeed = 1.5;
    this.ySpeed = 3;
    this.jumping = false;
    this.falling = false;
    this.maxJumpY = this.sprite.position.y - 30;
    this.groundY = this.sprite.position.y;
    this.inventory;
    this.health = 100;
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
  handlePosition() {
    //console.log(this.inJump);
    if (this.jumping) {
      //going up
      if (this.sprite.position.y < this.maxJumpY) {
        this.falling = true;
        this.jumping = false;
      } else {
        this.sprite.position.y += -this.ySpeed;
      }
    }

    if (this.falling) {
      if (this.sprite.position.y > this.groundY) {
        this.falling = false;
        this.sprite.position.y = this.groundY; //resetting player
      } else {
        this.sprite.position.y += this.ySpeed;
      }
    }
  }
  handleKeyPress(key) {
    if (key == "q") {
      this.playerItem.sprite.position.x = this.sprite.position.x; //setting the position one more time so it leaves with the player
      this.playerItem.sprite.position.y = this.sprite.position.y - 20;
      this.inventory.removeItem();
    } else if (key == " ") {
      console.log("in space");
      this.sprite.position.y += -this.ySpeed; //start jump
      this.jumping = true;
      this.sprite.changeAnimation("jump");
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
