/*
Write a sketch that includes a function of your own design that draws a moon. 
The function should take a arguments/parameters for diam, color, and phase. 
You should be able to draw a number of moons with different phases diams and 
colors within your draw() function. Phase should be a number from 0 - 30, where 
0 is a new moon, 15 is a full moon, and 30 is an almost new moon. 
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
	background(0, 20, 40);

	//moonColor = map(mouseX, 0, width, 1, 5);
	if ((mouseX >= 0) && (mouseX < width * 0.25)) { moonColor = 1}
	if ((mouseX >= width * 0.25) && (mouseX < width * 0.50)) { moonColor = 2}
	if ((mouseX >= width * 0.5) && (mouseX < width * 0.75)) { moonColor = 3}
	if ((mouseX >= width * 0.75) && (mouseX < width )) { moonColor = 4}


	moonSize = map(mouseY, 0, height, 400, 100);

	drawMoon(moonSize, moonColor, frames % 31);

}

function drawMoon(size, color, phase) {

	let scaleFactor = size/100;
	scale(scaleFactor);
	let diam = 100;
	let radius = diam/2;

	stroke(255);
	strokeWeight(2);
	text( "Phase: " + int(phase) , 0, - height/10);

	
	
    strokeWeight(1);
	stroke(180, 50);
	noFill();
	ellipse(0, 0, diam, diam);
	noStroke();

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

	image(img, 0, 0, diam, diam);

	if (phase == 0) {
		
		fill(0,200);
		ellipse(0, 0, diam, diam);
		

	} else if ((phase >= 1 ) && (phase <= 15)) {
	// Waxing Crescent to First Quarter - phases 1  to 8 /14
	
		push();
		translate(0, -radius);
		rotate(radians(90));
		beginShape();
		
	  	fill(0, 200);
	  	noStroke();
	  	
		let xValueInset =  diam * 0.05;
		let yValueOffset =   radius * 4.0 / 3.0;
		vertex( 0,0);
		bezierVertex(xValueInset, yValueOffset, diam - xValueInset, yValueOffset, diam, 0);
		
		bezierVertex( radius + radius/2 , (phase - 8) * radius/8, radius/2 ,(phase - 8) * radius/8, 0,0);
		endShape();
	
	}

	if (phase == 15) {
	// Full moon - phase 15

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

		image(img, radius, 0, diam, diam);
	}

	if ((phase > 15) && (phase <= 30)) {
	// Wanning Gibbous - Phases 16 to 23	

		push();
		translate(0, radius);
		rotate(radians(270));
		beginShape();
		
	  	fill(0, 200);
	  	noStroke();
	  	
		let xValueInset =  diam * 0.05;
		let yValueOffset =   radius * 4.0 / 3.0;
		vertex( 0,0);
		bezierVertex(xValueInset, yValueOffset, diam - xValueInset, yValueOffset, diam, 0);
		
		bezierVertex( radius + radius/2 , (23 - phase) * radius/10, radius/2 ,(23 - phase) * radius/10, 0,0);
		endShape();
	
	}

}
function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}