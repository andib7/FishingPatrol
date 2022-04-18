class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('lure', './assets/Hook.png');
        this.load.image('fish', './assets/Marlin1.png');
        this.load.image('crab', './assets/Crab.png');
        this.load.image('horizon', './assets/Background.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite
        this.horizon = this.add.tileSprite(0, 0, 640, 480, 'horizon').setOrigin(0, 0);

        // add Lure (p1)
        if(game.settings.gameMode == 0){
            this.p1Lure = new EasyLure(this, game.config.width / 2, game.config.height / 3 - borderPadding, 'lure').setOrigin(0.5, 0);
        }
        else if(game.settings.gameMode == 1){
            this.p1Lure = new Lure(this, game.config.width / 2, game.config.height / 3 - borderPadding, 'lure').setOrigin(0.5, 0);
        }
        
        // add Fish (x3)
        this.fish01 = new Fish(this, game.config.width, borderUISize*7, 'fish', 0, 20).setOrigin(0, 0);
        this.fish02 = new Fish(this, game.config.width + borderUISize*3, borderUISize*9.5, 'fish', 0, 20).setOrigin(0,0);
        this.fish03 = new Fish(this, game.config.width + borderUISize*6, borderUISize*12, 'fish', 0, 20).setOrigin(0,0);
        this.crab = new Crab(this, game.config.width + borderUISize * 6, game.config.height-borderPadding*2, 'crab', 0, 50).setOrigin(0, 0);
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
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

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.horizon.tilePositionX -= 1;  // update tile sprite

        if(!this.gameOver) {
            this.p1Lure.update();             // update p1
            this.fish01.update();               // update fish (x3)
            this.fish02.update();
            this.fish03.update();
            this.crab.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Lure, this.fish03)) {
            this.p1Lure.reset();
            this.shipExplode(this.fish03);
        }
        if (this.checkCollision(this.p1Lure, this.fish02)) {
            this.p1Lure.reset();
            this.shipExplode(this.fish02);
        }
        if (this.checkCollision(this.p1Lure, this.fish01)) {
            this.p1Lure.reset();
            this.shipExplode(this.fish01);
        }
        if (this.checkCollision(this.p1Lure, this.crab)) {
            this.p1Lure.reset();
            this.shipExplode(this.crab);
        }
    }

    checkCollision(lure, fish) {
        // simple AABB checking
        if (lure.x < fish.x + fish.width && 
            lure.x + lure.width > fish.x && 
            lure.y < fish.y + fish.height &&
            lure.height + lure.y > fish. y) {
                game.settings.gameTimer += 3000;
                return true;
        } else {
            return false;
        }
    }

    shipExplode(fish) {
        // temporarily hide fish
        fish.alpha = 0;                         
        // create explosion sprite at fish's position
        let boom = this.add.sprite(fish.x, fish.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            fish.reset();                         // reset fish position
            fish.alpha = 1;                       // make fish visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += fish.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }
}