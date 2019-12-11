function getDirections() {
    return [
        {x: 1, y: 0}, // horizontal
        {x: 0, y: 1}, // vertical
        {x: 1, y: 1}, // diagonal 1
        {x: 1, y: -1}, // diagonal 2
    ]
}

function setGameField() {

    for (let i = 0; i < 10; i++) {
        let row = document.createElement('tr');
        row.setAttribute('id', 'row' + i.toString());
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', j.toString());
            row.appendChild(cell);
        }
        document.querySelector('.game-field').appendChild(row);
    }
}

function getWallAndField() {
    let game = [[7], [5,7], [1,2,3,4,5,7,8,9], [3], [0,1,2,3,5,6,7,8], [], [0,1,2,3,4,6,7,8,9], [], [0,1,2,3,4,5,6,7,8], []];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (game[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('cell-wall');
            } else {
                document.querySelector('#row' + i).children[j].classList.add('cell');
            }
        }
    }
}

function setElementsOnField() {
    let player = [[], [], [], [], [], [], [], [], [], [0]];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (player[i].includes(j)) {
                document.querySelector('#row' + i).children[j].classList.add('cell-player');
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
                player.classList.remove('cell-player');
                nextCell.classList.add('cell-player')
                break;
            case 'ArrowRight':
                nextCell = player.parentElement.children[parseInt(player.getAttribute('id')) + 1];
                player.classList.remove('cell-player');
                nextCell.classList.add('cell-player')
                break;
            case 'ArrowUp':
                rowId = player.parentElement.getAttribute('id');
                rowId = parseInt(rowId.charAt(3)) - 1
                player.classList.remove('cell-player');
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                nextCell.classList.add('cell-player');
                break;
            case 'ArrowDown':
                rowId = player.parentElement.getAttribute('id');
                rowId = parseInt(rowId.charAt(3)) + 1
                player.classList.remove('cell-player');
                nextCell = player.parentElement.parentElement.children[rowId].children[player.getAttribute('id')];
                nextCell.classList.add('cell-player');
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
