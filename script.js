let boards = [];
let drawnNumbers = [];
let winners = [];

function generateBoard(playerName) {
    const board = {
        playerName: playerName,
        numbers: generateUniqueNumbers(),
    };
    boards.push(board);

    displayBoards();
}

function generateUniqueNumbers() {
    const numbers = [];

    // Generate numbers for columns B, I, G, and O
    for (let col of ["B", "I", "N", "G", "O"]) {
        for (let i = 0; i < 5; i++) {
            let num;
            do {
                num = generateRandomNumber(col);
            } while (numbers.includes(num));
            numbers.push(num);
        }
    }

    return numbers;
}

function generateRandomNumber(col) {
    switch (col) {
        case "B":
            return getRandomNumber(1, 15);
        case "I":
            return getRandomNumber(16, 30);
        case "N":
            return getRandomNumber(31, 45);
        case "G":
            return getRandomNumber(46, 60);
        case "O":
            return getRandomNumber(61, 75);
        default:
            return 0;
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayBoards() {
    const boardsContainer = document.getElementById("bingo-boards");
    boardsContainer.innerHTML = "";

    for (let board of boards) {
        const boardDiv = document.createElement("div");
        boardDiv.className = "board";

        const playerNameHeader = document.createElement("h3");
        playerNameHeader.textContent = board.playerName;
        boardDiv.appendChild(playerNameHeader);

        for (let i = 0; i < board.numbers.length; i++) {
            const numberDiv = document.createElement("div");
            numberDiv.textContent = board.numbers[i];
            boardDiv.appendChild(numberDiv);
        }

        boardsContainer.appendChild(boardDiv);
    }
}

function startGame() {
    const playerName = prompt("Digite seu nome:");
    if (playerName) {
        generateBoard(playerName);
    }

    if (boards.length < 2) {
        alert("Você precisa gerar pelo menos 2 cartelas para iniciar o jogo.");
        return;
    }

    document.querySelector("button:nth-of-type(2)").disabled = false;
}

function drawNumber() {
    if (drawnNumbers.length === 75) {
        alert("Todos os números já foram sorteados.");
        return;
    }

    let num;
    do {
        num = getRandomNumber(1, 75);
    } while (drawnNumbers.includes(num));

    drawnNumbers.push(num);
    checkWinners(num);

    alert(`Número Sorteado: ${num}`);
}

function checkWinners(lastDrawnNumber) {
    for (let board of boards) {
        const remainingNumbers = board.numbers.filter(num => !drawnNumbers.includes(num));
        if (remainingNumbers.length === 0 && !winners.includes(board.playerName)) {
            winners.push(board.playerName);
            displayWinners();
        }
    }
}

function displayWinners() {
    const winnersContainer = document.getElementById("winners");
    winnersContainer.innerHTML = "";

    const winnersHeader = document.createElement("h3");
    winnersHeader.textContent = "Vencedores:";
    winnersContainer.appendChild(winnersHeader);

    for (let winner of winners) {
        const winnerDiv = document.createElement("div");
        winnerDiv.textContent = winner;
        winnersContainer.appendChild(winnerDiv);
    }
}
