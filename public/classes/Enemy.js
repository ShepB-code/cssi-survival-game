/*
  global
  text, sqrt
  
  createSprite, drawSprite
*/

class Enemy {
  constructor(x) {
    this.sprite = createSprite(x, height + 120, 40, 50);
    this.x = x;
    this.speed = 0.5;
    this.attacking = false;
    this.health = 1;
    this.xSpeed = 2.75;

    this.sprite.addAnimation(
      "idle",
      "../assets/enemy/idle/idle.png",
      "../assets/enemy/idle/idle2.png",
      "../assets/enemy/idle/idle3.png",
      "../assets/enemy/idle/idle4.png",
      "../assets/enemy/idle/idle5.png",
      "../assets/enemy/idle/idle6.png",
      "../assets/enemy/idle/idle7.png",
      "../assets/enemy/idle/idle8.png",
      "../assets/enemy/idle/idle9.png",
      "../assets/enemy/idle/idle10.png",
      "../assets/enemy/idle/idle11.png"
    );
    this.sprite.addAnimation(
      "idleLeft",
      "../assets/enemy/idle/idleLeft.png",
      "../assets/enemy/idle/idleLeft2.png",
      "../assets/enemy/idle/idleLeft3.png",
      "../assets/enemy/idle/idleLeft4.png",
      "../assets/enemy/idle/idleLeft5.png",
      "../assets/enemy/idle/idleLeft6.png",
      "../assets/enemy/idle/idleLeft7.png",
      "../assets/enemy/idle/idleLeft8.png",
      "../assets/enemy/idle/idleLeft9.png",
      "../assets/enemy/idle/idleLeft10.png",
      "../assets/enemy/idle/idleLeft11.png"
    );

    this.sprite.addAnimation(
      "run",
      "../assets/enemy/run/run.png",
      "../assets/enemy/run/run2.png",
      "../assets/enemy/run/run3.png",
      "../assets/enemy/run/run4.png",
      "../assets/enemy/run/run5.png",
      "../assets/enemy/run/run6.png",
      "../assets/enemy/run/run7.png",
      "../assets/enemy/run/run8.png",
      "../assets/enemy/run/run9.png",
      "../assets/enemy/run/run10.png",
      "../assets/enemy/run/run11.png",
      "../assets/enemy/run/run12.png",
      "../assets/enemy/run/run13.png"
    );
    this.sprite.addAnimation(
      "runLeft",
      "../assets/enemy/run/runLeft.png",
      "../assets/enemy/run/runLeft2.png",
      "../assets/enemy/run/runLeft3.png",
      "../assets/enemy/run/runLeft4.png",
      "../assets/enemy/run/runLeft5.png",
      "../assets/enemy/run/runLeft6.png",
      "../assets/enemy/run/runLeft7.png",
      "../assets/enemy/run/runLeft8.png",
      "../assets/enemy/run/runLeft9.png",
      "../assets/enemy/run/runLeft10.png",
      "../assets/enemy/run/runLeft11.png",
      "../assets/enemy/run/runLeft12.png",
      "../assets/enemy/run/runLeft13.png"
    );

    // this.sprite.addAnimation(
    //   "react",
    //   "../assets/enemy/react/react.png",
    //   "../assets/enemy/react/react2.png",
    //   "../assets/enemy/react/react3.png",
    //   "../assets/enemy/react/react4.png"
    // );
    // this.sprite.addAnimation(
    //   "reactLeft",
    //   "../assets/enemy/react/reactLeft.png",
    //   "../assets/enemy/react/reactLeft2.png",
    //   "../assets/enemy/react/reactLeft3.png",
    //   "../assets/enemy/react/reactLeft4.png"
    // );

    // this.sprite.addAnimation(
    //   "hit",
    //   "../assets/enemy/hit/hit.png",
    //   "../assets/enemy/hit/hit2.png",
    //   "../assets/enemy/hit/hit3.png",
    //   "../assets/enemy/hit/hit4.png",
    //   "../assets/enemy/hit/hit5.png",
    //   "../assets/enemy/hit/hit6.png",
    //   "../assets/enemy/hit/hit7.png",
    //   "../assets/enemy/hit/hit8.png"
    // );
    // this.sprite.addAnimation(
    //   "hitLeft",
    //   "../assets/enemy/hit/hitLeft.png",
    //   "../assets/enemy/hit/hitLeft2.png",
    //   "../assets/enemy/hit/hitLeft3.png",
    //   "../assets/enemy/hit/hitLeft4.png",
    //   "../assets/enemy/hit/hitLeft5.png",
    //   "../assets/enemy/hit/hitLeft6.png",
    //   "../assets/enemy/hit/hitLeft7.png",
    //   "../assets/enemy/hit/hitLeft8.png"
    // );

    this.sprite.addAnimation(
      "attack",
      "../assets/enemy/attack/attack.png",
      "../assets/enemy/attack/attack2.png",
      "../assets/enemy/attack/attack3.png",
      "../assets/enemy/attack/attack4.png",
      "../assets/enemy/attack/attack5.png",
      "../assets/enemy/attack/attack6.png",
      "../assets/enemy/attack/attack7.png",
      "../assets/enemy/attack/attack8.png",
      "../assets/enemy/attack/attack9.png",
      "../assets/enemy/attack/attack10.png",
      "../assets/enemy/attack/attack11.png",
      "../assets/enemy/attack/attack12.png",
      "../assets/enemy/attack/attack13.png",
      "../assets/enemy/attack/attack14.png",
      "../assets/enemy/attack/attack15.png",
      "../assets/enemy/attack/attack16.png",
      "../assets/enemy/attack/attack17.png",
      "../assets/enemy/attack/attack18.png"
    );
    this.sprite.addAnimation(
      "attackLeft",
      "../assets/enemy/attack/attackLeft.png",
      "../assets/enemy/attack/attackLeft2.png",
      "../assets/enemy/attack/attackLeft3.png",
      "../assets/enemy/attack/attackLeft4.png",
      "../assets/enemy/attack/attackLeft5.png",
      "../assets/enemy/attack/attackLeft6.png",
      "../assets/enemy/attack/attackLeft7.png",
      "../assets/enemy/attack/attackLeft8.png",
      "../assets/enemy/attack/attackLeft9.png",
      "../assets/enemy/attack/attackLeft10.png",
      "../assets/enemy/attack/attackLeft11.png",
      "../assets/enemy/attack/attackLeft12.png",
      "../assets/enemy/attack/attackLeft13.png",
      "../assets/enemy/attack/attackLeft14.png",
      "../assets/enemy/attack/attackLeft15.png",
      "../assets/enemy/attack/attackLeft16.png",
      "../assets/enemy/attack/attackLeft17.png",
      "../assets/enemy/attack/attackLeft18.png"
    );

    this.sprite.addAnimation(
      "dead",
      "../assets/enemy/death/dead.png",
      "../assets/enemy/death/dead2.png",
      "../assets/enemy/death/dead3.png",
      "../assets/enemy/death/dead4.png",
      "../assets/enemy/death/dead5.png",
      "../assets/enemy/death/dead6.png",
      "../assets/enemy/death/dead7.png",
      "../assets/enemy/death/dead8.png",
      "../assets/enemy/death/dead9.png",
      "../assets/enemy/death/dead10.png",
      "../assets/enemy/death/dead11.png",
      "../assets/enemy/death/dead12.png",
      "../assets/enemy/death/dead13.png",
      "../assets/enemy/death/dead14.png",
      "../assets/enemy/death/dead15.png"
    );
    // this.sprite.addAnimation(
    //   "deadLeft",
    //   "../assets/enemy/death/deadLeft.png",
    //   "../assets/enemy/death/deadLeft2.png",
    //   "../assets/enemy/death/deadLeft3.png",
    //   "../assets/enemy/death/deadLeft4.png",
    //   "../assets/enemy/death/deadLeft5.png",
    //   "../assets/enemy/death/deadLeft6.png",
    //   "../assets/enemy/death/deadLeft7.png",
    //   "../assets/enemy/death/deadLeft8.png",
    //   "../assets/enemy/death/deadLeft9.png",
    //   "../assets/enemy/death/deadLeft10.png",
    //   "../assets/enemy/death/deadLeft11.png",
    //   "../assets/enemy/death/deadLeft12.png",
    //   "../assets/enemy/death/deadLeft13.png",
    //   "../assets/enemy/death/deadLeft14.png",
    //   "../assets/enemy/death/deadLeft15.png"
    // );
  }

