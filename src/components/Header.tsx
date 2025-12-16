import { Plus, Sun, Moon, Download, User, BarChart2, PieChart, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useUserProfile } from '../hooks/useUserProfile'
import { useExpenses } from '../hooks/useExpenses'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import UserProfileModal from './UserProfileModal'

interface HeaderProps {
  onAddExpense: () => void
  onOpenProfile?: () => void
  userProfilePhoto?: string
}

const Header = ({ onAddExpense, onOpenProfile, userProfilePhoto }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const { userProfile, updateUserProfile } = useUserProfile()
  const { expenses } = useExpenses()

  useEffect(() => {
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(20)
    doc.text('Expense Report', 105, 20, { align: 'center' })
    
    // Add user details
    doc.setFontSize(12)
    doc.text(`Name: ${userProfile.name || 'N/A'}`, 20, 35)
    doc.text(`Email: ${userProfile.email || 'N/A'}`, 20, 45)
    doc.text(`Currency: ${userProfile.currency || 'USD'}`, 20, 55)
    
    // Add date
    const currentDate = new Date().toLocaleDateString()
    doc.text(`Report Date: ${currentDate}`, 20, 65)
    
    // Add expenses table
    const tableData = expenses.map(expense => [
      expense.title,
      expense.category,
      new Date(expense.date).toLocaleDateString(),
      `${userProfile.currency || 'USD'} ${expense.amount.toFixed(2)}`,
      expense.receiptImage ? 'Yes' : 'No'
    ])
    
    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    // Add table
    autoTable(doc, {
      head: [['Description', 'Category', 'Date', 'Amount', 'Receipt']],
      body: tableData,
      startY: 75,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] }, // Professional blue color
      alternateRowStyles: { fillColor: [240, 240, 240] },
      theme: 'grid'
    })
    
    // Add total
    const finalY = (doc as any).lastAutoTable.finalY || 75
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text(`Total: ${userProfile.currency || 'USD'} ${total.toFixed(2)}`, 20, finalY + 20)
    
    // Save the PDF
    doc.save(`expense-report-${currentDate}.pdf`)
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-xl mx-4 mt-4 p-4 rounded-2xl sticky top-4 z-10 border border-gray-100 dark:border-gray-800 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse-slow shadow-lg transform transition-transform hover:scale-105">
              <span className="text-white font-bold text-2xl">$</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Expense Tracker
                <span className="hidden md:inline-block px-2 py-1 text-xs bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200 rounded-full">
                  Pro
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Manage your finances with ease
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2">
              <TrendingUp className="text-green-500" size={18} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {expenses.length} transactions
              </span>
            </div>
            
            <button
              onClick={downloadPDF}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              aria-label="Download PDF"
            >
              <Download className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={20} />
            </button>
            
            <button
              onClick={onOpenProfile || (() => setIsProfileModalOpen(true))}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              aria-label="User Profile"
            >
              {userProfilePhoto || userProfile.photo ? (
                <img 
                  src={userProfilePhoto || userProfile.photo} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
                />
              ) : (
                <User className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" size={20} />
              )}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="text-yellow-400 group-hover:rotate-12 transition-transform" size={20} /> : <Moon className="text-gray-700 group-hover:rotate-12 transition-transform" size={20} />}
            </button>
            
            <button
              onClick={onAddExpense}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Expense</span>
            </button>
          </div>
        </div>
        
        {/* Navigation bar */}
        <nav className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <ul className="flex justify-center space-x-6 md:space-x-8">
            <li>
              <a href="#" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                <BarChart2 size={18} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors">
                <PieChart size={18} />
                <span>Reports</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium transition-colors">
                <TrendingUp size={18} />
                <span>Trends</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSave={updateUserProfile}
      />
    </>
  )
}

export default Header