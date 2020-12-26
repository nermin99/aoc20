const fs = require('fs')
const data = fs.readFileSync('input.txt', 'utf8').split('\n\n')
// console.log(data)

function part1() {
  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  // const optional = ['cid']

  const passports = data
    .map((passport) => passport.split(/ |\n/))
    .map((field) => field.map((e) => e.split(':')[0]))

  const valid = passports.reduce((acc, passport) => {
    if (required.every((field) => passport.includes(field))) {
      acc++
    }
    return acc
  }, 0)

  console.log(valid)
}
part1()

function part2() {
  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  // const optional = ['cid']

  const passports = data.map((row) => row.split(/ |\n/))

  const fields_values = passports.map((passport) =>
    passport.reduce(
      ([a, b], row) => {
        const [field, value] = row.split(':')
        a.push(field)
        b.push(value)
        return [a, b]
      },
      [[], []]
    )
  )

  const valid = fields_values.reduce((acc, passport) => {
    const [fields, values] = passport

    if (required.every((field) => fields.includes(field))) {
      if (fields.every((field, i) => isValid(field, values[i]))) {
        acc++
      }
    }
    return acc
  }, 0)
  console.log(valid)
}
part2()

function isValid(field, value) {
  const num = Number(value)

  switch (field) {
    case 'byr':
      return num >= 1920 && num <= 2002
    case 'iyr':
      return num >= 2010 && num <= 2020
    case 'eyr':
      return num >= 2020 && num <= 2030
    case 'hgt':
      const [val, unit] = value.match(/^(\d+)(cm|in)$/)?.slice(1) || []
      if (!unit) return false
      return unit === 'cm' ? val >= 150 && val <= 193 : val >= 59 && val <= 76
    case 'hcl':
      return /^#[0-9a-f]{6}$/.test(value)
    case 'ecl':
      return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value)
    case 'pid':
      return /^\d{9}$/.test(value)

    default:
      return true
  }
}
