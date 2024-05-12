'use client'

import { Box } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      position={'fixed'}
      bottom={0}
      textAlign={'center'}
      width={'100%'}
      left={0}
      bgcolor={'lightpink'}
    >
      <p>{`© ${new Date().getFullYear()}  Desenvolvido com ❤️ por Kaique.`}</p>
    </Box>
  )
}
