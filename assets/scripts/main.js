var timeEl = document.querySelector(".navbar-brand");
var questionDivEl = document.querySelector("#divQuestion");
var questionTextEl = document.querySelector("#pQuestion");
var answersDivEl = document.querySelector("#divChoices");
var containerEl = document.querySelector(".container");
var viewHSLinkEl = document.querySelector("#viewHSLink");
var homeLinkEl = document.querySelector("#homeLink");
var lastResultEl = document.querySelector("#lastResult");
var btn = document.querySelector(".btn");
var timerPreText = "Timer: ";
var bTestInProgress = false;
var bIsEnteringName = false;
var timerInterval;
const quizTime = 50;
var secondsLeft = quizTime;
var result;
var sndCorrect = new Audio("./assets/sounds/Correct.wav"); 
var sndWrong = new Audio("./assets/sounds/Wrong.wav"); 

var qIndex = 0;
var correctAnswersCount = 0;

function resetTime() {
  secondsLeft = quizTime;
}

function configurePage(IsTestInProgress) {
  bTestInProgress = IsTestInProgress;
  if (IsTestInProgress) {
    viewHSLinkEl.setAttribute("href", "javascript: void(0)");
    homeLinkEl.setAttribute("href", "javascript: void(0)");
    btn.textContent = "Next";
    qIndex = 0;
    correctAnswersCount = 0;
  }
  else {
    timeEl.textContent = "Time over!";
    deleteExistingChoices();
    //btn.textContent = "Start";
    resetTime();
    viewHSLinkEl.setAttribute("href", "index.html");
    homeLinkEl.setAttribute("href", "scores.html");
  }
}

function endTest() {
  var remaining = secondsLeft;
  clearInterval(timerInterval);
  configurePage(false);
  //ask user's name and record the score
  bIsEnteringName = true;
  //calculate the score
  result = { "score": correctAnswersCount, "time": (quizTime - remaining) };
  // questionTextEl.textContent = "Correct Answers: " + result.score + " time: " + result.time;
  questionTextEl.innerHTML = "Correct Answers: " + result.score + " time: " + result.time + "<br> Enter your initial and click the Next button to store your result.";

  var input = document.createElement('input');
  input.type = "text";
  input.setAttribute("id", "init");
  answersDivEl.appendChild(input);
  lastResultEl.style.backgroundColor = "white";
  lastResultEl.innerHTML = ""
}

function ShowQuestion() {
  if (qIndex < questions.length) {
    var question = questions[qIndex];
    questionTextEl.textContent = question.title;
    //create a list of choices
    for (var i = 0; i < question.choices.length; i++) {
      var divRadio = document.createElement("div");
      divRadio.setAttribute("class", "radio");
      var lblChoice = document.createElement("label");
      lblChoice.innerHTML = "<input type=\"radio\" name=\"radioChoice\">" + question.choices[i];
      divRadio.appendChild(lblChoice)
      answersDivEl.appendChild(divRadio);

    }

  }
  else {
    endTest();
  }
}
function startTest() {
  configurePage(true);
  ShowQuestion();
  setTime();
}

function setTime() {
  timerInterval = setInterval(function () {
    if (secondsLeft > 0) {
      secondsLeft--;
      timeEl.textContent = timerPreText + secondsLeft + " seconds left.";
    }
    if (secondsLeft === 0) {
      endTest();
    }

  }, 1000);
}

function processAnswer() {
  //read the selected value
  var selectedText = "";
  var divRadios = answersDivEl.children;
  for (var i = 0; i < divRadios.length; i++) {
    var lbl = divRadios[i].children[0];
    var rb = lbl.children[0];
    if (rb.checked) {
      selectedText = lbl.textContent;
      break;
    }
  }
  if (selectedText === questions[qIndex].answer) {
    sndCorrect.play();
    correctAnswersCount++;
    lastResultEl.style.backgroundColor = "green";
    lastResultEl.innerHTML = "Previous Answer: Correct!"
  }
  else {
    sndWrong.play();
    lastResultEl.style.backgroundColor = "red";
    lastResultEl.innerHTML = "Previous Answer: Incorrect!"
    if (secondsLeft < 5) {
      secondsLeft = 0;
    }
    else {
      secondsLeft = secondsLeft - 5;
    }
  }

}
function deleteExistingChoices() {
  // Clear 
  answersDivEl.innerHTML = "";

}

if (btn) {
  btn.addEventListener("click", function (event) {
    event.preventDefault;
    if (bTestInProgress) {
      processAnswer();
      deleteExistingChoices();
      qIndex++;
      ShowQuestion();
    }
    else if (bIsEnteringName) {
      var init = document.querySelector("#init").value;
      init = init.trim();
      if (init !== null && init !== "") {
        localStorage.setItem(init, JSON.stringify(result));
      } else {
        console.log("User didn't enter initials. Score won't be recorded");
      }
      bIsEnteringName = false;
      location.reload();
      document.location.href = "scores.html";
    } else {
      startTest();
    }

  });
}



