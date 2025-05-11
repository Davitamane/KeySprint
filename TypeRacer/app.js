"use strict";
const Sentences = {
  fiftenWord: [
    "The quick brown fox jumps over the lazy dog while the cat watches silently from the nearby tree branch.",
    "She carefully arranged the books on the shelf, making sure each one was in the perfect position for display.",
    "The scientist examined the data thoroughly before concluding that the experiment had been a complete success.",
    "Running through the forest, he felt the wind against his face and the freedom of being truly alive.",
    "As the sun set over the ocean, the waves crashed against the shore in a rhythmic and soothing melody.",
  ],
  twentyfiveWord: [
    "The young artist sat in front of the blank canvas, contemplating the colors she would use to express the emotions she had been holding inside for years.",
    "With a determined look, the engineer adjusted the last bolt on the machine, knowing this final piece would determine whether the invention worked as intended or failed.",
    "Every morning, the elderly man walked through the park, greeting the joggers and feeding the birds, enjoying the simple pleasures of life he had always cherished.",
    "She picked up the letter, hesitating for a moment before opening it, wondering if the words inside would bring her joy or break her heart forever.",
    "The chef carefully plated the gourmet dish, ensuring that every detail was perfect before presenting it to the eagerly awaiting judges at the prestigious competition.",
  ],
  fiftyWord: [
    "In the middle of the bustling city, a small cafe stood hidden between towering skyscrapers, offering a peaceful retreat where people gathered to enjoy aromatic coffee and share stories of love, loss, and dreams, creating a unique atmosphere that felt like a safe haven amidst the constant movement of life around them.",
    "The weary traveler sat on the edge of the quiet lake, watching the reflection of the full moon ripple across the water, feeling a deep sense of tranquility wash over him, knowing that for the first time in years, he had finally found a place where he truly belonged, even if only temporarily.",
    "As the storm raged outside, the old storyteller gathered the children around the fire, weaving tales of ancient warriors, mystical creatures, and forgotten kingdoms, his voice rising and falling like a melody, capturing their imagination and transporting them to a world where anything was possible, even in the midst of darkness and uncertainty.",
    "She sat by the window, watching the raindrops slide down the glass, lost in thoughts of past memories and dreams that had once seemed so attainable, but now felt distant, like echoes of a life she had almost lived, yet somehow slipped through her fingers before she could fully grasp its beauty and meaning.",
    "The scientist adjusted his glasses and stared at the complex equation on the whiteboard, knowing that the answer lay just beyond his reach, teasing him with its complexity, challenging his intellect, and reminding him why he had chosen this path in the first place—to unravel the mysteries of the universe, one discovery at a time.",
  ],
};
// ========================================= //
// Query selectors
let currentText;

let spans = document.querySelectorAll(".game span");
const buttons = document.querySelectorAll(".btn");
const letter15 = document.querySelector(".l15");
const letter25 = document.querySelector(".l25");
const letter50 = document.querySelector(".l50");
const game = document.querySelector(".game");
const regenerate = document.querySelector(".again");

// ========================================= //
// Event listeners
let count = 0;
let mistakes = 0;
let firstKeyPressed = false;
let currentMode;
// const playerInputs = [];
// ----------------------------------------- //
window.onload = function () {
  letter15.click();
};

letter15.addEventListener("click", (e) => {
  e.preventDefault();
  const random = Math.floor(Math.random() * 5);
  currentText = Sentences.fiftenWord[random];
  letter15.classList.add("active");
  letter25.classList.remove("active");
  letter50.classList.remove("active");
  currentMode = "l15";
  updateUI();
});
// ----------------------------------------- //
letter25.addEventListener("click", (e) => {
  e.preventDefault();
  const random = Math.floor(Math.random() * 5);
  currentText = Sentences.twentyfiveWord[random];
  letter15.classList.remove("active");
  letter25.classList.add("active");
  letter50.classList.remove("active");
  currentMode = "l25";
  updateUI();
});
// ----------------------------------------- //
letter50.addEventListener("click", (e) => {
  e.preventDefault();
  const random = Math.floor(Math.random() * 5);
  currentText = Sentences.fiftyWord[random];
  letter15.classList.remove("active");
  letter25.classList.remove("active");
  letter50.classList.add("active");
  currentMode = "l50";
  updateUI();
});
// ----------------------------------------- //
document.addEventListener("keydown", function (event) {
  if (!spans[count]) return;

  const key = event.key;

  if (key === "Backspace" && count > 0) {
    spans[--count].style.backgroundColor = "";
    spans[count].style.color = "";
    return;
  }

  if (key.length !== 1) return;

  spans[count].style.color = key === spans[count].innerHTML ? "#F4FBFE" : "";
  spans[count].style.backgroundColor =
    key === spans[count].innerHTML ? "" : "red";

  if (key !== spans[count].innerHTML) mistakes++;

  count++;

  if (!firstKeyPressed && key === spans[0].innerHTML) {
    firstKeyPressed = true;
    gameOn();
  }
  if (spans.length === count) {
    gameOff();
  }
});

// ----------------------------------------- //
regenerate.addEventListener("click", () => {
  const random = Math.floor(Math.random() * 5);
  if (currentMode === "l15") {
    currentText = Sentences.fiftenWord[random];
  } else if (currentMode === "l25") {
    currentText = Sentences.twentyfiveWord[random];
  } else if (currentMode === "l50") {
    currentText = Sentences.fiftyWord[random];
  }
  updateUI();
  document.querySelector(".test").classList.add("display-none");
  document.querySelector(".test").classList.remove("end");
});

// ========================================= //
// functions

let timer;
let elapsedTime = 0;
const gameOn = function () {
  let startTime;
  buttons.forEach((btn) => btn.classList.add("disable"));
  document.querySelector(".basic-info").style.color = "#585A5B";
  document.querySelector("img").src = "./Logo-darkMode.svg";

  startTime = Date.now();
  timer = setInterval(() => {
    elapsedTime++;
  }, 1000);
};
const gameOff = function () {
  buttons.forEach((btn) => btn.classList.remove("disable"));
  document.querySelector(".basic-info").style.color = "#f4fbfe";
  document.querySelector("img").src = "./Logo.svg";
  game.classList.add("display-none");
  document.querySelector(".test").classList.remove("display-none");
  document.querySelector(".test").classList.add("end");
  document.querySelector("#mistakes").textContent = mistakes;
  document.querySelector("#time").textContent = `${elapsedTime}s`;
  clearInterval(timer);
  console.log(elapsedTime);
  elapsedTime = 0;
  timer = 0;
  count = 0;
  mistakes = 0;
  firstKeyPressed = false;
};
// gameOff();
const updateUI = function () {
  document.querySelector(".game").innerHTML = currentText
    .split("")
    .map((letter) => `<span>${letter}</span>`)
    .join("");
  spans = document.querySelectorAll(".game span");

  document.querySelector(".test").classList.add("display-none");
  document.querySelector(".test").classList.remove("end");
  document.querySelector(".game").classList.remove("display-none");
};
