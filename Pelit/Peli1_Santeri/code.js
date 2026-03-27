const numbers = [
    { num: 1, word: "one" },
    { num: 2, word: "two" },
    { num: 3, word: "three" },
    { num: 4, word: "four" },
    { num: 5, word: "five" },
    { num: 6, word: "six" },
    { num: 7, word: "seven" },
    { num: 8, word: "eight" },
    { num: 9, word: "nine" },
    { num: 10, word: "ten" }
];

let round = 0;
let score = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function nextQuestion() {
    if (round >= 10) {
        document.getElementById("question").innerText = "Peli ohi!";
        document.getElementById("answers").innerHTML = "";
        document.getElementById("feedback").innerText = "";
        document.getElementById("score").innerText = "Pisteesi: " + score + "/10";
        document.getElementById("restart-btn").style.display = "inline-block";
        return;
    }

    round++;
    const correct = numbers[Math.floor(Math.random() * numbers.length)];

    document.getElementById("question").innerText = "Mikä on numero " + correct.num + " englanniksi?";

    let options = shuffle([...numbers]).slice(0, 4);

    if (!options.includes(correct)) {
        options[0] = correct;
    }

    options = shuffle(options);

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    document.getElementById("feedback").innerText = "";

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option.word;
        btn.onclick = () => {
            if (option.word === correct.word) {
                score++;
                document.getElementById("feedback").innerText = "Oikein!";
            } else {
                document.getElementById("feedback").innerText = "Väärin! Oikea vastaus oli: " + correct.word;
            }
            document.getElementById("score").innerText = "Pisteesi: " + score + "/10";
            setTimeout(nextQuestion, 1000);
        };
        answersDiv.appendChild(btn);
    });
}

function restartGame() {
    round = 0;
    score = 0;
    document.getElementById("restart-btn").style.display = "none";
    nextQuestion();
}

nextQuestion();