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

let inputLm = document.querySelector('.js-input');
let playerLm = document.getElementById('header')
let playerOneName = document.getElementById('playerOneName')
let playerTwoName = document.getElementById('playerTwoName')


function getPlayer () {
  playerOneName.innerHTML = 'player one'
  playerTwoName.innerHTML = 'player two'
  
if ( playerLm.innerHTML === 'player one name') {
  
   nameOne = inputLm.value;
  if (nameOne === '') {
    document.getElementById('playerOne').innerHTML = playerNames.nameOne
    
  } else {
  playerNames.nameOne = nameOne
  document.getElementById('playerOne').innerHTML = playerNames.nameOne
}
inputLm.value = '' 
playerLm.innerHTML = 'player two name'

}
else {
  
  nameTwo = inputLm.value;
    if (playerNames.nameOne !== 'Computer One' && inputLm.value === '' && playerNames.nameTwo === 'Computer Two') {
    playerNames.nameTwo = 'computer'
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo

   } else if (inputLm.value !== '' && playerNames.nameOne === 'Computer One') {
    playerNames.nameOne = 'Computer'
    document.getElementById('playerOne').innerHTML = playerNames.nameOne
    playerNames.nameTwo = nameTwo
  document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  
   } else if (nameTwo === '') {
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
    
  }
    else {
  playerNames.nameTwo = nameTwo
  document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  //playerNames.nameOne = 'Computer'
    //document.getElementById('playerOne').innerHTML = playerNames.nameOne
  
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

  if (document.getElementById('playerOne').innerHTML === '' && document.getElementById('playerTwo').innerHTML === '') {
    document.getElementById('playerOne').innerHTML = playerNames.nameOne
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  } 
  if (document.getElementById('playerTwo').innerHTML === '') {
    playerNames.nameTwo = 'Computer'
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  }
  }

  

  let infoDiv = document.getElementById('info')
function playGame (picked, other) {
  checkPlayerHeader ()
  computerPick ()
  if (comMove === picked) {
    result = 'tie'
  } else if (comMove  ===  other) {
    result = `${playerNames.nameTwo} win`
  } else {
    result = `${playerNames.nameOne} win`
  }
 
  if (result === 'tie') {
    score.ties++;
  } else if (result === `${playerNames.nameTwo} win`) {
    score.losses++;
  } else {
    score.wins++
  }

  localStorage.setItem('outcome', JSON.stringify(score))
  
  document.querySelector('.js-display').innerHTML = `${result}`

  document.querySelector('.js-score')
  .innerHTML = `${playerNames.nameOne} wins: ${score.wins} ties: ${score.ties} ${playerNames.nameTwo} wins: ${score.losses}`
  infoDiv.hidden = true
  
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
let btnDiv = document.getElementById('btn-div')

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
  document.querySelector('.js-score')
  .innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
  console.log(score)
    setTimeout( () => {
    document.querySelector('.js-score')
  .innerHTML = ''}, 1000
    )
    document.getElementById('playerOne').innerHTML = ''
    document.getElementById('playerTwo').innerHTML = ''
    
      
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-play').innerHTML = 'Auto play'
   
    infoDiv.hidden = false;
      btnDiv.hidden = false;
      playerOneName.innerHTML = ''
      playerTwoName.innerHTML = ''
      inputLm.value = ''
      playerLm.innerHTML = 'player one name'
      
  }


  let isPlaying = false;
  let intervalId;

  function playAuto () {

    if (!isPlaying) {
    intervalId = setInterval (() => {
      let player = computerPick ()
      let compared = ''

      if (player === 'rock') {
        compared = 'paper'
      } else if (player === 'paper') {
        compared = 'scissor'
      } else {
        compared = 'rock'
      }
      playGame (player, compared)
    }
    ,1500)
    isPlaying = true;
    document.querySelector('.js-play').innerHTML = 'stop'
  } else {
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-play').innerHTML = 'continue'
  }
  }

  let finisheddDiv = document.getElementById('finishedd')

  function finished () {
   
    if (score.wins === 0 && score.ties === 0 && score.losses === 0) {
      return alert (`You can't finish what you did't start`)
    
    } else {
      btnDiv.hidden = true;
    document.querySelector('.js-display').innerHTML = ''
    document.querySelector('.js-score')
    .innerHTML = ''
  
    let winner = ''
      if (score.wins > score.ties && score.wins > score.losses) {
      console.log (winner = `${playerNames.nameOne} wins`)
    }else if (score.losses > score.ties && score.losses > score.wins){
      console.log( winner = `${playerNames.nameTwo} wins`)
    } else { console.log (winner = 'no winner')}
    
    let htmlWinner = `<p>${winner}</p>`
    finisheddDiv.innerHTML = htmlWinner
    setTimeout(() => {
      reset ()
      finisheddDiv.innerHTML = ''
    },3000)
  }
   
  }