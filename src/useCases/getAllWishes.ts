import { WishesRespository } from '@/repositories/wishesRepository'

export const getAllWishes = async (repository: WishesRespository) => {
  const response = await repository.fetchAllWishesList()
  return response
}
