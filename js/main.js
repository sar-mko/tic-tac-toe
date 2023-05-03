class TicTacToe {
    constructor () {
        this.cells = document.querySelectorAll('.cell');
        this.playerStatus = document.querySelector('#player-status');
        this.restartButton = document.querySelector('#restart-button');
        this.winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        this.currentPlayer = 'X';
        this.running = false;
        this.options = ['', '', '', '', '', '', '', '', ''];
        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => cell.addEventListener('click', event => this.cellClicked(event)));
        this.restartButton.addEventListener('click', _ => this.restartGame());
        this.playerStatus.textContent = `${this.currentPlayer}'s Turn`
        this.running = true;
    }

    cellClicked(event) {
        const cellIndex = event.target.getAttribute('cellIndex');
        
        if (this.options[cellIndex] !== '' || !this.running) {
            return;
        } else {
            this.options[cellIndex] = this.currentPlayer
            this.cells[cellIndex].textContent = this.currentPlayer
        }

        this.checkWinner();
    }

    changePlayer() {
       this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
       this.playerStatus.textContent = `${this.currentPlayer}'s Turn`
    }

    
    checkWinner(){
        let roundWin = false;

        for (let i=0; i < this.winConditions.length; i++) {
            const winCondition = this.winConditions[i]
            const a = this.options[winCondition[0]]
            const b = this.options[winCondition[1]]
            const c = this.options[winCondition[2]]

            if(a === '' || b === '' || c === '') { continue; }

            if(a === b && b === c) {
                roundWin = true
                break;
            }
        }

        if(roundWin) {
                this.playerStatus.textContent = `${this.currentPlayer} Wins`;
                this.running = false;
            } else if(this.options.includes('')) {
                this.changePlayer();
            } else {
                this.playerStatus.textContent = `Draw!`;
                this.running = false;
            }
    }

    restartGame() {
        this.currentPlayer = 'X';
        this.running = true;
        this.options = ['', '', '', '', '', '', '', '', ''];
        this.playerStatus.textContent = `${this.currentPlayer}'s Turn`;
        this.cells.forEach(cell => cell.textContent = '');
    }
}

const ticTacToeGame = new TicTacToe();
