import { Link, Github, Twitter, Mail, Shield, Lock, Globe, Phone, MapPin, Heart, BarChart3, TrendingUp, PieChart, Settings, FileText, User } from 'lucide-react'
import { useUserProfile } from '../hooks/useUserProfile'

const Footer = () => {
  const { userProfile } = useUserProfile()
  
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 mt-16 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Branding Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Expense Tracker</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pro</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              Your personal finance companion for tracking expenses and managing budgets with ease.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Mail size={18} />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Heart className="text-red-500" size={14} />
              <span>Made with love for financial wellness</span>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-center group">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <BarChart3 size={16} className="mr-3 flex-shrink-0" />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-center group">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FileText size={16} className="mr-3 flex-shrink-0" />
                  Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-center group">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <PieChart size={16} className="mr-3 flex-shrink-0" />
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-center group">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Settings size={16} className="mr-3 flex-shrink-0" />
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-center group">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <TrendingUp size={16} className="mr-3 flex-shrink-0" />
                  Analytics
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal & Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 inline-block">Legal & Support</h3>
            <ul className="space-y-4 mb-6">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-start group">
                  <Shield size={16} className="mr-3 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-start group">
                  <Lock size={16} className="mr-3 mt-0.5 flex-shrink-0 text-blue-500" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-300 flex items-start group">
                  <Shield size={16} className="mr-3 mt-0.5 flex-shrink-0 text-blue-500" />
                  Cookie Policy
                </a>
              </li>
            </ul>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Globe size={16} className="mr-3 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">support@expensetracker.com</span>
              </div>
              <div className="flex items-start">
                <Phone size={16} className="mr-3 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin size={16} className="mr-3 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          {/* User Info Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 inline-block">Account</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-5 shadow-sm border border-blue-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                {userProfile.photo ? (
                  <img 
                    src={userProfile.photo} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-4 shadow">
                    <span className="text-white font-medium text-lg">
                      {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {userProfile.name || 'Guest User'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[140px]">
                    {userProfile.email || 'user@example.com'}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-blue-100 dark:border-gray-600">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{userProfile.currency || 'USD'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Plan:</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">Free</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-green-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Our support team is here for you 24/7</p>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md shadow-green-500/20">
                Contact Support
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright and Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Expense Tracker. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              Contact Us
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer