let num = 256;
for (i = 0; i < num; i ++) {
    const createDiv = document.createElement('div');
    document.getElementById(container);
    container.appendChild(createDiv);
}

const squares = document.querySelectorAll('#container div');
squares.forEach (container => {
    container.addEventListener ( 'mouseover', () => {
        container.style.backgroundColor = 'black'

    });
})