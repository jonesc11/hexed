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
    jq(randSqDiv).css("height", "150px");
    jq(randSqDiv).css("width", "150px");
    createSquare(randSqDiv,randR,randG,randB);
    jq(game).append(randSqDiv);
    
    //- Create guess square
    var guessSqDiv = document.createElement("DIV");
    guessSqDiv.id = "guess-square";
    jq(guessSqDiv).css("width", "150px");
    jq(guessSqDiv).css("height", "150px");
    jq(game).append(guessSqDiv);
    
    jq(function() {
      function hexFromRGB(r, g, b) {
        var hex = [
          r.toString(16),
          g.toString(16),
          b.toString(16)
        ];
        jq.each(hex, function(nr,val) {
          if (val.length === 1) {
            hex[nr] = "0" + val;
          }
        });
        return hex.join("").toUpperCase();
      }
      
      function refreshSwatch() {
        var red = jq("#red-slider").slider("value"),
            green = jq("#green-slider").slider("value"),
            blue = jq("#blue-slider").slider("value"),
            hex = hexFromRGB(red,green,blue);
        jq("#red-input").val(red.toString(16));
        jq("#green-input").val(green.toString(16));
        jq("#blue-input").val(blue.toString(16));
        jq("#guess-square").css("background-color", "#" + hex);
      }
      
      var red = document.createElement("DIV");
      red.id = "red-slider";
      jq(red).css("width", "300px");
      jq(game).append(red);
      
      var redInput = document.createElement("INPUT");
      redInput.setAttribute("type", "text");
      redInput.id = "red-input";
      jq(redInput).css("width", "300px");
      jq(game).append(redInput);
      
      var green = document.createElement("DIV");
      green.id = "green-slider";
      jq(green).css("width", "300px");
      jq(game).append(green);
      
      var greenInput = document.createElement("INPUT");
      greenInput.setAttribute("type", "text");
      greenInput.id = "green-input";
      jq(greenInput).css("width", "300px");
      jq(game).append(greenInput);
      
      var blue = document.createElement("DIV");
      blue.id = "blue-slider";
      jq(blue).css("width", "300px");
      jq(game).append(blue);
      
      var blueInput = document.createElement("INPUT");
      blueInput.setAttribute("type", "text");
      blueInput.id = "blue-input";
      jq(blueInput).css("width", "300px");
      jq(game).append(blueInput);
      
      jq("#red-slider, #green-slider, #blue-slider").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
      });
      
      refreshSwatch();
    });
    
    //- Create submit button
    var submitBtn = document.createElement("INPUT");
    submitBtn.setAttribute("type", "submit");
    submitBtn.value = "Got it!";
    submitBtn.setAttribute("class", "btn btn-primary");
    submitBtn.id = "submit-guess";
    
    jq(submitBtn).on("click", function() {
      var stopTime = new Date().getTime();
      
      var guessR = jq("#red-slider").slider("value");
      var guessG = jq("#green-slider").slider("value");
      var guessB = jq("#blue-slider").slider("value");
      
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
      
      createSquare(document.getElementById("rand-square"), randR,randG,randB);
      
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

function hexFromRGB(r, g, b) {
  var hex = [
    r.toString(16),
    g.toString(16),
    b.toString(16)
  ];
  jq.each(hex, function(nr,val) {
    if (val.length === 1) {
      hex[nr] = "0" + val;
    }
  });
  return hex.join("").toUpperCase();
}

//- Generates a square with given RGB values
function createSquare(ele, r, g, b) {
  var hex = hexFromRGB(r, g, b);
  jq(ele).css("background-color", "#" + hex);
}

//- Gets the "all done!" stuff, final score, etc
function getDone(score) {
  var ret = document.createElement("H2");
  ret.innerHTML = "Final score: " + score.toFixed(2);
  return ret;
}