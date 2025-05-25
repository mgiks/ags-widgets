export function addCommasToNumber(n: number) {
  const numberAsString = n.toString()
  let reversedNumberAsStringWithCommas = ''
  let charCounter = 0
  for (let i = numberAsString.length - 1; i >= 0; i--) {
    charCounter++
    reversedNumberAsStringWithCommas += numberAsString[i]
    if (charCounter == 3 && i !== 0) {
      reversedNumberAsStringWithCommas += ','
      charCounter = 0
    }
  }
  return reversedNumberAsStringWithCommas.split('').reverse().join('')
}
