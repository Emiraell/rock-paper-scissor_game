/* event listeners for all the buttons*/
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
  getPlayer ()
}
})

document.querySelector('.js-getPlayerBtn')
.addEventListener('click', () => { getPlayer ()})

document.querySelector('.js-rock')
.addEventListener ('click', () => {
  playGame('rock')
})

document.querySelector('.js-paper')
.addEventListener ('click', () => {
  playGame('paper')
})

document.querySelector('.js-scissor')
.addEventListener ('click', () => {
  playGame('scissor')
})

document.querySelector('.js-resetBtn')
.addEventListener ('click', () => {
  reset ()
})

document.querySelector('.js-autoPlay')
.addEventListener ('click', () => {
  playAuto ()
})

document.querySelector('.js-champ')
.addEventListener ('click', () => {
  champ ()
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

/*Getting the elements needed to get the player names
  and display them on the page*/
let inputElement = document.querySelector('.js-Nameinput');
let playerHeaderElement = document.getElementById('nameInputHeader');
let playerOneName = document.getElementById('playerOneHeader');
let playerTwoName = document.getElementById('playerTwoHeader');
const playerOneDisplay = document.getElementById('playerOneName')
const playerTwoDisplay = document.getElementById('playerTwoName')  
const playersDiv = document.querySelector('.js-playersDiv');

/*get the players name*/
function getPlayer () {
  playerOneName.innerHTML = 'player one';
  playerTwoName.innerHTML = 'player two';
  /*add a class to be styled for the player names output*/
  playersDiv.classList.add('playersDiv')
  
  if ( playerHeaderElement.innerHTML === 'player one name') {
    firstPlayer = inputElement.value;
    if (inputElement.value === '') {
      playerOneDisplay.innerHTML = playerNames.firstPlayer} else {
        playerNames.firstPlayer = firstPlayer;
        playerOneDisplay.innerHTML = playerNames.firstPlayer
      }
      inputElement.value = ''
      playerHeaderElement.innerHTML = 'player two name';} else {
        secondPlayer = inputElement.value;
        if (playerNames.firstPlayer !== 'Computer One' && inputElement.value === '' && playerNames.secondPlayer === 'Computer Two') {
          playerNames.secondPlayer = 'computer';
          playerTwoDisplay.innerHTML = playerNames.secondPlayer} else if (
            inputElement.value !== '' && playerNames.firstPlayer === 'Computer One') {
              playerNames.firstPlayer = 'Computer'
              playerOneDisplay.innerHTML = playerNames.firstPlayer
              playerNames.secondPlayer = secondPlayer
              playerTwoDisplay.innerHTML = playerNames.secondPlayer} else if (secondPlayer === '') {
                playerTwoDisplay.innerHTML = playerNames.secondPlayer} else {
                playerNames.secondPlayer = secondPlayer
                playerTwoDisplay.innerHTML = playerNames.secondPlayer}
      inputElement.value = '' 
      playerHeaderElement.innerHTML = 'player one name'
    }
}

let executed = false;
/*Run the getplay () once when the game is being played*/
function called () {
  return () => {
    if (!executed) {
      executed = true;
      getPlayer ();
    }
  }
 }
 
 /*check if the player names are displayed and 
 display if they aren't*/
 function checkPlayerHeader () {
   called ()
   playerOneName.innerHTML = 'player one'
   playerTwoName.innerHTML = 'player two'
   
   
   if (document.getElementById('playerOneName').innerHTML === '' && document.getElementById('playerTwoName').innerHTML === '') {
    document.getElementById('playerOneName').innerHTML = playerNames.firstPlayer
    document.getElementById('playerTwoName').innerHTML = playerNames.secondPlayer} 
  if (document.getElementById('playerTwoName').innerHTML === '') {
    playerNames.secondPlayer = 'Computer'
    document.getElementById('playerTwoName').innerHTML = playerNames.secondPlayer
  }
  playersDiv.classList.add('playersDiv')
}

/*play the game after collecting player names*/
  let result =''
  let compMove =''

  let infoDiv = document.getElementById('info')
  const outcomeDiv = document.getElementById('gameOutcome')
  const playerMoves = document.querySelector('.js-moves')
  
function playGame (playerPick) {
  checkPlayerHeader ();
  computerPick ();

  if (playerPick === 'rock') {
    if (playerPick === compMove) {
      result = 'tie'
    } else if (compMove === 'paper') {
      result = `${playerNames.firstPlayer} win` 
    } else {
      result = `${playerNames.secondPlayer} win`
    }
  } else if (playerPick === 'paper') {
    if (playerPick === compMove) {
      result = 'tie'
    } else if (compMove === 'scissor') {
      result = `${playerNames.firstPlayer} win` 
    } else {
      result = `${playerNames.secondPlayer} win`
    }
  } else {
    if (playerPick === compMove) {
      result = 'Tie'
    } else if (compMove === 'rock') {
      result = `${playerNames.firstPlayer} win` 
    } else {
      result = `${playerNames.secondPlayer} win`
    }
  }

  /*Get the score from the game aftermath of each move*/
  if (result === 'Tie') {
    score.ties++;
  } else if (result === `${playerNames.secondPlayer} win`) {
    score.losses++;
  } else {
    score.wins++
  }

  /*store in local storage to avoid loss of result*/
  localStorage.setItem('outcome', JSON.stringify(score))

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
  `
  document.querySelector('.js-display').innerHTML = `${result}`
  document.querySelector('.js-playersScore').innerHTML = `
  ${playerNames.firstPlayer} Wins: ${score.wins} Ties: ${score.ties} ${playerNames.secondPlayer} Wins: ${score.losses}`
  
  /*hid/remove info elements*/
  infoDiv.hidden = true
  outcomeDiv.classList.add('outcome')
}

/*select a move for the second player/computer*/
function computerPick() {
  let computerTurn = Math.floor(Math.random() * 3)
  if (computerTurn === 0) {
    compMove = 'rock'
  } else if (computerTurn === 1) {
    compMove = 'paper'
  } else {
    compMove = 'scissor'
  }
  return compMove
} 

/*reset the game at any time in the game*/
let headerElement = document.getElementById('info').innerHTML
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

  document.querySelector('.js-display').innerHTML = ''
  document.querySelector('.js-playersScore').innerHTML = `
    wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
  setTimeout( () => {
    document.querySelector('.js-playersScore')
    .innerHTML = ''}, 1000)

    /*reset game in cases where it was auto played*/
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-autoPlay').innerHTML = 'Auto play'
    infoDiv.hidden = false;
    rpsDiv.hidden = false;
    playerOneDisplay.innerHTML = ''
    playerTwoDisplay.innerHTML = ''
    playerOneName.innerHTML = ''
    playerTwoName.innerHTML = ''
    inputElement.value = ''
    playerHeaderElement.innerHTML = 'player one name'
    outcomeDiv.classList.remove('outcome')
    playersDiv.classList.remove('playersDiv')
    playerMoves.innerHTML = ''
    champDiv.innerHTML = ''
    champDiv.classList.remove('endGame')
  }
  
let isPlaying = false;
let intervalId;
/*auto play game*/
function playAuto () {
  if (!isPlaying) {
    intervalId = setInterval (() => {
      playersDiv.classList.add('playersDiv')
      /*generate a move for the playerOne*/
      let playerMove = computerPick ()
      playGame (playerMove)
    } ,1500)
  isPlaying = true;
  document.querySelector('.js-autoPlay').innerHTML = 'stop'} else 
  {
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-autoPlay').innerHTML = 'continue'
  }
}

  let champDiv = document.getElementById('endGame')

  /*Get the champion of each round*/
function champ () {
  if (score.wins === 0 && score.ties === 0 && score.losses === 0) {
    return alert (`Play game to have a champion`)} else {
      
      rpsDiv.hidden = true;
      document.getElementById('gameOutcome').hidden = true;
      const winner = '';
      if (score.wins > score.ties && score.wins > score.losses) {
        winner = `
        <div>${playerNames.firstPlayer} wins</div>
        <img src = "images/trophy.PNG">`} else if (
          score.losses > score.ties && score.losses > score.wins) {
          winner = `
          <div>${playerNames.firstPlayer} wins</div>
          <img src = "images/trophy.PNG">`} else {
            winner = `
            <div>NO CHAMP</div>
            <img src = "images/tie.PNG">`
          }
          let htmlWinner = `<div>${winner}</div>`
          champDiv.innerHTML = htmlWinner
          setTimeout(() => {
            reset ()
            champDiv.innerHTML = ''
          },3000)
        }
    champDiv.classList.add('endGame')
}