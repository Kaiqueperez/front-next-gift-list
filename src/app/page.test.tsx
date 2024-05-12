import { render } from '@testing-library/react'
import Home from './page'

describe('Page component', () => {
  it('should to be in the document', () => {
    const { baseElement } = render(<Home />)

    expect(baseElement).toBeInTheDocument()
  })
})
