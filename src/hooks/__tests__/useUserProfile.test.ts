import { renderHook, act } from '@testing-library/react'
import { useUserProfile } from '../useUserProfile'

describe('useUserProfile', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should return default profile when no profile is saved', () => {
    const { result } = renderHook(() => useUserProfile())
    
    expect(result.current.userProfile).toEqual({
      name: 'User',
      email: 'user@example.com',
      photo: 'https://ui-avatars.com/api/?name=User&background=random',
      currency: 'USD'
    })
  })

  it('should update user profile and save to localStorage', () => {
    const { result } = renderHook(() => useUserProfile())
    
    const newProfile = {
      name: 'John Doe',
      email: 'john@example.com',
      photo: 'https://example.com/photo.jpg',
      currency: 'EUR'
    }
    
    act(() => {
      result.current.updateUserProfile(newProfile)
    })
    
    expect(result.current.userProfile).toEqual(newProfile)
    
    // Check if profile is saved to localStorage
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    expect(savedProfile).toEqual(newProfile)
  })

  it('should load existing profile from localStorage', () => {
    const existingProfile = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      photo: 'https://example.com/jane.jpg',
      currency: 'GBP'
    }
    
    localStorage.setItem('userProfile', JSON.stringify(existingProfile))
    
    const { result } = renderHook(() => useUserProfile())
    
    expect(result.current.userProfile).toEqual(existingProfile)
  })
})