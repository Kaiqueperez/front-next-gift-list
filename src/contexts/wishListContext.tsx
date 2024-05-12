import { wishesRepositoryImpl } from '@/repositories'
import { WishProps, WishUpdateResponse } from '@/types'
import { getAllWishes } from '@/useCases'
import { updateWishWithPerson } from '@/useCases/updateWishWithPerson'
import React, { createContext, useContext, useState } from 'react'
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

  updateWishResponse: WishUpdateResponse
}
type WishListProviderProps = {
  children?: React.ReactNode
}
export const WishListProvider: React.FC<WishListProviderProps> = ({
  children,
}) => {
  const [wishes, setWishes] = useState<WishProps[]>([])
  const [isLoading, setIsloading] = useState(false)
  const [updateWishResponse, setUpdateWishResponse] = useState({
    message: '',
    showBuyButton: false,
    buyMessage: '',
  })

  const fetchAllWishes = async () => {
    setIsloading(true)
    const allWishes = await getAllWishes(wishesRepositoryImpl)

    setWishes(allWishes)
  }

  const associatePersonWithWish = async (gifter: {
    id: string
    personName: string
    choosen: boolean
    url: string
  }) => {
    try {
      const { message, showBuyButton, buyMessage } = await updateWishWithPerson(
        gifter,
        wishesRepositoryImpl
      )

      setUpdateWishResponse((prev) => ({
        ...prev,
        message,
        showBuyButton,
        buyMessage,
      }))
    } catch (error) {}
  }

  return (
    <WishListContext.Provider
      value={{
        wishes,
        isLoading,
        fetchAllWishes,
        associatePersonWithWish,
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
