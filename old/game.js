const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame (){
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex){
 const textNode = textNodes.find(textNode => textNode.id === textNodeIndex )
 textElement.innerText = textNode.text
 while (optionButtonsElement.firstChild){
     optionButtonsElement.removeChild(optionButtonsElement.firstChild)
 }
    textNode.options.forEach(option =>{
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'text id (1) ',
        options: [
            {
                text: 'optie 1 doorwerken',
                setState: { doorWerken: true },
                nextText: 2
            },
            {
                text: 'optie 2 niksdoen',
                setState: { niksDoen: true },
                nextText: 2
            }

        ]
    },
    {
        id: 2,
        text: 'text Id 2 ',
        options: [
            {
                text: 'doorwerken maar bier is op',
                requiredState: (currentState) => currentState.doorWerken,
                setState: { doorWerken: false, bierOp: true},
                nextText: 3
            },
            {
                text: 'biertje drinken ;)',
                requiredState: (currentState) => currentState.doorWerken,
                setState: { doorWerken: false, bierDrinken: true},
                nextText: 3
            },            
            {
                text: 'geen biertje dinken :(',
                requiredState: (currentState) => currentState.doorWerken,
                setState: { doorWerken: false, geenBier: true },
                nextText: 3
            },
            {
                text: 'ontslagen *huilie*',
                requiredState: (currentState) => currentState.niksDoen,
                setState: { niksDoen: false },
                nextText: -1
            }
        ]
    },
    {
        id: 3,
        text: 'Pepehands! Pepehands!',
        options: [
            {
                text: 'he, balen zeg',
                requiredState: (currentState) => currentState.bierOp,
                nextText: -1
            },
            {
                text: 'je rijd tegen de boom.... jammer je bent dood :o.',
                requiredState: (currentState) => currentState.bierDrinken,
                nextText: -1
            },            
            {
                text: 'Mclankie!!!',
                requiredState: (currentState) => currentState.geenBier || currentState.bierOp,
                nextText: -1
            }
        ]
    }
]

startGame()