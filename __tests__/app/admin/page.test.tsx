import AdminPage from '@/app/admin/page'
import { ModalProvider, WishListProvider } from '@/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { NextResponse } from 'next/server'
import { act } from 'react'
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

describe('admin page', () => {
  it('should validate  wish name and url values', async () => {
    const { baseElement } = render(
      <ModalProvider>
        <WishListProvider>
          <AdminPage />
        </WishListProvider>
      </ModalProvider>
    )

    const nameWishValue = 'Jogo de facas'
    const urlWishValue =
      'https://www.amazon.com.br/dp/B0B4V7CCW3?ref_=Oct_DLandingS_D_3354e7d7_NA'

    const nameWishInput = screen.getByPlaceholderText(
      'Ex: Jogo de facas'
    ) as HTMLInputElement
    const urlWishInput = screen.getByPlaceholderText(
      'Ex: link do produto'
    ) as HTMLInputElement

    act(() => {
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
  })
})
