class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('spaceshipVert', './assets/spaceshipVert.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfieldClr', './assets/starfieldClr.png');
        this.load.image('starfieldBig', './assets/starfieldBig.png');
        this.load.image('fighter', './assets/fighter.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

        this.load.spritesheet('fighteranim', './assets/fighteranim.png', {
            frameWidth: 48,
            frameHeight: 24,
            startFrame: 0,
            endFrame: 24
        });
    }
    
    create() {
        this.starfield1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfieldClr').setOrigin(0, 0);
        this.starfield3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfieldBig').setOrigin(0, 0);

        this.ship01 = new Spaceship(this, borderUISize*2 + (Math.random() * (game.config.width - borderUISize*2)), 0 - borderUISize*8, 'spaceshipVert', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, borderUISize*2 + (Math.random() * (game.config.width - borderUISize*2)), 0 - borderUISize*4, 'spaceshipVert', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, borderUISize*2 + (Math.random() * (game.config.width - borderUISize*2)), 0, 'spaceshipVert', 0, 10).setOrigin(0, 0);
        
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        this.p1Rocket = new Fighter(this, game.config.width/2, game.config.height - borderUISize - borderPadding*2.5, 'fighter').setOrigin(0.5, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        this.anims.create({
            key: 'fighterflip',
            frames: this.anims.generateFrameNumbers('fighteranim', {
                start: 0,
                end: 24,
                first: 0
            }),
            frameRate: 60
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.starfield1.tilePositionY -= starSpeed;
        this.starfield2.tilePositionY -= starSpeed + 1;
        this.starfield3.tilePositionY -= starSpeed + 2;

        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyR) || Phaser.Input.Keyboard.JustDown(keyF))) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        if (!this.gameOver) {
            this.p1Rocket.update();

            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        ship.reset();
        boom.on('animationcomplete', () => {
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}