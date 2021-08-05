class Player {
  constructor() {
    this.sprite = createSprite(0, height + 120, 50, 50);
    this.xSpeed = 1.5;
    this.ySpeed = 3;
    this.jumping = false;
    this.falling = false;
    this.maxJumpY = this.sprite.position.y - 60;
    this.groundY = this.sprite.position.y;
    this.direction = "right";
    this.inventory; //initialized in the setup function
    this.health = 100;
    this.playerItem;

    this.sprite.addAnimation(
      "idleRight",
      "../assets/player/idle/idleRight.png",
      "../assets/player/idle/idle2Right.png",
      "../assets/player/idle/idle3Right.png"
    );
    this.sprite.addAnimation(
      "idleLeft",
      "../assets/player/idle/idleLeft.png",
      "../assets/player/idle/idle2Left.png",
      "../assets/player/idle/idle3Left.png"
    );
    this.sprite.addAnimation(
      "runRight",
      "../assets/player/run/runRight.png",
      "../assets/player/run/run2Right.png",
      "../assets/player/run/run3Right.png",
      "../assets/player/run/run4Right.png",
      "../assets/player/run/run5Right.png",
      "../assets/player/run/run6Right.png"
    );
    this.sprite.addAnimation(
      "runLeft",
      "../assets/player/run/runLeft.png",
      "../assets/player/run/run2Left.png",
      "../assets/player/run/run3Left.png",
      "../assets/player/run/run4Left.png",
      "../assets/player/run/run5Left.png",
      "../assets/player/run/run6Left.png"
    );

    this.sprite.addAnimation(
      "jumpRight",
      "../assets/player/jump/jumpRight.png",
      "../assets/player/jump/jump2Right.png",
      "../assets/player/jump/jump3Right.png",
      "../assets/player/jump/jump4Right.png"
    );
    this.sprite.addAnimation(
      "jumpLeft",
      "../assets/player/jump/jumpLeft.png",
      "../assets/player/jump/jump2Left.png",
      "../assets/player/jump/jump3Left.png",
      "../assets/player/jump/jump4Left.png"
    );
    this.sprite.addAnimation(
      "fallRight",
      "../assets/player/fall/fallRight.png",
      "../assets/player/fall/fall2Right.png"
    );
    this.sprite.addAnimation(
      "fallLeft",
      "../assets/player/fall/fallLeft.png",
      "../assets/player/fall/fall2Left.png"
    );

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

  handleDeath() {
    if(this.health <= 0) {
      this.health = 0;
      noLoop();
    }
  }

  showCrafting() {
    drawSprite(this.craftingSprite);
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
      this.playerItem.sprite.position.y = this.sprite.position.y;
      this.inventory.removeItem();
    } else if (key == " ") {
      if (!this.jumping && !this.falling) {
        //to not allow double jumping
        this.sprite.position.y += -this.ySpeed; //start jump
        this.jumping = true;
      }
    } else if (key == "i") {
      if (this.craftingIsOpen) {
        //close it if it is already open
        this.craftingIsOpen = false;
      } else {
        this.craftingIsOpen = true;
      }
    }
  }
  chooseAnimation(xOffset) {
    if (xOffset > 0) {
      this.sprite.changeAnimation("runRight");
      this.direction = "right";
    } else if (xOffset < 0) {
      this.sprite.changeAnimation("runLeft");
      this.direction = "left";
    } else {
      if (this.direction == "right") {
        this.sprite.changeAnimation("idleRight");
      } else {
        this.sprite.changeAnimation("idleLeft");
      }
    }

    if (this.jumping) {
      if (this.direction == "right") {
        this.sprite.changeAnimation("jumpRight");
      } else {
        this.sprite.changeAnimation("jumpLeft");
      }
    }
    if (this.falling) {
      if (this.direction == "right") {
        this.sprite.changeAnimation("fallRight");
      } else {
        this.sprite.changeAnimation("fallLeft");
      }
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
