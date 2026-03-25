const colors = [
    { name: "red", value: "red" },
    { name: "blue", value: "blue" },
    { name: "green", value: "green" },
    { name: "yellow", value: "yellow" },
    { name: "purple", value: "purple" }
];

let correctAnswer = "";
let round = 0;
let score = 0;
const maxRounds = 4;

function newRound() {
    if (round >= maxRounds) {
        document.getElementById("result").innerText = "Peli ohi!";
        document.getElementById("score").innerText = "Sait " + score + " / " + maxRounds + " oikein";

        document.getElementById("btn1").disabled = true;
        document.getElementById("btn2").disabled = true;

        document.getElementById("restartBtn").style.display = "inline-block";
        return;
    }

    round++;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    correctAnswer = randomColor.name;

    document.getElementById("colorBall").style.backgroundColor = randomColor.value;

    let options = [correctAnswer];

    while (options.length < 2) {
        let randomOption = colors[Math.floor(Math.random() * colors.length)].name;
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    options.sort(() => Math.random() - 0.5);

    document.getElementById("btn1").innerText = options[0];
    document.getElementById("btn2").innerText = options[1];

    document.getElementById("result").innerText = "";
}

function checkAnswer(index) {
    const selected = document.getElementById("btn" + (index + 1)).innerText;
    const result = document.getElementById("result");

    if (selected === correctAnswer) {
        result.innerText = "Oikein! 🎉";
        score++;
    } else {
        result.innerText = "Väärin 😢";
    }

    document.getElementById("score").innerText = "Pisteet: " + score;

    setTimeout(newRound, 1000);
}

function restartGame() {
    round = 0;
    score = 0;

    document.getElementById("btn1").disabled = false;
    document.getElementById("btn2").disabled = false;

    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("score").innerText = "";
    document.getElementById("result").innerText = "";

    newRound();
}

// Aloitus
window.onload = function() {
    newRound();
};