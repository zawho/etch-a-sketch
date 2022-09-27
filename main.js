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

//Shader functionality initiated by the shader button.
function shadeTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', shadeMouseOver);
        allTiles[i].addEventListener('click', shadeClick);
        allTiles[i].removeEventListener('mouseover', resetOpacityMouseover);
        allTiles[i].removeEventListener('click', resetOpacityClick);
    }
}

//Shader event functions.
function shadeMouseOver(e) {
    if (e.buttons === 1) {
        e.target.style.opacity -= '-0.1';
        console.log(e.target.style.opacity);
    }
}

function shadeClick(e) {
    e.target.style.opacity -= '-0.1';
    console.log(e.target.style.opacity);
}

//Remove shader event listeners and reset opacity.
function TurnOffShader() {
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].removeEventListener('mouseover', shadeMouseOver);
        allTiles[i].removeEventListener('click', shadeClick);
        allTiles[i].addEventListener('mouseover', resetOpacityMouseover);
        allTiles[i].addEventListener('click', resetOpacityClick);
    }
}

//Reset opacity event functions.
function resetOpacityMouseover(e) {
    if (e.buttons === 1) {
        e.target.style.opacity = '';
    }
}

function resetOpacityClick(e) {
    e.target.style.opacity = '';
}

// On/off switch for shader.
function activateShader() {
    if (shaderMode === 'off') {
        shaderMode = 'on';
        shadeTiles();
        shaderSwitch.innerText = 'ON';
    } else if (shaderMode === 'on') {
        shaderMode = 'off';
        shaderSwitch.innerText = 'OFF';
        TurnOffShader();
    }
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
        allTiles[i].style.opacity = '';
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