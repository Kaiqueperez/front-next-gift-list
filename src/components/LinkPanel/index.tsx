import { Box } from '@mui/material'

type LinkPanelProps = {
  children: React.ReactNode
  bgColor?: string
}

export const LinkPanel = ({
  children,
  bgColor = '#dd9f3a',
}: LinkPanelProps) => {
  return (
    <Box
      display={'flex'}
      m={2}
      p={2}
      alignItems={'center'}
      border={'1px solid black'}
      justifyContent={'center'}
      borderRadius={2}
      bgcolor={bgColor}
    >
      {children}
    </Box>
  )
}
