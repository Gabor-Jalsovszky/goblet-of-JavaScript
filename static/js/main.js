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
        let nextCell;
        let rowId;
        switch (event.key) {
            case 'ArrowLeft':
                nextCell = player.parentElement.children[parseInt(player.getAttribute('id')) - 1];
                if (nextCell.className !== 'cell-wall') {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'ArrowRight':
                nextCell = player.parentElement.children[parseInt(player.getAttribute('id')) + 1];
                if (nextCell.className !== 'cell-wall') {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'ArrowUp':
                rowId = player.parentElement.getAttribute('id');
                rowId = parseInt(rowId.slice(3)) - 1;
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                if (nextCell.className !== 'cell-wall') {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
            case 'ArrowDown':
                rowId = player.parentElement.getAttribute('id');
                rowId = parseInt(rowId.slice(3)) + 1;
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                if (nextCell.className !== 'cell-wall') {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
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


function main() {
    setGameField();
    setElementsOnField();
    getWallAndField();
    movePlayer();
    setInterval(moveDementor, 500);
    setInterval(printInventory, 1000);
}

main();
