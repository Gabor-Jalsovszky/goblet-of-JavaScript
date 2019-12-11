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
                console.log("i: " + i + "j: " + j + "boolean: " + game[i].includes(j));
                document.querySelector('#row' + i).children[j].classList.add('cell');
            }
        }
    }
}

function setElementsOnField() {

}


function main() {
    setGameField();
    getWallAndField();
}

main()
