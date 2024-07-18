import ChosenWishListPage from '@/app/chosen-wishes/page'
import {
  ModalProvider,
  WishListProvider,
  useModalContext,
  useWishListContext,
} from '@/contexts'
import { render, screen } from '@testing-library/react'
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

describe('chosen wishes page', () => {
  it('should show empty message when not have wishes', async () => {
    const mockHandleModal = jest.fn()
    const mockIsModalOpen = true

    ;(useWishListContext as jest.Mock).mockReturnValue({
      wishCreator: jest.fn(),
      wishes: [],
      fetchAllWishes: [],
    })
    ;(useModalContext as jest.Mock).mockReturnValue({
      handleModal: mockHandleModal,
      isModalOpen: mockIsModalOpen,
    })

    render(
      <ModalProvider>
        <WishListProvider>
          <ChosenWishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    expect(screen.getByText('Nenhum produto foi selecionado')).toBeVisible()
  })

  it('should show message and list of selected wishes', async () => {
    const expectedFetchAllWishesValue = [
      {
        choosen: true,
        createdAt: new Date().toISOString(),
        id: 'aoskdoaksd',
        name: 'Garfo',
        personName: 'MAria antonia',
        url: 'http//:google.boladodemias.com',
      },
    ]

    ;(useWishListContext as jest.Mock).mockReturnValue({
      wishCreator: jest.fn(),
      wishes: expectedFetchAllWishesValue,
      fetchAllWishes: jest.fn(),
    })

    render(
      <ModalProvider>
        <WishListProvider>
          <ChosenWishListPage />
        </WishListProvider>
      </ModalProvider>
    )

    expect(screen.getByText('Produtos selecionados')).toBeVisible()
    expect(screen.getByText(/MAria antonia/i)).toBeVisible()
    expect(screen.getAllByText(/Garfo/i)[0]).toBeVisible()
  })
})
