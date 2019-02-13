/*
Write a sketch that includes a function of your own design that draws a moon. 
The function should take a arguments/parameters for size, color, and phase. 
You should be able to draw a number of moons with different phases sizes and 
colors within your draw() function. Phase should be a number from 0 - 30, where 
0 is a new moon, 15 is a full moon, and 30 is an almost new moon. 
*/

var frames = 0;
var moonColor;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(10);
	noStroke();
	textSize(20);
	moonColor = color (0, 255, 155);

}

function draw() {
	
	background(80);

	scale(0.6);
	translate (-60, 300);
	//drawMoon(120, blue, 5);
	for (var i = 0; i <= 15; i++) {
		translate(130, 0);
		//strokeWeight(20);
		fill(moonColor);
		text( "Phase: " + i, -40, -80);
		noStroke();
		drawMoon(120, red, i);
	}

	translate(-2000, 300);
	for (var i = 16; i <= 30; i++) {
		translate(130, 0);
		fill(moonColor);
		text( "Phase: " + i, -40, -80);
		noStroke();
		drawMoon(120, red, i);
	}
}

function drawMoon(size, color, phase) {

	//var size = 120;
	var radius = size / 2;

	if (phase == 0) {
		//New moon - phase 0
		fill(0);	
		ellipse(0, 0, size, size);
	}

	if ((phase > 0) && (phase < 9)) {
	// Waxing Crescent to First Quarter - phases 1  to 8
		fill(255);
		arc(0, 0, size, size, radians(270) , radians(90));	
		beginShape();
		var x = cos(radians(270)) * radius ;
		var y = sin(radians(270)) * radius ;
		var x1 = cos(radians(90)) * radius ;
		var y1 = sin(radians(90)) * radius ;	
		fill(0);
		vertex(x, y);
		bezierVertex((8 - phase) * 10, -radius, (8 - phase) * 10, radius, x1, y1);
		arc(0, 0, size, size, radians(90) , radians(270));
		endShape();
	}

	if ((phase > 8) && (phase < 15)) {
	// Waxing Gibbous - Phases 9 to 14
		noStroke();
		fill(0);
		ellipse(0, 0, size, size);
		fill(255);
		arc(0, 0, radius * 2, radius * 2, radians(270), radians(90), CHORD);
		var x = cos(radians(270)) * radius ;
		var y = sin(radians(270)) * radius ;
		var x1 = cos(radians(90)) * radius ;
		var y1 = sin(radians(90)) * radius ;
		beginShape();
		vertex(x, y);
		bezierVertex((phase - 8) * (-10), -radius, (phase -8) * (-10), radius, x1, y1);
		endShape();
	}

	if (phase == 15) {
	// Full moon - phase 15
	  fill(255);
		ellipse(0, 0, size, size);
	}

	if ((phase > 15) && (phase < 24)) {
	// Wanning Gibbous - Phases 16 to 23	
		fill(0);
		arc(0, 0, size, size, radians(270) , radians(90));	
		beginShape();
		var x = cos(radians(270)) * radius ;
		var y = sin(radians(270)) * radius ;
		var x1 = cos(radians(90)) * radius ;
		var y1 = sin(radians(90)) * radius ;	
		fill(255);
		vertex(x, y);
		bezierVertex((23 - phase) * 10, -radius, (23 -phase) * 10, radius, x1, y1);
		arc(0, 0, size, size, radians(90) , radians(270));
		endShape();
	}

	if ((phase > 23) && (phase <= 30)) {
	// Wanning Crescent to third Quarter - Phase 24 to 30
		noStroke();
		fill(255);
		ellipse(0, 0, size, size);
		fill(0);
		arc(0, 0, radius * 2, radius * 2, radians(270), radians(90), CHORD);
		var x = cos(radians(270)) * radius ;
		var y = sin(radians(270)) * radius ;
		var x1 = cos(radians(90)) * radius ;
		var y1 = sin(radians(90)) * radius ;
		beginShape();
		vertex(x, y);
		bezierVertex( (phase - 23) * (-10), -radius, (phase - 23) * (-10), radius, x1, y1);
		endShape();
	}

}

