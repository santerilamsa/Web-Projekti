const animals = [
  {
    finnish: "koira",
    english: "dog",
    emoji: "🐶",
    image: "images/dog.png"
  },
  {
    finnish: "kissa",
    english: "cat",
    emoji: "🐱",
    image: "images/cat.png"
  },
  {
    finnish: "hevonen",
    english: "horse",
    emoji: "🐴",
    image: "images/horse.png"
  },
  {
    finnish: "leijona",
    english: "lion",
    emoji: "🦁",
    image: "images/lion.png"
  },
  {
    finnish: "elefantti",
    english: "elephant",
    emoji: "🐘",
    image: "images/elephant.png"
  },
  {
    finnish: "jänis",
    english: "rabbit",
    emoji: "🐰",
    image: "images/rabbit.png"
  }
];

const scoreElement = document.getElementById("score");
const optionsContainer = document.getElementById("optionsContainer");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const animalImage = document.getElementById("animalImage");
const animalEmoji = document.getElementById("animalEmoji");

let score = 0;
let currentAnimal = null;
let remainingAnimals = [];


function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


function resetAnimalList() {
  remainingAnimals = shuffleArray([...animals]);
}


function getOptions(correctAnswer) {
  const wrongAnswers = animals
    .filter(animal => animal.english !== correctAnswer)
    .map(animal => animal.english);

  const shuffledWrong = shuffleArray(wrongAnswers);

  return shuffleArray([
    correctAnswer,
    shuffledWrong[0],
    shuffledWrong[1],
    shuffledWrong[2]
  ]);
}

function showAnimal(animal) {
  currentAnimal = animal;

  animalImage.src = animal.image;
  animalImage.alt = animal.english;

  animalImage.onload = () => {
    animalImage.classList.remove("hidden");
    animalEmoji.classList.add("hidden");
  };

  animalImage.onerror = () => {
    animalImage.classList.add("hidden");
    animalEmoji.classList.remove("hidden");
    animalEmoji.textContent = animal.emoji;
  };
}

function showOptions() {
  optionsContainer.innerHTML = "";
  feedbackElement.textContent = "";

  const options = getOptions(currentAnimal.english);

  options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;

    button.addEventListener("click", () => checkAnswer(option, button));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedAnswer, selectedButton) {
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach(button => {
    button.disabled = true;

    if (button.textContent === currentAnimal.english) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === currentAnimal.english) {
    score++;
    scoreElement.textContent = score;
    feedbackElement.textContent = "Correct!";
    selectedButton.classList.add("correct");
  } else {
    feedbackElement.textContent = `Wrong! Correct answer: ${currentAnimal.english}`;
    selectedButton.classList.add("wrong");
  }
}

function nextRound() {
  if (remainingAnimals.length === 0) {
    optionsContainer.innerHTML = "";
    feedbackElement.textContent = `Game over! Final score: ${score}/${animals.length}`;
    
    animalImage.classList.add("hidden");
    animalEmoji.classList.remove("hidden");
    animalEmoji.textContent = "🎉";

    nextButton.disabled = true;
    return;
  }

  const animal = remainingAnimals.pop();
  showAnimal(animal);
  showOptions();
}


function restartGame() {
  score = 0;
  scoreElement.textContent = score;
  feedbackElement.textContent = "";
  nextButton.disabled = false;

  resetAnimalList();
  nextRound();
}


nextButton.addEventListener("click", nextRound);
restartButton.addEventListener("click", restartGame);


resetAnimalList();
nextRound();