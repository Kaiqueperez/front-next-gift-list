'use client'
import { WishList } from '@/components'
import { useWishListContext } from '@/contexts'
import { Box, Typography } from '@mui/material'

const ChosenWishListPage = () => {
  const { wishes } = useWishListContext()

  const hasSelectedProducts = wishes.filter((wish) => wish.choosen).length > 0
  return (
    <Box m={2} marginBottom={8} p={2} textAlign={'center'}>
      {hasSelectedProducts ? (
        <Box textAlign={'center'}>
          <Typography sx={{
            fontSize: {
              xs: 24,
              sm: 32,
              md: 48
            }
          }} component={'p'}  paddingBottom={4}>Produtos selecionados</Typography>
          <WishList wishes={wishes} isNeedShowAllWishes hiddenChossenButton />
        </Box>
      ) : (
        <Typography component={'p'}>Nenhum produto foi selecionado</Typography>
      )}
    </Box>
  )
}

export default ChosenWishListPage
