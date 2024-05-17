import { DesktopWarning } from '@/components'
import { render } from '@testing-library/react'

describe('DesktopWarning component', () => {
  it('Should render with warning text', () => {
    const warningText = 'Esse web app só pode ser navegado pelo celular'
    const { getByText } = render(<DesktopWarning text={warningText} />)

    expect(getByText(warningText)).toBeVisible()
  })
})
