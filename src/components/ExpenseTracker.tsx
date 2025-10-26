import { useState } from 'react'
import Header from './Header'
import StatsCards from './StatsCards'
import ExpenseList from './ExpenseList'
import ExpenseFormModal from './ExpenseFormModal'
import Filters from './Filters'
import Charts from './Charts'
import { useExpenses } from '../hooks/useExpenses'
import { useUserProfile } from '../hooks/useUserProfile'
import { Expense } from '../types'
import WelcomeBanner from './WelcomeBanner'
import UserProfileModal from './UserProfileModal'
import { formatCurrency } from '../utils/currency'

const ExpenseTracker = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  const { userProfile, updateUserProfile } = useUserProfile()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
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

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true)
  }

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false)
  }

  const handleSaveProfile = (profile: any) => {
    updateUserProfile(profile)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-elegant-light/30 via-white to-elegant-light/30 dark:from-elegant-darker dark:via-elegant-dark dark:to-elegant-darker">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-elegant-gold opacity-20 blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-elegant-plum opacity-20 blur-xl animate-float animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-elegant-forest opacity-20 blur-xl animate-float animation-delay-4000"></div>
      
      <Header 
        onAddExpense={handleAddExpense} 
        onOpenProfile={handleOpenProfile}
        userProfilePhoto={userProfile.photo}
      />
      
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
            <div className="card-elegant">
              <Filters 
                filters={filters} 
                onFilterChange={setFilters} 
              />
            </div>
            
            <div className="card-elegant">
              <ExpenseList 
                expenses={filteredExpenses} 
                onEdit={handleEditExpense} 
                onDelete={handleDeleteExpense} 
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="card-elegant">
              <Charts expenses={filteredExpenses} />
            </div>
            
            {/* Additional info card */}
            <div className="card-elegant">
              <h3 className="text-2xl font-serif-display font-bold text-elegant-dark dark:text-elegant-light mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Expense Insights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                  <span className="font-serif-body text-elegant-dark dark:text-elegant-light">Total Transactions</span>
                  <span className="font-serif-heading font-bold text-elegant-dark dark:text-elegant-light">{filteredExpenses.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                  <span className="font-serif-body text-elegant-dark dark:text-elegant-light">Avg. Daily Expense</span>
                  <span className="font-serif-heading font-bold text-elegant-dark dark:text-elegant-light">
                    {filteredExpenses.length > 0 
                      ? formatCurrency(totalExpenses / filteredExpenses.length, userProfile.currency)
                      : formatCurrency(0, userProfile.currency)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                  <span className="font-serif-body text-elegant-dark dark:text-elegant-light">Biggest Expense</span>
                  <span className="font-serif-heading font-bold text-elegant-dark dark:text-elegant-light">
                    {filteredExpenses.length > 0 
                      ? formatCurrency(Math.max(...filteredExpenses.map(e => e.amount)), userProfile.currency)
                      : formatCurrency(0, userProfile.currency)}
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
      
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        userProfile={userProfile}
        onSave={handleSaveProfile}
      />
    </div>
  )
}

export default ExpenseTracker