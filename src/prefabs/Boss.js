class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = game.settings.spaceshipSpeed/3.5;
        this.direction = 0;
        this.health = game.settings.bossHealth;
    }

    update() {
        if(this.direction == 0 && this.y > borderUISize*9) {
            this.direction = 1;
            this.scene.orb01.reset();
            this.clock = this.scene.time.delayedCall(333, () => {
                this.scene.orb02.reset();
            }, null, this.scene);
            this.clock = this.scene.time.delayedCall(666, () => {
                this.scene.orb03.reset();
            }, null, this.scene);
            this.clock = this.scene.time.delayedCall(999, () => {
                this.scene.orb04.reset();
            }, null, this.scene);
            this.scene.warning = false;
            this.scene.warningText.alpha = 0;
        }
        if(this.x < game.config.width/4 + borderUISize) this.direction = 1;
        if(this.x > 3 * (game.config.width/4) - borderUISize) this.direction = 2;
        if(this.direction == 0) this.y += this.moveSpeed;
        if(this.direction == 1) this.x += this.moveSpeed;
        if(this.direction == 2) this.x -= this.moveSpeed;
    }
}