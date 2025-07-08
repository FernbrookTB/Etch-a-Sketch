let isDrawing = false;
let isErased = false;
let isClear = false;
let isGrabMode = false;
let selectedColor = null;
let isRainbowMode = false;
const container = document.getElementById('container');
function generateGrid(size) {
    

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    const squareSize = 100 / size; 

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}%`;
        
        container.appendChild(square);
    }



const squares = document.querySelectorAll('#container div');
squares.forEach (container => {
    
    container.addEventListener ('mousedown', () => {
            
    if (isGrabMode) {
        const grabbedColor = window.getComputedStyle(container).backgroundColor;
        selectedColor = grabbedColor;

        isColorMode = true;
        isGrabMode = false;
        grabberButton.classList.remove('active');
        toggleButton.classList.add('active');
        return;
    }
             let color;
    if (isErased) {
        color = 'white';
    } else if (isRainbowMode) {
        color = getRandomColor();
    }else if  (isColorMode) {
        color = selectedColor || getCurrentColor();
    } else {
        color = 'black';
    }
    container.style.backgroundColor = color; }   
    );

    container.addEventListener ( 'mouseover', () => {
        
    if (isDrawing){
          let color;
    if (isErased) {
        color = 'white';
    } else if (isRainbowMode) {
        color = getRandomColor();
        } else if  (isColorMode) {
        color = selectedColor || getCurrentColor();
    } else {
        color = 'black';
    }
    container.style.backgroundColor = color; }

    }); 
  
})
}

function getCurrentColor() {
    const hue = document.getElementById('hueSlider').value;
        return `hsl(${hue}, 100%, 50%)`;
}

const toggleButton = document.getElementById('color');
const colorControl = document.getElementById('rgbControls');

let isColorMode = false;

toggleButton.addEventListener('click', () => { 
    isColorMode = !isColorMode;

    if (isColorMode) {
        isErased = false;
        isGrabMode = false;
        isRainbowMode = false;
        selectedColor = null;
        clearActiveStates();
        toggleButton.classList.add('active');
     } else {
        toggleButton.classList.remove('active');
     }
    
    
    colorControl.style.display = isColorMode ? 'block' : 'none';
});

function erase() {
    const lackOf = document.getElementById('eraser');

lackOf.addEventListener('click', () => {
    isErased = !isErased;
    
    if (isErased) {
        isColorMode = false;
        isGrabMode = false;
        selectedColor = null;
        clearActiveStates();
        lackOf.classList.add('active');
        colorControl.style.display = 'none';
        
    } else {
        lackOf.classList.remove('active');
    }

    
} );
}
erase();

function clear() {
    const isClearMode = document.getElementById('clear');

    isClearMode.addEventListener('click', () => { 
       const squares = document.querySelectorAll('#container .square');
       squares.forEach(container => {
        container.style.backgroundColor = 'white'
       })
       })
    
}
clear();

const grabberButton = document.getElementById('grabColor');


grabberButton.addEventListener('click', () => {
    isGrabMode = !isGrabMode;
    clearActiveStates();

    if (isGrabMode) {
        grabberButton.classList.add('active');
        isColorMode = false;
        isErased = false;
        isRainbowMode = false;
        colorControl.style.display = 'none';
    } else {
        grabberButton.classList.remove('active');
    }
});

container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDrawing = true;
});
container.addEventListener('mouseup', () => isDrawing = false);



generateGrid(16);



const rainbowButton = document.getElementById('rainbow');

      rainbowButton.addEventListener('click', () => {
        isRainbowMode = !isRainbowMode;
        if (isRainbowMode) {
            isColorMode = false;
            isErased = false;
            isGrabMode = false; 
            clearActiveStates();
            rainbowButton.classList.add('active');
            toggleButton.classList.add('active');
        } else {
            rainbowButton.classList.remove('active');
            toggleButton.classList.remove('active');
        }
      });

const gridValue = document.getElementById('gridValue');

const gridSlider = document.getElementById('gridSizesSlider')
    gridSlider.addEventListener('input', () => {
    const size = parseInt(gridSlider.value);
    gridValue.textContent = `${size} x ${size}`;
    generateGrid(size);
});

function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
}





function clearActiveStates() {
    const activeButton = document.querySelectorAll('.active');
    activeButton.forEach(button => button.classList.remove('active'));
}