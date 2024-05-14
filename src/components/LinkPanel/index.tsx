import { Box } from '@mui/material'

type LinkPanelProps = {
  children: React.ReactNode
}

export const LinkPanel = ({ children }: LinkPanelProps) => {
  return (
    <Box
      display={'flex'}
      m={2}
      p={2}
      alignItems={'center'}
      border={'1px solid black'}
      justifyContent={'center'}
      borderRadius={2}
    >
      {children}
    </Box>
  )
}
