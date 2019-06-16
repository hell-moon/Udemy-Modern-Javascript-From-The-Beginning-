/* Game Function:
- Player must guess a number between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/

// game variables
let min = 1,
	max = 5,
	winningNum = getWinningNum(),
	guessesLeft = 3;

// UI variables
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input');
message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', (e) => {
	console.log(e.target.className);
	if (e.target.className == 'play-again') {
		window.location.reload(); 
	}
});

// add event listener on submit button
guessBtn.addEventListener('click', guessFunc);

function guessFunc(e) {
	let guess = parseInt((guessInput.value));
	if (isNaN(guess) || guess < min || guess > max) {	//Guess is wrong
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	} else {
		// check if correct guess
		if (guess == winningNum) {
			gameOver('win');
		} else {
			if (guessesLeft == 0) {
				gameOver('lose');
			} else {
				continueGame();
			}
		}
	}
}

// set message function
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

function gameOver(state) {
	guessInput.disabled = true;
	if (state === 'win') {
		guessInput.style.borderColor = 'green'
		setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
	} else {
		guessInput.style.borderColor = 'red'
		setMessage(`GAME OVER! You ran out of guesses.  The winning number was ${winningNum}`, 'red');
	}

	// play again?
	guessBtn.value = 'Play Again?';
	guessBtn.className += 'play-again';
}

function continueGame() {
	guessInput.value = '';
	guessesLeft--;
	guessInput.style.borderColor = 'red'
	setMessage(`Wrong guess. You have ${guessesLeft} guesses left.`, 'red');
}

// randomize winning number
function getWinningNum(){
	// console.log(Math.floor(Math.random()*(max-min+1)+min));
	return (Math.floor(Math.random()*(max-min+1)+min));
}
