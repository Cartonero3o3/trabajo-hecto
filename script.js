const playButton = document.querySelector('.play');
const buttons = document.querySelectorAll('.card');
let Equipos = ["River", "Boca", "Talleres", "Belgrano"];
let sequence = [];
let sequenceLength = 1;
let currentIndex = 0; // Variable para mantener el índice actual en la secuencia

// Función para generar una secuencia aleatoria
function generateSequence(length) {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * Equipos.length);
        newSequence.push(Equipos[randomIndex]);
    }
    return newSequence;
}

// Función para resaltar el botón correspondiente en la secuencia
// Función para resaltar el botón correspondiente en la secuencia
function highlightButton(index) {
    buttons.forEach((button, i) => {
        if (i === index) {
            button.style.backgroundColor = "yellow"; // Resaltar el botón correspondiente
        } else {
            button.style.backgroundColor = ""; // Restablecer el color del botón
        }
    });
}

// Función para resaltar el botón correspondiente en la secuencia con un retraso
function highlightSequence(sequence) {
    sequence.forEach((buttonIndex, index) => {
        setTimeout(() => {
            highlightButton(buttonIndex);
            setTimeout(() => {
                resetButtonColors();
            }, 500); // Restablecer el color después de 0.5 segundos
        }, index * 1000); // Ajusta el tiempo de retraso aquí (en milisegundos)
    });
}

// Función para restablecer los colores de los botones
function resetButtonColors() {
    buttons.forEach((button) => {
        button.style.backgroundColor = ""; // Restablecer el color del botón
    });
}

// Evento al hacer clic en el botón de jugar
playButton.addEventListener('click', () => {
    sequence = generateSequence(sequenceLength);
    currentIndex = 0;
    highlightSequence(sequence); // Resaltar la secuencia uno por uno
});

// Función para manejar el clic en un botón
function handleButtonClick(event) {
    const buttonClicked = event.currentTarget.textContent;
    if (buttonClicked === sequence[currentIndex]) {
        console.log("¡Botón correcto clickeado!");
        currentIndex++; // Incrementar el índice actual
        if (currentIndex === sequence.length) {
            currentIndex = 0;
            sequence.push(Equipos[Math.floor(Math.random() * Equipos.length)]); // Agregar un nuevo elemento a la secuencia
            sequenceLength++;
            highlightButton(0); // Resaltar el primer botón en la nueva secuencia
        } else {
            highlightButton(currentIndex); // Resaltar el siguiente botón en la secuencia actual
        }
    } else {
        console.log("¡Botón incorrecto clickeado!");
        // Reiniciar el juego si se hace clic en el botón incorrecto
        sequence = generateSequence(sequenceLength);
        currentIndex = 0;
        highlightButton(0); // Resaltar el primer botón en la nueva secuencia
    }
}

// Agregar eventos de clic a cada botón
buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
});
