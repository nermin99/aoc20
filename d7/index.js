const fs = require('fs')
const rules = fs.readFileSync('input.txt', 'utf8').split('\n')
// console.log(rules)

function part1() {
  let total = 0
  const requestedColor = 'shiny gold'
  const bagColorMap = new Map()

  rules.forEach((rule) => {
    const bagContainer = rule.match(/(\w+ \w+)/)[0]
    const bagChildren = rule.matchAll(/(?<quantity>\d+) (?<color>\w+ \w+)/g)
    const bagColorsInside = new Set()
    for (const match of bagChildren) {
      const { quantity, color } = match.groups
      bagColorsInside.add(color)
    }
    bagColorMap.set(bagContainer, bagColorsInside)
  })
  // console.log(bagColorMap)

  const hasColor = (bagColor) => {
    const colorSet = bagColorMap.get(bagColor)

    if (colorSet.has(requestedColor)) return true

    for (const color of colorSet) {
      if (hasColor(color)) return true
    }
    return false
  }

  bagColorMap.forEach((v, bagColor) => {
    if (hasColor(bagColor)) total++
  })
  console.log(total)
}
part1()

function part2() {
  const requestedColor = 'shiny gold'
  const bagColorMap = new Map()

  rules.forEach((rule) => {
    const bagContainer = rule.match(/(\w+ \w+)/)[0]
    const bagChildren = rule.matchAll(/(?<quantity>\d+) (?<color>\w+ \w+)/g)
    const bagColorsInside = new Map()
    for (const match of bagChildren) {
      const { quantity, color } = match.groups
      bagColorsInside.set(color, Number(quantity))
    }
    bagColorMap.set(bagContainer, bagColorsInside)
  })
  // console.log(bagColorMap)

  const countBags = (bagColor) => {
    const colorMap = bagColorMap.get(bagColor)

    let innerTotal = 1
    for (const [color, count] of colorMap) {
      innerTotal += count * countBags(color)
    }
    return innerTotal
  }
  const total = countBags(requestedColor) - 1
  console.log(total)
}
part2()
