/*
  global
  text, sqrt
  
  createSprite, drawSprite
*/

class Enemy {
  constructor(x) {
    this.sprite = createSprite(x, height + 120, 50, 50);
    this.x = x;
    this.speed = 0.5;
  }

  showSelf() {
    drawSprite(this.sprite);
  }

  moveTowardsPlayer(playerX) {
    let run = playerX - this.sprite.position.x;
    // let rise = playerY - this.sprite.position.y;
    // let length = sqrt((rise*rise) / (run*run));
    let length = sqrt(run * run);
    let unitX = run / length;
    // let unitY = rise / length;

    this.sprite.position.x += unitX * this.speed;
    // this.sprite.rotation = Math.atan2(unitY, unitX);
  }

  handleMovement(player) {
    if (!this.sprite.collide(player.sprite)) {
      this.moveTowardsPlayer(
        player.sprite.position.x,
        player.sprite.position.y
      );
    }
  }
}
