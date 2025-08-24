import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home', () => {
  it('renders the heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', {
      name: /iSchool v2/i,
    })
    
    expect(heading).toBeInTheDocument()
  })
  
  it('renders the description', () => {
    render(<Home />)
    
    const description = screen.getByText(/School Management System/i)
    
    expect(description).toBeInTheDocument()
  })
})