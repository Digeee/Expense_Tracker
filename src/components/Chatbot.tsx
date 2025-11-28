import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { useExpenses } from '../hooks/useExpenses'
import { formatCurrency } from '../utils/currency'
import { Expense } from '../types'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const Chatbot = () => {
  const { expenses } = useExpenses()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your expense assistant. Ask me questions like "How much did I spend last week?"',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Listen for open chatbot event
  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true)
    window.addEventListener('openChatbot', handleOpenChatbot)
    return () => window.removeEventListener('openChatbot', handleOpenChatbot)
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Calculate expenses for last week
  const calculateLastWeekExpenses = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const lastWeekExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      const today = new Date()
      return expenseDate >= oneWeekAgo && expenseDate <= today
    })
    
    const total = lastWeekExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { total, count: lastWeekExpenses.length }
  }

  // Calculate expenses for this month
  const calculateThisMonthExpenses = () => {
    const now = new Date()
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date)
      return expenseDate >= firstDayOfMonth
    })
    
    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { total, count: monthExpenses.length }
  }

  // Calculate expenses for today
  const calculateTodayExpenses = () => {
    const today = new Date().toISOString().split('T')[0]
    const todayExpenses = expenses.filter(expense => expense.date === today)
    const total = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { total, count: todayExpenses.length }
  }

  // Calculate total expenses
  const calculateTotalExpenses = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { total, count: expenses.length }
  }

  // Calculate expenses by category
  const calculateCategoryExpenses = (category: string) => {
    const categoryExpenses = expenses.filter(expense => expense.category === category)
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { total, count: categoryExpenses.length }
  }

  // Get biggest expense
  const getBiggestExpense = () => {
    if (expenses.length === 0) return null
    return expenses.reduce((max, expense) => expense.amount > max.amount ? expense : max)
  }

  // Get most recent expense
  const getMostRecentExpense = () => {
    if (expenses.length === 0) return null
    return expenses.reduce((latest, expense) => {
      const expenseDate = new Date(expense.date)
      const latestDate = latest ? new Date(latest.date) : new Date(0)
      return expenseDate > latestDate ? expense : latest
    }, null as Expense | null)
  }

  // Process user message and generate response
  const processMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()
    
    // Last week expenses query
    if (lowerMessage.includes('last week') || lowerMessage.includes('past week')) {
      const { total, count } = calculateLastWeekExpenses()
      return `You spent ${formatCurrency(total)} last week across ${count} transactions.`
    }
    
    // This month expenses query
    if (lowerMessage.includes('this month') || lowerMessage.includes('current month')) {
      const { total, count } = calculateThisMonthExpenses()
      return `You've spent ${formatCurrency(total)} this month across ${count} transactions.`
    }
    
    // Today's expenses query
    if (lowerMessage.includes('today') || lowerMessage.includes('today\'s')) {
      const { total, count } = calculateTodayExpenses()
      return `You've spent ${formatCurrency(total)} today across ${count} transactions.`
    }
    
    // Total expenses query
    if (lowerMessage.includes('total') || lowerMessage.includes('overall') || lowerMessage.includes('all time')) {
      const { total, count } = calculateTotalExpenses()
      return `Your total expenses amount to ${formatCurrency(total)} across ${count} transactions.`
    }
    
    // Recent expense query
    if (lowerMessage.includes('recent') || lowerMessage.includes('latest') || lowerMessage.includes('last expense')) {
      const recent = getMostRecentExpense()
      if (recent) {
        return `Your most recent expense was ${recent.title} for ${formatCurrency(recent.amount)} on ${new Date(recent.date).toLocaleDateString()}.`
      } else {
        return 'You don\'t have any expenses recorded yet.'
      }
    }
    
    // Category expenses query
    const categories = ['food', 'transport', 'bills', 'shopping', 'leisure', 'other']
    for (const category of categories) {
      if (lowerMessage.includes(category)) {
        const { total, count } = calculateCategoryExpenses(
          category.charAt(0).toUpperCase() + category.slice(1)
        )
        return `You've spent ${formatCurrency(total)} on ${category} across ${count} transactions.`
      }
    }
    
    // Biggest expense query
    if (lowerMessage.includes('biggest') || lowerMessage.includes('largest') || lowerMessage.includes('most expensive')) {
      const biggest = getBiggestExpense()
      if (biggest) {
        return `Your biggest expense was ${biggest.title} for ${formatCurrency(biggest.amount)} on ${new Date(biggest.date).toLocaleDateString()}.`
      } else {
        return 'You don\'t have any expenses recorded yet.'
      }
    }
    
    // Default response
    return "I can help you with expense tracking. Try asking questions like:\n- How much did I spend last week?\n- What's my total spending?\n- How much did I spend on food?\n- What was my biggest expense?\n- What's my most recent expense?"
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = processMessage(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {isOpen ? (
        <div className="neumorphic fixed bottom-24 right-6 w-80 h-96 flex flex-col shadow-3d transform-3d-hover z-50">
          <div className="flex justify-between items-center p-4 border-b border-professional">
            <h3 className="font-display font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageCircle size={20} />
              Expense Assistant
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="neumorphic-btn p-1 rounded-full"
            >
              <X size={16} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`max-w-[80%] rounded-xl p-3 neumorphic-inset ${message.isUser ? 'ml-auto' : ''}`}
              >
                <p className={`text-sm font-extrabold ${message.isUser ? 'text-gray-900 dark:text-white text-right' : 'text-gray-700 dark:text-gray-300'}`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-1 ${message.isUser ? 'text-gray-500 dark:text-gray-400 text-right' : 'text-gray-400 dark:text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-professional">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your expenses..."
                className="flex-1 input-enhanced rounded-xl font-extrabold text-sm resize-none h-10"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                className="neumorphic-btn p-2 rounded-xl transform-3d-hover"
                disabled={inputValue.trim() === ''}
              >
                <Send size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="neumorphic-btn fixed bottom-6 right-6 p-4 rounded-full shadow-3d transform-3d-hover z-50"
        >
          <MessageCircle size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
      )}
    </>
  )
}

export default Chatbot