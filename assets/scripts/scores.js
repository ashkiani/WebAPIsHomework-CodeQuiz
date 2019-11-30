var containerEl = document.querySelector(".container");
var btnEl = document.querySelector("#btn");
var colClass = "col-md-4 text-center border bg-light";

function compare(a, b) {
    var result;
    console.log("comparing:" + a.score + "," + b.score);
    if (a.score > b.score) {
        result = 1;
    }
    else if (a.score < b.score) {
        result = -1;
    }
    else {
        if (a.time < b.time) {
            result = 1;
        }
        else { result = -1; }
    }
    return -1 * result;
}

function ShowScores() {
    containerEl.innerHTML = "";
    var gridTitle = document.createElement("h1");
    gridTitle.innerHTML = "Quiz Scores";
    containerEl.appendChild(gridTitle);
    // header
    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");
    var colEl = document.createElement("div");
    colEl.setAttribute("class", colClass);
    colEl.innerHTML = "Initial";
    rowEl.appendChild(colEl);
    colEl = document.createElement("div");
    colEl.setAttribute("class", colClass);
    colEl.innerHTML = "Correct Answers";
    rowEl.appendChild(colEl);
    colEl = document.createElement("div");
    colEl.setAttribute("class", colClass);
    colEl.innerHTML = "Time";
    rowEl.appendChild(colEl);
    containerEl.appendChild(rowEl);
    var results = [];
    for (var i = 0; i < localStorage.length; i++) {
        // set iteration key name
        var key = localStorage.key(i);
        console.log(key);
        if (key !== null) {
            // use key name to retrieve the corresponding value
            var value = localStorage.getItem(key);
            console.log('Key: ' + key + ', Value: ' + value);
            var scrTime = JSON.parse(value);
            var score=  scrTime.score;     
            var time = scrTime.time;
            console.log(score);
            console.log(time);
            var result = { "init": key, "score": score, "time": time }
            console.log(result);
            results.push(result);
              }
    }

    if (results.length > 0) {
        console.log(results);
        results.sort(compare);
        console.log(results);
        
        results.forEach(function (r){

            rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row");
            colEl = document.createElement("div");
            colEl.setAttribute("class", colClass);
            colEl.innerHTML = r.init;
            rowEl.appendChild(colEl);
            colEl = document.createElement("div");
            colEl.setAttribute("class", colClass);
            colEl.innerHTML = r.score;
            rowEl.appendChild(colEl);
            colEl = document.createElement("div");
            colEl.setAttribute("class", colClass);
            colEl.innerHTML = r.time;
            rowEl.appendChild(colEl);
            containerEl.appendChild(rowEl);

        });
      

    }
}

function Restart(){
    document.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", ShowScores);
btnEl.addEventListener("click", Restart);