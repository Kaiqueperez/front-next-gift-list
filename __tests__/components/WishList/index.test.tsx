import { WishList } from '@/components'
import { fireEvent, render } from '@testing-library/react'

describe('WishList component', () => {
  const setGiftHanlderMock = jest.fn()
  const handleModalMock = jest.fn()
  it('should render and call setGiftHanlder and handleModal', () => {
    const { getByTestId } = render(
      <WishList
        wishes={[
          {
            id: 'aosdaoskd',
            name: 'jogo de facas',
            createdAt: '',
            choosen: null,
            personName: 'jose mario',
            url: 'http',
            imageUrl: '',
            description: '',
          },
        ]}
        handleModal={handleModalMock}
        handleSetGifter={setGiftHanlderMock}
      />
    )

    const buttonCard = getByTestId(/jogo de facas0/i)

    fireEvent.click(buttonCard)

    expect(handleModalMock).toHaveBeenCalled()
    expect(setGiftHanlderMock).toHaveBeenCalled()
  })
  it('should not render chosen button', () => {
    const { queryByTestId } = render(
      <WishList
        wishes={[
          {
            id: 'aosdaoskd',
            name: 'jogo de facas',
            createdAt: '',
            choosen: null,
            personName: 'jose mario',
            url: 'http',
            imageUrl: '',
            description: '',
          },
        ]}
        handleModal={handleModalMock}
        handleSetGifter={setGiftHanlderMock}
        hiddenChossenButton
      />
    )

    const buttonCard = queryByTestId(/jogo de facas0/i)

    expect(buttonCard).not.toBeInTheDocument()
  })
})
