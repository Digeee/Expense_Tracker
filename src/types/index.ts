export interface Expense {
  id: string
  title: string
  amount: number
  category: string
  date: string
  notes?: string
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