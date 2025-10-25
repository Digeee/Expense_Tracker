import { X, Plus, Edit3, Filter, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

interface WelcomeBannerProps {
  onClose: () => void
}

const WelcomeBanner = ({ onClose }: WelcomeBannerProps) => {
  return (
    <motion.div
      className="glass-card p-6 mb-8 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Welcome to Expense Tracker!
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Track your expenses and manage your budget with ease.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <Plus className="text-blue-500 dark:text-blue-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Add Expenses</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click the "Add Expense" button to record new expenses</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <Edit3 className="text-green-500 dark:text-green-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Edit & Delete</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use the action buttons to modify or remove expenses</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <Filter className="text-yellow-500 dark:text-yellow-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Filter & Analyze</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use filters to view expenses by category or date range</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <BarChart3 className="text-purple-500 dark:text-purple-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Visualize Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View charts to understand your spending patterns</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="glass-button p-2 rounded-full"
            aria-label="Close banner"
          >
            <X className="text-gray-700 dark:text-gray-300" size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeBanner