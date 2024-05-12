import { WishesRespository } from '@/repositories'
import { WishCreateProps } from '@/types'

export const createWish = async (
  wish: WishCreateProps,
  repository: WishesRespository
) => {
  const response = await repository.createWish(wish)
  return response
}
