let allTiles;
let numOfTiles;

const sliderInput = document.querySelector('.slider-input');
const sliderOutput = document.querySelector('.slider-output');
const gridContainer = document.querySelector('.grid-container');
const resetButton = document.querySelector('.reset-button');
const docFragment = document.createDocumentFragment();

sliderInput.addEventListener('input', getGridSize);
resetButton.addEventListener('click', resetTiles);

//Hover event loop that allows for coloring by clicking and dragging the mouse.
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