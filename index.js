let isDrawing = false;
let isErased = false;
let isClear = false;
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
             let color;
    if (isErased) {
        color = 'white';
    } else if  (isColorMode) {
        color = getCurrentColor();
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
    } else if  (isColorMode) {
        color = getCurrentColor();
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
        clearActiveStates();
        toggleButton.classList.add('active');
     } else {
        toggleButton.classList.remove('active');
     }
    
    document.body.style.backgroundColor = isColorMode ? '#ffffff' : 'white';
    colorControl.style.display = isColorMode ? 'block' : 'none';
});

function erase() {
    const lackOf = document.getElementById('eraser');

lackOf.addEventListener('click', () => {
    isErased = !isErased;
    
    if (isErased) {
        isColorMode = false;
        clearActiveStates();
        lackOf.classList.add('active');
        colorControl.style.display = 'none';
        document.body.style.backgroundColor = 'white';
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

container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDrawing = true;
});
container.addEventListener('mouseup', () => isDrawing = false);



generateGrid(16);

const gridValue = document.getElementById('gridValue');

const gridSlider = document.getElementById('gridSizesSlider')
    gridSlider.addEventListener('input', () => {
    const size = parseInt(gridSlider.value);
    gridValue.textContent = `${size} x ${size}`;
    generateGrid(size);
});

const activeButton = document.querySelectorAll('.active');

function clearActiveStates() {
    activeButton.forEach(button => button.classList.remove('active'));
}