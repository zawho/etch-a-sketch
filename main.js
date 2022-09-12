//Generate grid. 
const gridContainer = document.querySelector('.grid-container');
let docFragment = document.createDocumentFragment();
for (let i = 0; i < 256; i++) {
    const gridTile = document.createElement('div');
    gridTile.classList.add('grid-tile');
    docFragment.appendChild(gridTile);
}
gridContainer.appendChild(docFragment);