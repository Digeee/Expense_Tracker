import { Plus, Sun, Moon, Download, User, MessageCircle } from 'lucide-react'
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
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const downloadPDF = () => {
    const doc = new jsPDF()
    const currentDate = new Date().toLocaleDateString()
    
    // Add title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Expense Report', 20, 20)
    
    // Add date
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Generated on: ${currentDate}`, 20, 30)
    
    // Add user info if available
    if (userProfile.name) {
      doc.text(`User: ${userProfile.name}`, 20, 40)
    }
    
    // Add expenses table
    const tableData = expenses.map(expense => [
      expense.title,
      expense.category,
      new Date(expense.date).toLocaleDateString(),
      `${userProfile.currency || 'USD'} ${expense.amount.toFixed(2)}`
    ])
    
    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    // Add table
    autoTable(doc, {
      head: [['Description', 'Category', 'Date', 'Amount']],
      body: tableData,
      startY: 50,
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

  // Dispatch event to open chatbot
  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('openChatbot'))
  }

  return (
    <>
      <header className="neumorphic mx-4 mt-4 p-4 sticky top-4 z-10 transform-3d glow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl neumorphic-btn flex items-center justify-center animate-pulse-slow transform-3d-hover glow">
              <span className="text-gray-800 dark:text-white font-extrabold text-xl">$</span>
            </div>
            <div>
              <h1 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white transform-3d-hover gradient-text">
                Expense Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block font-bold">
                Manage your finances with ease
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadPDF}
              className="neumorphic-btn p-2.5 rounded-xl transform-3d-hover glow"
              aria-label="Download PDF"
            >
              <Download className="text-gray-700 dark:text-gray-300" size={20} />
            </button>
            
            <button
              onClick={openChatbot}
              className="neumorphic-btn p-2.5 rounded-xl transform-3d-hover glow"
              aria-label="Chat Assistant"
            >
              <MessageCircle className="text-gray-700 dark:text-gray-300" size={20} />
            </button>
            
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="neumorphic-btn p-2.5 rounded-xl transform-3d-hover glow"
              aria-label="User Profile"
            >
              {userProfile.photo ? (
                <img 
                  src={userProfile.photo} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full object-cover transform-3d-hover"
                />
              ) : (
                <User className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>
            
            <button
              onClick={toggleDarkMode}
              className="neumorphic-btn p-2.5 rounded-xl transform-3d-hover glow"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-700" size={20} />}
            </button>
            
            <button
              onClick={onAddExpense}
              className="btn-enhanced text-white font-extrabold py-2.5 px-5 rounded-xl transform-3d-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 glow"
            >
              <div className="flex items-center gap-2">
                <Plus size={20} />
                <span className="hidden sm:inline font-extrabold">Add Expense</span>
              </div>
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