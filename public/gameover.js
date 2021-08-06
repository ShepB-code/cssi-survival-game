function GameOver() {

    this.keyPressed = function() {
        this.sceneManager.showScene(Intro);
    }

    this.draw = function() {
        background("black");
        

        displayDeath();
    }

    function displayDeath() {
        textAlign(CENTER);
        fill("white");
        textSize(36);
        text("YOU DIED", camera.position.x , camera.position.y);

        textSize(14);
        text("Press Any Key to restart game", camera.position.x, camera.position.y + 50);
    }
}