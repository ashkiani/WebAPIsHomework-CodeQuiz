var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    ///etc.
    {
      title: "What is the HTML tag under which one can write the JavaScript code?",
      choices: ["javascript", "scripted", "script", "js"],
      answer: "script"
    }
    
  ];

var timeEl = document.querySelector(".navbar-brand");
var questionDivEl=document.querySelector("#divQuestion");
var questionTextEl=document.querySelector("#pQuestion");
var answersDivEl=document.querySelector("#divChoices");
var containerEl=document.querySelector(".container");
var btn = document.querySelector(".btn");
var timerPreText ="Timer: ";
var bTestInProgress = false;
var timerInterval;
const quizTime = 15;
var secondsLeft = quizTime;

var qIndex =0;
var correctAnswersCount=0;
function resetTime(){
  secondsLeft=quizTime;
}
function endTest(){
  var remaining = secondsLeft;
  clearInterval(timerInterval);
  
  timeEl.textContent = "Time over!";
  bTestInProgress=false;
  deleteExistingChoices();
  btn.textContent="Start";
  resetTime();

  //ask user's name and record the score

  var init = prompt("Enter your initial:");
  if (init!==null){
    init=init.trim();
    if (init.trim!==""){
      //calculate the score
      var score=correctAnswersCount;
      console.log("Correct answers:" + correctAnswersCount);
      if (remaining>0){
        score = remaining * score ;
        console.log("Score:" + score);
      }
      localStorage.setItem(init, score);
    }
  }
  


  questionTextEl.textContent="Try to answer the following code related questions within the time limit. Keep in mind that an incorrect answer will decrease your remaining time by 5 seconds."
    
    return;
}

function ShowQuestion(){
    if (qIndex<questions.length){
        var question=questions[qIndex];
        questionTextEl.textContent=question.title;
        //create a list of choices
        for(var i=0;i< question.choices.length;i++){
          var divRadio =document.createElement("div");
          divRadio.setAttribute("class","radio");
          var lblChoice = document.createElement("label");
          lblChoice.innerHTML="<input type=\"radio\" name=\"radioChoice\">" + question.choices[i];
          divRadio.appendChild(lblChoice)
          answersDivEl.appendChild(divRadio);
          
          // var chkAnswer =document.createElement("div");
          //   chkAnswer.setAttribute("id","form-check");
          //   answersDivEl.appendChild(chkAnswer);
          //   var inp =document.createElement("input");
          //   inp.setAttribute("id","materialUnchecked");
          //   inp.setAttribute("class","form-check-input");
          //   inp.setAttribute("type","checkbox");
          //   chkAnswer.appendChild(inp);
          //   var lbl=document.createElement("label");
          //   lbl.setAttribute("class","form-check-label");
          //   lbl.setAttribute("for","materialUnchecked");
          //   lbl.innerHTML=question.choices[i];
          //   chkAnswer.appendChild(lbl);
        }
      
    }
    else{
        endTest();
    }
}
function startTest(){
    bTestInProgress=true;
    btn.textContent="Next";
    qIndex=0;
    correctAnswersCount=0;
    ShowQuestion();
    setTime();

}

function setTime() {
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = timerPreText + secondsLeft + " seconds left.";

    if(secondsLeft === 0) {
      endTest();
    }

  }, 1000);
}

function processAnswer(){
  //read the selected value
  var selectedText="";
  var divRadios=  answersDivEl.children;
  for (var i = 0; i<divRadios.length; i++){
    var lbl =divRadios[i].children[0];
    var rb = lbl.children[0];
    if (rb.checked){
      selectedText=lbl.textContent;
      break;
    }
  }
  if (selectedText===questions[qIndex].answer){
    correctAnswersCount++;
    
  }
  else{alert("Wrong!");}
  
}
function deleteExistingChoices(){
  // Clear 
  answersDivEl.innerHTML = "";

}


btn.addEventListener("click",function(event){
    if (bTestInProgress){
        processAnswer();
        deleteExistingChoices();
        qIndex++;
        ShowQuestion();
    }
    else{
        startTest();
       
    }
    
});


