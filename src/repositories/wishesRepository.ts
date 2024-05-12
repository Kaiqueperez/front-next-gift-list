import {
  CreateWishResponse,
  Gifter,
  WishCreateProps,
  WishProps,
  WishUpdateResponse,
} from '@/types'

export type WishesRespository = {
  fetchAllWishesList: () => Promise<WishProps[]>
  createWish: (wish: WishCreateProps) => Promise<CreateWishResponse>
  associatePersonWithWish: (gifter: Gifter) => Promise<WishUpdateResponse>
}

export const wishesRepositoryImpl: WishesRespository = {
  fetchAllWishesList: async (): Promise<WishProps[]> => {
    try {
      return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gifts/v1/products`
      ).then((response) => response.json())
    } catch (error) {
      throw error
    }
  },
  associatePersonWithWish: async (gifter) => {
    const { id, choosen, personName } = gifter
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gifts/v1/product/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ personName, choosen }),
        }
      ).then((response) => response.json())

      return response
    } catch (error) {
      throw error
    }
  },
  createWish: async (wish) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/gifts/v1/product`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(wish),
        }
      ).then((response) => response.json())

      return response
    } catch (error) {
      throw error
    }
  },
}
