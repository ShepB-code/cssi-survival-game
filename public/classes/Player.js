class Player {
  constructor() {
    this.sprite = createSprite(random(0, 50), height + 120, 50, 50);
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
    this.attacking = false;

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
    this.sprite.addAnimation(
      "attackRight",
      "../assets/player/attack/attackRight.png",
      "../assets/player/attack/attack2Right.png",
      "../assets/player/attack/attack3Right.png",
      "../assets/player/attack/attack4Right.png",
      "../assets/player/attack/attack5Right.png"
    );
    this.sprite.addAnimation(
      "attackLeft",
      "../assets/player/attack/attackLeft.png",
      "../assets/player/attack/attack2Left.png",
      "../assets/player/attack/attack3Left.png",
      "../assets/player/attack/attack4Left.png",
      "../assets/player/attack/attack5Left.png"
    );
    this.sprite.addAnimation(
      "bowRight",
      "../assets/player/bow/bowRight.png",
      "../assets/player/bow/bow2Right.png",
      "../assets/player/bow/bow2Right.png",
      "../assets/player/bow/bow3Right.png",
      "../assets/player/bow/bow4Right.png",
      "../assets/player/bow/bow5Right.png",
      "../assets/player/bow/bow6Right.png",
      "../assets/player/bow/bow7Right.png",
      "../assets/player/bow/bow8Right.png",
      "../assets/player/bow/bow9Right.png"
    );
    this.sprite.addAnimation(
      "bowLeft",
      "../assets/player/bow/bowLeft.png",
      "../assets/player/bow/bow2Left.png",
      "../assets/player/bow/bow2Left.png",
      "../assets/player/bow/bow3Left.png",
      "../assets/player/bow/bow4Left.png",
      "../assets/player/bow/bow5Left.png",
      "../assets/player/bow/bow6Left.png",
      "../assets/player/bow/bow7Left.png",
      "../assets/player/bow/bow8Left.png",
      "../assets/player/bow/bow9Left.png"
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
      if (this.inventory.currentItem != null) {
        this.playerItem.sprite.position.x = this.sprite.position.x; //setting the position one more time so it leaves with the player
        this.playerItem.sprite.position.y = this.sprite.position.y;
        this.inventory.removeItem();
      }
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

  handleAttack(enemyArray) {
    if (this.inventory.currentItem.name == "sword") {
      for (let enemy of enemyArray) {
        let difference = Math.abs(
          this.sprite.position.x - enemy.sprite.position.x
        );
        if (difference < 40) {
          this.damageEnemy(enemy, this.inventory.currentItem);
        }
      }
    } else {
      for (let enemy of enemyArray) {
        let difference = Math.abs(
          this.sprite.position.x - enemy.sprite.position.x
        );
        if (difference < 80) {
          this.damageEnemy(enemy, this.inventory.currentItem);
        }
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

    if (this.attacking) {
      if (this.inventory.currentItem.name == "sword") {
        if (this.direction == "right") {
          this.sprite.changeAnimation("attackRight");
        } else {
          this.sprite.changeAnimation("attackLeft");
        }
      } else {
        console.log("choosing bow");
        if (this.direction == "right") {
          this.sprite.changeAnimation("bowRight");
        } else {
          this.sprite.changeAnimation("bowLeft");
        }
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

  damageEnemy(enemy, weapon) {
    if (enemy.health > 0) {
      enemy.health -= weapon.damage;
    }

    if (enemy.health < 1) {
      enemy.handleDeath();
    }
  }
}
