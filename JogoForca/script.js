const words = [
    { word: "PROJETO",      hint: "Algo bem planejado." },
    { word: "COMUNICACAO",  hint: "Troca de informações." },
    { word: "EQUIPE",       hint: "Grupo de trabalho." },
    { word: "PLANEJAMENTO", hint: "Etapa essencial para evitar falhas na comunicação." },
    { word: "TEAMS",        hint: "Plataforma de comunicação corporativa." },
    { word: "Canal",        hint: "Meio pelo qual a mensagem é enviada." },
    { word: "Mensagem",     hint: "Introdução de algo novo." }
];

let chosenWordObj, hiddenWord, attempts;
let hangmanStages = [ "🪢 - 6 tentativas", "🪢\n😀", "🪢\n😀\n👕", "🪢\n😀\n👕🫱", "🪢\n😀\n🫲👕🫱", "🪢\n😀\n👕\n🫱🫲\n🦵", "🪢\n😀\n👕\n🫱🫲\n🦵🦵"];
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    resetGame();
}   

function restartGame() {
    resetGame();
    document.getElementById("endScreen").style.display = "none"; // Hide the end screen
    document.getElementById("gameContainer").style.display = "block"; // Show the game container
}

function resetGame() {
    chosenWordObj = words[Math.floor(Math.random() * words.length)];
    hiddenWord = "_".repeat(chosenWordObj.word.length).split("");
    attempts = 0;
    document.getElementById("word").innerText = hiddenWord.join(" ");
    document.getElementById("hangman").innerText = hangmanStages[attempts];
    document.getElementById("hint").innerText = "Dica: " + chosenWordObj.hint;
    document.getElementById("letters").innerHTML = "";
    createLetters();
}
function createLetters() {
    const lettersDiv = document.getElementById("letters");
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i);
        let button = document.createElement("button");
        button.innerText = letter;
        button.onclick = () => guessLetter(letter, button);
        lettersDiv.appendChild(button);
    }
}

function guessLetter(letter, button) {
    button.disabled = true;
    if (!chosenWordObj.word.includes(letter)) {
        attempts++;
        document.getElementById("hangman").innerText = hangmanStages[attempts];
    }
    chosenWordObj.word.split('').forEach((char, index) => {
        if (char === letter) hiddenWord[index] = letter;
    });
    document.getElementById("word").innerText = hiddenWord.join(" ");
    checkGameStatus();
}

function checkGameStatus() {
    if (hiddenWord.join("") === chosenWordObj.word) {
        document.getElementById("endMessage").innerText = "Parabéns, Você ganhou! \n\n\n\n";
        document.getElementById("gameContainer").style.display = "none";
        document.getElementById("endScreen").style.display = "block";
    } else if (attempts >= hangmanStages.length - 1) {
        document.getElementById("endMessage").innerText = "Você perdeu! A palavra era: " + chosenWordObj.word + "\n\n\n\n";
        document.getElementById("gameContainer").style.display = "none";
        document.getElementById("endScreen").style.display = "block";
    }
}