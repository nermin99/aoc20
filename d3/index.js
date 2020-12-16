const fs = require('fs')
const list = fs.readFileSync('input.txt', 'utf8').split('\r\n').slice(0, -1)

function part1() {
  let trees = 0

  list.forEach((row, i) => {
    let col = (i * 3) % 31
    if (row[col] === '#') trees++
  })
  return trees
}
console.log(part1())

function part2() {
  const right = [1, 3, 5, 7, 1]
  const down = [1, 1, 1, 1, 2]
  const trees = [0, 0, 0, 0, 0]

  for (let j = 0; j < trees.length; j++) {
    let col = 0
    for (let row = 0; row < list.length; row += down[j]) {
      if (list[row][col] === '#') trees[j]++
      col = (col + right[j]) % 31
    }
  }
  return trees.reduce((total, curr) => total * curr)
}
console.log(part2())
