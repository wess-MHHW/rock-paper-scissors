// CLASSES
class Rules {
  constructor() {
    this.rules = {
      "scissors x paper": true,
      "scissors x rock": false,
      "scissors x lizard": true,
      "scissors x spock": false,
      "paper x rock": true,
      "paper x lizard": false,
      "paper x spock": true,
      "paper x scissors": false,
      "rock x lizard": true,
      "rock x spock": false,
      "rock x scissors": true,
      "rock x paper": false,
      "lizard x spock": true,
      "lizard x scissors": false,
      "lizard x paper": true,
      "lizard x rock": false,
      "spock x scissors": true,
      "spock x paper": false,
      "spock x rock": true,
      "spock x lizard": false,
    };
  }

  isWinner(a, b) {
    if (!this.rules.hasOwnProperty(a + " x " + b)) {
      return null;
    } else {
      let key = a + " x " + b;
      return this.rules[key];
    }
  }
}

// FUNCTION
function reset() {
  const main = document.querySelector("main");
  main.classList.remove("hide");
  const result = document.querySelector(".result-container");
  result.classList.remove("show");
  result.querySelector(".selected").removeAttribute("style");
  result.querySelector(".selected").removeAttribute("id");
  result.querySelector(".selected").children[0].remove();
  result.querySelector(".house-selected").children[0].remove();
  result.querySelector(".house-selected").removeAttribute("style");
  document.querySelector(".result").classList.remove("show");
}

function displayPicks(element) {
  // DISPLAY USER PICK
  const result = document.querySelector(".result-container");
  const selected = result.querySelector(".selected");
  let clone = element.children[0].cloneNode(true);
  let background = window
    .getComputedStyle(element)
    .getPropertyValue("background");
  let shadow = window.getComputedStyle(element).getPropertyValue("box-shadow");
  if (shadow.includes("4.8")) {
    shadow = shadow.replace("4.8", "8");
  }
  selected.id = element.classList[0];
  id = element.classList[0];
  selected.appendChild(clone);

  selected.style.background = background;
  selected.style.boxShadow = shadow;
  // DISPLAY COMPUTER PICK AND REVEAL THE WINNER
  result
    .querySelector(".my-pick")
    .addEventListener("animationend", animationHandler);
}

function animationHandler(event) {
  if (event.animationName === "first-move-left") {
    // DISPLAY COMPUTER PICK
    let generated = Math.floor(
      Math.random() *
        (body.className === "mutated"
          ? options.length
          : options.slice(0, 3).length)
    );
    const result = document.querySelector(".result-container");
    const selected = result.querySelector(".house-selected");
    let element = document.querySelector(`.${options[generated]}`);

    selected.appendChild(element.children[0].cloneNode(true).cloneNode(true));

    let background = window
      .getComputedStyle(element)

      .getPropertyValue("background");
    let shadow = window
      .getComputedStyle(element)
      .getPropertyValue("box-shadow");
    if (shadow.includes("4.8")) {
      shadow = shadow.replace("4.8", "8");
    }
    selected.style.background = background;
    selected.style.boxShadow = shadow;
    selected.style.transform = "scale(1)";
    // DISPLAY THE RESULT
    let timer = setTimeout(() => {
      const value = document.querySelector(".value");
      if (r.isWinner(id, options[generated])) {
        // WINNER
        document.querySelector(".result>h2").textContent = "you win";
        value.textContent = parseInt(value.textContent) + 1;
        localStorage.setItem("score", value.textContent);

        result.querySelector(".selected").style.boxShadow =
          window
            .getComputedStyle(result.querySelector(".selected"))
            .getPropertyValue("box-shadow") +
          ",rgba(255, 255, 255, 0.1) 0px 0px 0px 3.75rem, rgba(255, 255, 255, 0.05) 0px 0px 0px 7.5rem, rgba(255, 255, 255, 0.01)0px 0px 0px 11.25rem";
      } else if (r.isWinner(id, options[generated]) === false) {
        // LOSER
        document.querySelector(".result>h2").textContent = "you lose";
        value.textContent = parseInt(value.textContent) - 1;
        localStorage.setItem("score", value.textContent);
        result.querySelector(".house-selected").style.boxShadow =
          window
            .getComputedStyle(result.querySelector(".house-selected"))
            .getPropertyValue("box-shadow") +
          ",rgba(255, 255, 255, 0.1) 0px 0px 0px 3.75rem, rgba(255, 255, 255, 0.05) 0px 0px 0px 7.5rem, rgba(255, 255, 255, 0.01)0px 0px 0px 11.25rem";
      } else {
        // DRAW
        document.querySelector(".result>h2").textContent = "it's tie";
      }
      document.querySelector(".result").classList.add("show");

      result
        .querySelector(".my-pick")
        .removeEventListener("animationend", animationHandler);
      clearTimeout(timer);
    }, 800);
  }
}

// LOGIC
(() => {
  const value = document.querySelector(".value");
  value.textContent = localStorage.getItem("score") || 12;
})();

/* SWITCH BETWEEN MODES ORIGINAL / MUTATED */
const mode = document.querySelector(".mode");
const body = document.querySelector("body");
const main = document.querySelector("main");
mode.addEventListener("click", () => {
  const value = document.querySelector(".value");
  value.textContent = 0;
  localStorage.setItem("score", value.textContent);
  if (mode.textContent.includes("original")) {
    mode.textContent = "mutated version";
    body.classList.remove("mutated");
  } else {
    mode.textContent = "original version";
    body.classList.add("mutated");
  }
});

/* OPEN POP UP */
const rules = document.querySelector(".rules");
rules.addEventListener("click", () => {
  const img = document.querySelector(".rules-photo");
  if (mode.textContent.includes("original")) {
    img.setAttribute("src", "./images/image-rules-bonus.svg");
  } else {
    img.setAttribute("src", "./images/image-rules.svg");
  }
  window.scroll({
    top: 0,
  });
  document.querySelector("footer").classList.add("show");
});

/* CLOSE POP UP */
const close = document.querySelector(".close");
close.addEventListener("click", () => {
  document.querySelector("footer").classList.remove("show");
});

/* ITEM CLICK */
const options = ["scissors", "paper", "rock", "lizard", "spock"];
let r = new Rules();
let id;
const items = document.querySelectorAll(".item");
items.forEach((item) => {
  item.addEventListener("click", (event) => {
    const result = document.querySelector(".result-container");
    main.classList.add("hide");
    result.classList.add("show");
    displayPicks(event.currentTarget);
  });
});

/* PLAY AGAIN BUTTON */
const again = document.querySelector(".play-button");
again.addEventListener("click", () => {
  reset();
});
