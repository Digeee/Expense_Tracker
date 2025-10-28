import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts'
import { Expense } from '../types'
import { formatCurrency } from '../utils/currency'
import { useUserProfile } from '../hooks/useUserProfile'

interface ChartsProps {
  expenses: Expense[]
}

const Charts = ({ expenses }: ChartsProps) => {
  const { userProfile } = useUserProfile()
  const currency = userProfile.currency || 'USD'

  // Prepare data for category breakdown pie chart
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category)
    if (existing) {
      existing.value += expense.amount
    } else {
      acc.push({ name: expense.category, value: expense.amount })
    }
    return acc
  }, [] as { name: string; value: number }[])

  // Prepare data for monthly trend line chart
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short', year: 'numeric' })
    const existing = acc.find(item => item.month === month)
    if (existing) {
      existing.amount += expense.amount
    } else {
      acc.push({ month, amount: expense.amount })
    }
    return acc
  }, [] as { month: string; amount: number }[])

  // Sort monthly data by date
  monthlyData.sort((a, b) => {
    return new Date(a.month).getTime() - new Date(b.month).getTime()
  })

  // Colors for charts
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#82ca9d']

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neumorphic p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl shadow-3d">
          <p className="font-display font-extrabold text-gray-900 dark:text-white">{`${payload[0].name}`}</p>
          <p className="text-body text-gray-700 dark:text-gray-300 font-bold">{`Amount: ${formatCurrency(payload[0].value, currency)}`}</p>
          <p className="text-body text-sm text-gray-500 dark:text-gray-400 font-bold">{`Percentage: ${((payload[0].value / categoryData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      )
    }
    return null
  }

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neumorphic p-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl shadow-3d">
          <p className="font-display font-extrabold text-gray-900 dark:text-white">{`Month: ${label}`}</p>
          <p className="text-body text-gray-700 dark:text-gray-300 font-bold">{`Total: ${formatCurrency(payload[0].value, currency)}`}</p>
        </div>
      )
    }
    return null
  }

  // Format Y-axis values with currency
  const formatYAxis = (value: number) => {
    // For simplicity, we'll format based on the selected currency
    // We'll show the currency symbol and the value
    const formatted = formatCurrency(value, currency);
    // Extract just the numeric part for the axis
    return formatted.replace(/[^\d.,]/g, '') === '' ? '0' : formatted.replace(/[^\d.,]/g, '');
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Category Breakdown
        </h3>
        {categoryData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  formatter={(value) => <span className="text-body text-gray-700 dark:text-gray-300 font-bold">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 neumorphic rounded-xl transform-3d-hover">
            No data available
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-xl">📈</span>
          Monthly Trend
        </h3>
        {monthlyData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.2)" />
                <XAxis 
                  dataKey="month" 
                  stroke="#3b82f6" 
                  tick={{ fill: '#3b82f6', fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}
                />
                <YAxis 
                  tickFormatter={(value) => formatYAxis(value)} 
                  domain={[0, 'dataMax + 100']}
                  stroke="#3b82f6"
                  tick={{ fill: '#3b82f6', fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend 
                  formatter={(value) => <span className="text-body text-gray-700 dark:text-gray-300 font-bold">{value}</span>}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={3}
                  name="Total Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 neumorphic rounded-xl transform-3d-hover">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}

export default Charts