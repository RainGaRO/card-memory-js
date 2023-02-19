const desk = document.getElementById('desk');
let card = document.getElementsByClassName('card');
const restartBtns = document.querySelectorAll(".panel__restart");
const movesEl = [].slice.call(document.querySelectorAll(".panel__moves"));
let moves = 0;

const cards = [
    "fas fa-yin-yang",
    "fas fa-yin-yang",
    "fas fa-user-secret",
    "fas fa-user-secret",
    "fas fa-user-graduate",
    "fas fa-user-graduate",
    "fas fa-user-friends",
    "fas fa-user-friends",
    "fas fa-trophy",
    "fas fa-trophy",
    "fas fa-subway",
    "fas fa-subway",
    "fas fa-space-shuttle",
    "fas fa-space-shuttle",
    "fas fa-ship",
    "fas fa-ship",
];

let openCards = [];
let matchedCards = [];

function shuffle(arr) {
  let currentIndex = arr.length;
  let temporaryValue;
  let randomIndex;

  while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];;
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

function shuffleCards() {
  let shuffledCards = shuffle(cards);

  desk.innerHTML = '';
  shuffledCards.map((value) => {
    desk.innerHTML = desk.innerHTML + `
          <li class="card">
              <i class="${value}"></i>
          </li>
      `;
  });
}

desk.addEventListener('click', (e) => {

  if (e.target.classList.contains('card') && (openCards.length <= 1) && !e.target.classList.contains('open') && !e.target.classList.contains('match')) {
    openCards.push(e.target);
  }
  
  openCards.map(function(currentVal) {
    currentVal.classList.add('show');
    currentVal.classList.add('open');
  });
  
  if (openCards.length == 2) {
    if (openCards[0].children[0].classList[1] === openCards[1].children[0].classList[1]) {
      matchedCards.push(openCards[0]);
      matchedCards.push(openCards[1]);
      matchedCards.map(function(currentVal) {
        currentVal.classList.add('match');
      });

    }

    moveCount();
    gameWin();

    const oldCards = openCards;

    setTimeout(( ) => {
      oldCards.map(function(currentVal) {
        currentVal.classList.remove('open');
        currentVal.classList.remove('show');
      });

    }, 300);

    openCards = [];

  };
});

shuffleCards()


function moveCount() {
    moves++;
    movesEl.map(function(val){
      val.textContent = moves;
    });
  }

function restartGame () {
  shuffleCards();
    
  matchedCards.map(function(currentVal) {
    currentVal.classList.remove('match');
  });

  matchedCards = [];

  moves = 0;

  movesEl.map(function(val){
    val.textContent = moves;
  });

}

for (const btn of restartBtns) {
  btn.addEventListener('click', restartGame);
}

function gameWin() {
  setTimeout(() => {
    if (matchedCards.length == cards.length) {
      alert(`Победа? Ходов: ${moves}`)
      restartGame()
    }
  }, 300)
}