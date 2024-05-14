export type WishProps = {
  id: string
  name: string
  createdAt: string
  choosen: boolean | null
  personName: string | null
  url: string
}

export type WishCreateProps = {
  name: string
  url: string
}

export type Gifter = {
  id: string
  personName: string
  choosen: boolean
}

export type WishUpdateResponse = {
  message: string
  showBuyButton: boolean
  buyMessage: string
  gifts: WishProps[]
}

export type CreateWishResponse = {
  message: string
}
