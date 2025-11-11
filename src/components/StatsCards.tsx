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

  // Get category image URL
  const getCategoryImage = (category: string) => {
    const images: Record<string, string> = {
      Food: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop',
      Transport: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=200&fit=crop',
      Bills: 'https://images.unsplash.com/photo-1580519542036-0ebef2b4d55d?w=400&h=200&fit=crop',
      Shopping: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=200&fit=crop',
      Leisure: 'https://images.unsplash.com/photo-1511527661596-7498f59c6a21?w=400&h=200&fit=crop',
      Other: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=200&fit=crop'
    }
    return images[category] || images.Other
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Total Expenses Card */}
      <motion.div 
        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 md:p-6 text-white shadow-xl relative overflow-hidden"
        variants={item}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="absolute -top-8 -right-8 w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5"></div>
        
        <div className="relative z-10">
          <h3 className="text-base md:text-lg font-medium flex items-center gap-2">
            <span className="text-xl md:text-2xl">💰</span>
            Total Expenses
          </h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">
            {formatCurrency(totalExpenses)}
          </p>
          <div className="mt-3 md:mt-4 h-2 w-full bg-white/30 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
        </div>
      </motion.div>

      {/* Top Categories */}
      {topCategories.map(([category, amount], index) => (
        <motion.div 
          key={category}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <h3 className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className="text-xl md:text-2xl">{getCategoryIcon(category)}</span>
                <span className="text-sm md:text-base">{category}</span>
              </h3>
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden">
                <img 
                  src={getCategoryImage(category)} 
                  alt={category} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {formatCurrency(amount)}
            </p>
            
            <div className="mt-3 md:mt-4 flex items-center">
              <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (amount / totalExpenses) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                ></motion.div>
              </div>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-2">
                {totalExpenses > 0 ? `${Math.round((amount / totalExpenses) * 100)}%` : '0%'}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Fill empty slots if less than 3 categories */}
      {topCategories.length < 3 && 
        Array.from({ length: 3 - topCategories.length }).map((_, index) => (
          <motion.div 
            key={`empty-${index}`}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 opacity-70"
            variants={item}
          >
            <h3 className="text-base md:text-lg font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="text-xl md:text-2xl">📦</span>
              <span className="text-sm md:text-base">No Data</span>
            </h3>
            <p className="text-xl md:text-2xl font-bold text-gray-500 dark:text-gray-400 mt-2">
              {formatCurrency(0)}
            </p>
            <div className="mt-3 md:mt-4 h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </motion.div>
        ))
      }
    </motion.div>
  )
}

export default StatsCards