import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

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