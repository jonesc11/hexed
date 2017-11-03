$(document).ready(function() {
	var red_percent_off = percent_off(red_expected, red_actual);
	var green_percent_off = percent_off(green_expected, green_actual);
	var blue_percent_off = percent_off(blue_expected, blue_actual);

	var total_percent_off = total_percent_off(red_percent_off, green_percent_off, blue_percent_off);

	var score = calculate_score(current_score, total_percent_off, difficulty, time_taken);
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