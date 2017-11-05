var jq = jQuery.noConflict();
jq(document).ready(function() {
	var div= document.getElementById("instr");
    addinstr();

    //- Set game parameters
    var div= document.getElementById("gameparams");
    
    //- Add spacing to center
    var divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-2");
    div.appendChild(divcol);
    
    //- Difficulty (select)
    var divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-4");
	var difform = document.createElement("form");
	difform.appendChild(document.createTextNode("Difficulty: "));
	var difsel = document.createElement("select");
	var difop,op1t;
	for( var i=1; i < 11; i++){
		difop = document.createElement("option");
		op1t = document.createTextNode(i);
        if (i == 5)
            difop.setAttribute("selected", "selected");
		difop.appendChild(op1t);
		difsel.appendChild(difop);
	}
    difsel.id = "difficulty";
	difform.appendChild(difsel);
	divcol.appendChild(difform)
	div.appendChild(divcol);

    
	var roundform = document.createElement("form");
	divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-4");
	roundform.appendChild(document.createTextNode("Rounds:"));
	var roundinput = document.createElement("input");
	roundinput.setAttribute("type", "text");
    roundinput.setAttribute("value", "10");
    roundinput.id = "rounds";
	roundform.appendChild(roundinput);
	divcol.appendChild(roundform)
	div.appendChild(divcol);

    
	divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-12");
	div = document.getElementById("start");
	var button = document.createElement("BUTTON");
	button.setAttribute("class", "btn btn-primary")
	var t = document.createTextNode("Start Game\n");
	button.setAttribute("id", "start-game"); 
	button.appendChild(t);
	divcol.appendChild(button);
	div.appendChild(divcol);
  
    jq("#start-game").on('click', function() {
       var settings = {
         difficulty: document.getElementById("difficulty").value,
         rounds: document.getElementById("rounds").value
       };
      jq("#game").hexed(settings);
    });
});

