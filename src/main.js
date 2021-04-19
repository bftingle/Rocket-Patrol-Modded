//Ben Tingley
//Rocket Ace
//4/19/21
//~20 Hours I Think

//Implement parallax scrolling (10)
//Create a new spaceship type (w/ new artwork) (20)
//Create and implement a new weapon (w/ new behavior) (20)
//Created Demo Mode for quick playthrough (5)
//Made collision between spaceships and the player deal damage and initiate a flashing recovery phase (10)
//Created a health bar for the player (5)
//Created warning text that fades in and out (5)
//Created Aim Assist to help close shots hit targets (5)
//Created a movement ability to dodge (w/ animation) (10)
//Created a full boss fight (20)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 800,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 25;
let borderPadding = borderUISize / 3;
let starSpeed = 0.5;

let keyF, keyR, keyM, keyD, keyLEFT, keyRIGHT, keySPACE;