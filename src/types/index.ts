export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  notes?: string
  receiptImage?: string // Add this field for receipt images
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface FilterOptions {
  category: string
  startDate: string
  endDate: string
}

export interface UserProfile {
  name: string
  email: string
  photo: string
  currency: string
}