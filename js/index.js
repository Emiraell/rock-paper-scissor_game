let score = JSON.parse(localStorage.getItem('outcome')) ||
 {
  wins: 0,
  ties: 0,
  losses: 0
};
let btnDiv = document.getElementById('btn-div')

let finisheddDiv = document.getElementById('finishedd')

let result =''
let comMove =''

let playerNames = {
  nameOne: 'Computer One',
  nameTwo: 'Computer Two'
};
let infoDiv = document.getElementById('info')

//console.log(playerNames.nameOne)
let inputLm = document.querySelector('.js-input');
let playerLm = document.getElementById('header')
let playerOneName = document.getElementById('playerOneName')
let playerTwoName = document.getElementById('playerTwoName')
let namess = document.getElementById('playerNames')
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
  playerOneName.innerHTML = 'player one'
  playerTwoName.innerHTML = 'player two'
  }

 function checkPlayerName () {
  if (document.getElementById('playerOne').innerHTML === '') {
    document.getElementById('playerOne').innerHTML = playerNames.nameOne
    document.getElementById('playerTwo').innerHTML = playerNames.nameTwo
  }  
  

 }

function yourpick (picked, other) {
  called ()
  //getPlayer ()
  computerPick ()
  checkPlayerHeader ()
  checkPlayerName ()
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
  infoDiv.hidden = true
  //btnDiv.hidden = true
  
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

    playerNames = {
      nameOne: 'Computer One',
      nameTwo: 'Computer Two'
    };

    /*if (result !== '') {result = ''*/
    document.querySelector('.js-display')
  .innerHTML = ''//}

  document.querySelector('.js-score')
  .innerHTML = `wins: ${score.wins} ties: ${score.ties} losses: ${score.losses}`
  console.log(score)
    setTimeout( () => {
    document.querySelector('.js-score')
  .innerHTML = ''}, 1000
    )
    
    
    //document.getElementById('info').innerHTML = ''
    //document.getElementById('info').innerHTML = headerElement
    
    document.getElementById('playerOne').innerHTML = ''
    document.getElementById('playerTwo').innerHTML = ''
    
      
    clearInterval (intervalId)
    isPlaying = false
    document.querySelector('.js-play').innerHTML = 'Auto play'
   // reset(() => {called()})

      //getPlayer () = ''
      //called ()
      //getPlayer () = null
      //yourpick ()
      //reset (getPlayer())
      infoDiv.hidden = false;
      btnDiv.hidden = false;
      playerOneName.innerHTML = ''
      playerTwoName.innerHTML = ''
      //finisheddDiv = true
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

  function finished () {
    const mainElement = document.getElementById('main')
   
    if (score.wins === 0 && score.ties === 0 && score.losses === 0) {
      return alert (`You can't finish what you did't start`)
    
    } else {
      btnDiv.hidden = true;
      //finisheddDiv.hidden = false
    /*document.querySelector('.js-display').innerHTML = ''
    document.querySelector('.js-score')
    .innerHTML = ''*/
    //mainElement.hidden = true;
    //finisheddDiv = false 

    
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