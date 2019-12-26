(function() {
    const MENU_OPTIONS        = document.querySelector('.menu-options');
    const START               = document.querySelector('.menu-options > .start');
    const LOADER              = document.querySelector('.loader');
    const CARD_NICE_GAME      = document.querySelector('.card-nice-game');
    const SUCCESSFUL          = document.querySelector('.successful');
    let counter = 0;

    class Game {
        constructor(CARD, CARD_FLIP, CURRENT_CARD, STORE_CARD_CLASS, STORE_CARD_FLIP_CLASS) {
            this.CARD                  = CARD;
            this.CARD_FLIP             = CARD_FLIP;
            this.CURRENT_CARD          = CURRENT_CARD;
            this.STORE_CARD_CLASS      = STORE_CARD_CLASS;
            this.STORE_CARD_FLIP_CLASS = STORE_CARD_FLIP_CLASS;
        }

        start() {
            MENU_OPTIONS.classList.add('-delete');
            LOADER.classList.remove('-delete');

            setTimeout(() => {
                  LOADER.classList.add('-delete');
                  CARD_NICE_GAME.classList.remove('-delete');

                  this.createAllCards();
                  this.actionsOfCards();
              }, 5 * 1000);
        }

        createAllCards() {
            function shuffle() { return (Math.round(Math.random())-0.1); }

            const EACH_LETTER  = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
            EACH_LETTER.sort(shuffle);

            EACH_LETTER.map(function (eachLetter) {
                function createCard(accumulator, letter) {
                    if(accumulator === 1){ return; }

                    const CARD       = document.createElement('div');
                    const CARD_FLIP  = document.createElement('div');
                    const CARD_FRONT = document.createElement('div');
                    const CARD_BACK  = document.createElement('div');
                    const LETTER     = document.createTextNode(letter);

                    CARD.setAttribute('class', `card -${letter}`);
                    CARD_FLIP.setAttribute('class', 'card-flip-off');
                    CARD_FRONT.setAttribute('class', 'card-front');
                    CARD_BACK.setAttribute('class', 'card-back');

                    CARD_BACK.appendChild(LETTER);
                    CARD_FLIP.appendChild(CARD_FRONT);
                    CARD_FLIP.appendChild(CARD_BACK);
                    CARD.appendChild(CARD_FLIP);
                    CARD_NICE_GAME.appendChild(CARD);

                    accumulator++;

                    return createCard(accumulator, letter);
                }

                return createCard(0, eachLetter);
            });
        }

        actionsOfCards() {
            this.CARD      = document.querySelectorAll('.card');
            this.CARD_FLIP = document.querySelectorAll('.card-flip-off');

            this.CARD.forEach((eachCard, index) => {
                eachCard.addEventListener('click', () => {
                    if(this.CURRENT_CARD.length < 2 && this.STORE_CARD_CLASS.length < 2){
                        this.untapCard(eachCard, index);

                        if(this.CURRENT_CARD.length === 2 && this.STORE_CARD_CLASS.length === 2 && this.CURRENT_CARD[0] === this.CURRENT_CARD[1]) {
                            counter++;

                            if(counter === 4) { this.successful(); }

                            this.deleteTheCards(eachCard);
                        }

                        if(this.CURRENT_CARD.length === 2 && this.STORE_CARD_CLASS.length === 2 && this.CURRENT_CARD[0] !== this.CURRENT_CARD[1]) {
                            this.hideTheCards(eachCard);
                        }
                    }
                });
            });
        }

        untapCard(eachCard, index) {
            this.CARD_FLIP[index].setAttribute('class', 'card-flip');
            eachCard.setAttribute('class', `${eachCard.className} -noClick`);

            this.CURRENT_CARD.push(eachCard.textContent.trim());
            this.STORE_CARD_CLASS.push(eachCard);
            this.STORE_CARD_FLIP_CLASS.push(this.CARD_FLIP[index]);
        }

        deleteTheCards(eachCard){
            setTimeout(() => {
                this.STORE_CARD_CLASS[0].setAttribute('class', `${eachCard.className} -hidden`);
                this.STORE_CARD_CLASS[1].setAttribute('class', `${eachCard.className} -hidden`);

                this.CURRENT_CARD          = [];
                this.STORE_CARD_CLASS      = [];
                this.STORE_CARD_FLIP_CLASS = [];
            }, 2*1000);
        }

        hideTheCards(eachCard) {
            setTimeout(() => {
                this.STORE_CARD_CLASS[0].setAttribute('class', `${eachCard.className.replace('-noClick', '')}`);
                this.STORE_CARD_CLASS[1].setAttribute('class', `${eachCard.className.replace('-noClick', '')}`);
                this.STORE_CARD_FLIP_CLASS[0].setAttribute('class', 'card-flip-off');
                this.STORE_CARD_FLIP_CLASS[1].setAttribute('class', 'card-flip-off');

                this.CURRENT_CARD          = [];
                this.STORE_CARD_CLASS      = [];
                this.STORE_CARD_FLIP_CLASS = [];
            }, 2*1000);
        }

        successful() {
            setTimeout(() => {
                CARD_NICE_GAME.classList.add('-delete');
                SUCCESSFUL.classList.remove('-delete');
                setTimeout(function() {
                    window.location.reload(1);
                }, 3*1000);
            }, 2*1000);
        }
    }

    const CARD_NICE = new Game(null, null, [], [], []);

    START.addEventListener('click', function() { CARD_NICE.start(); });
})();


