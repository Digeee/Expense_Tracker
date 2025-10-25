// Default currency symbol
// const DEFAULT_CURRENCY = '$'

// Format number as currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

// Parse currency string to number
export const parseCurrency = (value: string): number => {
  // Remove currency symbols and commas
  const cleanedValue = value.replace(/[^0-9.-]+/g, '')
  return parseFloat(cleanedValue) || 0
}