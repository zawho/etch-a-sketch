//Generate grid. 
const gridContainer = document.querySelector('.grid-container');
let docFragment = document.createDocumentFragment();

//test.
function testFunc() {
    for (let i = 0; i < 256; i++) {
        const gridTile = document.createElement('div');
        gridTile.classList.add('grid-tile');
        docFragment.appendChild(gridTile);
    }
    gridContainer.appendChild(docFragment);
    colorTiles();
}

//Hover event loop.
function colorTiles() {
    const allTiles = document.querySelectorAll('.grid-tile');
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
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].style.backgroundColor = 'white';
    }
}
resetButton.addEventListener('click', resetTiles);

//Run code.
testFunc();