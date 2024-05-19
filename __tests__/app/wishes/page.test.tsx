import WishListPage from '@/app/wishes/page'
import {
  ModalContextProps,
  ModalProvider,
  WishListContextProps,
  WishListProvider,
  useModalContext,
  useWishListContext,
} from '@/contexts'
import { WishProps } from '@/types'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { NextResponse } from 'next/server'
beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
      headers: {},
      ok: true,
      redirected: false,
      status: 200,
    } as NextResponse)
})

afterAll(() => {
  global.fetch = global.fetch
})

jest.mock('../../../src/contexts', () => ({
  ...jest.requireActual('../../../src/contexts'),
  useWishListContext: jest.fn(),
  useModalContext: jest.fn(),
}))

describe('Wishes page', () => {
  it('should show skeletons when isLoading be true', async () => {
    const expectedFetchAllWishesValue: WishProps[] = [
      {
        choosen: null,
        createdAt: new Date().toISOString(),
        id: 'aoskdoaksd',
        name: 'Garfo',
        personName: null,
        url: '',
        imageUrl: '',
        description: '',
      },
    ]

    ;(useWishListContext as jest.Mock<WishListContextProps>).mockReturnValue({
      wishCreator: jest.fn(),
      wishes: expectedFetchAllWishesValue,
      fetchAllWishes: jest.fn(),
      associatePersonWithWish: jest.fn(),
      isLoading: true,
      updateWishResponse: {
        buyMessage: 'Deseja comprar?',
        gifts: [],
        message: 'Muito obrigado!!',
        showBuyButton: true,
      },
    })

    const mockHandleModal = jest.fn()

    ;(useModalContext as jest.Mock).mockReturnValue({
      handleModal: mockHandleModal,
      isModalOpen: true,
    })

    const { getByTestId } = render(
      <ModalProvider>
        <WishListProvider>
          <WishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    expect(getByTestId('skeleton')).toBeVisible()
  })
  it('should associate person to wish', async () => {
    const expectedFetchAllWishesValue: WishProps[] = [
      {
        choosen: null,
        createdAt: new Date().toISOString(),
        id: 'aoskdoaksd',
        name: 'Garfo',
        personName: null,
        url: 'http//:compranachina.com',
        imageUrl: '',
        description: '',
      },
    ]

    const mockAssociatePerson = jest.fn()

    ;(useWishListContext as jest.Mock<WishListContextProps>).mockReturnValue({
      wishCreator: jest.fn(),
      wishes: expectedFetchAllWishesValue,
      fetchAllWishes: jest.fn(),
      associatePersonWithWish: mockAssociatePerson,
      isLoading: false,
      updateWishResponse: {
        buyMessage: 'Deseja comprar?',
        gifts: [],
        message: 'Muito obrigado!!',
        showBuyButton: true,
      },
    })

    const mockHandleModal = jest.fn()

    ;(useModalContext as jest.Mock<ModalContextProps>).mockReturnValue({
      handleModal: mockHandleModal,
      isModalOpen: true,
    })

    const { getByPlaceholderText, getByText, getByRole, getByTestId } = render(
      <ModalProvider>
        <WishListProvider>
          <WishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    const cardButton = getByTestId(/Garfo0/i)

    cardButton.click()

    await waitFor(() => {
      const modal = getByRole('presentation')

      expect(modal).toBeVisible()
      expect(getByText(/Bela escolha/i)).toBeVisible()
    })

    const buttonSend = getByText(/Enviar/i)
    expect(buttonSend).toBeDisabled()

    const nameInput = getByPlaceholderText('Ex: Augusto') as HTMLInputElement
    const nameValue = 'Michel Silva'

    fireEvent.change(nameInput, {
      target: {
        value: nameValue,
      },
    })
    expect(nameInput.value).toStrictEqual(nameValue)
    expect(buttonSend).not.toBeDisabled()

    buttonSend.click()

    await waitFor(() => {
      expect(mockAssociatePerson).toHaveBeenCalledWith({
        choosen: false,
        id: 'aoskdoaksd',
        personName: 'Michel Silva',
        url: 'http//:compranachina.com',
        errorMessage: '',
      })
      expect(buttonSend).not.toBeVisible()
    })
  })

  it('should show error message when recieve invalid name ', async () => {
    const { getByPlaceholderText, getByText, getByRole, getByTestId } = render(
      <ModalProvider>
        <WishListProvider>
          <WishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    const cardButton = getByTestId(/Garfo0/i)

    cardButton.click()

    await waitFor(() => {
      const modal = getByRole('presentation')

      expect(modal).toBeVisible()
      expect(getByText(/Bela escolha/i)).toBeVisible()
    })

    const buttonSend = getByText(/Enviar/i)
    expect(buttonSend).toBeDisabled()

    const nameInput = getByPlaceholderText('Ex: Augusto') as HTMLInputElement
    const nameValue = 'Michel<>111'

    fireEvent.change(nameInput, {
      target: {
        value: nameValue,
      },
    })
    expect(nameInput.value).toStrictEqual(nameValue)
    expect(buttonSend).toBeDisabled()
    expect(getByText('Permitido somente letras')).toBeVisible()
  })

  it('should hidden paragraph put your name', async () => {
    const {
      getByPlaceholderText,
      getByText,
      getByRole,
      getByTestId,
      queryByText,
    } = render(
      <ModalProvider>
        <WishListProvider>
          <WishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    const cardButton = getByTestId(/Garfo0/i)

    cardButton.click()

    await waitFor(() => {
      const modal = getByRole('presentation')

      expect(modal).toBeVisible()
      expect(getByText(/Bela escolha/i)).toBeVisible()
    })

    const nameInput = getByPlaceholderText('Ex: Augusto') as HTMLInputElement
    const nameValue = 'Marcin Kennedy'

    fireEvent.change(nameInput, {
      target: {
        value: nameValue,
      },
    })

    const buttonSend = getByText(/Enviar/i)
    expect(buttonSend).not.toBeDisabled()

    expect(nameInput.value).toStrictEqual(nameValue)

    fireEvent.click(buttonSend)
    expect(
      queryByText(/Coloque o seu nome para reserva esse presente!!/i)
    ).not.toBeInTheDocument()
  })
  it('should copy text to the clipboard and continue chosen wishes', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    })

    const { getByPlaceholderText, getByText, getByRole, getByTestId } = render(
      <ModalProvider>
        <WishListProvider>
          <WishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    const cardButton = getByTestId(/Garfo0/i)

    cardButton.click()

    await waitFor(() => {
      const modal = getByRole('presentation')

      expect(modal).toBeVisible()
      expect(getByText(/Bela escolha/i)).toBeVisible()
    })

    const nameInput = getByPlaceholderText('Ex: Augusto') as HTMLInputElement
    const nameValue = 'Marcin Kennedy'

    fireEvent.change(nameInput, {
      target: {
        value: nameValue,
      },
    })

    const buttonSend = getByText(/Enviar/i)

    fireEvent.click(buttonSend)

    const buttonCopy = getByText(/Copiar cep/i)

    fireEvent.click(buttonCopy)

    waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled()
    })

    const continueChosenButton = getByText(/Continuar escolhendo/i)

    fireEvent.click(continueChosenButton)

    expect(continueChosenButton).not.toBeVisible()
  })
})
