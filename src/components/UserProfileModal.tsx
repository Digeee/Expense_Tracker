import { useState } from 'react'
import { X } from 'lucide-react'
import { UserProfile } from '../types'

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userProfile: UserProfile
  onSave: (profile: UserProfile) => void
}

const defaultPhoto = 'https://ui-avatars.com/api/?name=User&background=random'

const UserProfileModal = ({ isOpen, onClose, userProfile, onSave }: UserProfileModalProps) => {
  const [name, setName] = useState(userProfile.name)
  const [email, setEmail] = useState(userProfile.email)
  const [photo, setPhoto] = useState(userProfile.photo || defaultPhoto)
  const [currency, setCurrency] = useState(userProfile.currency || 'USD')

  const handleSave = () => {
    onSave({ name, email, photo, currency })
    onClose()
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhoto(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card-enhanced w-full max-w-md shadow-enhanced-xl">
        <div className="flex justify-between items-center p-6 border-b border-professional">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">User Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <img 
              src={photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
            <label className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">
              Change Photo
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full input-enhanced rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-enhanced rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          
          {/* Currency Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full input-enhanced rounded-lg"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CAD">CAD ($)</option>
              <option value="AUD">AUD ($)</option>
              <option value="LKR">LKR (Rs)</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 p-6 border-t border-professional">
          <button
            onClick={onClose}
            className="px-4 py-2 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal