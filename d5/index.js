const fs = require('fs')
const list = fs.readFileSync('input.txt', 'utf8').split('\r\n').slice(0, -1)

const seatIDs = []

function part1() {
  let maxID = 0

  list.forEach((entry) => {
    const binRow = [...entry.substring(0, 7)].reduce(
      (str, char) => str + (char === 'B' ? '1' : '0'),
      ''
    )
    const row = parseInt(binRow, 2)

    const binCol = [...entry.substring(7, 10)].reduce(
      (str, char) => str + (char === 'R' ? '1' : '0'),
      ''
    )
    const col = parseInt(binCol, 2)

    const ID = row * 8 + col
    seatIDs.push(ID)
    maxID = ID >= maxID ? ID : maxID
  })
  return maxID
}
console.log(part1())

// part2 (just look for missing number, no cap). (539)
console.dir(
  seatIDs.sort((a, b) => a - b),
  { maxArrayLength: null }
)
