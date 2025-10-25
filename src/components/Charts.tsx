import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts'
import { Expense } from '../types'
import { formatCurrency } from '../utils/currency'

interface ChartsProps {
  expenses: Expense[]
}

const Charts = ({ expenses }: ChartsProps) => {
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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-gray-300/50">
          <p className="font-medium text-gray-900 dark:text-white">{`${payload[0].name}`}</p>
          <p className="text-gray-700 dark:text-gray-300">{`Amount: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{`Percentage: ${((payload[0].value / categoryData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      )
    }
    return null
  }

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-gray-300/50">
          <p className="font-medium text-gray-900 dark:text-white">{`Month: ${label}`}</p>
          <p className="text-gray-700 dark:text-gray-300">{`Total: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 glass-card">
            No data available
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
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
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis 
                  tickFormatter={(value) => `$${value}`} 
                  domain={[0, 'dataMax + 100']}
                  stroke="#94a3b8"
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  name="Total Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500 dark:text-gray-400 glass-card">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}

export default Charts