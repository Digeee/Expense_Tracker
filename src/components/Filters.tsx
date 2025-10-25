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
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Filter className="text-blue-500 dark:text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300/50"
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
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={filters.startDate}
            onChange={handleStartDateChange}
            className="w-full px-4 py-2 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300/50"
          />
        </div>
        
        {/* End Date Filter */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={filters.endDate}
            onChange={handleEndDateChange}
            className="w-full px-4 py-2 glass-card rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300/50"
          />
        </div>
        
        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={handleResetFilters}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 glass-button rounded-lg hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filters