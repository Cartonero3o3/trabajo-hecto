const playButton = document.querySelectorAll('.play');
const buttons = document.querySelectorAll('.card');
let Equipos = ["River", "Boca", "Talleres", "Belgrano"];
let sequence = [];
let sequenceLength = 1;
let currentIndex = 0;

function generateSequence(length) {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * Equipos.length);
        newSequence.push(randomIndex);
    }
    return newSequence;
}

function highlightButton(index) {
    buttons.forEach((button, i) => {
        if (i === index) {
            button.style.backgroundColor = "yellow";
        } else {
            button.style.backgroundColor = "";
        }
    });
}

function highlightSequence(sequence) {
    sequence.forEach((buttonIndex, index) => {
        setTimeout(() => {
            highlightButton(buttonIndex);
            setTimeout(() => {
                resetButtonColors();
                if (index === sequence.length - 1) {
                    setTimeout(() => {
                        generateAndHighlightSequence();
                    }, 500);
                }
            }, 500);
        }, index * 1000);
    });
}

function resetButtonColors() {
    buttons.forEach((button) => {
        button.style.backgroundColor = "";
    });
}

function generateAndHighlightSequence() {
    sequence = generateSequence(sequenceLength);
    currentIndex = 0;
    highlightSequence(sequence);
}

playButton.addEventListener('click', () => {
    resetButtonColors();
    setTimeout(() => {
        generateAndHighlightSequence();
    }, 500);
});

function handleButtonClick(event) {
    const buttonClicked = event.currentTarget.textContent;
    if (buttonClicked === Equipos[sequence[currentIndex]]) {
        console.log("¡Botón correcto clickeado!");
        currentIndex++;
        if (currentIndex === sequence.length) {
            currentIndex = 0;
            sequence.push(Math.floor(Math.random() * Equipos.length));
            sequenceLength++;
        }
    } else {
        console.log("¡Botón incorrecto clickeado!");
        sequence = generateSequence(sequenceLength);
        currentIndex = 0;
        highlightSequence(sequence);
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});
