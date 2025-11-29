import { FilterOptions } from '../types'
import { Filter } from 'lucide-react'

interface FiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      category: e.target.value
    })
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      startDate: e.target.value
    })
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      endDate: e.target.value
    })
  }

  const handleResetFilters = () => {
    onFilterChange({
      category: 'all',
      startDate: '',
      endDate: ''
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-blue-500 dark:text-blue-400" size={20} />
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"
          >
            <option value="all" className="bg-white dark:bg-gray-800">All Categories</option>
            <option value="Food" className="bg-white dark:bg-gray-800">Food</option>
            <option value="Transport" className="bg-white dark:bg-gray-800">Transport</option>
            <option value="Bills" className="bg-white dark:bg-gray-800">Bills</option>
            <option value="Shopping" className="bg-white dark:bg-gray-800">Shopping</option>
            <option value="Leisure" className="bg-white dark:bg-gray-800">Leisure</option>
            <option value="Other" className="bg-white dark:bg-gray-800">Other</option>
          </select>
        </div>
        
        {/* Start Date Filter */}
        <div>
          <label htmlFor="startDate" className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"
          />
        </div>
        
        {/* End Date Filter */}
        <div>
          <label htmlFor="endDate" className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base"
          />
        </div>
        
        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleResetFilters}
            className="w-full px-3 py-2 md:px-4 md:py-3 font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 text-sm md:text-base"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filters