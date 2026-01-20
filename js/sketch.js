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
let size, r = 0, g = 0, b = 0, a = 0, strokew;
let bgr, bgg, bgb, bga;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
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
            size = 100 * ratio;
            break;
        case CCSLIDER2:
            stroke = 20 * ratio;
            break;
        case CCSLIDER3:
            break;
        case CCSLIDER4:
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
            b = 255 * ratio;
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
        drawShape(random(width), random(height));
    };
}

