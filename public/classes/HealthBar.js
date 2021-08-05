class HealthBar {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
  }

  showSelf(player) {
    fill("red");
    rect(this.x, this.y, 200, 25);
    this.takeDamage(player);
  }
  
  takeDamage(player) {
    fill("green");
    rect(this.x, this.y, player.health * 2, 25);
  }

  updatePosition(canvasX, canvasY) {
    this.x = canvasX;
    this.y = canvasY;
  }
}
