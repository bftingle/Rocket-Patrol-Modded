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

        this.rocket1 = new Rocket(this, game.config.width/2, game.config.height*2, 'rocket').setOrigin(0.5, 0);
        this.rocket2 = new Rocket(this, game.config.width/2, game.config.height*2, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket = new Fighter(this, game.config.width/2, game.config.height - borderUISize - borderPadding*2.5, 'fighter').setOrigin(0.5, 0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
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
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(R) to Restart or (M) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        this.firing = false;
    }

    update() {
        this.starfield1.tilePositionY -= starSpeed;
        this.starfield2.tilePositionY -= starSpeed + 1;
        this.starfield3.tilePositionY -= starSpeed + 2;

        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyR))) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
        
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.rocket1.update();
            this.rocket2.update();

            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if(this.checkCollision(this.rocket1, this.ship01)) {
            this.rocket1.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.rocket1, this.ship02)) {
            this.rocket1.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.rocket1, this.ship03)) {
            this.rocket1.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.rocket2, this.ship01)) {
            this.rocket2.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.rocket2, this.ship02)) {
            this.rocket2.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.rocket2, this.ship03)) {
            this.rocket2.reset();
            this.shipExplode(this.ship03);
        }

        if(this.firing) this.fireEvent();
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

    fireEvent() {
        let trajectory = this.aimAssist();
        if(trajectory == -1) {
            this.firing = true;
            return;
        }
        if(!this.rocket1.isFiring) {
            this.rocket1.x = trajectory;
            this.rocket1.y = this.p1Rocket.y;
            this.rocket1.fire();
            this.firing = false;
        } else if(!this.rocket2.isFiring) {
            this.rocket2.x = trajectory;
            this.rocket2.y = this.p1Rocket.y;
            this.rocket2.fire();
            this.firing = false;
        }
    }

    aimAssist() {
        let lowest = this.ship01;
        let mid = this.ship02;
        let highest = this.ship03;
        if(lowest.y < mid.y) {
            let temp = lowest;
            lowest = mid;
            mid = temp;
        }
        if(lowest.y < highest.y) {
            let temp = lowest;
            lowest = highest;
            highest = temp;
        }
        if(mid.y < highest.y) {
            let temp = mid;
            mid = highest;
            highest = temp;
        }
        if(Math.abs(lowest.x - this.p1Rocket.x) < borderUISize) return lowest.x;
        if(Math.abs(lowest.x - this.p1Rocket.x) < borderUISize*2) return -1;
        if(Math.abs(mid.x - this.p1Rocket.x) < borderUISize) return mid.x;
        if(Math.abs(mid.x - this.p1Rocket.x) < borderUISize*2) return -1;
        if(Math.abs(highest.x - this.p1Rocket.x) < borderUISize) return highest.x;
        if(Math.abs(highest.x - this.p1Rocket.x) < borderUISize*2) return -1;
        return this.p1Rocket.x;
    }
}