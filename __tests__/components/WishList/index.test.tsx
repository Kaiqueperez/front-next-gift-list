import { WishList } from '@/components'
import { fireEvent, render, screen } from '@testing-library/react'

describe('WishList component', () => {
  const setGiftHanlderMock = jest.fn()
  const handleModalMock = jest.fn()
  it('should render and call setGiftHanlder and handleModal', () => {
    render(
      <WishList
        wishes={[
          {
            id: 'aosdaoskd',
            name: 'jogo de facas',
            createdAt: '',
            choosen: null,
            personName: 'jose mario',
            url: 'http',
          },
        ]}
        handleModal={handleModalMock}
        handleSetGifter={setGiftHanlderMock}
      />
    )

    const wishContainer = screen.getByText(/jose mario/i)

    fireEvent.click(wishContainer)

    expect(handleModalMock).toHaveBeenCalled()
    expect(setGiftHanlderMock).toHaveBeenCalled()
  })
})
