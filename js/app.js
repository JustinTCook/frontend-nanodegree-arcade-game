// Possible board positions
const xPositions = [200];
const yPositions = [];

// Enemies our player must avoid
class Enemy {
  constructor(x, y){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(sprite = 'images/char-boy.png'){
    this.sprite = sprite;
    this.x = 202;
    this.y = 320;
  }

  // Update the player's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }

  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyPress){
    var horizontal = 101;
    var vertical = 83;

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
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy(), new Enemy()];
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
