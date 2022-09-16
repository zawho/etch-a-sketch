let allTiles;
let numOfTiles;
let tileColor;

const sliderInput = document.querySelector('.slider-input');
const sliderOutput = document.querySelector('.slider-output');
const gridContainer = document.querySelector('.grid-container');
const colorPicker = document.querySelector('.color-picker');
const randomButton = document.querySelector('.random-button');
const resetButton = document.querySelector('.reset-button');
const docFragment = document.createDocumentFragment();

sliderInput.addEventListener('input', getGridSize);
resetButton.addEventListener('click', resetTiles);
colorPicker.addEventListener('click', colorTiles);
colorPicker.addEventListener('input', colorTiles);
randomButton.addEventListener('click', colorRandom);

//Hover event loop that allows for coloring by clicking and dragging the mouse.
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

//Random color. Need to fix grid reset + randomize for every tile.
function colorRandom() {
    allTiles = document.querySelectorAll('.grid-tile');
    tileColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
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
    colorTiles();
}

//Reset button clears black tiles.
function resetTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].style.backgroundColor = 'white';
    }
}

//Clear grid.
function clearGrid() {
    gridContainer.innerText = '';
}

//Slider for user input to determine grid size.
function getGridSize() {
    sliderOutput.value = `${sliderInput.value} x ${sliderInput.value}`;
    resetTiles();
    clearGrid();
    createTiles();
}

createTiles();