import { motion } from 'framer-motion'
import { Edit3, Trash2 } from 'lucide-react'
import { Expense } from '../types'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'
import { useUserProfile } from '../hooks/useUserProfile'

interface ExpenseItemProps {
  expense: Expense
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

const ExpenseItem = ({ expense, onEdit, onDelete }: ExpenseItemProps) => {
  const { userProfile } = useUserProfile()
  const currency = userProfile.currency || 'USD'

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Food: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      Transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Bills: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      Shopping: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Leisure: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
    return colors[category] || colors.Other
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Food: '🍔',
      Transport: '🚗',
      Bills: '💡',
      Shopping: '🛍️',
      Leisure: '🎮',
      Other: '📦'
    }
    return icons[category] || '📋'
  }

  return (
    <motion.div 
      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-elegant-gold/10 dark:border-elegant-plum/10 hover:bg-elegant-light/20 dark:hover:bg-elegant-darker/50 transition-colors duration-200"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="col-span-5">
        <div className="font-serif-heading font-semibold text-elegant-dark dark:text-elegant-light flex items-center gap-2">
          <span className="text-lg">{getCategoryIcon(expense.category)}</span>
          <span>{expense.title}</span>
        </div>
        {expense.notes && (
          <div className="font-serif-body text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>{expense.notes}</span>
          </div>
        )}
      </div>
      
      <div className="col-span-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-serif-heading font-medium ${getCategoryColor(expense.category)}`}>
          {expense.category}
        </span>
      </div>
      
      <div className="col-span-2 font-serif-body text-gray-500 dark:text-gray-400">
        {formatDate(expense.date)}
      </div>
      
      <div className="col-span-2 text-right font-serif-heading font-bold text-elegant-dark dark:text-elegant-light">
        {formatCurrency(expense.amount, currency)}
      </div>
      
      <div className="col-span-1 flex justify-end space-x-1">
        <button
          onClick={() => onEdit(expense)}
          className="glass-button p-1.5 rounded-full hover:scale-110 transition-transform duration-200"
          aria-label="Edit expense"
        >
          <Edit3 size={16} className="text-elegant-gold dark:text-elegant-plum" />
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="glass-button p-1.5 rounded-full hover:scale-110 transition-transform duration-200"
          aria-label="Delete expense"
        >
          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
        </button>
      </div>
    </motion.div>
  )
}

export default ExpenseItem