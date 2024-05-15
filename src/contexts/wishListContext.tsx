import { wishesRepositoryImpl } from '@/repositories'
import {
  CreateWishResponse,
  WishCreateProps,
  WishProps,
  WishUpdateResponse,
} from '@/types'
import { createWish, getAllWishes } from '@/useCases'
import { updateWishWithPerson } from '@/useCases/updateWishWithPerson'
import React, { createContext, useContext, useEffect, useState } from 'react'
type WishListContextProps = {
  wishes: WishProps[]
  isLoading: boolean
  fetchAllWishes: () => Promise<void>
  associatePersonWithWish: (gifter: {
    id: string
    personName: string
    choosen: boolean
    url: string
  }) => Promise<void>

  wishCreator: (wish: WishCreateProps) => Promise<CreateWishResponse>

  updateWishResponse: WishUpdateResponse
}
type WishListProviderProps = {
  children?: React.ReactNode
}
export const WishListProvider: React.FC<WishListProviderProps> = ({
  children,
}) => {
  const [wishes, setWhishes] = useState<WishProps[]>([])
  const [isLoading, setIsloading] = useState(false)
  const [updateWishResponse, setUpdateWishResponse] = useState({
    message: '',
    showBuyButton: false,
    buyMessage: '',
    gifts: [],
  })

  const wishCreator = async (wish: WishCreateProps) => {
    const response = await createWish(wish, wishesRepositoryImpl)
    return response
  }

  const fetchAllWishes = async () => {
    setIsloading(true)
    const allWishes = await getAllWishes(wishesRepositoryImpl)

    setWhishes(allWishes)
  }

  const associatePersonWithWish = async (gifter: {
    id: string
    personName: string
    choosen: boolean
    url: string
  }) => {
    try {
      const { personName } = gifter

      personName !== '' ? (gifter.choosen = true) : null

      const { message, showBuyButton, buyMessage, gifts } =
        await updateWishWithPerson(gifter, wishesRepositoryImpl)

      setWhishes(gifts)
      setUpdateWishResponse((prev) => ({
        ...prev,
        message,
        showBuyButton,
        buyMessage,
      }))
    } catch (error) {}
  }

  useEffect(() => {
    fetchAllWishes()
  }, [updateWishResponse.showBuyButton])

  return (
    <WishListContext.Provider
      value={{
        wishes,
        isLoading,
        fetchAllWishes,
        associatePersonWithWish,
        wishCreator,
        updateWishResponse,
      }}
    >
      {children}
    </WishListContext.Provider>
  )
}
const WishListContext = createContext<WishListContextProps | undefined>(
  undefined
)
export function useWishListContext() {
  const context = useContext(WishListContext)
  if (!context) {
    throw Error('use WishListContext')
  }
  return context
}
