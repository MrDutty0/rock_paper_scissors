const chooseMoveButtons = document.getElementsByTagName("button");

Array.from(chooseMoveButtons).forEach(button => {
    button.addEventListener("click", (e) => {
        const playerMove = e.target.getAttribute("data-move")
        const computerMove = getComputerMove();

        button.classList.add("clicking");
        button.addEventListener("transitionend", (e) => {
            button.classList.remove("clicking");
        })

        const resultText = document.getElementById("result");
        const result = playRound(playerMove, computerMove);
        resultText.textContent = result;
    });
});

function playRound (playerMove, computerMove){
    const winningScenarios = {
        "Rock": "Scissors",
        "Paper": "Rock",
        "Scissors": "Paper"
    };

    let resultText;

    if(playerMove === computerMove) {
        resultText = `It's a Tie!`;
        removeHealth(1, 1);
    } else if (winningScenarios[playerMove] === computerMove) {
        resultText = `You Win! ${playerMove} beats ${computerMove}`;
        removeHealth(0, 1);
    } else {
        resultText = `You Lose! ${computerMove} beats ${playerMove}`;
        removeHealth(1, 0);
    }

    return resultText;
}

function removeHealth(playerWon, computerWon) {
    const playerHealthBar = document.getElementById("player-health");
    const computerHealthBar = document.getElementById("computer-health");

    if(+computerHealthBar.value <= 0 || +computerHealthBar.value <= 0) return;
    else if(playerWon) {
        computerHealthBar.value -= 1;
    } else if(computerWon) {
        playerHealthBar.value -= 1;
    }

    if(+playerHealthBar.value <= 0 && +computerHealthBar.value <= 0) {
        displayPLayAgainScreen("Tied");
    } else if(+playerHealthBar.value <= 0) {
        displayPLayAgainScreen("Lost");
    } else if(+computerHealthBar.value <= 0) {
        displayPLayAgainScreen("Won!");
    }
}

function displayPLayAgainScreen(outcome) {
    console.log(outcome);

    const displayDiv = document.createElement("div");
    displayDiv.classList.add("play-again");

    const outcomeSpan = document.createElement("span");
    outcomeSpan.classList.add("play-again-text");
    outcomeSpan.appendChild(document.createTextNode(`You have ${outcome}`));
    displayDiv.appendChild(outcomeSpan);

    const button = document.createElement("button");
    button.classList.add("play-again-button");
    button.appendChild(document.createTextNode(`Play again`));
    displayDiv.appendChild(button);

    const darkScreen = document.createElement("div");
    darkScreen.classList.add("dark-screen");
    document.body.appendChild(darkScreen);

    document.body.appendChild(displayDiv);

    button.addEventListener("click", () => {
        resetState();
        document.body.removeChild(darkScreen);
        document.body.removeChild(displayDiv);
    })
}

function resetState() {
    const playerHealthBar = document.getElementById("player-health");
    const computerHealthBar = document.getElementById("computer-health");

    computerHealthBar.value = "3";
    playerHealthBar.value = "3";

    const resultText = document.getElementById("result");
    resultText.textContent = "Choose your weapon";
}

function getComputerMove() {
    let randNum = Math.floor((Math.random() * 3));
    const moves = ["Rock", "Papper", "Scissors"];

    return moves[randNum];
}