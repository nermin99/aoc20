const fs = require('fs')
const numbers = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b)

numbers.unshift(0)
numbers.push(Math.max(...numbers) + 3)

console.clear()

function part1() {
  const deltaMap = new Map()

  let prevElement = 0
  for (let i = 0; i < numbers.length; i++) {
    const element = numbers[i]
    const delta = element - prevElement
    deltaMap.set(delta, (deltaMap.get(delta) ?? 0) + 1)
    prevElement = element
  }
  return deltaMap.get(1) * deltaMap.get(3)
}
console.log(part1())

function part2() {
  const memo = new Map()

  const dp = (i) => {
    if (memo.has(i)) return memo.get(i)
    if (i === numbers.length - 1) return 1

    let ans = 0
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[j] - numbers[i] <= 3) {
        ans += dp(j)
      }
    }
    memo.set(i, ans)
    return ans
  }
  return dp(0)
}

console.log(part2())
