const fs = require('fs')
const numbers = fs.readFileSync('input.txt', 'utf8').split('\n').map(Number)
// console.log(numbers)

const preamble = 25

function part1() {
  const computeSums = (index) => {
    const sumCombinations = new Set()

    for (let i = index - preamble; i < index; i++) {
      for (let j = i + 1; j < index; j++) {
        sumCombinations.add(numbers[i] + numbers[j])
      }
    }
    return sumCombinations
  }

  for (let i = preamble; i < numbers.length; i++) {
    const element = numbers[i]
    if (!computeSums(i).has(element)) return element
  }
}
console.log(part1())

function part2() {
  const target = 1504371145 // part1
  const targetIndex = 652

  let windowSize = 2
  while (windowSize < targetIndex) {
    let windowIndex = 0
    while (windowIndex - 1 + windowSize < targetIndex) {
      let sum = 0
      let candidates = []
      for (let i = windowIndex; i < windowIndex + windowSize; i++) {
        const element = numbers[i]
        candidates.push(element)
        sum += element
      }
      if (sum === target)
        return Math.min(...candidates) + Math.max(...candidates)

      windowIndex++
    }
    windowSize++
  }
}
console.log(part2())
