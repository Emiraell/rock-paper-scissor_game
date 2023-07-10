/* event listeners for all the buttons*/
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
  getPlayer ();
}
})

document.querySelector('.js-getPlayerBtn')
.addEventListener('click', () => { 
  getPlayer ();
})

document.querySelector('.js-rock')
.addEventListener ('click', () => {
  playGame('rock');
})

document.querySelector('.js-paper')
.addEventListener ('click', () => {
  playGame('paper');
})

document.querySelector('.js-scissor')
.addEventListener ('click', () => {
  playGame('scissor');
})

document.querySelector('.js-resetBtn')
.addEventListener ('click', () => {
  reset ();
})

document.querySelector('.js-autoPlay')
.addEventListener ('click', () => {
  playAuto ();
})

document.querySelector('.js-champ')
.addEventListener ('click', () => {
  champ ();
})


let score = JSON.parse(localStorage.getItem('outcome')) ||
 {
  wins: 0,
  ties: 0,
  losses: 0
};

let playerNames = {
  firstPlayer: 'Computer One',
  secondPlayer: 'Computer Two'
};


/*play the game after collecting player datas*/
let result ='';
let compMove ='';

let infoDiv = document.getElementById('info');
const outcomeDiv = document.getElementById('gameOutcome');
const playerMoves = document.querySelector('.js-moves');
const WinnerRender = document.querySelector('.js-display');
const scoreRender = document.querySelector('.js-playersScore');

function playGame (playerPick) {
checkPlayerRender ();
computerPick ();

if (playerPick === 'rock') {
  if (playerPick === compMove) {
    result = 'tie';
  } else if (compMove === 'paper') {
    result = `${playerNames.firstPlayer} win`;
  } else {
    result = `${playerNames.secondPlayer} win`;
  }
} else if (playerPick === 'paper') {
  if (playerPick === compMove) {
    result = 'tie';
  } else if (compMove === 'scissor') {
    result = `${playerNames.firstPlayer} win`;
  } else {
    result = `${playerNames.secondPlayer} win`;
  }
} else {
  if (playerPick === compMove) {
    result = 'Tie';
  } else if (compMove === 'rock') {
    result = `${playerNames.firstPlayer} win`;
  } else {
    result = `${playerNames.secondPlayer} win`;
  }
}

/*Get the score from the game aftermath of each move*/
if (result === 'Tie') {
  score.ties++;
} else if (result === `${playerNames.secondPlayer} win`) {
  score.losses++;
} else {
  score.wins++;
}

/*store in local storage to avoid loss of result*/
localStorage.setItem('outcome', JSON.stringify(score));

playerMoves.innerHTML = `
  <div> 
    <p>${playerNames.firstPlayer}</p> 
    <button class = "htmlBtn">
      <img class = "htmlImage" src = "images/${playerPick}.PNG">
    </button>
  </div>
  <div>
    <p>${playerNames.secondPlayer}</p> 
    <button class = "htmlBtn">
      <img class = "htmlImage" src = "images/${compMove}.PNG"> 
    </button> 
  </div>
`;
WinnerRender.innerHTML = `${result}`;
scoreRender.innerHTML = `
${playerNames.firstPlayer} Wins: ${score.wins} Ties: ${score.ties} 
${playerNames.secondPlayer} Wins: ${score.losses}`;

/*hid/remove info elements*/
infoDiv.hidden = true;
outcomeDiv.classList.add('outcome');
}

/*select a move for the second player/computer*/
function computerPick() {
  let computerTurn = Math.floor(Math.random() * 3);
  if (computerTurn === 0) {
    compMove = 'rock';
  } else if (computerTurn === 1) {
    compMove = 'paper';
  } else {
    compMove = 'scissor';
  }
  return compMove;
} 


/*Getting the elements needed to get the player names
  and display them on the page*/
let inputElement = document.querySelector('.js-Nameinput');
let playerHeaderElement = document.getElementById('nameInputHeader');
let playerOneName = document.getElementById('playerOneHeader');
let playerTwoName = document.getElementById('playerTwoHeader');
const playerOneRender = document.getElementById('playerOneName');
const playerTwoRender = document.getElementById('playerTwoName'); 
const playersDiv = document.querySelector('.js-playersDiv');

