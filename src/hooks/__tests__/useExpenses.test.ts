import { renderHook, act } from '@testing-library/react'
import { useExpenses } from '../useExpenses'

describe('useExpenses', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should initialize with default expenses', () => {
    const { result } = renderHook(() => useExpenses())
    
    expect(result.current.expenses).toHaveLength(5)
    expect(result.current.categories).toContain('Food')
    expect(result.current.categories).toContain('Transport')
  })

  it('should add a new expense', () => {
    const { result } = renderHook(() => useExpenses())
    
    act(() => {
      result.current.addExpense({
        title: 'Test Expense',
        amount: 100,
        category: 'Other',
        date: '2023-01-01',
        notes: 'Test notes'
      })
    })
    
    expect(result.current.expenses).toHaveLength(6)
    expect(result.current.expenses[5].title).toBe('Test Expense')
  })

  it('should update an existing expense', () => {
    const { result } = renderHook(() => useExpenses())
    
    act(() => {
      result.current.updateExpense({
        id: result.current.expenses[0].id,
        title: 'Updated Expense',
        amount: 200,
        category: 'Food',
        date: '2023-01-01',
        notes: 'Updated notes'
      })
    })
    
    expect(result.current.expenses[0].title).toBe('Updated Expense')
    expect(result.current.expenses[0].amount).toBe(200)
  })

  it('should delete an expense', () => {
    const { result } = renderHook(() => useExpenses())
    const initialLength = result.current.expenses.length
    const expenseIdToDelete = result.current.expenses[0].id
    
    act(() => {
      result.current.deleteExpense(expenseIdToDelete)
    })
    
    expect(result.current.expenses).toHaveLength(initialLength - 1)
    expect(result.current.expenses.find(expense => expense.id === expenseIdToDelete)).toBeUndefined()
  })
})