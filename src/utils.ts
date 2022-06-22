export const prettyNumber = ({ value = '0', decimals = '18', maximumFractionDigits = 8 }) => {
  const d = Number(decimals)
  const digits = padNumber(value.slice(0, -d))
  const fractions = padNumber(
    value.slice(-d, maximumFractionDigits - d).padStart(maximumFractionDigits, '0'),
  )

  return digits + '.' + fractions
}

const padNumber = (str: string) => {
  const { length } = str

  if (str.length <= 4) return str || '0'

  let startIndex = length % 4 || 4
  let paddedStr = str.slice(0, startIndex)
  for (; startIndex < str.length; startIndex += 4) {
    paddedStr += ' ' + str.slice(startIndex, startIndex + 4)
  }

  return paddedStr
}
