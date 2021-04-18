class Fighter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isDodging = false;
        this.isRecovering = false;
        this.moveSpeed = 1;
        this.health = game.settings.fighterHealth;

        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.fireEvent();
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isDodging) {
            this.isDodging = true;
            this.moveSpeed = 3;
            this.play('fighterflip');
            this.on('animationcomplete', () => {
                this.moveSpeed = 1;
                this.clock = this.scene.time.delayedCall(100, () => {
                    this.isDodging = false;
                }, null, this.scene);
            });
            this.sfxRocket.play();
        }
    }

    reset() {}

    recover(telomere) {
        if(telomere < 1) {
            this.alpha = 1;
            this.isRecovering = false;
            return;
        }
        if(this.alpha == 1) this.alpha = 0;
        else this.alpha = 1;
        this.clock = this.scene.time.delayedCall(100, () => {
            this.recover(telomere - 1);
        }, null, this.scene);
    }
}