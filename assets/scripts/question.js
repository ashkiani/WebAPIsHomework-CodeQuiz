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
var secondsLeft = 10;
var qIndex =0;

function endTest(){
    clearInterval(timerInterval);
    timeEl.textContent = "Time over!";
    bTestInProgress=false;
    btn.textContent="Start";
    secondsLeft=10;
    return;
}
/* <label><input type="radio" name="optradio">Option 2</label> */
/* <div class="radio">
                        <label><input type="radio" name="optradio" checked>Option 1</label>
                      </div> */


function ShowQuestion(){
    if (qIndex<questions.length){
        var question=questions[qIndex];
        questionTextEl.textContent=question.title;
        //create a list of choices
        for(var i=0;i< question.choices.length;i++){
          var divRadio =document.createElement("div");
          divRadio.setAttribute("class","radio");
          var lblChoice = document.createElement("label");
          lblChoice.innerHTML="<input type=\"radio\">" + question.choices[i];
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
      qIndex++;
    }
    else{
        endTest();
    }
}
function startTest(){
    bTestInProgress=true;
    btn.textContent="Next";
    qIndex=0;
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
  // var divEls = answersDivEl.children;
  // for(var i = 0; i < divEls.length; i++) {
  //   if(divEls[i].matches('[type="checkbox"]')) {
  //     questionDivEl.removeChild(divEls[i]);      
  //   }  
  // }
}
function deleteExistingChoices(){
  // Clear 
  answersDivEl.innerHTML = "";

}


btn.addEventListener("click",function(event){
    if (bTestInProgress){
        processAnswer();
        deleteExistingChoices();
    }
    else{
        startTest();
       
    }
    
});


