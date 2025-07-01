let num = 256;
for (i = 0; i < num; i ++) {
    const createDiv = document.createElement('div');
    document.getElementById(container);
    container.appendChild(createDiv);
}

const squares = document.querySelectorAll('#container div');
squares.forEach (container => {
    container.addEventListener ( 'mouseover', () => {
        container.style.backgroundColor = isColorMode ? getCurrentColor() : 'black'

    });

    
})


function getCurrentColor() {
    const hue = document.getElementById('hueSlider').value;
        return `hsl(${hue}, 100%, 50%)`;
}

const toggleButton = document.getElementById('color');
const colorControl = document.getElementById('rgbControls');

let isColorMode = false;

toggleButton.addEventListener('click', () => { 
    isColorMode = !isColorMode;
    
    document.body.style.backgroundColor = isColorMode ? '#f0f0f0' : 'white';
    colorControl.style.display = isColorMode ? 'block' : 'none';
});

function erase() {
    const lackOf = document.getElementById('eraser');

let isErased = false;

lackOf.addEventListener('click', () => {
    isErased = !isErased;

    
} );
}