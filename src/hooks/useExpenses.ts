import { useState } from 'react'
import { Expense } from '../types'
import { useLocalStorage } from './useLocalStorage'

const DEFAULT_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Grocery shopping',
    amount: 85.75,
    category: 'Food',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    notes: 'Weekly groceries'
  },
  {
    id: '2',
    title: 'Gas station',
    amount: 45.00,
    category: 'Transport',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    notes: 'Fill up tank'
  },
  {
    id: '3',
    title: 'Electricity bill',
    amount: 120.50,
    category: 'Bills',
    date: new Date(Date.now() - 259200000).toISOString().split('T')[0], // 3 days ago
    notes: 'Monthly electricity bill'
  },
  {
    id: '4',
    title: 'Movie tickets',
    amount: 32.00,
    category: 'Leisure',
    date: new Date(Date.now() - 345600000).toISOString().split('T')[0], // 4 days ago
    notes: 'Avengers premiere'
  },
  {
    id: '5',
    title: 'New headphones',
    amount: 199.99,
    category: 'Shopping',
    date: new Date(Date.now() - 432000000).toISOString().split('T')[0], // 5 days ago
    notes: 'Replacement for broken ones'
  }
]

export const useExpenses = () => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', DEFAULT_EXPENSES)
  const [categories] = useState<string[]>([
    'Food',
    'Transport',
    'Bills',
    'Shopping',
    'Leisure',
    'Other'
  ])

  // Add a new expense
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    }
    setExpenses([...expenses, newExpense])
  }

  // Update an existing expense
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(expense => 
      expense.id === updatedExpense.id ? updatedExpense : expense
    ))
  }

  // Delete an expense
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  // Add a new category
  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      // In a real app, we would update the categories state
      // For now, we'll just return the new category
      return category
    }
    return null
  }

  return {
    expenses,
    categories,
    addExpense,
    updateExpense,
    deleteExpense,
    addCategory
  }
}