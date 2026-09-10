const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip'); // "this" represents the card that was clicked

    //first card
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        //play audio if the card owns one
        if (this.dataset.audio) {
            if (!this.audio) {
                this.audio = new Audio(this.dataset.audio);
            }

            this.audio.currentTime = 0;
            this.audio.play()
        }

        return;
    }

    //second card
    secondCard = this
    
    //play audio if the card owns one
        if (this.dataset.audio) {
            if (!this.audio) {
                this.audio = new Audio(this.dataset.audio);
            }

            this.audio.currentTime = 0;
            this.audio.play()
        }
        
        checkForMatch();
}

//to stop a cards audio
function stopAudio(card) {
    if (card && card.audio) {
        card.audio.pause();
        card.audio.currentTime = 0;
    }
}

//if the cards do not belong together they will turn back
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

//if the cards match audio will stop and cards will not turn back
function disableCards() {
    //no way of knowing which card has audio so both need to be disabled
    stopAudio(firstCard);
    stopAudio(secondCard);

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//if cards do not match audios need to be stopped and cards will turn back
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        stopAudio(firstCard);
        stopAudio(secondCard);

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 2500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})(); 

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});