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
  const imageUrlWishValue =
    'https://w1tdk9ltnx.map.azionedge.net/img/2022/12/produto/13333/faca-h22259.jpg?ims=fit-in/635x865/filters:fill(white):format(JPG)'
  const descriptionWishValue = 'Muito bom'
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

  it('should show error message when recieve empty some field empty', async () => {
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
        imageUrl: '',
        description: '',
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
        imageUrl: imageUrlWishValue,
        description: descriptionWishValue
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
    const imageUrlWishInput = screen.getByPlaceholderText(
      'Coloque a url da imagem'
    ) as HTMLInputElement
    const descriptionWishInput = screen.getByPlaceholderText(
      'Descrição do produto'
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

    fireEvent.change(imageUrlWishInput, {
      target: {
        value: imageUrlWishValue,
      },
    })
    fireEvent.change(descriptionWishInput, {
      target: {
        value: descriptionWishValue,
      },
    })

    buttonSubmit.click()

    await waitFor(() => {
      expect(mockWishCreator).toHaveBeenCalledWith({
        name: nameWishValue,
        url: urlWishValue,
        imageUrl: imageUrlWishValue,
        description: descriptionWishValue,
      })
      expect(mockIsModalOpen).toBeTruthy()
      expect(screen.getByText(wishCreatedMessage)).toBeInTheDocument()
    })
  })
})
