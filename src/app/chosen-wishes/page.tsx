'use client'
import { WishList } from '@/components'
import { useWishListContext } from '@/contexts'
import { Box, Typography } from '@mui/material'

const ChosenWishListPage = () => {
  const { wishes } = useWishListContext()

  const hasSelectedProducts = wishes.filter((wish) => wish.choosen).length > 0
  return (
    <Box
      m={2}
      marginBottom={8}
      p={2}
      textAlign={'center'}
      border={'1px solid black'}
      borderRadius={2}
    >
      {hasSelectedProducts ? (
        <Box textAlign={'center'}>
          <Typography component={'p'}>Produtos selecionados</Typography>

          <WishList wishes={wishes} isNeedShowAllWishes  hiddenButton/>
        </Box>
      ) : (
        <Typography component={'p'}>Nenhum produto foi selecionado</Typography>
      )}
    </Box>
  )
}

export default ChosenWishListPage
