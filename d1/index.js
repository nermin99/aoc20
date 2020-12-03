const fs = require('fs')

const list = fs
  .readFileSync('./d1/input.txt', { encoding: 'utf8' })
  .split('\n')
  .map((str) => parseInt(str))
  .sort((a, b) => a - b)
  .slice(0, -1)

console.dir(list, { maxArrayLength: null })

const find2 = () => {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i; j < list.length - 1; j++) {
      if (list[i] + list[j] === 2020) {
        return list[i] * list[j]
      }
    }
  }
}
console.log(find2())

const find3 = () => {
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i; j < list.length - 1; j++) {
      for (let k = j; k < list.length - 1; k++) {
        if (list[i] + list[j] + list[k] === 2020) {
          return list[i] * list[j] * list[k]
        }
      }
    }
  }
}
console.log(find3())
