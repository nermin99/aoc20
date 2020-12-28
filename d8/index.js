const fs = require('fs')
const instructions = fs.readFileSync('input.txt', 'utf8').split('\n')

function part1(instructions) {
  let index = 0
  let acc = 0
  let looped = false
  const indexMap = new Map()

  while (index < instructions.length) {
    indexMap.set(index, (indexMap.get(index) || 0) + 1)

    if (indexMap.get(index) > 1) {
      looped = true
      break
    }

    const [, instruction, val] = instructions[index].match(/(\w+) ([+-]\d+)/)
    switch (instruction) {
      case 'acc':
        acc += eval(val)
        index++
        break
      case 'jmp':
        index += eval(val)
        break
      default:
        index++
    }
  }
  return { acc, looped }
}
console.log(part1(instructions).acc)

function part2() {
  for (let i = 0; i < instructions.length; i++) {
    const element = instructions[i]
    if (element.startsWith('jmp')) {
      const temp = element
      instructions[i] = element.replace('jmp', 'nop')
      const { acc, looped } = part1(instructions)
      if (!looped) {
        return acc
      } else {
        instructions[i] = temp
      }
    }
  }
}
console.log(part2())
