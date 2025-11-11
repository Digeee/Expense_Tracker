import { X, Plus, Edit3, Filter, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'

interface WelcomeBannerProps {
  onClose: () => void
}

const WelcomeBanner = ({ onClose }: WelcomeBannerProps) => {
  return (
    <motion.div
      className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 md:p-6 mb-6 md:mb-8 text-white relative overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements - smaller on mobile */}
      <div className="absolute -top-10 -right-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-white/10 blur-2xl md:blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 md:w-48 md:h-48 rounded-full bg-white/5 blur-2xl md:blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome to Expense Tracker!
            </h2>
            <p className="mb-4 md:mb-6 text-blue-100 text-sm md:text-base">Track your expenses and manage your budget with ease.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-start p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="mr-2 md:mr-3 mt-1">
                  <Plus className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Add Expenses</h3>
                  <p className="text-xs md:text-sm text-blue-100 mt-1">Click the "Add Expense" button to record new expenses</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="mr-2 md:mr-3 mt-1">
                  <Edit3 className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Edit & Delete</h3>
                  <p className="text-xs md:text-sm text-blue-100 mt-1">Use the action buttons to modify or remove expenses</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="mr-2 md:mr-3 mt-1">
                  <Filter className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Filter & Analyze</h3>
                  <p className="text-xs md:text-sm text-blue-100 mt-1">Use filters to view expenses by category or date range</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 md:p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="mr-2 md:mr-3 mt-1">
                  <BarChart3 className="text-white" size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Visualize Data</h3>
                  <p className="text-xs md:text-sm text-blue-100 mt-1">View charts to understand your spending patterns</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image hidden on mobile */}
          <div className="hidden md:block w-1/3">
            <div className="bg-white/20 rounded-xl p-3 md:p-4 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop" 
                alt="Expense tracking" 
                className="w-full h-32 md:h-40 object-cover rounded-lg"
              />
              <p className="text-center text-xs md:text-sm mt-2 text-blue-100">Smart expense management</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 ml-2 md:ml-4 transition-colors duration-200"
            aria-label="Close banner"
          >
            <X size={20} className="md:size-24" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeBanner