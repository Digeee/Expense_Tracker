import { Plus, Sun, Moon, Download, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useUserProfile } from '../hooks/useUserProfile'
import { useExpenses } from '../hooks/useExpenses'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import UserProfileModal from './UserProfileModal'

interface HeaderProps {
  onAddExpense: () => void
}

const Header = ({ onAddExpense }: HeaderProps) => {
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
      <header className="bg-white dark:bg-gray-900 shadow-lg mx-4 mt-4 p-4 rounded-2xl sticky top-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center animate-pulse-slow shadow-md">
              <span className="text-white font-bold text-xl">$</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Expense Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Manage your finances with ease
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadPDF}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Download PDF"
            >
              <Download className="text-gray-700 dark:text-gray-300" size={20} />
            </button>
            
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="User Profile"
            >
              {userProfile.photo ? (
                <img 
                  src={userProfile.photo} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-700" size={20} />}
            </button>
            
            <button
              onClick={onAddExpense}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Expense</span>
            </button>
          </div>
        </div>
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