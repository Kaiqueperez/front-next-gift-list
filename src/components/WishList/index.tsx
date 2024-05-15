import { WishProps } from '@/types/wish'
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined'
import RedeemIcon from '@mui/icons-material/Redeem'
import {
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { SetStateAction } from 'react'

type WishListProps = {
  wishes: WishProps[]
  handleSetGifter?: (
    value: SetStateAction<{
      id: string
      personName: string
      choosen: boolean
      url: string
    }>
  ) => void
  handleModal?: () => void
  isNeedShowAllWishes?: boolean | null
}
export const WishList = ({
  wishes,
  handleSetGifter,
  handleModal,
  isNeedShowAllWishes = null,
}: WishListProps) => {
  return (
    <List>
      {wishes
        .filter((wish) => wish.choosen === isNeedShowAllWishes)
        .map((wish) => (
          <ListItem
            key={wish.id}
            onClick={
              isNeedShowAllWishes === null
                ? () => {
                    handleSetGifter!((prev) => ({
                      ...prev,
                      id: wish.id,
                      url: wish.url,
                    }))
                    handleModal!()
                  }
                : () => undefined
            }
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <RecommendOutlinedIcon fontSize="large" color="secondary" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <RedeemIcon fontSize="large" color="secondary" />
            </ListItemAvatar>
            <ListItemText
              primary={`${wish.name} => 
               ${wish.personName !== null ? wish.personName : 'Disponivel'}`}
            />
          </ListItem>
        ))}
    </List>
  )
}
