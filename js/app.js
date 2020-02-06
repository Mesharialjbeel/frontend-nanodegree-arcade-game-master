
class ScoreConut {
	constructor() {
		this.startOver();
    }
    startOver() {
        this.gemScore = 0;
    }
	render() {
		ctx.font = "30px Arial";
		ctx.fillText(`Score: ${this.gemScore}`, 150, 40);
		
	}
	increase() {
		this.gemScore += 10;
		//when player get 100 he will win
		if (this.gemScore===100){
			confirm('You won the game!');
			player.gameIsWon();
			this.startOver();
			
		}
	}
	
}

let ScoreC = new ScoreConut();


// Enemies our player must avoid
class Enemy {
	constructor(x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;

        this.velocity = 100 + (Math.random() * 100); // velcity will be between 100 and 200
        //this.velocity = 0;
    }

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(delte) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x += this.velocity * delte;
		
		// Restarts enemy movement 
		if (this.x > 505) {
			this.x = -150;
			this.movement = 150 + Math.floor(Math.random() * 800);

		}

		
	};
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

function checkCollisions() {
    if(player.numberOfLives < 1) { return; }

    allEnemies.forEach(bug => {
        if(Math.abs(bug.x - player.x)< 50 && Math.abs(bug.y - player.y)< 50) {
            player.startOver();
        }
    });

  
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		this.movement = movement;
		this.sprite = 'images/char-boy.png';
	}
	update() {
		// Stops Player from moving off the left/right side of canvas
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// Once player reaches the water, 100 points will be added to their game score
		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			ScoreC.increase();
		}
	}
	startOver() {
        this.x = 200;
        this.y = 380;
        this.pauseGame = false;
        this.winner = false;

	}
	gameIsWon() {
        
        this.pauseGame = true;
        this.winner = true;
       
    }
	
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Moves Player with keyboard arrow keys
	handleInput(direction) {
		//when player win restart the game
		if(this.pauseGame) { 
                if(this.winner) {
					ScoreC.startOver();
					player.startOver();
                }
            
        }
        switch(direction) {
            case "right":
                if(this.x<400) {
                    this.x += 100;
                }
                
                break;
            case "left":
                if(this.x>50) {
                    this.x -= 100;
                }
                
                break;
            case "up":
                if(this.y>50) {
                    this.y -= 82;
                }
                
                break;
            case "down":
                if(this.y<500) {
                    this.y += 82;
                }
                
                break;
            default:
                break;
        }
    }
}
// Now instantiate your objects.
let allEnemies = [];
// Canvas position of created enemies and player x, y, movement
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
	
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
