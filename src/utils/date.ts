// Format date as MM/DD/YYYY
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

// Format date as YYYY-MM-DD for input fields
export const formatInputDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

// Get current date in YYYY-MM-DD format
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0]
}