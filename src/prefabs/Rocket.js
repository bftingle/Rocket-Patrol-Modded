class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.alpha = 0;

        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height*2;
        this.alpha = 0;
    }

    fire() {
        this.isFiring = true;
        this.sfxRocket.play();
        this.alpha = 1;
    }
}