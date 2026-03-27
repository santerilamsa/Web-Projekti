const numbers = [
    { num: 1, word: "One" },
    { num: 2, word: "Two" },
    { num: 3, word: "Three" },
    { num: 4, word: "Four" },
    { num: 5, word: "Five" },
    { num: 6, word: "Six" },
    { num: 7, word: "Seven" },
    { num: 8, word: "Eight" },
    { num: 9, word: "Nine" },
    { num: 10, word: "Ten" }
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

        const scoreBox = document.getElementById("score");
        scoreBox.style.display = "block";
        scoreBox.innerText = "Pisteesi: " + score + "/10";

        document.getElementById("restart-btn").style.display = "inline-block";
        return;
    }

    round++;

    const correct = numbers[Math.floor(Math.random() * numbers.length)];

    document.getElementById("question").innerText =
        "Mikä on numero " + correct.num + " englanniksi?";

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
            const fb = document.getElementById("feedback");

            if (option.word === correct.word) {
                score++;
                fb.innerText = "Oikein!";
            } else {
                fb.innerText = "Väärin! Oikea vastaus oli: " + correct.word;
            }

            const scoreBox = document.getElementById("score");
            scoreBox.style.display = "block";
            scoreBox.innerText = "Pisteesi: " + score + "/10";

            answersDiv.innerHTML = "";

            const nextBtn = document.createElement("button");
            nextBtn.innerText = "Seuraava kysymys";
            nextBtn.classList.add("next-question-btn");
            nextBtn.onclick = nextQuestion;
            answersDiv.appendChild(nextBtn);
        };

        answersDiv.appendChild(btn);
    });
}

function restartGame() {
    round = 0;
    score = 0;

    const scoreBox = document.getElementById("score");
    scoreBox.style.display = "none";

    document.getElementById("feedback").innerText = "";
    document.getElementById("question").innerText = "";
    document.getElementById("answers").innerHTML = "";

    document.getElementById("restart-btn").style.display = "none";

    nextQuestion();
}

nextQuestion();
