import { Plus, Sun, Moon, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useUserProfile } from '../hooks/useUserProfile'
import { useExpenses } from '../hooks/useExpenses'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

interface HeaderProps {
  onAddExpense: () => void
}

const Header = ({ onAddExpense }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false)
  const { userProfile } = useUserProfile()
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
      `${userProfile.currency || 'USD'} ${expense.amount.toFixed(2)}`
    ])
    
    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    // Add table
    autoTable(doc, {
      head: [['Description', 'Category', 'Date', 'Amount']],
      body: tableData,
      startY: 75,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [212, 175, 55] }, // Elegant gold color
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
    <header className="glass-card mx-4 mt-4 p-4 sticky top-4 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-elegant-gold to-elegant-plum flex items-center justify-center animate-pulse-slow">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-elegant-gold to-elegant-plum dark:from-elegant-silver dark:to-elegant-plum">
            Expense Tracker
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={downloadPDF}
            className="glass-button p-2 rounded-full hover:scale-110 transition-transform duration-200"
            aria-label="Download PDF"
          >
            <Download className="text-elegant-dark dark:text-elegant-light" size={20} />
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="glass-button p-2 rounded-full hover:scale-110 transition-transform duration-200"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="text-yellow-300" size={20} /> : <Moon className="text-gray-700" size={20} />}
          </button>
          
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 bg-gradient-to-r from-elegant-gold to-elegant-plum hover:from-elegant-plum hover:to-elegant-gold text-white font-serif-heading font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-elegant-gold focus:ring-offset-2 shadow-lg"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Expense</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header