  showSelf() {
    drawSprite(this.sprite);
  }

  moveTowardsPlayer(playerX, playerY) {
    let run = playerX - this.sprite.position.x;
    let rise = playerY - this.sprite.position.y;
    let length = sqrt(rise * rise + run * run);
    // let length = sqrt(run * run);
    let unitX = run / length;

    this.chooseAnimation(run);
    this.sprite.position.x += unitX * this.speed;
    // this.sprite.rotation = Math.atan2(unitY, unitX);
  }

  handleMovement(player) {
    if (!this.sprite.displace(player.sprite)) {
      this.moveTowardsPlayer(
        player.sprite.position.x,
        player.sprite.position.y
      );
    } else {
      this.attacking = true;
      this.damagePlayer(player);
    }
  }

  reverseMap() {
    if (keyIsDown(65)) {
      //key = a
      this.sprite.position.x += this.xSpeed;
    }
    if (keyIsDown(68)) {
      //key = d
      this.sprite.position.x += -this.xSpeed;
    }
  }
  handleDeath() {
    this.sprite.remove();
  }
  
  damagePlayer(player) {
    if (player.health > 0) {
      player.health--;
    }
  }

  chooseAnimation(xDiff) {
    if (xDiff < 0) {
      this.sprite.changeAnimation("runLeft");
    } else {
      this.sprite.changeAnimation("run");
    }

    if (this.attacking) {
      if (xDiff < 0) {
        this.sprite.changeAnimation("attackLeft");
      } else {
        this.sprite.changeAnimation("attack");
      }
      this.attacking = false;
    }
  }
}
