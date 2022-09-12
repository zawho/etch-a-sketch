//Grid. 
const gridContainer = document.querySelector('.grid-container');
let docFragment = document.createDocumentFragment();
for (let i = 0; i < 25; i++) {
    const gridTile = document.createElement('div');
    gridTile.classList.add('grid-tile');
    gridTile.style.height = '30px';
    gridTile.style.width = '30px';
    gridTile.style.border = '1px solid black';
    docFragment.appendChild(gridTile);
}
gridContainer.appendChild(docFragment);