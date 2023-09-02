const units = ['', 'K', 'M', 'B', 'T']

const a = 'A'.charCodeAt(0)

function log(n: number, b: number) {
  return Math.log(n) / Math.log(b)
}

export interface MadnumOptions {
  /**
   * Custom number formatter
   */
  intl?: (num: number) => string
  /**
   * Process the number if more than a threshold
   */
  threshold?: number
  /**
   * string format
   *
   * @example Default
   * (base, unit) => `${base} ${unit}`
   */
  format?: (base: string, unit: string) => string
}

function localize(num: number, options?: MadnumOptions) {
  if (options?.intl) {
    return options.intl(num)
  }

  return num.toString(10)
}

/**
 * Transform a large number into a pretty output
 * @example
 * // With dynamic precision
 * mn(1000) // 1 K
 * mn(1500000) // 1 M
 * mn(1e9) // 1 B
 * // Fixed format length
 * mn(1500, 2) // 1.50 K
 * mn(1337e3, 2) // 1.33 M
 * // Can handle infinity-like numbers
 * mn(Infinity) // ∞
 */
export function format(number: number, options?: MadnumOptions): string {
  if (number === 0) {
    return '0'
  }

  if (!isFinite(number)) {
    return number < 0 ? '-∞' : '∞'
  }

  if (Math.abs(number) < (options?.threshold ?? 1e3)) {
    return localize(number)
  }

  const negative = number < 0 ? (number = -number) : false

  const n = Math.floor(log(number, 1e3))
  const m = number / 1e3 ** n

  let unit = ''
  if (n < units.length) {
    unit = units[n]
  } else {
    const unitInt = n - units.length
    unit =
      String.fromCharCode(unitInt / 26 + a) +
      String.fromCharCode((unitInt % 26) + a)
  }

  const localized = localize(negative ? -m : m, options)

  const result = options?.format?.(localized, unit) ?? `${localized} ${unit}`

  return result
}

export default format
