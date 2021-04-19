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