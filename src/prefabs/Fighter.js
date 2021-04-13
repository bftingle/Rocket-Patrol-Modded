class Fighter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.isDodging = false;
        this.moveSpeed = 1;

        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
            
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isDodging) {
            this.isDodging = true;
            this.moveSpeed = 3;
            this.play('fighterflip');
            this.on('animationcomplete', () => {
                this.moveSpeed = 1;
                this.clock = this.scene.time.delayedCall(400, () => {
                    this.isDodging = false;
                }, null, this.scene);
            });
            this.sfxRocket.play();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}