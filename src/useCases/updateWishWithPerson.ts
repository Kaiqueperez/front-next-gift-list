import { WishesRespository } from '@/repositories/wishesRepository'
import { Gifter } from '@/types'

export const updateWishWithPerson = async (
  gifter: Gifter,
  repository: WishesRespository
) => {
  const response = await repository.associatePersonWithWish(gifter)
  return response
}
