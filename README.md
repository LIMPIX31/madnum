# Madnum
Transform large numbers to length-friendly string

The transform algorithm uses the **`"aa" notation`**
```ts
import { mn } from 'madnum'

// Default usage

mn(1000) // 1 K

mn(1e6) // 1 M

mn(1.5e6) // 1.5 M

// The "aa" notation example

mn(1e15) // 1 AA

// With fixed precision

mn(1000, 2) // 1.00 K

mn(1.2324e6, 3) // 1.232 M

// With options

mn(-123114511661, {
  format: '{num}{unit}',
  maxfd: 2,
  lowercase: true,
  separator: ' '
}) // -123.11b

// Can handle infinity-like numbers

mn(1e1000) // ∞

mn(Infinity) // ∞

mn(-Infinity) // -∞

```