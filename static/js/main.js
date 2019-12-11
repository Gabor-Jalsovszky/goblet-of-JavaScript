function getDirections() {
    return [
        {x: 1, y: 0}, // horizontal
        {x: 0, y: 1}, // vertical
        {x: 1, y: 1}, // diagonal 1
        {x: 1, y: -1}, // diagonal 2
    ]
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
    let game = [[0,1,2,3,4,5,6,7,8,9,10,11], [0,8,11], [0,6,8,11], [0,2,3,4,5,6,8,9,10,11], [0,4,11], [0,1,2,3,4,6,7,8,9,11], [0,11], [0,1,2,3,4,5,7,8,9,10,11], [0,11], [0,1,2,3,4,5,6,7,8,9,11], [0,11], [0,1,2,3,4,5,6,7,8,9,10,11]];
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
    let enemy = [[], [], [2], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            if (enemy[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('enemy');
            }
        }
    }

}


function movePlayer() {
    document.addEventListener('keydown', function (event){
        let player = document.querySelector('.cell-player')
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
                rowId = parseInt(rowId.slice(3)) + 1
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                if (nextCell.className !== 'cell-wall') {
                    player.classList.remove('cell-player');
                    nextCell.classList.add('cell-player');
                }
                break;
        }
        })
    }


function main() {
    setGameField();
    setElementsOnField();
    getWallAndField();
    movePlayer();
}

main()
