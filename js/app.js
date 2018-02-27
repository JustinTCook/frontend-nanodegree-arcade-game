// Whole-script strict mode syntax
'use strict';

// Board positions for enemies
const Y_POSITIONS = [230, 140, 60];
const BOARD_WIDTH = 505;
const BOARD_HEIGHT = 606;

// Enemies our player must avoid
class Enemy {

  constructor(x, y){
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.width = 70;
    this.height = 40;

    this.speedMultiplier = 40;
    this.randomSpeed();
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt){
    // Check if enemy has moved off board
    if (this.x < BOARD_WIDTH) {
      // Multiply movement by dt parameter to ensure game runs
      // at same speed for all computers.
        this.x += (this.speed * dt);
    }
    else {
      this.reset();
    }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Reset position and choose random path and speed.
  reset(){
    let yPathIndex = Math.floor(Math.random() * Math.floor(3));
    this.x = -90;
    this.y = Y_POSITIONS[yPathIndex];
    this.randomSpeed();
  }

  // Assign random speed
  randomSpeed(){
    this.speed = this.speedMultiplier * Math.floor(Math.random() * 10 + 5);
  }

  // Taken from - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  checkCollisions(){
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
          this.collisionDetected();
      }
  }

  collisionDetected(){
    player.reset();
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(sprite = 'images/char-boy.png'){
    this.sprite = sprite;

    this.xPosStart = 202;
    this.yPosStart = 320;

    // Start new player at start positions
    this.x = this.xPosStart;
    this.y = this.yPosStart;

    this.width = 50;
    this.height = 50;
  }

  update(dt){
    // Reset player if they reach the finish line
    if(this.y < 0){
      this.reset();
    }
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyPress){
    // Center pixel positions of blocks
    var vertical = 83;
    var horizontal = 101;

    // Move player but keep them on board.
    if(keyPress == 'left' && this.x > 0) {
        this.x -= horizontal;
    }
    if(keyPress == 'right' && this.x < 400) {
        this.x += horizontal;
    }
    if(keyPress == 'up' && this.y > 3) {
        this.y -= vertical;
    }
    if(keyPress == 'down' && this.y < 400) {
        this.y += vertical;
    }
  }

  reset(){
    this.x = this.xPosStart;
    this.y = this.yPosStart;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
for(var i = 0; i < 3; i++){
  allEnemies.push(new Enemy(-180, Y_POSITIONS[i]));
}

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
