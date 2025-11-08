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
      <div className="neumorphic w-full max-w-md shadow-3d transform-3d-hover">
        <div className="flex justify-between items-center p-6 border-b border-professional">
          <h2 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white">User Profile</h2>
          <button 
            onClick={onClose}
            className="neumorphic-btn p-2 rounded-full transform-3d-hover"
          >
            <X className="text-gray-700 dark:text-gray-300" size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <img 
              src={photo} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-3d transform-3d-hover"
            />
            <label className="mt-4 neumorphic-btn text-gray-900 dark:text-white font-extrabold rounded-xl cursor-pointer transform-3d-hover transition-all duration-300">
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
            <label className="block text-sm font-extrabold text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full input-enhanced rounded-xl font-extrabold"
              placeholder="Enter your name"
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-extrabold text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-enhanced rounded-xl font-extrabold"
              placeholder="Enter your email"
            />
          </div>
          
          {/* Currency Field */}
          <div>
            <label className="block text-sm font-extrabold text-gray-700 dark:text-gray-300 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full input-enhanced rounded-xl font-extrabold"
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
            className="neumorphic-btn font-extrabold text-gray-700 dark:text-gray-300 rounded-xl transform-3d-hover"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="neumorphic-btn text-gray-900 dark:text-white font-extrabold rounded-xl transform-3d-hover transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal