import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/currency'

interface StatsCardsProps {
  totalExpenses: number
  categoryTotals: Record<string, number>
}

const StatsCards = ({ totalExpenses, categoryTotals }: StatsCardsProps) => {
  // Get the top 3 categories by expense amount
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  // Get category icon based on category name
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Total Expenses Card */}
      <motion.div 
        className="glass-card p-6 relative overflow-hidden"
        variants={item}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20"></div>
        <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/30 dark:bg-white/10"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/20 dark:bg-white/5"></div>
        
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <span className="text-2xl">💰</span>
          Total Expenses
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {formatCurrency(totalExpenses)}
        </p>
        <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Top Categories */}
      {topCategories.map(([category, amount], index) => (
        <motion.div 
          key={category}
          className="glass-card p-6 relative overflow-hidden"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500 opacity-20"></div>
          <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-white/30 dark:bg-white/10"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-white/20 dark:bg-white/5"></div>
          
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(category)}</span>
            {category}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {formatCurrency(amount)}
          </p>
          <div className="mt-4 flex items-center">
            <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-pink-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (amount / totalExpenses) * 100)}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              ></motion.div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {totalExpenses > 0 ? `${Math.round((amount / totalExpenses) * 100)}%` : '0%'}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Fill empty slots if less than 3 categories */}
      {topCategories.length < 3 && 
        Array.from({ length: 3 - topCategories.length }).map((_, index) => (
          <motion.div 
            key={`empty-${index}`}
            className="glass-card p-6 opacity-70"
            variants={item}
          >
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              No Data
            </h3>
            <p className="text-2xl font-bold text-gray-500 dark:text-gray-400 mt-2">
              {formatCurrency(0)}
            </p>
            <div className="mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </motion.div>
        ))
      }
    </motion.div>
  )
}

export default StatsCards