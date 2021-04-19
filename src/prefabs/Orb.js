class Orb extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, offset) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.offset = offset;
        this.moveSpeed = game.settings.spaceshipSpeed * 1.5;
    }

    update() {
        if(this.y > 0) this.y += this.moveSpeed;
        if(this.y >= game.config.height - this.height) {
            this.reset();
        }
    }

    reset() {
        this.x = this.scene.boss.x + this.offset;
        this.y = this.scene.boss.y;
    }
}