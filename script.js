'use strict';

const player0El = document.querySelector('.player0');
const player1El = document.querySelector('.player1');
const score0 = document.querySelector('#score0');
const score1 = document.getElementById('score1'); //another way of getting the score using ID(Both are same)
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, playing, currentScore, activePlayer;
const Initialization = function () {
  score0.textContent = 0; //Puttin back scores to zero
  score1.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

Initialization();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling functions
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating  a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check if dice num is 1 if yes turn to next player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add curr score to active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player score is 100 if yes finish game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player${activePlayer}`)
        .classList.remove('player--active');
    }
    //If not switch to next player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  Initialization();
});
