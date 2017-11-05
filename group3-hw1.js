
var jq = jQuery.noConflict();
jq(document).ready(function() {


    alert("Welcome to Hexxed");

    //Create instructions
	var div= document.getElementById("instr");
	var button = document.createElement("BUTTON");
	var t = document.createTextNode("Show/Hide Instructions\n");
	button.style.width = "15%";
	button.setAttribute("id", "instruct"); 
	button.appendChild(t);
	div.appendChild(button);
    addinstr();
    jq("button").click(function(){
    	jq("#instructions").toggle();
    });

    // Add the paramaters to the game so that they can be selected
    var div= document.getElementById("gameparams");
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
	div.appendChild(difform);

	//input parameter for  	rounds since anything >0 is valid
	var rform = document.createElement("form");
	rform.appendChild(document.createTextNode("Rounds: "));
	var rinput = document.createElement("INPUT");
	rinput.type = "style";
	rinput.name = "turns";

	var rbutton = document.createElement("INPUT");
	rbutton.type = "button";
	rbutton.value = "Submit";
	rbutton.setAttribute("class", "btn btn-group btn-success");

	rform.appendChild(rinput);
	rform.appendChild(rbutton);
	div.appendChild(rform);

	// add a button to start the game
	divcol = document.createElement("DIV");
    divcol.setAttribute("class", "col-sm-12");
	div = document.getElementById("start");
	var button = document.createElement("BUTTON");
	button.setAttribute("class", "btn btn-primary")
	var t = document.createTextNode("Start Game\n");
	button.style.marginBottom = "2%";
	button.setAttribute("id", "game"); 
	button.appendChild(t);
	divcol.appendChild(button);
	div.appendChild(divcol);	
});

function start_game(){}



function  addinstr(){
    var element = document.createElement("P");
    element.setAttribute("id", "instructions")
    text = document.createTextNode("This game is designed to help you learn css colors. Pick the number of rounds and games you would like to play.");
    element.appendChild(text);
    var div=  document.getElementById("instr");
    div.appendChild(element)
}