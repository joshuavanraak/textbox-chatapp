let container = document.querySelector(".text");

let speeds = {
    pause: 500,
    slow: 120,
    normal: 90,
    fast: 40,
    superFast: 10
 };


 let textLines = [
    { speed: speeds.slow, string: "Oh, hello!" },
    { speed: speeds.pause, string: "", pause: true },
    { speed: speeds.normal, string: "Have you seen my pet" },
    { speed: speeds.fast, string: "Cousteau", classes: ["red","shaking"] },
    { speed: speeds.normal, string: " around?" }
 ];

let characters = [];
textLines.forEach((line, index) => {

    if (index < textLines.length -1){
        line.string += " ";
    }

    line.string.split("").forEach((character) => {
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