(function( $ ) {
  $.fn.hexed = function(settings) {
    jq("#container").hide();
    
    var game = document.createElement("DIV");
    var startTime = new Date().getTime();
    
    this.css("width", "80%");
    this.css("margin", "10px 0 0 10%");
    this.css("border", "2px dashed #1b1a19");
    this.css("padding", "10px");
    this.css("text-align", "center");
    
    //- Error Checking
    if (settings['difficulty'] > 10 || settings['difficulty'] < 1) {
      var p = document.createElement("H3");
      p.innerHTML = "Difficulty must be between 1 and 10 (inclusive)";
      jq(game).append(p);
      this.append(game);
      return;
    }
    
    if (isNaN(settings['rounds']) || settings['rounds'] < 1) {
      var p = document.createElement("H3");
      p.innerHTML = "Rounds must be a positive number.";
      jq(game).append(p);
      this.append(game);
      return;
    }
    
    var turnsRemaining = parseInt(settings['rounds']);
    var currentScore = 0;
    
    //- Create the title
    var title = document.createElement("H1");
    title.innerHTML = "Hexed! - The Game";
    title.id = "game-title";
    jq(game).append(title);
    
    //- Create instructions
    var instr = document.createElement("h4");
    instr.id = "instructions";
    instr.innerHTML = "Slide the RGB sliders and try to create the same color in the right box as is in the left box.";
    jq(game).append(instr);
    
    //- Create turns remaining
    var turns = document.createElement("h4");
    turns.innerHTML = "You have " + turnsRemaining + " of " + settings['rounds'] + " turns remaining.";
    turns.id = "turns-counter";
    jq(game).append(turns);
    
    //- Create random square
    var randR = Math.floor(Math.random() * 255);
    var randG = Math.floor(Math.random() * 255);
    var randB = Math.floor(Math.random() * 255);
    
    var randSqDiv = document.createElement("DIV");
    randSqDiv.id = "rand-square";
    var randSq = createSquare(randR,randG,randB);
    randSqDiv.appendChild(randSq);
    jq(game).append(randSqDiv);
    
    //- Create guess square
    var guessR = 127;
    var guessG = 127;
    var guessB = 127;
    
    var guessSqDiv = document.createElement("DIV");
    guessSqDiv.id = "guess-square";
    var guessSquare = createSquare(guessR,guessG,guessB);
    guessSqDiv.appendChild(guessSquare);
    jq(game).append(guessSqDiv);
    
    //- Create sliders & values
    var slideR = document.createElement("INPUT");
    slideR.setAttribute("type", "range");
    slideR.setAttribute("min", "0");
    slideR.setAttribute("max", "255");
    slideR.value = 127;
    slideR.setAttribute("class", "slider");
    slideR.id = "slider-red";
    
    var inputR = document.createElement("INPUT");
    inputR.setAttribute("type", "text");
    inputR.value = 127;
    inputR.setAttribute("class", "form-control");
    inputR.id = "input-red";
    
    slideR.oninput = function() {
      guessR = slideR.value;
      inputR.value = guessR;
      
      jq("#guess-square").empty();
      jq("#guess-square").append(createSquare(guessR,guessG,guessB));
    }
    
    inputR.oninput = function() {
      guessR = inputR.value;
      slideR.value = guessR;
      
      jq("#guess-square").empty();
      jq("#guess-square").append(createSquare(guessR,guessG,guessB));
    }
    
    jq(game).append(slideR);
    jq(game).append(inputR);
    
    var slideG = document.createElement("INPUT");
    slideG.setAttribute("type", "range");
    slideG.setAttribute("min", "0");
    slideG.setAttribute("max", "255");
    slideG.value = 127;
    slideG.setAttribute("class", "slider");
    slideG.id = "slider-green";
    
    var inputG = document.createElement("INPUT");
    inputG.setAttribute("type", "text");
    inputG.value = 127;
    inputG.setAttribute("class", "form-control");
    inputG.id = "input-green";
    
    slideG.oninput = function() {
      guessG = slideG.value;
      inputG.value = guessG;
      
      jq("#guess-square").empty();
      jq("#guess-square").append(createSquare(guessR,guessG,guessB));
    }
    
    inputG.oninput = function() {
      guessG = inputG.value;
      slideG.value = guessG;
      
      jq("#guess-square").empty();
      jq("#guess-square").append(createSquare(guessR,guessG,guessB));
    }
    
    jq(game).append(slideG);
    jq(game).append(inputG);
    
    var slideB = document.createElement("INPUT");
    slideB.setAttribute("type", "range");
    slideB.setAttribute("min", "0");
    slideB.setAttribute("max", "255");
    slideB.value = 127;
    slideB.setAttribute("class", "slider");
    slideB.id = "slider-blue";
    
    var inputB = document.createElement("INPUT");
    inputB.setAttribute("type", "text");
    inputB.value = 127;
    inputB.setAttribute("class", "form-control");
    inputB.id = "input-blue";
    
    slideB.oninput = function() {
      guessB = slideB.value;
      inputB.value = guessB;
      
      jq("#guess-square").empty();
      jq("#guess-square").append(createSquare(guessR,guessG,guessB));
    }
    
    inputB.oninput = function() {
      guessB = inputB.value;
      slideB.value = guessB;
      
      jq("#guess-square").empty();
      jq("#guess-square").append(createSquare(guessR,guessG,guessB));
    }
    
    jq(game).append(slideB);
    jq(game).append(inputB);
    
    //- Create submit button
    var submitBtn = document.createElement("INPUT");
    submitBtn.setAttribute("type", "submit");
    submitBtn.value = "Got it!";
    submitBtn.setAttribute("class", "btn btn-primary");
    submitBtn.id = "submit-guess";
    
    jq(submitBtn).on("click", function() {
      var stopTime = new Date().getTime();
      
      document.getElementById("error").innerHTML = "Error red: " + percent_off(randR,guessR).toFixed(2) + "%<br/>Error green: " + percent_off(randG,guessG).toFixed(2) + "%<br/>Error blue: " + percent_off(randB,guessB).toFixed(2) + "%";
      
      var roundScore = calculate_score(total_percent_off(percent_off(randR,guessR), percent_off(randG,guessG), percent_off(randB,guessB)), settings['difficulty'], stopTime - startTime);
      
      startTime = stopTime;
      
      currentScore = roundScore + currentScore;
      document.getElementById("last-score").innerHTML = "Score on last color: " + roundScore.toFixed(2);
      document.getElementById("tot-score").innerHTML = "Your score: " + currentScore.toFixed(2);
      
      turnsRemaining--;
      document.getElementById("turns-counter").innerHTML = "You have " + turnsRemaining + " of " + settings['rounds'] + " turns remaining.";
      
      randR = Math.floor(Math.random() * 255);
      randG = Math.floor(Math.random() * 255);
      randB = Math.floor(Math.random() * 255);
      
      jq("#rand-square").empty();
      document.getElementById("rand-square").appendChild(createSquare(randR,randG,randB));
      
      if (turnsRemaining == 0) {
        jq(game).empty();
        jq(game).append(getDone(currentScore));
      }
    });
    
    var error = document.createElement("P");
    error.innerHTML = "Error red: N/A<br/>Error green: N/A<br/>Error blue: N/A";
    error.id = "error";
    jq(game).append(error);
    
    jq(game).append(submitBtn);
    
    //- Create top score
    var topScore = document.createElement("H3");
    topScore.innerHTML = "Your score: N/A";
    topScore.id = "tot-score";
    jq(game).append(topScore);
    
    //- Create score last color
    var lastScore = document.createElement("H3");
    lastScore.innerHTML = "Score on last color: N/A";
    lastScore.id = "last-score";
    jq(game).append(lastScore);
    
    this.append(game);
  };
}(jQuery));

function  addinstr(){
  var element = document.createElement("P");
  element.setAttribute("id", "instructions")
  text = document.createTextNode("This game is designed to help you learn css colors. Pick the number of rounds and games you would like to play.");
  element.appendChild(text);
  var div=  document.getElementById("instr");
  div.appendChild(element)
}

//calculates each colors percent off individually
function percent_off(expected_value, actual_value) {
  var percent_off = 0;
  percent_off = ((Math.abs(expected_value - actual_value))/225) * 100;
  return percent_off;
}

//little helper function that takes all of the individual percentages off 
//and takes the absolute value of those values and then averages them
function total_percent_off(red_percent, green_percent, blue_percent) {
  var total = 0;
  total = (Math.abs(red_percent) + Math.abs(green_percent) + Math.abs(blue_percent))/3;
  return total;
}

//a function that calculates the new score and adds that to the player's current score
function calculate_score(total_percent_off, difficulty, time_taken) {
  var new_score = 0;
  new_score = ((15 - difficulty - total_percent_off) / (15 - difficulty)) * (15000 - (time_taken));
  
  if (new_score < 0)
      new_score = 0;
  
  return new_score;
}

//- Generates a square with given RGB values
function createSquare(r, g, b) {
  var canvas = document.createElement("CANVAS");
  jq(canvas).css("width", "150px");
  jq(canvas).css("height", "150px");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fillRect(0,0,300,150);
  return canvas;
}

//- Gets the "all done!" stuff, final score, etc
function getDone(score) {
  var ret = document.createElement("H2");
  ret.innerHTML = "Final score: " + score.toFixed(2);
  return ret;
}