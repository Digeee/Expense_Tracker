import { motion, AnimatePresence } from 'framer-motion'
import { Expense } from '../types'
import ExpenseItem from './ExpenseItem'

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

const ExpenseList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <div className="card-enhanced p-8 text-center shadow-enhanced">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-4 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No expenses yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Add your first expense to get started</p>
      </div>
    )
  }

  return (
    <div className="card-enhanced overflow-hidden shadow-enhanced">
      <div className="border-b border-professional">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <div className="col-span-5">Description</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2 text-right">Amount</div>
          <div className="col-span-1"></div>
        </div>
      </div>
      
      <AnimatePresence>
        <ul className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
          {expenses.map((expense) => (
            <motion.li
              key={expense.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-200"
            >
              <ExpenseItem 
                expense={expense} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  )
}

export default ExpenseList