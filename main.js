//Generate grid. 
const gridContainer = document.querySelector('.grid-container');
let docFragment = document.createDocumentFragment();
for (let i = 0; i < 256; i++) {
    const gridTile = document.createElement('div');
    gridTile.classList.add('grid-tile');
    docFragment.appendChild(gridTile);
}
gridContainer.appendChild(docFragment);
const allTiles = document.querySelectorAll('.grid-tile');

//Hover event loop.
for (let i = 0; i < allTiles.length; i++) {
    allTiles[i].addEventListener('mouseover', function() {
        allTiles[i].style.backgroundColor = 'black';
    });
}

//Reset button clears black tiles.
const resetButton = document.querySelector('.reset-button');

function resetTiles() {
    for (let i = 0; i < allTiles.length; i++) {
        allTiles[i].style.backgroundColor = 'white';
    }
}

resetButton.addEventListener('click', resetTiles);


