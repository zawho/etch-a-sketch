let allTiles;
let numOfTiles;
let tileColor;
let colorMode = 'standard';
let shaderMode = 'off';

const sliderInput = document.querySelector('.slider-input');
const sliderOutput = document.querySelector('.slider-output');
const gridContainer = document.querySelector('.grid-container');
const colorPicker = document.querySelector('.color-picker');
const randomButton = document.querySelector('.random-button');
const shaderButton = document.querySelector('.shader-button');
const shaderSwitch = document.querySelector('.shader-switch');
const resetButton = document.querySelector('.reset-button');
const docFragment = document.createDocumentFragment();

sliderInput.addEventListener('input', getGridSize);
resetButton.addEventListener('click', resetTiles);
colorPicker.addEventListener('click', colorTiles);
colorPicker.addEventListener('input', colorTiles);
randomButton.addEventListener('click', colorRandom);
shaderButton.addEventListener('click', activateShader);

//Hover event loop that allows for coloring by clicking and dragging the mouse. Color selected via RGB picker.
function colorTiles() {
    colorMode = 'standard';
    allTiles = document.querySelectorAll('.grid-tile');
    tileColor = colorPicker.value;
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', function(e) {
            if (e.buttons === 1) {
                allTiles[i].style.backgroundColor = tileColor;
            }
        });
        allTiles[i].addEventListener('click', function() {
                allTiles[i].style.backgroundColor = tileColor;
        });
    }
}

//Random color functionality initiated by the random button.
function colorRandom() {
    colorMode = 'random';
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', function(e) {
            if (e.buttons === 1) {
                allTiles[i].style.backgroundColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
            }
        });
        allTiles[i].addEventListener('click', function() {
                allTiles[i].style.backgroundColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
        });
    }
}

//Gradient color functionality initiated by the gradient button.
function shadeTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', function(e) {
            if (e.buttons === 1) {
                allTiles[i].style.opacity -= '-0.1';
            }
        });
        allTiles[i].addEventListener('click', function() {
            allTiles[i].style.opacity = '0';
            allTiles[i].style.opacity -= '-0.1';
        });
    }
}

// On/off switch for shader.
function activateShader() {
    if (shaderMode === 'off') {
        shaderMode = 'on';
        shaderSwitch.innerText = 'ON'
    } else if (shaderMode === 'on') {
        shaderMode = 'off';
        shaderSwitch.innerText = 'OFF';
    }
    shadeTiles();
}

//Generate grid. 
function createTiles() {
    numOfTiles = sliderInput.value;
    for (let i = 0; i < (numOfTiles * numOfTiles); i++) {
        const gridTile = document.createElement('div');
        gridTile.style.height = `calc((100% / ${numOfTiles}) - 1px)`;
        gridTile.style.width = `calc((100% / ${numOfTiles}) - 1px)`;
        gridTile.classList.add('grid-tile');
        docFragment.appendChild(gridTile);
    }
    gridContainer.appendChild(docFragment);
}

//Reset button clears black tiles.
function resetTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].style.backgroundColor = 'white';
    }
}

//Clear grid before creating new tiles.
function clearGrid() {
    gridContainer.innerText = '';
}

//Slider function for user input to determine grid size and generate new grid.
function getGridSize() {
    sliderOutput.value = `${sliderInput.value} x ${sliderInput.value}`;
    resetTiles();
    clearGrid();
    createTiles();
    if (colorMode === 'standard') {
        colorTiles();
    } else if (colorMode === 'random') {
        colorRandom();
    }
}

createTiles();
colorTiles();