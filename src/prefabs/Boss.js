class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = game.settings.spaceshipSpeed/3.5;
        this.direction = 0;
    }

    update() {
        if(this.direction == 0 && this.y > borderUISize*9) this.direction = 1;
        if(this.x < game.config.width/4 + borderUISize) this.direction = 1;
        if(this.x > 3 * (game.config.width/4) - borderUISize) this.direction = 2;
        if(this.direction == 0) this.y += this.moveSpeed;
        if(this.direction == 1) this.x += this.moveSpeed;
        if(this.direction == 2) this.x -= this.moveSpeed;
    }
}