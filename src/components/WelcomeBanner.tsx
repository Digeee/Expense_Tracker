import { X, Plus, Edit3, Filter, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

interface WelcomeBannerProps {
  onClose: () => void
}

const WelcomeBanner = ({ onClose }: WelcomeBannerProps) => {
  return (
    <motion.div
      className="card-elegant relative overflow-hidden shadow-elegant-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-r from-elegant-gold to-elegant-plum opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-r from-elegant-plum to-elegant-forest opacity-20 blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-serif-display font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-elegant-gold to-elegant-plum dark:from-elegant-silver dark:to-elegant-plum">
              Welcome to Expense Tracker!
            </h2>
            <p className="mb-4 font-serif-body text-elegant-dark dark:text-elegant-light">Track your expenses and manage your budget with elegance.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <Plus className="text-elegant-gold dark:text-elegant-plum" size={20} />
                </div>
                <div>
                  <h3 className="font-serif-heading font-semibold text-elegant-dark dark:text-elegant-light">Add Expenses</h3>
                  <p className="text-sm font-serif-body text-gray-600 dark:text-gray-400">Click the "Add Expense" button to record new expenses</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <Edit3 className="text-elegant-forest dark:text-elegant-forest" size={20} />
                </div>
                <div>
                  <h3 className="font-serif-heading font-semibold text-elegant-dark dark:text-elegant-light">Edit & Delete</h3>
                  <p className="text-sm font-serif-body text-gray-600 dark:text-gray-400">Use the action buttons to modify or remove expenses</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <Filter className="text-elegant-burgundy dark:text-elegant-burgundy" size={20} />
                </div>
                <div>
                  <h3 className="font-serif-heading font-semibold text-elegant-dark dark:text-elegant-light">Filter & Analyze</h3>
                  <p className="text-sm font-serif-body text-gray-600 dark:text-gray-400">Use filters to view expenses by category or date range</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg bg-white/20 dark:bg-black/20 border border-elegant-gold/20 dark:border-elegant-plum/20">
                <div className="glass-button p-2 rounded-full mr-3">
                  <BarChart3 className="text-elegant-navy dark:text-elegant-navy" size={20} />
                </div>
                <div>
                  <h3 className="font-serif-heading font-semibold text-elegant-dark dark:text-elegant-light">Visualize Data</h3>
                  <p className="text-sm font-serif-body text-gray-600 dark:text-gray-400">View charts to understand your spending patterns</p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="glass-button p-2 rounded-full hover:scale-110 transition-transform duration-200"
            aria-label="Close banner"
          >
            <X className="text-elegant-dark dark:text-elegant-light" size={24} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeBanner