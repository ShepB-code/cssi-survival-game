function Intro() {
    let toggleInstructions = false;
    let instructWidth, instructHeight;

    this.setup = function() {
        instructWidth = 500;
        instructHeight = 350;
    }

    this.draw = function() {
        image( this.sceneManager.bkImage, 0, 0);
        drawIntroScreen();
    }

    this.keyPressed = function() {
        if(key == 'Enter') {
            this.sceneManager.showScene( Game, key );
        }

        if(key == ' ') {
            if(!toggleInstructions) {
                toggleInstructions = true;
            } else {
                toggleInstructions = false;
            }
        }
    }

    function drawIntroScreen() {
        // move the background at a constant speed
        moveBackgrounds();

        // displaying text on the screen
        if(!toggleInstructions) {
            displayTitle();
        } else {
            displayInstructions();
        }
    }

    function displayTitle() {
        textAlign(CENTER);
        textSize(36);
        fill("white");
        text("ADVENTURER BOI", camera.position.x, camera.position.y);
        displayText();
    }

    function displayText() {
        textAlign(CENTER);
        textSize(14);
        fill("white");
        text("Press ENTER to Start", camera.position.x, camera.position.y + 40);
        text("Press SPACE for Instructions", camera.position.x, camera.position.y + 70);
    }

    function displayHelp() {
        textAlign(CENTER);
        textSize(10);
        fill("black");
        text("1) Press A and D to move left and right", camera.position.x, camera.position.y - 150);
        text("2) Press E to pick up items", camera.position.x, camera.position.y - 120);
        text("3) Press I to craft items", camera.position.x, camera.position.y - 90);
        text("4) Press Left Click to eat food/use weapon", camera.position.x, camera.position.y - 60);
        text("5) Press Horizontal Arrows to navigate crafting", camera.position.x, camera.position.y - 30);
        text("CRAFTING", camera.position.x, camera.position.y + 10);
        text("2 Wood + 1 Thread = Bow", camera.position.x, camera.position.y + 40);
        text("3 Wood = Sword", camera.position.x, camera.position.y + 70);
    }

    function displayInstructions() {
        rectMode(CENTER);
        fill("white");
        rect(camera.position.x, camera.position.y, instructWidth, instructHeight);
        
        displayHelp();
    }

    function moveBackgrounds() {
        // set the current xPosition, so we don't see tear
        let xPos = -465;

        drawBackgrounds();

        // using the Background class to move each layer smoothly
        layersArray.forEach((layer) => {
          layer.moveSelf(true, xPos); //moveSelf(directionBoolean, currentXposition)
        });
    }

    function drawBackgrounds() {
        // rendering each layer of the background
        layersArray.forEach((layer) => {
          layer.showSelf();
        });
    }
}