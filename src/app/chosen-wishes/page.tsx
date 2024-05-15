'use client'
import { WishList } from '@/components'
import { Box, Typography } from '@mui/material'

const ChosenWishListPage = () => {
  const wishes =
    typeof window != 'undefined' &&
    JSON.parse(localStorage.getItem('wishes-gift')!)
  return (
    <Box
      m={2}
      marginBottom={8}
      p={2}
      alignItems={'center'}
      border={'1px solid black'}
      borderRadius={2}
    >
      <Typography component={'p'}>Produtos selecionados</Typography>

      <WishList wishes={wishes} isNeedShowAllWishes />
    </Box>
  )
}

export default ChosenWishListPage
