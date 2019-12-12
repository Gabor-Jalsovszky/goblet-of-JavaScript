let inventory = {water: 0, key: 0, bomb: 0};


function printInventory() {
    document.getElementById('water').innerHTML = 'Water: ' + inventory.water;
    document.getElementById('key').innerHTML = 'Key: ' + inventory.key;
    document.getElementById('bomb').innerHTML = 'Bomb: ' + inventory.bomb
}

function setGameField() {

    for (let i = 0; i < 12; i++) {
        let row = document.createElement('tr');
        row.setAttribute('id', 'row' + i.toString());
        for (let j = 0; j < 12; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', j.toString());
            row.appendChild(cell);
        }
        document.querySelector('.game-field').appendChild(row);
    }
}

function getWallAndField() {
    let game = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 8, 11], [0, 6, 8, 11], [0, 2, 3, 4, 5, 6, 8, 9, 10, 11], [0, 4, 11], [0, 1, 2, 3, 4, 6, 7, 8, 9, 11], [0, 11], [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11], [0, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11], [0, 11], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (game[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('cell-wall');
            } else {
                document.querySelector('#row' + i).children[j].classList.add('cell');
            }
        }
    }
}

function setElementsOnField() {
    let player = [[], [], [], [], [], [], [], [], [], [], [1], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (player[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('cell-player');
            }
        }
    }
    let fire = [[], [], [], [1], [], [], [], [6], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (fire[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('fire');
            }
        }
    }
    let water = [[], [], [], [], [], [], [1], [], [1], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (water[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('water');
            }
        }
    }
    let bomb = [[], [], [], [], [3], [], [], [], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (bomb[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('bomb');
            }
        }
    }
    let door = [[], [6], [], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (door[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('door');
            }
        }
    }
    let key = [[], [], [], [], [], [10], [], [], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (key[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('key');
            }
        }
    }
    let goblet = [[], [10], [], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (goblet[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('goblet');
            }
        }
    }
    let enemy = [[], [], [5], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (enemy[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('enemy');
            }
        }
    }

}


function movePlayer() {
    document.addEventListener('keydown', function (event) {
        let player = document.querySelector('.cell-player');
        getWater(player);
        crossFire(player);
        getKey(player);
        getBomb(player);
        crossDoor(player);
        let nextCell, rowId, open, leftCell, rightCell, upperCell, lowerCell, upperRowId, lowerRowId;
        switch (event.key) {
            case 'ArrowLeft':
                nextCell = player.parentElement.children[parseInt(player.getAttribute('id')) - 1];
                open = checkDoorKey(nextCell);
                if (nextCell.className !== 'cell-wall' && open === true) {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'ArrowRight':
                nextCell = player.parentElement.children[parseInt(player.getAttribute('id')) + 1];
                open = checkDoorKey(nextCell);
                if (nextCell.className !== 'cell-wall' && open === true) {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'ArrowUp':
                rowId = player.parentElement.getAttribute('id');
                rowId = parseInt(rowId.slice(3)) - 1;
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                open = checkDoorKey(nextCell);
                if (nextCell.className !== 'cell-wall' && open === true) {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'ArrowDown':
                rowId = player.parentElement.getAttribute('id');
                rowId = parseInt(rowId.slice(3)) + 1;
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                open = checkDoorKey(nextCell);
                if (nextCell.className !== 'cell-wall' && open === true) {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'b':
                if (inventory.bomb > 0) {
                    leftCell = player.parentElement.children[parseInt(player.getAttribute('id')) - 1];
                    rightCell = player.parentElement.children[parseInt(player.getAttribute('id')) + 1];
                    upperRowId = player.parentElement.getAttribute('id');
                    upperRowId = parseInt(upperRowId.slice(3)) - 1;
                    upperCell = player.parentElement.parentElement.children[upperRowId].children[player.getAttribute('id')];
                    lowerRowId = player.parentElement.getAttribute('id');
                    lowerRowId = parseInt(lowerRowId.slice(3)) + 1;
                    lowerCell = player.parentElement.parentElement.children[lowerRowId].children[player.getAttribute('id')];
                    leftCell.classList.replace('cell-wall', 'cell');
                    rightCell.classList.replace('cell-wall', 'cell');
                    upperCell.classList.replace('cell-wall', 'cell');
                    lowerCell.classList.replace('cell-wall', 'cell');
                    inventory.bomb --
                    break;
                }
            case 'x':
                leftCell = player.parentElement.children[parseInt(player.getAttribute('id')) - 1];
                rightCell = player.parentElement.children[parseInt(player.getAttribute('id')) + 1];
                upperRowId = player.parentElement.getAttribute('id');
                upperRowId = parseInt(upperRowId.slice(3)) - 1;
                upperCell = player.parentElement.parentElement.children[upperRowId].children[player.getAttribute('id')];
                lowerRowId = player.parentElement.getAttribute('id');
                lowerRowId = parseInt(lowerRowId.slice(3)) + 1;
                lowerCell = player.parentElement.parentElement.children[lowerRowId].children[player.getAttribute('id')];
                leftCell.classList.remove('enemy');
                rightCell.classList.remove('enemy');
                upperCell.classList.remove('enemy');
                lowerCell.classList.remove('enemy');
                break;
        }
    })
}


function moveDementor() {
    let dementor = document.querySelector('.enemy');
    let nextCell = dementor.parentElement.children[parseInt(dementor.getAttribute('id')) - 1];
    if (nextCell.className !== 'cell-wall') {
        dementor.classList.remove('enemy');
        nextCell.classList.add('enemy');
    } else {
        nextCell = dementor.parentElement.children[parseInt(dementor.getAttribute('id')) + 1];
        dementor.classList.remove('enemy');
        nextCell.classList.add('enemy');
    }
}


function getWater(player) {
    if (player.classList.contains('water')) {
        player.classList.remove('water');
        inventory.water ++;
    }
}


function crossFire(player) {
    if (inventory.water > 0 && player.classList.contains('fire')) {
        player.classList.remove('fire');
        inventory.water --;
    }
}


function getKey(player) {
    if (player.classList.contains('key')) {
        player.classList.remove('key');
        inventory.key ++;
    }
}


function getBomb(player) {
    if (player.classList.contains('bomb')) {
        player.classList.remove('bomb');
        inventory.bomb ++;
    }
}


function checkDoorKey(nextCell) {
    if (nextCell.classList.contains('door') && inventory.key < 1) {
            return false;
        }
    return true
}


function crossDoor(player) {
    if (player.classList.contains('door')) {
        player.classList.remove('door');
        inventory.key --;
    }
}


function main() {
    setGameField();
    setElementsOnField();
    getWallAndField();
    movePlayer();
    setInterval(moveDementor, 500);
    setInterval(printInventory, 1000);
}

main();
