var containerEl = document.querySelector(".container");

function ShowScores() {
    containerEl.innerHTML = "";
    var gridTitle = document.createElement("h1");
    gridTitle.innerHTML = "Quiz Scores";
    containerEl.appendChild(gridTitle);
    // header
    var rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");
    var colEl = document.createElement("div");
    colEl.setAttribute("class", "col-md-4 border bg-light");
    colEl.innerHTML = "Initial";
    rowEl.appendChild(colEl);
    colEl = document.createElement("div");
    colEl.setAttribute("class", "col-md-4 border bg-light");
    colEl.innerHTML = "Score";
    rowEl.appendChild(colEl);
    colEl = document.createElement("div");
    colEl.setAttribute("class", "col-md-4 border bg-light");
    colEl.innerHTML = "Time";
    rowEl.appendChild(colEl);
    containerEl.appendChild(rowEl);

    for (var i = 0; i < localStorage.length; i++) {
        // set iteration key name
        var key = localStorage.key(i);
        console.log(key);
        if (key !== null) {
            // use key name to retrieve the corresponding value
            var value = localStorage.getItem(key);
            // console.log the iteration key and value
            console.log('Key: ' + key + ', Value: ' + value);
            var result = JSON.parse(value);
            rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row");
            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-md-4 border bg-light");
            colEl.innerHTML = key;
            rowEl.appendChild(colEl);
            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-md-4 border bg-light");
            colEl.innerHTML = result.score;
            rowEl.appendChild(colEl);
            colEl = document.createElement("div");
            colEl.setAttribute("class", "col-md-4 border bg-light");
            colEl.innerHTML = result.time;
            rowEl.appendChild(colEl);
            containerEl.appendChild(rowEl);
        }
    }
}

document.addEventListener("DOMContentLoaded", ShowScores);