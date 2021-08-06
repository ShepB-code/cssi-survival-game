function Intro() {
    let toggleInstructions = false;
    let instructWidth, instructHeight;
    let xPos;

    this.enter = function() {
        camera.position.x = 0;
        camera.position.y = height / 2 + 200;
    }

    this.setup = function() {
        instructWidth = 500;
        instructHeight = 350;

        initializeBackground();
        
        xPos = -465;
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

    function initializeBackground() {
        layersArray = [];
        backgroundLayer1 = new Background(l1, l1, 0.5);
        backgroundLayer2 = new Background(l2, l2, 0.75);
        backgroundLayer3 = new Background(l3, l3, 1);
        backgroundLayer3Lights = new Background(l3Lights, l3Lights, 1.5);
        backgroundLayer4 = new Background(l4, l4, 1.75);
        backgroundLayer5 = new Background(l5, l5, 2);
        backgroundLayer5Lights = new Background(l5Lights, l5Lights, 2.5);
        backgroundLayer6 = new Background(l6, l6, 2.75);
        backgroundLayer7 = new Background(l7, l7, 3);
        backgroundLayer8 = new Background(l8, l8, 3.75);
        backgroundLayer9 = new Background(l9, l9, 4);
        
        layersArray.push(backgroundLayer1);
        layersArray.push(backgroundLayer2);
        layersArray.push(backgroundLayer3);
        layersArray.push(backgroundLayer3Lights);
        layersArray.push(backgroundLayer4);
        layersArray.push(backgroundLayer5);
        layersArray.push(backgroundLayer5Lights);
        layersArray.push(backgroundLayer6);
        layersArray.push(backgroundLayer7);
        layersArray.push(backgroundLayer8);
        layersArray.push(backgroundLayer9);
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
        // using the Background class to move each layer smoothly
        layersArray.forEach((layer) => {
          layer.moveSelf(true, xPos); //moveSelf(directionBoolean, currentXposition)
        });

        // set the current xPosition, so we don't see tear
        drawBackgrounds();
    }

    function drawBackgrounds() {
        // rendering each layer of the background
        layersArray.forEach((layer) => {
          layer.showSelf();
        });
    }
}