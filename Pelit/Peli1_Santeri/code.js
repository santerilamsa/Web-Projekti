const numbers = [
    "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten"
];

let currentNumber = 0;
let round = 1;
const maxRounds = 8;
let score = 0;

function getRandomOptions(correctIndex) {
    const options = [numbers[correctIndex]];
    while (options.length < 4) {
        const randIndex = Math.floor(Math.random() * numbers.length);
        const option = numbers[randIndex];
        if (!options.includes(option)) options.push(option);
    }
    return options.sort(() => Math.random() - 0.5);
}

function createOptions() {
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    const options = getRandomOptions(currentNumber);

    options.forEach(opt => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "number";
        radio.value = opt;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + opt));
        container.appendChild(label);
    });
}

function newNumber() {
    currentNumber = Math.floor(Math.random() * numbers.length);
    document.getElementById("number-display").textContent = currentNumber + 1;
    document.getElementById("round-number").textContent = round;
    document.getElementById("message").textContent = "";
    createOptions();
}

function checkAnswer() {
    if (round > maxRounds) return;

    const radios = document.getElementsByName("number");
    let selected = null;
    for (const r of radios) if (r.checked) selected = r.value;

    const message = document.getElementById("message");
    if (!selected) {
        message.textContent = "Valitse yksi vaihtoehto!";
        message.style.color = "red";
        return;
    }

    if (selected === numbers[currentNumber]) {
        score++;
        message.textContent = "Oikein! 🎉";
        message.style.color = "green";
    } else {
        message.textContent = "Väärin!";
        message.style.color = "red";
    }
}

function nextNumber() {
    if (round >= maxRounds) {
        const message = document.getElementById("message");
        message.innerHTML = `<strong>Peli loppui!</strong><br>Oikein vastatut numerot: ${score}/${maxRounds}`;

        // Poistetaan radiobuttonit käytöstä, mutta ne näkyvät edelleen
        const radios = document.getElementsByName("number");
        for (const r of radios) r.disabled = true;

        // Poistetaan napit käytöstä
        document.querySelector("button[onclick='checkAnswer()']").disabled = true;
        document.querySelector("button[onclick='nextNumber()']").disabled = true;

        return;
    }

    round++;
    newNumber();

    // Tyhjennä valinnat
    const radios = document.getElementsByName("number");
    for (const r of radios) r.checked = false;
}

// Aloita peli
newNumber();