export function formatPrice(price: number): string {
  const amount = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(price)

  return `\u09F3${amount}`
}
