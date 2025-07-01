let num = 256;
let isErased = false;
let isClear = false;
for (i = 0; i < num; i ++) {
    const createDiv = document.createElement('div');
    document.getElementById(container);
    container.appendChild(createDiv);
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
        colorControl.style.display = 'none';
        document.body.style.backgroundColor = 'white';
    }

    
} );
}
erase();

function clear() {
    const isClearMode = document.getElementById('clear');

    isClearMode.addEventListener('click', () => { 
       
       squares.forEach(container => {
        container.style.backgroundColor = 'white'
       })
       })
    
}
clear();

document.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDrawing = true;
});
document.addEventListener('mouseup', () => isDrawing = false);