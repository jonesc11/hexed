var jq = jQuery.noConflict();
jq(document).ready(function() {
	var div= document.getElementById("instr");
	//var button = document.createElement("BUTTON");
	//var t = document.createTextNode("Show/Hide Instructions\n");
	//button.style.width = "15%";
	//button.setAttribute("id", "instruct"); 
	//button.appendChild(t);
	//div.appendChild(button);
    addinstr();
    //jq("button").click(function(){
    //	jq("#instructions").toggle();
    //});

    var div= document.getElementById("gameparams");
    var divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-4");
	var difform = document.createElement("form");
	difform.appendChild(document.createTextNode("Difficulty: "));
	var difsel = document.createElement("select");
	var difop,op1t;
	for( var i=1; i <6; i++){
		difop = document.createElement("option");
		op1t = document.createTextNode(i);
		difop.appendChild(op1t);
		difsel.appendChild(difop);
	}
	difform.appendChild(difsel);
	divcol.appendChild(difform)
	div.appendChild(divcol);

	var difform = document.createElement("form");
	divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-4");
	difform.appendChild(document.createTextNode("Rounds: "));
	var difsel = document.createElement("select");
	var difop,op1t;
	for( var i=1; i <15; i++){
		difop = document.createElement("option");
		op1t = document.createTextNode(i);
		difop.appendChild(op1t);
		difsel.appendChild(difop);
	}
	difform.appendChild(difsel);
	divcol.appendChild(difform)
	div.appendChild(divcol);


	divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-12");
	div = document.getElementById("start");
	var button = document.createElement("BUTTON");
	button.setAttribute("class", "btn btn-primary")
	var t = document.createTextNode("Start Game\n");
	button.setAttribute("id", "game"); 
	button.appendChild(t);
	divcol.appendChild(button);
	div.appendChild(divcol);
  
    jq("#start").on('click', function() {
      jq("#game").hexed();
      //START GAME HERE
    });
	var red_percent_off = percent_off(red_expected, red_actual);
	var green_percent_off = percent_off(green_expected, green_actual);
	var blue_percent_off = percent_off(blue_expected, blue_actual);

	var total_percent_off = total_percent_off(red_percent_off, green_percent_off, blue_percent_off);

	var score = calculate_score(current_score, total_percent_off, difficulty, time_taken);
});

(function( $ ) {
  $.fn.hexed = function() {
      jq("#container").hide();
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

jq(document).ready(function() {
    
});

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
function calculate_score(current_score, total_percent_off, difficulty, time_taken) {
	var new_score = 0;
	new_score = ((15 - difficulty - total_percent_off) / (15 - difficulty)) * (15000 - (1000*time_taken));
	current_score += new_score;
	return current_score;
}

function changeSquare() {
    // make variables to get the values from the sliders
    var rd = parseInt(document.getElementById('red').value);
    var gn = parseInt(document.getElementById('green').value);
    var bl = parseInt(document.getElementById('blue').value);

    // convert the decimal values into hexadecimal
    var rdhex = (rd < 16) ? "0" + rd.toString(16) : rd.toString(16);
    var gnhex = (gn < 16) ? "0" + gn.toString(16) : gn.toString(16);
    var blhex = (bl < 16) ? "0" + bl.toString(16) : bl.toString(16);

    // create a variable that concatenates all the parts
    var hexcode = "#" + rdhex + gnhex + blhex;

    // change the background color
    document.getElementById('hexdisplay').innerHTML = hexcode;
    var canvas = document.getElementById('user_hex');
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = hexcode;
    ctx.fillRect(0,0,80,80);
}