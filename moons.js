/*

Project: Project1
Author: Valerie Baker
Date: 02/12/19

Description: this is a sketch that includes a function of your own design that draws a moon. 
The function should take a arguments/parameters for diam, color, and phase. 
You should be able to draw a number of moons with different phases diams and 
colors within your draw() function. Phase should be a number from 0 - 30, where 
0 is a new moon, 15 is a full moon, and 30 is an almost new moon. 

Details: the moon phases automatically scroll from New Moon = Phase 0 to
Full Moon = Phase 15 and through Phase 30 back to New Moon.
The mouse pressed can stop the automatic moon phase scrolling. The 
movement of the mouse in X and Y direction set the moon color and size
respectively.

*/

let frames = 0;
let moonColor = 3;
let moonSize = 400;

let img;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(2);

	textSize(15);
  	textAlign(CENTER, CENTER);

	imageMode(CENTER);
	img = loadImage('assets/moon.png');

}

function draw() {

	frames++;
	
	translate(width/2, height/2);
	background(0, 20, 40); // dark blue sky

	// The mouse dragged left and right selects the moon color (tint)
	if ((mouseX >= 0) && (mouseX < width * 0.25)) { moonColor = 1}
	if ((mouseX >= width * 0.25) && (mouseX < width * 0.50)) { moonColor = 2}
	if ((mouseX >= width * 0.5) && (mouseX < width * 0.75)) { moonColor = 3}
	if ((mouseX >= width * 0.75) && (mouseX < width )) { moonColor = 4}

	// The mouse dragged up and down selects the moon size (scale)
	moonSize = map(mouseY, 0, height, 400, 100);

	// Calling the function to draw a moon
	drawMoon(moonSize, moonColor, frames % 31);

}

// This function draws a moon with the required phase. It receives the 
// parameters size, color and phase as input. It uses 2 bezier curves 
// create each semi-transparent moon phase over a real moon photo.
function drawMoon(size, color, phase) {

	// The size parameter sets the scale factor
	let scaleFactor = size/100;
	scale(scaleFactor);

	let diam = 100;
	let radius = diam/2;

	// Arc Bezier curve offsets
	let xValueInset =  diam * 0.05;
	let yValueOffset =   radius * 4.0 / 3.0;

	// Screen title
	stroke(255);
	strokeWeight(2);
	fill(0,200);
	text( "Phase: " + int(phase) , 0, - height/10);

	// Circle underneath the moon picture to create a hallo effect 
	// around it
    strokeWeight(1);
	stroke(180, 50);
	noFill();
	ellipse(0, 0, diam, diam);
	noStroke();

	// The color (tint) of the moon
	if (color == 1) {
		tint(135, 206, 250, 255);
	} else if (color == 2) {
		noTint();
	} else if (color == 3) {
		tint(250, 250, 210, 255); 
	} else if (color == 4) {
		tint(255,182,193, 255); 
	} else {
		noTint(0);
	}

	// The moon image
	image(img, 0, 0, diam, diam);

	// New Moon
	if (phase == 0) {
		fill(0,200);
		ellipse(0, 0, diam, diam);
		
	// Waxing Crescent, First Quarter and Waxing Gibbous Moon
	} else if ((phase >= 1 ) && (phase <= 14)) {
	//Phases 1 to 14
	
		push();
		translate(0, -radius);
		rotate(radians(90));
		beginShape();
		
	  	fill(0, 200);
		noStroke();

		// Arc Bezier Curve
		vertex( 0,0);
		bezierVertex(xValueInset, yValueOffset, diam - xValueInset, yValueOffset, diam, 0);
		// Moon shape Bezier Curve
		bezierVertex( radius + radius/2 , (phase - 8) * radius/8, radius/2 ,(phase - 8) * radius/8, 0,0);
		endShape();
	
	// Full Moon 
	} else if (phase == 15) {
	// Phase 15
		// Set the proper tint
		if (color == 1) {
			tint(135, 206, 250, 255);
		} else if (color == 2) {
			noTint();
		} else if (color == 3) {
			tint(255, 255, 224, 255); 
		} else if (color == 4) {
			tint(255,182,193, 255); 
		} else {
			noTint(0);
		}
		// Redraw the full moon image
		translate(-radius, 0);
		image(img, radius, 0, diam, diam);

	// Wanning Gibbous, Third Quarter and Wanning Crescent
	} else if ((phase > 15) && (phase <= 30)) {
	//Phases 16 to 30	
		push();
		translate(0, radius);
		rotate(radians(270));
		beginShape();
		
	  	fill(0, 200);
	  	noStroke();

		// Arc Bezier Curve
		vertex( 0,0);
		bezierVertex(xValueInset, yValueOffset, diam - xValueInset, yValueOffset, diam, 0);
		// Moon Shape Bezier Curve
		bezierVertex( radius + radius/2 , (23 - phase) * radius/10, radius/2 ,(23 - phase) * radius/10, 0,0);
		endShape();
	
	}

}
// Stop the Moon Phases from changing by pressing the mouse
function mousePressed() {
  noLoop();
}
// Continue scrolling through the Moon Phases
function mouseReleased() {
  loop();
}