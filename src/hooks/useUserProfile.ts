import { useLocalStorage } from './useLocalStorage'
import { UserProfile } from '../types'

const defaultProfile: UserProfile = {
  name: 'User',
  email: 'user@example.com',
  photo: 'https://ui-avatars.com/api/?name=User&background=random',
  currency: 'USD'
}

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('userProfile', defaultProfile)

  const updateUserProfile = (profile: UserProfile) => {
    // If photo is empty string, use the default photo
    const profileToSave = {
      ...profile,
      photo: profile.photo || defaultProfile.photo
    }
    setUserProfile(profileToSave)
  }

  return { userProfile, updateUserProfile }
}