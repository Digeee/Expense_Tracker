import { Plus, Sun, Moon, User } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeaderProps {
  onAddExpense: () => void
  onOpenProfile: () => void
  userProfilePhoto: string
}

const Header = ({ onAddExpense, onOpenProfile, userProfilePhoto }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false)

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

  return (
    <header className="glass-card mx-4 mt-4 p-4 sticky top-4 z-10 rounded-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-elegant-gold to-elegant-plum flex items-center justify-center animate-pulse-slow shadow-lg">
            <span className="text-white font-serif-heading font-bold text-xl">$</span>
          </div>
          <h1 className="text-3xl font-serif-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-elegant-gold to-elegant-plum dark:from-elegant-silver dark:to-elegant-plum">
            Expense Tracker
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-2 glass-button p-2 rounded-full hover:scale-110 transition-transform duration-300"
            aria-label="User profile"
          >
            {userProfilePhoto ? (
              <img 
                src={userProfilePhoto} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border-2 border-elegant-gold"
              />
            ) : (
              <User size={20} className="text-elegant-gold" />
            )}
          </button>
          
          <button
            onClick={toggleDarkMode}
            className="glass-button p-2 rounded-full hover:scale-110 transition-transform duration-300"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="text-elegant-gold" size={20} /> : <Moon className="text-elegant-dark" size={20} />}
          </button>
          
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 bg-gradient-to-r from-elegant-gold to-elegant-plum hover:from-elegant-plum hover:to-elegant-gold text-white font-serif-heading font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-elegant-gold focus:ring-offset-2 shadow-lg"
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