'use strict';

// selecting elements
const playerElement1 = document.querySelector('.player-1');
const playerElement2 = document.querySelector('.player-2');


const firstPlayerScore = document.querySelector('.score-1');
const secondPlayerScore = document.querySelector('.score-2');

let firstPlayerCurrentScore = document.querySelector('.currentscore-1');
let secondPlayerCurrentScore = document.querySelector('.currentscore-2');

const diceImage = document.querySelector('.dice');

// buttons
const rollDice = document.querySelector('#roll-dice');
const holdCurrentScore = document.querySelector('#hold');
const playAgain = document.querySelector('#New-game');
const gotit = document.querySelector('#got-it');
const winningPlayAgain = document.querySelector('#play-again');
const winPopUp = document.querySelector('.win');

// pop up message for rules
const rules = document.querySelector('.rules-popup');
const winningPopup = document.querySelector('.winningmessage');
const win = document.querySelector('.win');
const overlay = document.querySelector('.overlay');

//audio
const clickAudio = document.querySelector('.clickaudio');
const diceAudio = document.querySelector('.diceaudio');
const loosingAudio = document.querySelector('.loosingaudio');
const startingAudio = document.querySelector('.startingaudio');
const holdAudio = document.querySelector('.holdaudio');
const winningAudio = document.querySelector('.winningaudio');
const resetAudio = document.querySelector('.resetaudio');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 1;
let playing = true;

const initialGame = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 1;
    playing = true;


    diceImage.classList.add('hidden');
    playerElement1.classList.remove('player--winning');
    playerElement2.classList.remove('player--winning');

    playerElement1.classList.add('player--active');
    playerElement2.classList.remove('player--active');

    firstPlayerScore.textContent = 0;
    secondPlayerScore.textContent = 0;
    firstPlayerCurrentScore.textContent = 0;
    secondPlayerCurrentScore.textContent = 0;
    resetAudio.play();

    winPopUp.classList.add('hidden');
    overlay.classList.add('hidden');
}

initialGame();

const switchPlayer = function(){
    currentScore = 0;
    document.querySelector(`.currentscore-${activePlayer}`).textContent = 0;
    playerElement1.classList.toggle('player--active');
    playerElement2.classList.toggle('player--active');
    activePlayer = activePlayer === 1 ? 2 : 1;

}

// adding functinality to button - Roll Dice
rollDice.addEventListener('click', function(){
    diceAudio.play();
    if(playing){
        //diceAudio.play();
        console.log("button clicked");

         // generate a number from 1 to 6 on dice
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(diceNumber);

        // display dice image
        diceImage.classList.remove('hidden');
        diceImage.src = `dice${diceNumber}.png`;

        // check diceNumber: if 1 : switch player else add number to current score
        if(diceNumber!== 1){
            currentScore += diceNumber;
            document.querySelector(`.currentscore-${activePlayer}`).textContent = currentScore;

            //firstPlayerCurrentScore.textContent = currentScore;
        }else{
            loosingAudio.play();
            switchPlayer();
        }
    }
});

// implementing holding current score functionality for hold button
holdCurrentScore.addEventListener('click', function(){
    if(playing){
        holdAudio.play();
        // adding current score to player score
        scores[activePlayer - 1] += currentScore;
        document.querySelector(`.score-${activePlayer}`).textContent = scores[activePlayer - 1];

        //check if score >= 100
        // if yes finish the game
        if(scores[activePlayer - 1] >= 20){
            // finish game
            playing = false;
            winningAudio.play();
            diceImage.classList.add('hidden');
            document.querySelector(`.player-${activePlayer}`).classList.add('player--winning');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player--active');
            win.classList.remove('hidden');
            overlay.classList.remove('hidden');
            winningPopup.textContent = `player-${activePlayer} win the match`;

        }else{
            //switch to next player
            switchPlayer();
        }

    }
});

// reset the game for play again button
playAgain.addEventListener('click', initialGame);

window.onload = function(){
    rules.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

gotit.addEventListener('click', function(){
    startingAudio.play();
    rules.classList.add('hidden');
    overlay.classList.add('hidden');
})

// reset the game for play again button
winningPlayAgain.addEventListener('click', initialGame);
