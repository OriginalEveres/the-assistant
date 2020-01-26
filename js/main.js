// 0 is paused, 1 if running
let state = 0;

// make the eye ball follow the mouse
let eye_ball = document.getElementById("eye-ball");
let button = document.getElementById("confirm-button");
let main_header = document.getElementById("main-header");
let eye_bg = document.getElementById("eye_bg");
let answer = "";

let recognition, SpeechRecognition, json_commands;

try {    
    // setting up the speech recognizer 
    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    // get json from server
    jsonGet("commands.json", jsonSet);

    // setting up the events
    recognition.onresult = function(event) {
        var current = event.resultIndex;
    
        // Get a transcript of what was said.
        var transcript = event.results[current][0].transcript;
    
        // Add the current transcript to the contents of our Note.
        answer += transcript;
        console.log(answer);
        // answers
        evaluateQuestion(answer);
        toggleSpeaking();
    }
}catch (e) {
    console.log(e);
    main_header.innerHTML = "The Asisstant does not work in your browser.";
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
    speech.lang = "en-GB";
  
    // Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
}

// function that handles answers
function evaluateQuestion(question) {
    question = question.toLowerCase();
    // loop through the commands
    for (var key in json_commands.questions) {
        // check also if property is not inherited from prototype
        if (json_commands.questions.hasOwnProperty(key)) { 
            // if we found the question in a json commands
          if (json_commands.questions[key].question.toLowerCase() == question) {
        
            // readout loud
            readOutLoud(json_commands.questions[key].answer);

            // if has action, execute it
            if (json_commands.questions[key].hasOwnProperty("action")) {
                evaluateAction(json_commands.questions[key].action, json_commands.questions[key].action_data);
            }

            break;
          }
        }
    }
}

// function that takes the action and date
function evaluateAction(action, data) {
    switch (action) {
        case "open_url":
            window.open(data, '_blank');
            break;
    }
}

// function that gets json from server
function jsonGet(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// function that sets json data
function jsonSet(data) {
    json_commands = data;
}