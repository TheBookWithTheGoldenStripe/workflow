#!/usr/bin/env node

function parseAmountToCents(input) {
  if (!/^\d+(\.\d{1,2})?$/.test(input)) {
    throw new Error('Amount must be a non-negative decimal with at most 2 fractional digits.');
  }
  const [whole, frac = ''] = input.split('.');
  return BigInt(whole) * 100n + BigInt((frac + '00').slice(0, 2));
}

function formatCents(cents) {
  const whole = cents / 100n;
  const frac = (cents % 100n).toString().padStart(2, '0');
  return `${whole}.${frac}`;
}

function allocate(totalCents) {
  const quarter = totalCents / 4n;
  const sixtyPercentOfQuarter = (quarter * 60n) / 100n;
  const liquidityPool = quarter - sixtyPercentOfQuarter;

  return {
    total_cents: totalCents.toString(),
    quarter_cents: quarter.toString(),
    sixty_percent_of_quarter_cents: sixtyPercentOfQuarter.toString(),
    liquidity_pool_cents: liquidityPool.toString(),
    total_usd: formatCents(totalCents),
    quarter_usd: formatCents(quarter),
    sixty_percent_of_quarter_usd: formatCents(sixtyPercentOfQuarter),
    liquidity_pool_usd: formatCents(liquidityPool),
    effective_liquidity_pool_percent_of_total: 10,
    annual_cycle_end: '12-16',
    timezone: 'America/Chicago',
    test_mode: true
  };
}

const amount = process.argv[2];
if (!amount) {
  console.error('Usage: node calc.js <TOTAL_USD>');
  process.exit(1);
}

try {
  const cents = parseAmountToCents(amount);
  console.log(JSON.stringify(allocate(cents), null, 2));
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
}
