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

    const { getByPlaceholderText, getByText, getByRole } = render(
      <ModalProvider>
        <WishListProvider>
          <WishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    const listItemWish = getByText(/Disponivel/i)

    listItemWish.click()

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
      })
      expect(buttonSend).not.toBeVisible()
    })
  })
})
