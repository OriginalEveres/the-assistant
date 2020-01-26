# The assistant

## Overview
This is a pure JavaScript assistant that can respond to commands given in JSON file. In the future it should be capable of multiple actions. At this state it is capable of opening url in new tab. 

### Idea
This should be just a cool application and it should represent actual technology of browsers. 

### Support
Just because it is written in JS, it is simple, but it has a lot of limitations. This works only in Google Chrome, Android webview, Chrome for Android and Samsung Internet.

## Usage
Assistant is fully made in front-end. It is feeded by JSON commands file. 

### Code
Main.js file contains all the javascript needed. When is the application launched, it makes and ajax request for commands.json, where are all the commands listed(this file you can edit to add your own commands). Json file looks like: 

```
{
    "questions": [
        {
            "question": "What's your name",
            "answer": "My name is assistant. Im the world leader."
        },
        {
            "question": "I need designer",
            "answer": "Take a look at this cool design girl.",
            "action": "open_url",
            "action_data": "https://lisamartinovska.com"
        },
    ]
}
```
