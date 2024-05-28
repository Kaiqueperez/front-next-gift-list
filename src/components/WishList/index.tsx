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

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { SetStateAction } from 'react'
import * as E from './styles'

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
    <E.CustomBox>
      {wishes
        .filter((wish) => wish.choosen === isNeedShowAllWishes)
        .map((wish, wishIndex) => (
          <Card
            key={wish.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              maxWidth: 350,
              height:500
            }}
          >
            <CardHeader
              title={wish.name}
              subheader={
                wish.personName !== null ? (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    paddingTop={2}
                    gap={1}
                  >
                    <CheckCircleOutlineIcon color="primary" />{' '}
                    <Typography
                      variant="body1"
                      component={'p'}
                      fontWeight={'bold'}
                    >
                      {wish.personName}
                    </Typography>
                  </Box>
                ) : (
                  'Disponivel'
                )
              }
            />
            <Box display={'flex'} justifyContent={'center'}>
              <CardMedia
                sx={{
                  width: '200px',
                }}
                component="img"
                height="194"
                loading='lazy'
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
    </E.CustomBox>
  )
}
