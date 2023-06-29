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

console.log(playerNames.nameOne)

function getPlayer () {
let playerLm = document.getElementById('header') 
if ( playerLm.innerHTML === 'player one name') {
  let inputLm = document.querySelector('.js-input')
   nameOne = inputLm.value;
  if (nameOne === '') {
    document.getElementById('playerOne').innerHTML = playerNames.nameOne
    playerLm.innerHTML = 'player two name'
  } else {
  playerNames.nameOne = nameOne
  document.getElementById('playerOne').innerHTML = playerNames.nameOne
  inputLm.value = '' 
  playerLm.innerHTML = 'player two name'
}

} else {
  let inputLm = document.querySelector('.js-input')
  nameTwo = inputLm.value
  if (playerNames.nameOne !== 'Computer One') {
    playerNames.nameTwo = 'computer'
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
    playerLm.innerHTML = 'player one name'
   } else if (nameTwo === '') {
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
    playerLm.innerHTML = 'player one name'
  } else {
  playerNames.nameTwo = nameTwo
  document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  inputLm.value = '' 
  playerLm.innerHTML = 'player one name'
}

}

}


function yourpick (picked, other) {
  
  getPlayer ()

  computerPick ()

  
  //let inputElement = document.querySelector('.js-input')
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
  
  console.log(score)
  document.querySelector('.js-display').innerHTML = `${result}`

  document.querySelector('.js-score')
  .innerHTML = `${playerNames.nameOne} wins: ${score.wins} ties: ${score.ties} ${playerNames.nameTwo} wins: ${score.losses}`
  //inputLm.value = '';
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

function reset () {
  localStorage.removeItem('outcome');
     score = {
      wins: 0,
      ties: 0,
      losses: 0
    };
    setTimeout( () => {
      if (result !== '') {result = ''
    document.querySelector('.js-display')
  .innerHTML = result}}, 1200
    )
    
  document.querySelector('.js-score')
  .innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
      console.log(score)
      document.querySelector('.js-play').innerHTML = 'Auto play'
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
      yourpick (player, compared)
    }
    ,2000)
    isPlaying = true;
    document.querySelector('.js-play').innerHTML = 'stop'
  } else {
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-play').innerHTML = 'continue'
  }
  }