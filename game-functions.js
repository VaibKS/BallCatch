/*
	Submitted By,
	Vaibhav Shinde
	github.com/VaibKS
*/

var canvas = document.getElementById("game");

var c = canvas.getContext('2d');


const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
var score = 0;
var life = 3;

var sliderX = 30,
	sliderY = 40,
	sliderH = 100,
	sliderW = 25;

//  Classes
class Game {
	constructor(gamewidth, gameheight) {
		this.gamewidth = gamewidth;
		this.gameheight = gameheight;
	}
	start() {
		this.stick = new Stick(this);
		this.blackball = new Blackball(this);
		this.greenball = new Greenball(this);
		this.redball = new Redball(this);
		this.blueball = new Blueball(this)

		var blackballs = [];

		this.gameObject = [
			this.blackball,
			this.greenball,
			this.redball,
			this.blueball,
			this.stick,
		];


		new InputHandler(this.stick);

	}
	draw(c) {

		this.gameObject.forEach(object => object.draw(c));

		c.font = "20px Roboto";
		c.fillStyle = "black";
		c.fillText("Lives Left: " + life, 10, 30);

		c.fillText("Score : " + score, GAME_WIDTH - 100, 30); 

	}
	update(change) {

		this.gameObject.forEach(object => object.update(change));

	}
}

function getRandom(start, end) {
	return Math.floor((Math.random() * end) + start);
}

class Blackball {
	constructor(game) {
		this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		this.y = getRandom(0, GAME_HEIGHT - 30);
		this.image = document.getElementById('blackball')
		//add code here3
	}

	touch() {
		if(this.x > 30)
			return false;
		
		var touchPosY = this.y + 15;

		if(touchPosY >= sliderY && touchPosY <= sliderY + sliderH) {
			return true;
		}
	}

	draw(c) {
		c.drawImage(this.image, this.x, this.y, 30, 30);

		if(this.touch()) {
			score += 5;
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
	}

	update(change) {
		this.x -= change * 0.4;

		if(this.x < 0) {
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
		// add code here
	}

}

// Greeen ball


class Greenball {
	constructor(game) {
		this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		this.y = getRandom(0, GAME_HEIGHT - 30);
		this.image = document.getElementById('greenball')
		//add code here3
	}

	touch() {
		if(this.x > 30)
			return false;
		
		var touchPosY = this.y + 15;

		if(touchPosY >= sliderY && touchPosY <= sliderY + sliderH) {
			return true;
		}
	}

	draw(c) {
		c.drawImage(this.image, this.x, this.y, 30, 30);

		if(this.touch()) {
			score += 5;
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
	}

	update(change) {
		this.x -= change * 0.4;

		if(this.x < 0) {
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
		// add code here
	}
}



class Redball {
	constructor(game) {
		this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		this.y = getRandom(0, GAME_HEIGHT - 30);
		this.image = document.getElementById('redball')
		//add code here3
	}

	touch() {
		if(this.x > 30)
			return false;
		
		var touchPosY = this.y + 15;

		if(touchPosY >= sliderY && touchPosY <= sliderY + sliderH) {
			return true;
		}
	}

	draw(c) {
		c.drawImage(this.image, this.x, this.y, 30, 30);

		if(this.touch()) {
			console.log("red touched. one life gone.");
			life -= 1;
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
			if(life == 0) {
				alert("Sorry, you are out of lives... Final Score: " + score);
				game = new Game(GAME_WIDTH, GAME_HEIGHT);
				game.start();
				life = 3;
				score = 0;
			}
		}
	}

	update(change) {
		this.x -= change * 0.4;

		if(this.x < 0) {
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
		// add code here
	}
}
// blue ball

class Blueball {
	constructor(game) {
		this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		this.y = getRandom(0, GAME_HEIGHT - 30);
		this.image = document.getElementById('blueball')
		//add code here3
	}

	touch() {
		if(this.x > 30)
			return false;
		
		var touchPosY = this.y + 15;

		if(touchPosY >= sliderY && touchPosY <= sliderY + sliderH) {
			return true;
		}
	}

	draw(c) {
		c.drawImage(this.image, this.x, this.y, 30, 30);

		if(this.touch()) {
			score += 5;
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
	}

	update(change) {
		this.x -= change * 0.4;

		if(this.x < 0) {
			this.x = getRandom(GAME_WIDTH, GAME_WIDTH + 100);
		}
		// add code here
	}
}


class Stick {
	constructor(game) {
		this.x = sliderX;
		this.y = sliderY;
		this.height = sliderH;
		this.width  = sliderW;
		this.direction = 0;
		// add code here
	}

	moveUp() {
		this.direction = -1;
		//add code here
	}
	moveDown() {
		this.direction = 1;
		// add code here
	}
	
	stop() {
		this.direction = 0;
	}

	draw(c) {
		c.beginPath();
		c.rect(this.x, this.y, this.width, this.height);
		c.fillStyle = "#ffac00";
		c.fill();
	
	}
	update(change = 0) {
		
		if(sliderY + sliderH > GAME_HEIGHT && this.direction == 1) {
			this.direction = 0;
		}

		if(sliderY < 0 && this.direction == -1) {
			this.direction = 0;
			this.y = 0;
		}

		this.y += this.direction * change;
		sliderY = this.y;

	}
}

class InputHandler {
	constructor(stick) {
		document.addEventListener('keyup', (event) => {

			switch (event.keyCode) {
				case 38:
					stick.moveUp();
					break;
				case 40:
					stick.moveDown();
					break;
				case 83: // s
					stick.stop();
					break;
			}
		});
	}
}

// Classes end

//  Raw code

var previous = 0;

var game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();


function gameLoop(position) {
	var change = position - previous;
	previous = position;
	c.clearRect(0, 0, innerWidth, innerHeight);

	game.draw(c);
	game.update(change);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);