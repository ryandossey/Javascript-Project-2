'use strict';

// Declare variables
let randomNum = Math.floor(Math.random() * 100) + 1;
let attempts = 0;


// Get HTML elements
const hint = document.getElementById("hint");
const attemptsText = document.getElementById("attempts");

// optionally add a parameter for how large a board to create
function createBoard() {
    const numberButtonsContainer = document.getElementById("numberButtons");

    // reminder: each number button should store the value as a data- property
    // Clear any existing buttons
    numberButtonsContainer.innerHTML = '';

  // Create buttons for numbers 1 to 100
  for (let i = 1; i <= 100; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    // Store the value as a data- property
    button.setAttribute("data-value", i); 
    button.addEventListener("click", function() {
      const value = parseInt(this.getAttribute("data-value"));
      makeGuess(value);
    });
    numberButtonsContainer.appendChild(button);
  }
}

function guessNumber(event) {
    const clickedButton = event.target;
    const userValue = parseInt(clickedButton.dataset.value);
    makeGuess(userValue);
} 
// takes an event from the number being clicked on

function makeGuess(userValue) {
  
  const selectedButton = document.querySelector(`#numberButtons button[data-value="${userValue}"]`);

  attempts++;
  // Update attempts text
  attemptsText.textContent = "Attempts: " + attempts;

  if (userValue === randomNum) {
    hint.textContent = `${userValue} is correct!`;
    document.querySelectorAll("#numberButtons button").forEach(button => {
      selectedButton.classList.add('correct');
      button.disabled = true;

    });
    // Enable tryAgain button
    document.getElementById("tryAgain").disabled = false; 
    gameFinished = true; 
  } else if (userValue < randomNum) {
    hint.textContent = `${userValue} is too low! Try again.`;
    document.querySelectorAll("#numberButtons button").forEach(button => {
      selectedButton.classList.add('too-low'); 
      selectedButton.disabled = true;
    });

  } else {
    hint.textContent = `${userValue} is too high! Try again.`;
    document.querySelectorAll("#numberButtons button").forEach(button => {
      selectedButton.classList.add('too-high');
      selectedButton.disabled = true;
    });

  }
}

function tryAgain() {
      // Generate a new random number
  randomNum = Math.floor(Math.random() * 100) + 1;

  createBoard(); 
  attempts = 0; 
  // Update attempts text
  attemptsText.textContent = "Attempts: " + attempts;
  // Update attempts text
  hint.textContent = ""; 
  document.getElementById("tryAgain").disabled = false;
} // connected to a try again / replay button

function init() {
    createBoard();
    const numberButtons = document.querySelectorAll("#numberButtons button");

    document.getElementById("tryAgain").addEventListener("click", tryAgain);

    // add event listeners here
}

init();
