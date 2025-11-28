// Default currency symbol
const DEFAULT_CURRENCY = 'USD'

// Currency configuration
const CURRENCY_CONFIG: Record<string, { locale: string; currency: string; minimumFractionDigits?: number }> = {
  USD: { locale: 'en-US', currency: 'USD' },
  EUR: { locale: 'de-DE', currency: 'EUR' },
  GBP: { locale: 'en-GB', currency: 'GBP' },
  JPY: { locale: 'ja-JP', currency: 'JPY', minimumFractionDigits: 0 },
  CAD: { locale: 'en-CA', currency: 'CAD' },
  AUD: { locale: 'en-AU', currency: 'AUD' },
  LKR: { locale: 'si-LK', currency: 'LKR', minimumFractionDigits: 2 }
}

// Format number as currency
export const formatCurrency = (amount: number, currencyCode: string = DEFAULT_CURRENCY): string => {
  const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG[DEFAULT_CURRENCY]
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: config.minimumFractionDigits ?? 2,
    maximumFractionDigits: config.minimumFractionDigits ?? 2
  }).format(amount)
}

// Parse currency string to number
export const parseCurrency = (value: string): number => {
  // Remove currency symbols and commas
  const cleanedValue = value.replace(/[^0-9.-]+/g, '')
  return parseFloat(cleanedValue) || 0
}

// Get currency symbol
export const getCurrencySymbol = (currencyCode: string = DEFAULT_CURRENCY): string => {
  const config = CURRENCY_CONFIG[currencyCode] || CURRENCY_CONFIG[DEFAULT_CURRENCY]
  
  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(0).replace(/\d/g, '').trim()
  } catch {
    // Fallback to currency code if symbol cannot be determined
    return currencyCode
  }
}