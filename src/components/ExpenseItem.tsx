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

  // Get category image URL
  const getCategoryImage = (category: string) => {
    const images: Record<string, string> = {
      Food: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
      Transport: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&h=100&fit=crop',
      Bills: 'https://images.unsplash.com/photo-1580519542036-0ebef2b4d55d?w=100&h=100&fit=crop',
      Shopping: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop',
      Leisure: 'https://images.unsplash.com/photo-1511527661596-7498f59c6a21?w=100&h=100&fit=crop',
      Other: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=100&h=100&fit=crop'
    }
    return images[category] || images.Other
  }

  return (
    <motion.div 
      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors duration-200"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="col-span-5">
        <div className="flex items-start gap-3">
          <img 
            src={getCategoryImage(expense.category)} 
            alt={expense.category} 
            className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-lg">{getCategoryIcon(expense.category)}</span>
              <span>{expense.title}</span>
            </div>
            {expense.notes && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-start gap-2">
                <FileText size={14} className="mt-0.5 flex-shrink-0" />
                <span>{expense.notes}</span>
              </div>
            )}
            {expense.receiptImage && (
              <div className="mt-2">
                <button 
                  onClick={() => window.open(expense.receiptImage, '_blank')}
                  className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <ImageIcon size={16} className="mr-1" />
                  <span>View Receipt</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="col-span-2 flex items-center">
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
          className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Edit expense"
        >
          <Edit3 size={16} className="text-blue-600 dark:text-blue-400" />
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Delete expense"
        >
          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
        </button>
      </div>
    </motion.div>
  )
}

export default ExpenseItem