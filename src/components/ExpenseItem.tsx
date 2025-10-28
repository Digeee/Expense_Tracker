import { motion } from 'framer-motion'
import { Edit3, Trash2 } from 'lucide-react'
import { Expense } from '../types'
import { formatCurrency } from '../utils/currency'
import { formatDate } from '../utils/date'

interface ExpenseItemProps {
  expense: Expense
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

const ExpenseItem = ({ expense, onEdit, onDelete }: ExpenseItemProps) => {
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
      className="grid grid-cols-12 gap-4 px-6 py-4 neumorphic shadow-3d transform-3d-hover"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="col-span-5">
        <div className="font-extrabold text-gray-900 dark:text-white flex items-center gap-2 text-lg">
          <span className="text-lg">{getCategoryIcon(expense.category)}</span>
          <span>{expense.title}</span>
        </div>
        {expense.notes && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-start gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>{expense.notes}</span>
          </div>
        )}
      </div>
      
      <div className="col-span-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${getCategoryColor(expense.category)}`}>
          {expense.category}
        </span>
      </div>
      
      <div className="col-span-2 text-gray-500 dark:text-gray-400 font-bold">
        {formatDate(expense.date)}
      </div>
      
      <div className="col-span-2 text-right font-extrabold text-gray-900 dark:text-white text-lg">
        {formatCurrency(expense.amount)}
      </div>
      
      <div className="col-span-1 flex justify-end space-x-1">
        <button
          onClick={() => onEdit(expense)}
          className="neumorphic-btn p-1.5 rounded-full transform-3d-hover"
          aria-label="Edit expense"
        >
          <Edit3 size={16} className="text-blue-600 dark:text-blue-400" />
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="neumorphic-btn p-1.5 rounded-full transform-3d-hover"
          aria-label="Delete expense"
        >
          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
        </button>
      </div>
    </motion.div>
  )
}

export default ExpenseItem