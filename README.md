# Madnum
Transform large numbers to length-friendly string

The transform algorithm uses the **`"aa" notation`**
```ts
import { format } from 'madnum'
// or default import
import madnum from 'madnum'

// Default usage

format(1000) // 1 K
format(1e6) // 1 M
format(1.5e6) // 1.5 M

// The "aa" notation example

format(1e15) // 1 AA

// With options

format(123456789, {
  intl: (num) =>  num.toFixed(2),
  format: (base, unit) => `${base}${unit.toLowerCase()}`
}) // 123.46m

// Intl.NumberFormat

const formatter = new Intl.NumberFormat('en', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

format(-123114511661, {
  intl: (num) => formatter.format(num),
  format: (base, unit) => `${base}${unit.toLowerCase()}`
}) // -123.1b

// Can handle infinity-like numbers

format(1e1000) // ∞
format(Infinity) // ∞
format(-Infinity) // -∞

```