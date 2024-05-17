import { Box, Typography } from '@mui/material'

export const DesktopWarning = ({ text }: { text: string }) => {
  return (
    <Box
      m={2}
      p={2}
      alignItems={'center'}
      border={'1px solid black'}
      borderRadius={2}
      textAlign={'center'}
    >
      <Typography
        component={'h3'}
        color={'#a27f19'}
        variant="h5"
        fontStyle={'oblique'}
      >
        {text}
      </Typography>
    </Box>
  )
}
