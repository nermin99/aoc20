const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n\n')
// console.log(data)

function part1() {
  let total = 0

  data.forEach((group) => {
    const letters = new Set()
    const chars = group.split('').filter((char) => char !== '\n')
    chars.forEach((char) => letters.add(char))
    total += letters.size
  })
  console.log(total)
}
part1()

function part2() {
  let total = 0

  data.forEach((group) => {
    const persons = group.split('\n')
    const letterCount = new Map()

    persons.forEach((person) => {
      const chars = person.split('')
      chars.forEach((char) => {
        letterCount.set(char, (letterCount.get(char) || 0) + 1)
      })
    })
    letterCount.forEach((count) => {
      if (count === persons.length) total++
    })
  })
  console.log(total)
}
part2()
