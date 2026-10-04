# NFG.TEST.DARREN.001

Annual liquidity-pool allocation test module.

## Rule

Given `TOTAL`:

- Quarter allocation: `Q = TOTAL / 4`
- Deduction: `D = 60% of Q`
- Liquidity pool: `LP = Q - D`
- Therefore: `LP = 10% of TOTAL`

The annual cycle ends on **December 16** in `America/Chicago`.

## Example

For a total of `$28,941,700.00`:

- Quarter: `$7,235,425.00`
- 60% of quarter: `$4,341,255.00`
- Liquidity pool: `$2,894,170.00`

## Run

```bash
node calc.js 28941700.00
```

## Safety / scope

This module performs deterministic allocation math only. It does not transfer funds, sign transactions, connect to a wallet, or settle a liquidity position. `test_mode` is enabled in `config.json`.
