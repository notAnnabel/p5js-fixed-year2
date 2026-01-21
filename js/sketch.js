//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 39;
const CCSLIDER2 = 38;
const CCSLIDER3 = 37;
const CCSLIDER4 = 36;
const CCDIAL1 = 35;
const CCDIAL2 = 34;
const CCDIAL3 = 33;
const CCDIAL4 = 32;

let myController;
let size, r = 100, g = 25, b = 137, a = 0, strokew;
let bgr, bgg, bgb, bga;

xpos = 0;

/* raindrops
const amount = 50;
const radius = 4;
const speed = 8;


let drops = [];*/


//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    //angleMode(DEGREES);
    //createPattern(257, 0.8, 180);
    frameRate(30);

    background(0);
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    drops.forEach((drop, key) => {
        drop.x = key * (windowWidth / amount);
    });
}




// gets called by MIDI library once MIDI enabled
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        console.log("No device detected.");
    } else {
        WebMidi.inputs.forEach((device, index) => {
            console.log(`${index}: ${device.name}`);
        });
    }
    myController = WebMidi.inputs[0];
    myController.channels[1].addListener("controlchange", allCC);

}

// gets called when a MIDI control change message is intercepted
function allCC(e) {
    //console.log("controller number = "+e.controller.number+", value = "+ e.data[2]);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1:
            size = 1;
            size = 100 * ratio;
            break;
        case CCSLIDER2:
            strokew = 1;
            strokew = 20 * ratio;
            break;
        case CCSLIDER3:
            frameRate(50 * 0.5 * ratio)
            break;
        case CCSLIDER4:
            xpos = innerWidth/2 * ratio;
            break;
        case CCDIAL1:
            bga = 255 * ratio;
            break;
        case CCDIAL2:
            bgr = 255 * ratio;
            break;
        case CCDIAL3:
            bgg = 255 * ratio;
            break;
        case CCDIAL4:
            bgb = 255 * ratio;
            break;
    }
}

// gets triggered when the space bar is pressed
function keyPressed() {
    if (key == ' ') {
        drawShape(random(width), random(height));
    }
}
function drawShape(x, y) {
    strokeWeight(strokew);
    fill(r, g, b, a);
    console.log(r, g, b, a);
    circle(x, y, size);
}




function draw() {

    background(bgr, bgg, bgb, bga);
    fillGradient('linear', {
        from: [0, 0],   // x, y : Coordinates
        to: [800, 800], // x, y : Coordinates
        steps: [
            color(255),
            color(0, 96, 164),
            color(227, 190, 111)
        ] // Array of p5.color objects or arrays containing [p5.color Object, Color Stop (0 to 1)]
    });


    for (let i = 0; i < 100; i++) {
        //tint(r, g, b);
        drawShape(random(width), random(height))


    //for (let i = 0; i < 200; i += 20) { /////////////////////////////
    // Add 10 to the line's hue value during
    // each iteration.
    noFill();
    strokeWeight(2);
    // strokeColor = i + 10;

    stroke(0, 50, 60);

    bezier(xpos+innerHeight * 0.75, 0 + i, 410, 80, 440, 300, 240 - i / 16, 300 + i / 8);
  //} // uncomment pls //////////////////



       /* drops.forEach(drop => {
            fill(255, 255, 255, drop.opacity);
            noStroke();
            ellipse(drop.x, drop.y, radius, radius);

            drop.y += drop.speed;
            drop.opacity -= 1;

            if (drop.y > windowHeight) {
                drop.y = random(0, 50);
                drop.opacity = 255;
            }
        });
    }


    for (i = 0; i < amount + 1; i++) {
        drops.push({
            x: i * (innerWidth / amount),
            y: random(0, innerHeight),
            speed: speed * (Math.random() + 0.8),
            opacity: 255
        });
    }*/
    //createPattern();
    // createPattern(257,0.8,180);
}
};


/*function createPattern(startColour) {

    var length = 0; //Length of line drawn
    var step = round(random(360)); //Degree to turn
    var colour = round(random(360)); //Start colour of HSL loop

    var rotationAngle = 0; //Actual angle relative to origin (derived from colour)
    var magnify = height / 500; //Decrease in length (will change overall size)

    var oldX = width / 2; //Original x coordinate for line
    var oldY = height / 2; //Original y coordinate for line
    var newX; //New x coordinate for line
    var newY; //New y coordinate for line

    if (startColour != null) {
        colour = startColour;
    }


    push();
    colorMode(HSL);
    for (var i = 0; i < 360; i++) {
        stroke(colour % 360, 100, 50); //Colour from the HSL loop

        newX = length * (cos(rotationAngle)) + oldX; //Calculate new x coordinate for line
        newY = length * (sin(rotationAngle)) + oldY; //Calculate new y coordinate for line

        line(oldX, oldY, newX, newY); //Draw line

        oldX = newX; //Set the original x coordinate to the curren  t x coordinate
        oldY = newY; //Set the original y coordinate to the current y coordinate
        rotationAngle += step; //Find the actual rotation
        length -= magnify; //Decrease the length of line
        colour += 1; //Continue the HSL loop
    }
    pop();



*/
