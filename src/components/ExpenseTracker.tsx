import { useState } from 'react'
import Header from './Header'
import StatsCards from './StatsCards'
import ExpenseList from './ExpenseList'
import ExpenseFormModal from './ExpenseFormModal'
import Filters from './Filters'
import Charts from './Charts'
import { useExpenses } from '../hooks/useExpenses'
import { Expense } from '../types'
import WelcomeBanner from './WelcomeBanner'
import Chatbot from './Chatbot'

const ExpenseTracker = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [filters, setFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: ''
  })
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true)

  // Filter expenses based on selected filters
  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filters.category === 'all' || expense.category === filters.category
    const expenseDate = new Date(expense.date)
    
    const matchesStartDate = !filters.startDate || expenseDate >= new Date(filters.startDate)
    const matchesEndDate = !filters.endDate || expenseDate <= new Date(filters.endDate)
    
    return matchesCategory && matchesStartDate && matchesEndDate
  })

  // Calculate statistics
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const handleAddExpense = () => {
    setEditingExpense(null)
    setIsModalOpen(true)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const handleSaveExpense = (expense: Omit<Expense, 'id'> & { id?: string }) => {
    if (editingExpense) {
      updateExpense({ ...expense, id: editingExpense.id } as Expense)
    } else {
      addExpense(expense)
    }
    setIsModalOpen(false)
  }

  const handleDeleteExpense = (id: string) => {
    deleteExpense(id)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingExpense(null)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Floating decorative 3D elements */}
      <div className="floating-3d-element top-20 left-10 w-24 h-24 animate-float"></div>
      <div className="floating-3d-element top-40 right-20 w-32 h-32 animation-delay-2000 animate-float"></div>
      <div className="floating-3d-element bottom-40 left-1/4 w-20 h-20 animation-delay-4000 animate-float"></div>
      
      <Header onAddExpense={handleAddExpense} />
      
      <main className="container mx-auto px-4 py-8">
        {showWelcomeBanner && (
          <WelcomeBanner onClose={() => setShowWelcomeBanner(false)} />
        )}
        
        <div className="mb-8">
          <StatsCards 
            totalExpenses={totalExpenses} 
            categoryTotals={categoryTotals} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="modern-card p-6 shadow-enhanced transform-3d-hover glow">
              <Filters 
                filters={filters} 
                onFilterChange={setFilters} 
              />
            </div>
            
            <div className="modern-card p-6 shadow-enhanced transform-3d-hover glow">
              <ExpenseList 
                expenses={filteredExpenses} 
                onEdit={handleEditExpense} 
                onDelete={handleDeleteExpense} 
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="modern-card p-6 shadow-enhanced transform-3d-hover glow">
              <Charts expenses={filteredExpenses} />
            </div>
            
            {/* Additional info card */}
            <div className="modern-card p-6 shadow-enhanced transform-3d-hover glow">
              <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-4 gradient-text">Expense Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl neumorphic-inset">
                  <span className="text-body text-gray-700 dark:text-gray-300 font-extrabold">Total Transactions</span>
                  <span className="font-extrabold text-gray-900 dark:text-white">{filteredExpenses.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl neumorphic-inset">
                  <span className="text-body text-gray-700 dark:text-gray-300 font-extrabold">Avg. Daily Expense</span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {filteredExpenses.length > 0 
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(totalExpenses / filteredExpenses.length) 
                      : '$0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl neumorphic-inset">
                  <span className="text-body text-gray-700 dark:text-gray-300 font-extrabold">Biggest Expense</span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {filteredExpenses.length > 0 
                      ? new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        }).format(Math.max(...filteredExpenses.map(e => e.amount))) 
                      : '$0.00'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveExpense}
        expense={editingExpense}
      />
      
      <Chatbot />
    </div>
  )
}

export default ExpenseTracker