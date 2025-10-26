import { render, screen, fireEvent } from '@testing-library/react'
import UserProfileModal from '../UserProfileModal'

const mockProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  photo: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  currency: 'USD'
}

describe('UserProfileModal', () => {
  const mockOnClose = vi.fn()
  const mockOnSave = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnSave.mockClear()
  })

  it('should render correctly when open', () => {
    render(
      <UserProfileModal
        isOpen={true}
        onClose={mockOnClose}
        userProfile={mockProfile}
        onSave={mockOnSave}
      />
    )

    expect(screen.getByText('User Profile')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Profile' })).toHaveAttribute('src', mockProfile.photo)
  })

  it('should not render when closed', () => {
    const { container } = render(
      <UserProfileModal
        isOpen={false}
        onClose={mockOnClose}
        userProfile={mockProfile}
        onSave={mockOnSave}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('should call onClose when close button is clicked', () => {
    render(
      <UserProfileModal
        isOpen={true}
        onClose={mockOnClose}
        userProfile={mockProfile}
        onSave={mockOnSave}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '' }))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when cancel button is clicked', () => {
    render(
      <UserProfileModal
        isOpen={true}
        onClose={mockOnClose}
        userProfile={mockProfile}
        onSave={mockOnSave}
      />
    )

    fireEvent.click(screen.getByText('Cancel'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onSave with updated profile when save button is clicked', () => {
    render(
      <UserProfileModal
        isOpen={true}
        onClose={mockOnClose}
        userProfile={mockProfile}
        onSave={mockOnSave}
      />
    )

    const nameInput = screen.getByDisplayValue('John Doe')
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } })

    fireEvent.click(screen.getByText('Save Changes'))
    
    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'john@example.com',
      photo: mockProfile.photo,
      currency: 'USD'
    })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})