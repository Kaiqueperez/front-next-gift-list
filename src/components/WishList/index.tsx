import { WishProps } from '@/types/wish'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
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
      errorMessage: string
    }>
  ) => void
  handleModal?: () => void
  isNeedShowAllWishes?: boolean | null
  hiddenButton?: boolean
}
export const WishList = ({
  hiddenButton,
  wishes,
  handleSetGifter,
  handleModal,
  isNeedShowAllWishes = null,
}: WishListProps) => {
  const handleChosenWish = (showAllWishes: boolean | null, wish: WishProps) => {
    if (showAllWishes === null) {
      handleSetGifter!((prev) => ({
        ...prev,
        id: wish.id,
        url: wish.url,
      }))
      handleModal!()
    }

    return
  }
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} mx={2}>
      {wishes
        .filter((wish) => wish.choosen === isNeedShowAllWishes)
        .map((wish, wishIndex) => (
          <Card key={wish.id}>
            <CardHeader
              title={wish.name}
              subheader={`${
                wish.personName !== null ? wish.personName : 'Disponivel'
              }`}
            />
            <Box display={'flex'} justifyContent={'center'}>
              <CardMedia
                sx={{
                  width: '200px',
                }}
                component="img"
                height="194"
                image={wish.imageUrl}
                alt="image of wish"
              />
            </Box>

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {wish.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {hiddenButton ? null : (
                <Button
                  data-testid={wish.name + wishIndex}
                  onClick={() => handleChosenWish(isNeedShowAllWishes, wish)}
                  color="secondary"
                  variant="contained"
                >
                  <Typography color={'white'}>Escolher {wish.name}</Typography>
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
    </Box>
  )
}
