import ExpenseTracker from './components/ExpenseTracker'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515517005422-009ba13246dc?auto=format&fit=crop&w=2000&q=80')] opacity-5 dark:opacity-10 bg-cover"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-gray-900/50 dark:to-gray-800/50"></div>
      <ExpenseTracker />
    </div>
  )
}

export default App