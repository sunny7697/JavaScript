'use strict';

let myNumber = Math.floor(Math.random() * 20 + 1);
console.log(myNumber);
let HighScore = 0;
let Score = 20;

function querySelectorFunction(classname, ele, value) {
  ele === 'textContent'
    ? (document.querySelector(classname).textContent = value)
    : (document.querySelector(classname).value = value);
}

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    querySelectorFunction('.message', 'textContent', '⛔No Number!');
  } else if (guess !== myNumber) {
    if (Score > 1) {
      document.querySelector('.message').textContent =
        guess > myNumber ? '📈Too High!' : '📉Too Low!';
      document.querySelector('.score').textContent = --Score;
    } else {
      querySelectorFunction('.message', 'textContent', '💥You lost the game!');
      querySelectorFunction('.score', 'textContent', '0');
    }
  } else {
    querySelectorFunction('.message', 'textContent', '🎉Correct Guess');
    if (Score > HighScore) {
      HighScore = Score;
      querySelectorFunction('.highscore', 'textContent', HighScore);
    }
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    querySelectorFunction('.number', 'textContent', myNumber);
  }
});

document.querySelector('.again').addEventListener('click', function () {
  myNumber = Math.floor(Math.random() * 20 + 1);
  Score = 20;
  querySelectorFunction('.score', 'textContent', Score);
  querySelectorFunction('.number', 'textContent', '?');
  querySelectorFunction('.guess', 'value', '');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
