let isDrawing = false;
let isErased = false;
let isClear = false;
let isGrabMode = false;
let selectedColor = null;
let isRainbowMode = false;
let isClassicMode = false;

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

        square.dataset.shade = 0;
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
    } else if (isClassicMode) {
        let shade = parseInt(container.dataset.shade) || 0;
        if (shade < 10) shade++;
        container.dataset.shade = shade;
        const lightness = 100 - (shade * 10);
        color = `hsl(0, 0%, ${lightness}%)`;
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
    }  else if (isClassicMode) {
        let shade = parseInt(container.dataset.shade) || 0;
        if (shade < 10) shade++;
        container.dataset.shade = shade;
        const lightness = 100 - (shade * 10);
        color = `hsl(0, 0%, ${lightness}%)`;
    } else if  (isColorMode) {
        color = selectedColor || getCurrentColor();
    } else {
        color = 'black';
    }
    container.style.backgroundColor = color; }

    }); 

    container.addEventListener('contextmenu', (e) => {
        e.preventDefault();

        let color = 'white';
        container.style.backgroundColor = color;
        container.dataset.shade = 0;
    })
  
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
        isClassicMode = false;
        selectedColor = null;
        clearActiveStates();
        toggleButton.classList.add('active');
     } else {
        toggleButton.classList.remove('active');
     }
    
    
    colorControl.style.display = 'block';
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
        colorControl.style.display = 'block';
        
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

       container.classList.add('shake');
       setTimeout(() => {
            container.classList.remove('shake');
       }, 400);

       isClearMode.classList.add('active');
       setTimeout(() => {
            isClearMode.classList.remove('active');
       }, 150);
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
        isClassicMode = false;
        colorControl.style.display = 'block';
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
clearActiveStates();



const rainbowButton = document.getElementById('rainbow');

      rainbowButton.addEventListener('click', () => {
        isRainbowMode = !isRainbowMode;
        if (isRainbowMode) {
            isColorMode = false;
            isErased = false;
            isGrabMode = false;
            isClassicMode = false; 
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

function classicMode() {
    const classicButton = document.getElementById('classic');
        classicButton.addEventListener('click', () => {
          isClassicMode = !isClassicMode;
          if (isClassicMode) {
            isColorMode = false;
            isErased = false;
            isRainbowMode = false;
            isGrabMode = false;
            
            clearActiveStates();
            classicButton.classList.add('active');
          }  else {
            classicButton.classList.remove('active');
          }
        });
}

classicMode();

const zoomBubble = document.getElementById('zoomBubble');

function updateBubble() {
    const hue = hueSlider.value;
    const percent = (hue - hueSlider.min) / (hueSlider.max - hueSlider.min);

    const sliderWidth = hueSlider.offsetWidth;
    const thumbOffset = sliderWidth * percent;

    zoomBubble.style.left = `${thumbOffset}px`
    zoomBubble.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
}

hueSlider.addEventListener('input', updateBubble);
hueSlider.addEventListener('mousemove', updateBubble);

updateBubble();

hueSlider.addEventListener('input', () => {
    isColorMode = true;
    isErased = false;
    isGrabMode = false;
    isRainbowMode = false;
    isClassicMode = false;
    selectedColor = null;

    clearActiveStates();
    toggleButton.classList.add('active');
    colorControl.style.display = 'block';
})



function clearActiveStates() {
    const activeButton = document.querySelectorAll('.active');
    activeButton.forEach(button => button.classList.remove('active'));
}