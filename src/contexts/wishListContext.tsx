import { wishesRepositoryImpl } from '@/repositories'
import {
  CreateWishResponse,
  WishCreateProps,
  WishProps,
  WishUpdateResponse,
} from '@/types'
import { createWish, getAllWishes } from '@/useCases'
import { updateWishWithPerson } from '@/useCases/updateWishWithPerson'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
export type WishListContextProps = {
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
    setIsloading(false)
  }

  const associatePersonWithWish = async (gifter: {
    id: string
    personName: string
    choosen: boolean
    url: string
  }) => {
    try {
      setIsloading(true)
      const { personName } = gifter

      personName !== '' ? (gifter.choosen = true) : null

      const { message, showBuyButton, buyMessage, gifts } =
        await updateWishWithPerson(gifter, wishesRepositoryImpl)

      setWhishes(gifts)

      setIsloading(false)
      setUpdateWishResponse((prev) => ({
        ...prev,
        message,
        showBuyButton,
        buyMessage,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllWishes()
  }, [updateWishResponse.showBuyButton])

  const memoizedValues = useMemo(
    () => ({
      wishes,
      isLoading,
      fetchAllWishes,
      associatePersonWithWish,
      wishCreator,
      updateWishResponse,
    }),
    [updateWishResponse, isLoading, wishes]
  )

  return (
    <WishListContext.Provider value={memoizedValues}>
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
