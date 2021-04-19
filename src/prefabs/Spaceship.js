class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
    }

    update() {
        this.y += this.moveSpeed;
        if(this.y >= game.config.height - this.height) {
            this.reset();
        }
    }

    reset() {
        this.x = borderUISize*2 + (Math.random() * (game.config.width - borderUISize*4));
        if(!this.scene.phaseOver) this.y = 0;
        else this.y = game.config.height * 3;
    }
}