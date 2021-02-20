const fs = require('fs')
const data = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((str) => str.split(''))

function printMatrix(matrix) {
  const arr = matrix.map((arr) => arr.join('')).join('\n')
  console.log(arr)
  console.log()
}

console.log(part1())
function part1() {
  let currentMatrix = JSON.parse(JSON.stringify(data))

  while (true) {
    const [isChanged, newMatrix] = shuffleRound(currentMatrix)
    currentMatrix = JSON.parse(JSON.stringify(newMatrix))
    if (!isChanged) {
      return countOccupiedMatrix(currentMatrix)
    }
  }
}

function countAdjacent(matrix, row, col) {
  let adjacent = 0
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i === row && j === col) continue
      if (matrix?.[i]?.[j] === '#') adjacent++
    }
  }
  return adjacent
}

function countOccupiedMatrix(matrix) {
  let occupied = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '#') occupied++
    }
  }
  return occupied
}

function shuffleRound(oldMatrix, minOccupied = 4) {
  const newMatrix = JSON.parse(JSON.stringify(oldMatrix))
  let isChanged = false

  for (let row = 0; row < oldMatrix.length; row++) {
    for (let col = 0; col < oldMatrix[row].length; col++) {
      const seat = oldMatrix[row][col]
      const adjacent = countAdjacent(oldMatrix, row, col)
      if (seat === 'L' && adjacent === 0) {
        newMatrix[row][col] = '#'
        isChanged = true
      } else if (seat === '#' && adjacent >= minOccupied) {
        newMatrix[row][col] = 'L'
        isChanged = true
      }
    }
  }
  return [isChanged, newMatrix]
}

console.log(part2())
function part2() {
  let currentMatrix = JSON.parse(JSON.stringify(data))

  while (true) {
    const [isChanged, newMatrix] = shuffleRound2(currentMatrix)
    currentMatrix = JSON.parse(JSON.stringify(newMatrix))

    if (!isChanged) {
      return countOccupiedMatrix(currentMatrix)
    }
  }
}

function countVisibleSeats(matrix, row, col) {
  let visible = 0

  if (matrix[row][col] === '.') return visible

  const directions = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ]

  for (const [dx, dy] of directions) {
    let steps = 1
    while (true) {
      const newRow = row + steps * dy
      const newCol = col + steps * dx
      const el = matrix?.[newRow]?.[newCol]

      if (!el) break
      if (el === '#') {
        visible++
        break
      }
      if (el === 'L') break
      steps++
    }
  }
  return visible
}

function shuffleRound2(oldMatrix, minOccupied = 5) {
  const newMatrix = JSON.parse(JSON.stringify(oldMatrix))
  let isChanged = false

  for (let row = 0; row < oldMatrix.length; row++) {
    for (let col = 0; col < oldMatrix[row].length; col++) {
      const seat = oldMatrix[row][col]
      const adjacent = countVisibleSeats(oldMatrix, row, col)

      if (seat === 'L' && adjacent === 0) {
        newMatrix[row][col] = '#'
        isChanged = true
      } else if (seat === '#' && adjacent >= minOccupied) {
        newMatrix[row][col] = 'L'
        isChanged = true
      }
    }
  }
  return [isChanged, newMatrix]
}
