//const textElement = document.getElementById('text')
let optionButtonsElement = document.querySelector('.option-buttons')
let container = document.querySelector(".text");

// states for actions + check inventory
let state = {}

// start the game ;)

function startGame (){
    state = {}
    showTextNode(1)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// speeds and text (DIALOGUE!)

let speeds = {
    pause: 500,
    slow: 120,
    normal: 90,
    fast: 40,
    superFast: 10
 };

let textNodes = [
    {  
        // id:1,

       text:[
           { speed: speeds.slow, string: "Oh, hello!" },
           { speed: speeds.pause, string: "", pause: true },
           { speed: speeds.normal, string: "Have you seen my pet" },
           { speed: speeds.fast, string: "Cousteau", classes: ["red","shaking"] },
           { speed: speeds.normal, string: " around?" }
           ],

    //    options: [
    //        {
    //            text: 'optie 1 doorwerken',
    //            setState: { doorWerken: true },
    //            nextText: 2
    //        },
    //        {
    //            text: 'optie 2 niksdoen',
    //            setState: { niksDoen: true },
    //            nextText: 2
    //        }]
    //    },

       {  
        //    id:2,

        //    text:[
        //        { speed: speeds.slow, string: "Oh, hello2" },
        //        { speed: speeds.pause, string: "", pause: true },
        //        { speed: speeds.normal, string: "Have you seen my pet" },
        //        { speed: speeds.fast, string: "test2", classes: ["green","shaking"] },
        //        { speed: speeds.normal, string: " around?" }
        //    ],
   
        //    options: [
        //        {
        //            text: 'optie 1 doorwerken',
        //            setState: { cousteau: true },
        //            nextText: 2
        //        },
        //        {
        //            text: 'optie 2 niksdoen',
        //            setState: { niksDoen: true },
        //            nextText: 2
        //        }]
        //    },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// ANIMATE TEXT SCREEN

let characters = [];
textNodes.text.forEach((line, index) => {

    if (index < textNodes.length -1){
        line.string += " ";
    }

    line.split("").forEach((character) => {
        let span = document.createElement("span");
        span.textContent = character;
        container.appendChild(span);
        characters.push({
           span: span,
           delayAfter: line.speed,
           classes: line.classes || []
        });
     });
  });

function revealOneCharacter(list) {
    let next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });

    let delay = next.isSpace ? 0 : next.delayAfter;

    if (list.length > 0) {
        setTimeout(function(){
            revealOneCharacter(list);
        },delay)
    }

}

revealOneCharacter(characters);

// show text + show options


function showTextNode(textNodeIndex){

 const textNode = textNodes.find(textNode => textNode.id === textNodeIndex )
 container.innerText = textNode.text.string

///buttons verwijderen.

 while (optionButtonsElement.firstChild){
     optionButtonsElement.removeChild(optionButtonsElement.firstChild)
 }

 /// buttons toevoegen.

    textNode.options.forEach(option =>{
        if(showOption(option)){
            let button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

// show the options

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// select options (id's als onder de nul is.. dus -1 start dan opnieuw.)

function selectOption(option){
    let nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


/// START THE GAME
startGame()
