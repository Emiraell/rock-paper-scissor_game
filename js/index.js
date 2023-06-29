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

//console.log(playerNames.nameOne)
let inputLm = document.querySelector('.js-input');
let playerLm = document.getElementById('header')
function getPlayer () {

 
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
  //if (nameTwo === '') {
    //document.getElementById('playerTwo').innerHTML = playerNames.nameTwo}
    if (playerNames.nameOne !== 'Computer One' && inputLm.value === '' && playerNames.nameTwo === 'Computer Two') {
    playerNames.nameTwo = 'computer'
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo

   } else if (nameTwo === '') {
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
    
  }
    else {
  playerNames.nameTwo = nameTwo
  document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  
}
inputLm.value = '' 
playerLm.innerHTML = 'player one name'
}

}


function called () {
  let executed = false;
  return () => {
    if (!executed) {
      executed = true;
      getPlayer ();
    }
  }
 }

function yourpick (picked, other) {
  
  called ()
  document.getElementById('info').innerHTML = ''
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

let headerElement = document.getElementById('info').innerHTML
function reset () {
  localStorage.removeItem('outcome');
     score = {
      wins: 0,
      ties: 0,
      losses: 0
    };

    /*if (result !== '') {result = ''*/
    document.querySelector('.js-display')
  .innerHTML = ''//}
    setTimeout( () => {
    document.querySelector('.js-score')
  .innerHTML = ''}, 1200
    )
    
  document.querySelector('.js-score')
  .innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
      console.log(score)
      clearInterval (intervalId)
    isPlaying = false
      document.querySelector('.js-play').innerHTML = 'Auto play'
      document.getElementById('info').innerHTML = headerElement
      document.getElementById('playerOne').innerHTML = ''
      document.getElementById('playerTwo').innerHTML = ''
      playerNames = {
        nameOne: 'Computer One',
        nameTwo: 'Computer Two'
      };
      //getPlayer () = null
      //yourpick () = ''
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
    ,1500)
    isPlaying = true;
    document.querySelector('.js-play').innerHTML = 'stop'
  } else {
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-play').innerHTML = 'continue'
  }
  }