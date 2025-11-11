import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, Upload, Trash2 } from 'lucide-react'
import { Expense } from '../types'
import { useExpenses } from '../hooks/useExpenses'
import { useUserProfile } from '../hooks/useUserProfile'
import { formatInputDate } from '../utils/date'

interface ExpenseFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (expense: Omit<Expense, 'id'> & { id?: string }) => void
  expense?: Expense | null
}

const ExpenseFormModal = ({ isOpen, onClose, onSave, expense }: ExpenseFormModalProps) => {
  const { categories } = useExpenses()
  const { userProfile } = useUserProfile()
  const currency = userProfile.currency || 'USD'
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0] || 'Other')
  const [date, setDate] = useState(formatInputDate(new Date().toISOString()))
  const [notes, setNotes] = useState('')
  const [receiptImage, setReceiptImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shake, setShake] = useState(false)

  // Get currency symbol for display
  const getCurrencySymbol = () => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CAD: '$',
      AUD: '$',
      LKR: 'Rs'
    }
    return symbols[currency] || '$'
  }

  // Reset form when expense changes or modal opens
  useEffect(() => {
    if (expense) {
      setTitle(expense.title)
      setAmount(expense.amount.toString())
      setCategory(expense.category)
      setDate(formatInputDate(expense.date))
      setNotes(expense.notes || '')
      setReceiptImage(expense.receiptImage || null)
    } else {
      setTitle('')
      setAmount('')
      setCategory(categories[0] || 'Other')
      setDate(formatInputDate(new Date().toISOString()))
      setNotes('')
      setReceiptImage(null)
    }
    setErrors({})
  }, [expense, isOpen, categories])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }
    
    if (!category) {
      newErrors.category = 'Category is required'
    }
    
    if (!date) {
      newErrors.date = 'Date is required'
    } else if (new Date(date) > new Date()) {
      newErrors.date = 'Date cannot be in the future'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return false
    }
    
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        ...(expense && { id: expense.id }),
        title,
        amount: parseFloat(amount),
        category,
        date,
        notes,
        receiptImage: receiptImage || undefined
      })
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'custom') {
      const customCategory = prompt('Enter a new category:')
      if (customCategory && customCategory.trim()) {
        // In a real app, we would add this to our categories
        setCategory(customCategory.trim())
      }
    } else {
      setCategory(value)
    }
  }

  const handleReceiptImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setReceiptImage(event.target.result as string)
        }
      }
      
      reader.readAsDataURL(file)
    }
  }

  const removeReceiptImage = () => {
    setReceiptImage(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {expense ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Close"
              >
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className={`px-6 py-4 ${shake ? 'animate-shake' : ''}`}>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title *
                  </label>
                  <div className="relative">
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Dinner, Gas, etc."
                    />
                  </div>
                  {errors.title && (
                    <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.title}
                    </div>
                  )}
                </div>
                
                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      {getCurrencySymbol()}
                    </span>
                    <input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0.01"
                      step="0.01"
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                        errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.amount && (
                    <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.amount}
                    </div>
                  )}
                </div>
                
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-white dark:bg-gray-800">
                        {cat}
                      </option>
                    ))}
                    <option value="custom" className="bg-white dark:bg-gray-800">+ Add Custom Category</option>
                  </select>
                  {errors.category && (
                    <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.category}
                    </div>
                  )}
                </div>
                
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date *
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                  {errors.date && (
                    <div className="flex items-center mt-1 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={16} className="mr-1" />
                      {errors.date}
                    </div>
                  )}
                </div>
                
                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Additional details (optional)"
                  />
                </div>
                
                {/* Receipt Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Receipt Image
                  </label>
                  
                  {receiptImage ? (
                    <div className="relative">
                      <img 
                        src={receiptImage} 
                        alt="Receipt preview" 
                        className="w-full h-48 object-contain rounded-lg border border-gray-300 dark:border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={removeReceiptImage}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md"
                        aria-label="Remove image"
                      >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleReceiptImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                >
                  {expense ? 'Update Expense' : 'Add Expense'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ExpenseFormModal