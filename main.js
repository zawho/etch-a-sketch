let allTiles;
let numOfTiles;
let tileColor;
let shaderMode = 'off';
let randomMode = 'off';
let eraseMode = 'off';

const sliderInput = document.querySelector('.slider-input');
const sliderOutput = document.querySelector('.slider-output');
const gridContainer = document.querySelector('.grid-container');
const colorPicker = document.querySelector('.color-picker');
const randomButton = document.querySelector('.random-button');
const randomSwitch = document.querySelector('.random-switch');
const shaderButton = document.querySelector('.shader-button');
const shaderSwitch = document.querySelector('.shader-switch');
const eraserButton = document.querySelector('.eraser-button');
const eraserSwitch = document.querySelector('.eraser-switch');
const resetButton = document.querySelector('.reset-button');
const docFragment = document.createDocumentFragment();

sliderInput.addEventListener('input', getGridSize);
resetButton.addEventListener('click', resetTiles);
resetButton.addEventListener('click', resetShader);
resetButton.addEventListener('click', resetRand);
resetButton.addEventListener('click', resetEraser);
colorPicker.addEventListener('click', colorTiles);
colorPicker.addEventListener('input', colorTiles);
randomButton.addEventListener('click', switchRand);
shaderButton.addEventListener('click', switchShader);
eraserButton.addEventListener('click', switchEraser);

//Hover event loop that allows for coloring by clicking and dragging the mouse. Color selected via RGB picker.
function colorTiles() {
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
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', randMouseOver);
        allTiles[i].addEventListener('click', randClick);
    }
}

//Random color event functions.
function randMouseOver(e) {
    if (e.buttons === 1) {
        e.target.style.backgroundColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
    }
}

function randClick(e) {
    e.target.style.backgroundColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
}

//Remove random event listeners.
function turnOffRand() {
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].removeEventListener('mouseover', randMouseOver);
        allTiles[i].removeEventListener('click', randClick);
    }
    colorTiles();
}

//On/off switch for random.
function switchRand() {
    if (randomMode === 'off') {
        randomMode = 'on';
        randomSwitch.innerText = 'ON';
        colorRandom();
    } else if (randomMode === 'on') {
        randomMode = 'off';
        randomSwitch.innerText = 'OFF';
        turnOffRand();
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
    }
}

function shadeClick(e) {
    e.target.style.opacity -= '-0.1';
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

//Remove shader event listeners and reset opacity.
function turnOffShader() {
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].removeEventListener('mouseover', shadeMouseOver);
        allTiles[i].removeEventListener('click', shadeClick);
        allTiles[i].addEventListener('mouseover', resetOpacityMouseover);
        allTiles[i].addEventListener('click', resetOpacityClick);
    }
}

//On/off switch for shader.
function switchShader() {
    if (shaderMode === 'off') {
        shaderMode = 'on';
        shaderSwitch.innerText = 'ON';
        shadeTiles();
    } else if (shaderMode === 'on') {
        shaderMode = 'off';
        shaderSwitch.innerText = 'OFF';
        turnOffShader();
    }
}

//Eraser functionality initiated by the eraser button.
function eraseTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', eraseMouseOver);
        allTiles[i].addEventListener('click', eraseClick);
    }
}

//Eraser event functions.
function eraseMouseOver(e) {
    if (e.buttons === 1) {
        e.target.style.backgroundColor = 'white';
    }
}

function eraseClick(e) {
    e.target.style.backgroundColor = 'white';
}

//Remove eraser event listeners.
function turnOffEraser() {
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].removeEventListener('mouseover', eraseMouseOver);
        allTiles[i].removeEventListener('click', eraseClick);
    }
    colorTiles();
}


//On/off swutch for eraser.
function switchEraser() {
    if (eraseMode === 'off') {
        eraseMode = 'on';
        eraserSwitch.innerText = 'ON';
        eraseTiles();
    } else if (eraseMode === 'on') {
        eraseMode = 'off';
        eraserSwitch.innerText = 'OFF';
        turnOffEraser();
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

//Reset button clears color tiles.
function resetTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].style.backgroundColor = 'white';
        allTiles[i].style.opacity = '';
    }
}

//Reset button turns off random.
function resetRand() {
    randomMode = 'off';
    randomSwitch.innerText = 'OFF';
    turnOffRand();
}

//Reset button turns off shader.
function resetShader() {
    shaderMode = 'off';
    shaderSwitch.innerText = 'OFF';
    turnOffShader();
}

//Reset button turns off eraser.
function resetEraser() {
    eraseMode = 'off';
    eraserSwitch.innerText = 'OFF';
    turnOffEraser();
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
    if (randomMode === 'off') {
        colorTiles();
    }
    if (randomMode === 'on') {
        colorRandom();
    } 
    if (shaderMode === 'on') {
        shadeTiles();
    }
    if (eraseMode === 'on') {
        eraseMode = 'off';
        eraserSwitch.innerText = 'OFF';
    }
}

createTiles();
colorTiles();