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

function getWallandField() {
    let game = [[0, 2, 5],[],[],[],[],[3,8,9],[],[],[],[]];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (game[i].includes(j) ? document.querySelector('#row' + i).children[j].setAttribute('class', 'cell-wall') :
                document.querySelector('#row' + 1).children[j].setAttribute('class', 'cell');
        }
    }
}

function main() {
    setGameField();
    getWallandField();
}

main()
