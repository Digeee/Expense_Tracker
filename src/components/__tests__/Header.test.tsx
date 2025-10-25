import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders the title correctly', () => {
    render(<Header onAddExpense={() => {}} />)
    
    expect(screen.getByText('Expense Tracker')).toBeInTheDocument()
  })

  it('calls onAddExpense when button is clicked', () => {
    const mockAddExpense = vi.fn()
    render(<Header onAddExpense={mockAddExpense} />)
    
    const addButton = screen.getByText('Add Expense')
    fireEvent.click(addButton)
    
    expect(mockAddExpense).toHaveBeenCalledTimes(1)
  })
})