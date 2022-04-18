class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/Bubble.wav'); //https://freesound.org/people/Glaneur%20de%20sons/sounds/104941/
        this.load.audio('sfx_explosion', './assets/Splash.wav'); //https://freesound.org/people/daveincamas/sounds/59104/
        this.load.audio('sfx_rocket', './assets/FishingReel.wav'); //https://freesound.org/people/Krisboruff/sounds/17743/
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '30px',
            backgroundColor: '#32e659', 
            color: '#0008ff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //background color
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x5b8bf5).setOrigin(0, 0);
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'FISHING PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to cast', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#32e659';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            fishSpeed: 3,
            crabSpeed: 4,
            gameTimer: 60000,  
            gameMode: 0 
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            fishSpeed: 4,
            crabSpeed: 5,
            gameTimer: 45000,
            gameMode: 1
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}