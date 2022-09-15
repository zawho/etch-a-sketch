//Global variables.
let allTiles;
let numOfTiles;

//Slider.
const sliderInput = document.querySelector('.slider-input');
const sliderOutput = document.querySelector('.slider-output');

function getGridSize() {
    sliderOutput.value = `${sliderInput.value} x ${sliderInput.value}`;
    resetTiles();
}
sliderInput.addEventListener('input', getGridSize);

//Generate grid. 
const gridContainer = document.querySelector('.grid-container');
let docFragment = document.createDocumentFragment();

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

//Hover event loop.
function colorTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].addEventListener('mouseover', function(e) {
            if (e.buttons === 1) {
                allTiles[i].style.backgroundColor = 'black';
            }
        });
        allTiles[i].addEventListener('click', function(e) {
            if (e.buttons === 0) {
                allTiles[i].style.backgroundColor = 'black';
            }
        });
    }
}

//Reset button clears black tiles.
const resetButton = document.querySelector('.reset-button');

function resetTiles() {
    allTiles = document.querySelectorAll('.grid-tile');
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].style.backgroundColor = 'white';
    }
}

resetButton.addEventListener('click', resetTiles);

//Run code.
createTiles();