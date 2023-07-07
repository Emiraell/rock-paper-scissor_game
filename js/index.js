let score = JSON.parse(localStorage.getItem('outcome')) ||
 {
  wins: 0,
  ties: 0,
  losses: 0
};



let result =''
let comMove =''

let playerNames = {
  nameOne: 'Computer One',
  nameTwo: 'Computer Two'
};

let inputLm = document.querySelector('.js-Nameinput');
let playerLm = document.getElementById('nameInputHeader')
let playerOneName = document.getElementById('playerOneHeader')
let playerTwoName = document.getElementById('playerTwoHeader')


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

const playersDiv = document.querySelector('.js-playersDiv')

function getPlayer () {
  playerOneName.innerHTML = 'player one'
  playerTwoName.innerHTML = 'player two'
  playersDiv.classList.add('playersDiv')

if ( playerLm.innerHTML === 'player one name') {
  
   nameOne = inputLm.value;
  if (nameOne === '') {
    document.getElementById('playerOneName').innerHTML = playerNames.nameOne
    
  } else {
  playerNames.nameOne = nameOne
  document.getElementById('playerOneName').innerHTML = playerNames.nameOne
}
inputLm.value = '' 
playerLm.innerHTML = 'player two name'

}
else {
  
  nameTwo = inputLm.value;
    if (playerNames.nameOne !== 'Computer One' && inputLm.value === '' && playerNames.nameTwo === 'Computer Two') {
    playerNames.nameTwo = 'computer'
    document.getElementById('playerTwoName').innerHTML = playerNames.nameTwo

   } else if (inputLm.value !== '' && playerNames.nameOne === 'Computer One') {
    playerNames.nameOne = 'Computer'
    document.getElementById('playerOneName').innerHTML = playerNames.nameOne
    playerNames.nameTwo = nameTwo
  document.getElementById('playerTwoName').innerHTML = playerNames.nameTwo
  
   } else if (nameTwo === '') {
    document.getElementById('playerTwoName').innerHTML = playerNames.nameTwo
    
  }
    else {
  playerNames.nameTwo = nameTwo
  document.getElementById('playerTwoName').innerHTML = playerNames.nameTwo
  
 
}
inputLm.value = '' 
playerLm.innerHTML = 'player one name'
}
}

let executed = false;

function called () {
 // executed = false;
  return () => {
    if (!executed) {
      executed = true;
      getPlayer ();
    }
  }
 }

  function checkPlayerHeader () {
   called ()
  playerOneName.innerHTML = 'player one'
  playerTwoName.innerHTML = 'player two'

  if (document.getElementById('playerOneName').innerHTML === '' && document.getElementById('playerTwoName').innerHTML === '') {
    document.getElementById('playerOneName').innerHTML = playerNames.nameOne
    document.getElementById('playerTwoName').innerHTML = playerNames.nameTwo
  } 
  if (document.getElementById('playerTwoName').innerHTML === '') {
    playerNames.nameTwo = 'Computer'
    document.getElementById('playerTwoName').innerHTML = playerNames.nameTwo
  }
  }

  

  let infoDiv = document.getElementById('info')
  const outcomeDiv = document.getElementById('gameOutcome')

  document.querySelector
function playGame (playerPick) {

  checkPlayerHeader ()

  computerPick ()

  const playerMoves = document.querySelector('.js-moves')

  if (playerPick === 'rock') {
    if (playerPick === comMove) {
      result = 'tie'
    } else if (comMove === 'paper') {
      result = `${playerNames.nameOne} win` 
    } else {
      result = `${playerNames.nameTwo} win`
    }
  } else if (playerPick === 'paper') {
    if (playerPick === comMove) {
      result = 'tie'
    } else if (comMove === 'scissor') {
      result = `${playerNames.nameOne} win` 
    } else {
      result = `${playerNames.nameTwo} win`
    }
  } else {
    if (playerPick === comMove) {
      result = 'tie'
    } else if (comMove === 'rock') {
      result = `${playerNames.nameOne} win` 
    } else {
      result = `${playerNames.nameTwo} win`
    }
  }

    

  if (result === 'tie') {
    score.ties++;
  } else if (result === `${playerNames.nameTwo} win`) {
    score.losses++;
  } else {
    score.wins++
  }

  localStorage.setItem('outcome', JSON.stringify(score))

  
  playerMoves.innerHTML = `
  <div> <p>${playerPick}</p> <img src = ""> </div>
  <div> <p>${comMove}</p> <img src = ""> </div>
  `
  
  document.querySelector('.js-display').innerHTML = `${result}`

  document.querySelector('.js-playersScore')
  .innerHTML = `${playerNames.nameOne} wins: ${score.wins} ties: ${score.ties} ${playerNames.nameTwo} wins: ${score.losses}`
  infoDiv.hidden = true
  outcomeDiv.classList.add('outcome')
  
}



function computerPick() {
  let computerTurn = Math.floor(Math.random() * 3)
  if (computerTurn === 0) {
    comMove = 'rock'
  } else if (computerTurn === 1) {
    comMove = 'paper'
  } else {
    comMove = 'scissor'
  }
  console.log(comMove)
  return comMove
} 

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
      nameOne: 'Computer One',
      nameTwo: 'Computer Two'
    };

    document.querySelector('.js-display')
  .innerHTML = ''
  document.querySelector('.js-playersScore')
  .innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
  console.log(score)
    setTimeout( () => {
    document.querySelector('.js-playersScore')
  .innerHTML = ''}, 1000
    )
    document.getElementById('playerOneName').innerHTML = ''
    document.getElementById('playerTwoName').innerHTML = ''
    
      
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-autoPlay').innerHTML = 'Auto play'
   
    infoDiv.hidden = false;
      rpsDiv.hidden = false;
      playerOneName.innerHTML = ''
      playerTwoName.innerHTML = ''
      inputLm.value = ''
      playerLm.innerHTML = 'player one name'
      outcomeDiv.classList.remove('outcome')
      playersDiv.classList.remove('playersDiv')

      
  }


  let isPlaying = false;
  let intervalId;

  function playAuto () {
    //checkPlayerHeader ()
    playersDiv.classList.add('playersDiv')
    if (!isPlaying) {
    intervalId = setInterval (() => {
      let playerMove = computerPick ()
      playGame (playerMove)
    }
    ,1500)
    isPlaying = true;
    document.querySelector('.js-autoPlay').innerHTML = 'stop'
  } else {
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-autoPlay').innerHTML = 'continue'
  }
  }

  let champDiv = document.getElementById('endGame')

  function champ () {
   
    if (score.wins === 0 && score.ties === 0 && score.losses === 0) {
      return alert (`Play game to have a champion`)
    
    } else {
      
      rpsDiv.hidden = true;
    document.querySelector('.js-display').innerHTML = ''
    document.querySelector('.js-playersScore')
    .innerHTML = ''
  
    let winner = ''
      if (score.wins > score.ties && score.wins > score.losses) {
      console.log (winner = `${playerNames.nameOne} wins`)
    }else if (score.losses > score.ties && score.losses > score.wins){
      console.log( winner = `${playerNames.nameTwo} wins`)
    } else { console.log (winner = 'NO CHAMPION')}
    
    let htmlWinner = `<p>${winner}</p>`
    champDiv.innerHTML = htmlWinner
    setTimeout(() => {
      reset ()
      champDiv.innerHTML = ''
    },3000)
  }
   
  }