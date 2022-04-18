//Name: Andi Barron - Project Title: Fishing Patrol - Date Completed: 18 April 2022 - Time to complete: 13-15hrs

//Points Breakdown:
//
//(60) Redesign the game's artwork, UI, and sound to change its theme/aesthetic
//--Turned it into a fishing game (changed sound, UI and, artwork)
//(20) Create and implement a new weapon
//--Easy mode has an easier fishing rod (it comes back up if missed)
//(20) Create a new spaceship type 
//--Crab walks at the bottom and is faster + worth more points 
//Total points: 100

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;