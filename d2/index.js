const fs = require('fs')
const list = fs.readFileSync('input.txt', 'utf8').split('\n').slice(0, -1)

function part1() {
  let validPasswords = 0

  list.forEach((row) => {
    const [rule, password] = row.split(':')
    const [interval, letter] = rule.split(' ')
    const [lowerLimit, higherLimit] = interval.split('-')

    let letterCounter = 0
    for (let index = 0; index < password.length; index++) {
      if (password.charAt(index) === letter) {
        letterCounter++
      }
    }

    if (letterCounter >= lowerLimit && letterCounter <= higherLimit) {
      validPasswords++
    }
  })
  return validPasswords
}

function part2() {
  let validPasswords = 0

  list.forEach((row) => {
    const [rule, password] = row.split(':')
    const [interval, letter] = rule.split(' ')
    const [lowerPosition, higherPosition] = interval.split('-')

    let first,
      second,
      final = false

    if (password.charAt(lowerPosition) === letter) first = true
    if (password.charAt(higherPosition) === letter) second = true

    if (first || second) final = true
    if (first && second) final = false

    if (final) validPasswords++
  })
  return validPasswords
}

console.log(part2())
