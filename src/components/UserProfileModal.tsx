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
      <div className="card-elegant w-full max-w-md shadow-elegant-xl">
        <div className="flex justify-between items-center p-6 border-b border-elegant-gold/20 dark:border-elegant-plum/20">
          <h2 className="text-2xl font-serif-display font-bold text-elegant-dark dark:text-elegant-light">User Profile</h2>
          <button 
            onClick={onClose}
            className="text-elegant-dark hover:text-elegant-gold dark:text-elegant-light dark:hover:text-elegant-plum transition-colors duration-200"
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
              className="w-24 h-24 rounded-full object-cover border-4 border-elegant-gold shadow-md"
            />
            <label className="mt-4 px-4 py-2 bg-gradient-to-r from-elegant-gold to-elegant-plum hover:from-elegant-plum hover:to-elegant-gold text-white font-serif-heading font-semibold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg">
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
            <label className="block text-sm font-serif-heading font-medium text-elegant-dark dark:text-elegant-light mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full input-elegant"
              placeholder="Enter your name"
            />
          </div>
          
          {/* Email Field */}
          <div>
            <label className="block text-sm font-serif-heading font-medium text-elegant-dark dark:text-elegant-light mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-elegant"
              placeholder="Enter your email"
            />
          </div>
          
          {/* Currency Field */}
          <div>
            <label className="block text-sm font-serif-heading font-medium text-elegant-dark dark:text-elegant-light mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full input-elegant"
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
        
        <div className="flex justify-end space-x-3 p-6 border-t border-elegant-gold/20 dark:border-elegant-plum/20">
          <button
            onClick={onClose}
            className="px-4 py-2 font-serif-heading font-medium text-elegant-dark dark:text-elegant-light hover:bg-elegant-light/50 dark:hover:bg-elegant-darker rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-elegant-gold to-elegant-plum hover:from-elegant-plum hover:to-elegant-gold text-white font-serif-heading font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfileModal