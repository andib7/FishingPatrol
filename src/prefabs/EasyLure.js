// EasyLure prefab
class EasyLure extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track Lure's firing status
        this.goingDown = true;      //starts by going down
        this.moveSpeed = 3;         // pixels per frame
        this.sfxLure = scene.sound.add('sfx_rocket')  // add Lure sfx
    }
    
    update() {
        // left/right movement
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxLure.play();
            this.goingDown = true;
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding && this.goingDown == true) {
            this.y += this.moveSpeed;
        }
        else if (this.isFiring && this.y >= borderUISize * 3 + borderPadding && this.goingDown == false) {
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if (this.y >= game.config.height - borderUISize / 4) {
            this.goingDown = false;
        }
        else if (this.y < game.config.height / 3 - borderPadding) {
            this.reset();
            this.goingDown = true;
        }
    }

    // reset Lure to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height / 3 - borderPadding;
    }
}