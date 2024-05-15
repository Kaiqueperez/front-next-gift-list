'use client'

import { Box, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      position={'fixed'}
      bottom={0}
      textAlign={'center'}
      width={'100%'}
      left={0}
      bgcolor={'#cc632e'}
    >
      <Typography color={'#e6e0d2'} p={2} component={'p'}>{`© ${new Date().getFullYear()}  Desenvolvido com ❤️ por Kaique.`}</Typography>
    </Box>
  )
}
