import { motion } from 'framer-motion'
import { Edit3, Trash2, Image as ImageIcon, FileText } from 'lucide-react'
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
      className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 smooth-transition"
      whileHover={{ x: 5 }}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
              <span className="text-lg">{getCategoryIcon(expense.category)}</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white truncate">{expense.title}</h4>
              {expense.notes && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-start gap-1">
                  <FileText size={12} className="mt-0.5 flex-shrink-0" />
                  <span className="truncate">{expense.notes}</span>
                </div>
              )}
              {expense.receiptImage && (
                <div className="mt-1">
                  <button 
                    onClick={() => window.open(expense.receiptImage, '_blank')}
                    className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 smooth-transition glow"
                  >
                    <ImageIcon size={12} className="mr-1" />
                    <span>View Receipt</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
            {expense.category}
          </span>
        </div>
        
        <div className="col-span-2 flex items-center text-gray-500 dark:text-gray-400">
          {formatDate(expense.date)}
        </div>
        
        <div className="col-span-2 flex items-center justify-end font-medium text-gray-900 dark:text-white">
          {formatCurrency(expense.amount)}
        </div>
        
        <div className="col-span-1 flex justify-end space-x-1">
          <button
            onClick={() => onEdit(expense)}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 smooth-transition glow"
            aria-label="Edit expense"
          >
            <Edit3 size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 smooth-transition glow"
            aria-label="Delete expense"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ExpenseItem