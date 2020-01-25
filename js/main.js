let state = 0; // 0 is paused, 1 if running

// make the eye ball follow the mouse
let eye_ball = document.getElementById("eye-ball");
let button = document.getElementById("confirm-button");
let main_header = document.getElementById("main-header");
let eye_bg = document.getElementById("eye_bg");
let answer = "";

// setting up the speech recognizer 
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();


// setting up the events
recognition.onresult = function(event) {
    var current = event.resultIndex;
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    answer += transcript;

    // answers
    evaluateQuestion(answer);
    toggleSpeaking();
}

// subscribe onmouseevent to DOM
document.onmousemove = function () {
    let x = event.clientX * 100 / window.innerWidth + "%";
    let y = event.clientY * 100 / window.innerHeight + "%";

    eye_ball.style.left = x;
    eye_ball.style.top = y;
}

// function that toggles state
function toggleState() {
    if(state == 0) {
        state = 1;
    }else {
        state = 0;
    }
}

// function that toggles ui
function toggleSpeaking() {
    if (state == 1) {
        button.innerHTML = "Start";
        main_header.innerHTML = "The assistant";
    }else {
        recognition.start();
        button.innerHTML = "Stop";
        main_header.innerHTML = "I'm listening...";
        answer = "";
    }
    toggleState();
}


// function that reads the message
function readOutLoud(message) {
    var speech = new SpeechSynthesisUtterance();
  
    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
}

// function that handles answers
function evaluateQuestion(question) {
    switch(question) {
        case "What's your name":
            readOutLoud("My name is The Assistant");
            return 1;
            
        case "Suck my dick":
            readOutLoud("Ahoj");
            return 1;

        default:
            return 0;
    } 
}