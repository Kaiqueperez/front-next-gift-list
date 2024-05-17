import AdminPage from '@/app/admin/page'
import {
  ModalProvider,
  WishListContextProps,
  WishListProvider,
  useModalContext,
  useWishListContext,
} from '@/contexts'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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

describe('admin page', () => {
  const nameWishValue = 'Jogo de facas'
  const urlWishValue =
    'https://www.amazon.com.br/dp/B0B4V7CCW3?ref_=Oct_DLandingS_D_3354e7d7_NA'

  it('should validate wish name and url values fields', async () => {
    const mockWishCreator = jest
      .fn()
      .mockResolvedValue({ message: 'Wish criado' })
    const mockHandleModal = jest.fn()
    const mockIsModalOpen = true

    ;(useWishListContext as jest.Mock).mockReturnValue({
      wishCreator: mockWishCreator,
    })
    ;(useModalContext as jest.Mock).mockReturnValue({
      handleModal: mockHandleModal,
      isModalOpen: mockIsModalOpen,
    })

    const { baseElement } = render(
      <ModalProvider>
        <WishListProvider>
          <AdminPage />
        </WishListProvider>
      </ModalProvider>
    )

    const nameWishInput = screen.getByPlaceholderText(
      'Ex: Jogo de facas'
    ) as HTMLInputElement
    const urlWishInput = screen.getByPlaceholderText(
      'Ex: link do produto'
    ) as HTMLInputElement
    const buttonSubmit = screen.getByText(/Criar wish/i)

    fireEvent.change(nameWishInput, {
      target: {
        value: nameWishValue,
      },
    })

    fireEvent.change(urlWishInput, {
      target: {
        value: urlWishValue,
      },
    })
    expect(nameWishInput.value).toEqual(nameWishValue)
    expect(urlWishInput.value).toEqual(urlWishValue)
  })

  it('should show error message when recieve empty url or without http', async () => {
    const errorMessage = 'Please provider a no empty name or url, url need http'
    const mockWishCreator = jest.fn().mockResolvedValue({
      message: errorMessage,
    })
    const mockHandleModal = jest.fn()
    const mockIsModalOpen = true

    ;(useWishListContext as jest.Mock<WishListContextProps>).mockReturnValue({
      wishCreator: mockWishCreator,
      wishes: [],
      isLoading: false,
      fetchAllWishes: jest.fn(),
      associatePersonWithWish: jest.fn(),
      updateWishResponse: {
        message: '',
        showBuyButton: false,
        buyMessage: '',
        gifts: [],
      },
    })
    ;(useModalContext as jest.Mock).mockReturnValue({
      handleModal: mockHandleModal,
      isModalOpen: mockIsModalOpen,
    })

    render(
      <ModalProvider>
        <WishListProvider>
          <AdminPage />
        </WishListProvider>
      </ModalProvider>
    )

    const nameWishInput = screen.getByPlaceholderText(
      'Ex: Jogo de facas'
    ) as HTMLInputElement
    const urlWishInput = screen.getByPlaceholderText(
      'Ex: link do produto'
    ) as HTMLInputElement
    const buttonSubmit = screen.getByText(/Criar wish/i)

    fireEvent.change(nameWishInput, {
      target: {
        value: nameWishValue,
      },
    })

    fireEvent.change(urlWishInput, {
      target: {
        value: '',
      },
    })
    buttonSubmit.click()

    await waitFor(() => {
      expect(mockWishCreator).toHaveBeenCalledWith({
        name: nameWishValue,
        url: '',
      })
      expect(mockIsModalOpen).toBeTruthy()
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('should create a wish', async () => {
    const wishCreatedMessage = 'Wish created'
    const expectedFetchAllWishesValue = [
      {
        choosen: null,
        createdAt: new Date().toISOString(),
        id: 'aoskdoaksd',
        name: nameWishValue,
        personName: null,
        url: urlWishValue,
      },
    ]
    const mockWishCreator = jest.fn().mockResolvedValue({
      message: wishCreatedMessage,
    })
    const mockfetchAllWishes = jest.fn().mockResolvedValue({
      wishes: expectedFetchAllWishesValue,
    })
    const mockHandleModal = jest.fn()
    const mockIsModalOpen = true

    ;(useWishListContext as jest.Mock).mockReturnValue({
      wishCreator: mockWishCreator,
      fetchAllWishes: mockfetchAllWishes,
    })
    ;(useModalContext as jest.Mock).mockReturnValue({
      handleModal: mockHandleModal,
      isModalOpen: mockIsModalOpen,
    })

    render(
      <ModalProvider>
        <WishListProvider>
          <AdminPage />
        </WishListProvider>
      </ModalProvider>
    )

    const nameWishInput = screen.getByPlaceholderText(
      'Ex: Jogo de facas'
    ) as HTMLInputElement
    const urlWishInput = screen.getByPlaceholderText(
      'Ex: link do produto'
    ) as HTMLInputElement
    const buttonSubmit = screen.getByText(/Criar wish/i)

    fireEvent.change(nameWishInput, {
      target: {
        value: nameWishValue,
      },
    })

    fireEvent.change(urlWishInput, {
      target: {
        value: urlWishValue,
      },
    })
    buttonSubmit.click()

    await waitFor(() => {
      expect(mockWishCreator).toHaveBeenCalledWith({
        name: nameWishValue,
        url: urlWishValue,
      })
      expect(mockIsModalOpen).toBeTruthy()
      expect(screen.getByText(wishCreatedMessage)).toBeInTheDocument()
    })
  })
})
