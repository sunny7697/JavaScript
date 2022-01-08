"use strict";

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const dice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
let score, currentScore, activePlayer, isPlaying;
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // Generating a rolling dice
    const diceNum = Math.floor(Math.random() * 6 + 1);
    // Displaying dice
    dice.classList.remove("hidden");
    dice.src = `dice-${diceNum}.png`;

    // check for rolled dice 1
    if (diceNum !== 1) {
      // Add diceNum to current score
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    //   Add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check if player's score is already ?= 100
    if (score[activePlayer] >= 100) {
      // Finish the game
      isPlaying = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Restart the game
btnNew.addEventListener("click", init);