/*get the players name*/
function getPlayer () {
  playerOneName.innerHTML = 'player one';
  playerTwoName.innerHTML = 'player two';
  /*add a class to be styled for the player names output*/
  playersDiv.classList.add('playersDiv');
  
  if ( playerHeaderElement.innerHTML === 'player one name') {
    firstPlayer = inputElement.value;
    if (inputElement.value === '') {
      playerOneRender.innerHTML = playerNames.firstPlayer;
    } else {
      playerNames.firstPlayer = firstPlayer;
      playerOneRender.innerHTML = playerNames.firstPlayer;
    }
    inputElement.value = ''
    playerHeaderElement.innerHTML = 'player two name';
  } else {
    secondPlayer = inputElement.value;
    if (playerNames.firstPlayer !== 'Computer One' && inputElement.value === '' && playerNames.secondPlayer === 'Computer Two') {
      playerNames.secondPlayer = 'computer';
      playerTwoRender.innerHTML = playerNames.secondPlayer;
    } else if (inputElement.value !== '' && playerNames.firstPlayer === 'Computer One') {
      playerNames.firstPlayer = 'Computer';
      playerOneRender.innerHTML = playerNames.firstPlayer;
      playerNames.secondPlayer = secondPlayer;
      playerTwoRender.innerHTML = playerNames.secondPlayer;
    } else if (secondPlayer === '') {
      playerTwoRender.innerHTML = playerNames.secondPlayer;
    } else {
      playerNames.secondPlayer = secondPlayer;
      playerTwoRender.innerHTML = playerNames.secondPlayer;
    }
    inputElement.value = '';
    playerHeaderElement.innerHTML = 'player one name';
  }
}

/*Ensure getplay () is called only once when the game is played*/
function called () {
  const executed = false;
  return () => {
    if (!executed) {
      executed = true;
      getPlayer ();
    }
  }
 }
 
/*check if the player names are displayed*/
function checkPlayerRender () {
  called ();
  playerOneName.innerHTML = 'player one';
  playerTwoName.innerHTML = 'player two';
  
  if (playerOneRender.innerHTML === '' && playerTwoRender.innerHTML === '') {
  playerOneRender.innerHTML = playerNames.firstPlayer;
  playerTwoRender.innerHTML = playerNames.secondPlayer;
} if (playerTwoRender.innerHTML === '') {
  playerNames.secondPlayer = 'Computer';
  playerTwo.innerHTML = playerNames.secondPlayer;
}
playersDiv.classList.add('playersDiv');
}
  
/*auto play game*/
let gameIsPlaying = false;
let intervalId;
function playAuto () {
  if (!gameIsPlaying) {
    intervalId = setInterval (() => {
      playersDiv.classList.add('playersDiv');
      /*generate a move for the playerOne*/
      let playerMove = computerPick ();
      playGame (playerMove);
    } ,1500);
    gameIsPlaying = true;
    document.querySelector('.js-autoPlay').innerHTML = 'stop';
  } else {
    clearInterval (intervalId);
    gameIsPlaying = false;
    document.querySelector('.js-autoPlay').innerHTML = 'continue';
  }
}

/*Get the champion of each round*/
let champDiv = document.getElementById('endGame');

function champ () {
  if (score.wins === 0 && score.ties === 0 && score.losses === 0) {
    return alert (`Play game to have a champion`);
  } else {
    rpsDiv.hidden = true;
    document.getElementById('gameOutcome').hidden = true;
    champDiv.classList.add('endGame');
    let winner = '';
    if (score.wins > score.ties && score.wins > score.losses) {
      winner = `
      <div>${playerNames.firstPlayer} wins</div>
      <img src = "images/trophy.PNG">`;
    } else if (score.losses > score.ties && score.losses > score.wins) {
      winner = `
      <div>${playerNames.firstPlayer} wins</div>
      <img src = "images/trophy.PNG">`;
    } else {
      winner = `
      <div>NO CHAMP</div>
      <img src = "images/tie.PNG">`;
    }
    let htmlWinner = `<div>${winner}</div>`
    champDiv.innerHTML = htmlWinner;
    setTimeout(() => {
      reset ();
      champDiv.innerHTML = '';
    },3000);
  }  
}


/*reset the game at any time in the game*/
//let headerElement = document.getElementById('info').innerHTML
let rpsDiv = document.getElementById('rpsBtn')

function reset () {
  localStorage.removeItem('outcome');
  score = {
    wins: 0,
    ties: 0,
    losses: 0
  };

  playerNames = {
    firstPlayer: 'Computer One',
    secondPlayer: 'Computer Two'
  };

  WinnerRender.innerHTML = '';
  scoreRender.innerHTML = `
    wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
    scoreRender.classList.add('resetScore');
  setTimeout( () => {
    scoreRender.innerHTML = '';
    scoreRender.classList.remove('resetScore');
  }, 1500)

    /*reset game in cases where it was auto played*/
    clearInterval (intervalId)
    gameIsPlaying = false
    document.querySelector('.js-autoPlay').innerHTML = 'Auto play'

    //reset elements of the game back to default
    infoDiv.hidden = false;
    rpsDiv.hidden = false;
    playerOneRender.innerHTML = ''
    playerTwoRender.innerHTML = ''
    playerOneName.innerHTML = ''
    playerTwoName.innerHTML = ''
    inputElement.value = ''
    playerHeaderElement.innerHTML = 'player one name'
    outcomeDiv.classList.remove('outcome')
    playersDiv.classList.remove('playersDiv')
    playerMoves.innerHTML = ''
    champDiv.innerHTML = ''
    champDiv.classList.remove('endGame')
    document.getElementById('gameOutcome').hidden = false
  }