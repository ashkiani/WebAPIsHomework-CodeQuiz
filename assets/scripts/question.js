var timeEl = document.querySelector(".navbar-brand");
var btn = document.querySelector(".btn");
var timerPreText ="Timer: ";
var bTestInProgress = false;
var timerInterval;
var secondsLeft = 10;

function endTest(){
    clearInterval(timerInterval);
    timeEl.textContent = "Time over!";
    bTestInProgress=false;
    btn.textContent="Start";
    secondsLeft=10;
    return;
}

function startTest(){
    bTestInProgress=true;
    btn.textContent="Next";
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


btn.addEventListener("click",function(event){
    if (bTestInProgress){

    }
    else{
        startTest();
       
    }
    
});


