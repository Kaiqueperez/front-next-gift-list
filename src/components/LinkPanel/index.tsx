import { Button } from '@mui/material'

type LinkPanelProps = {
  children: React.ReactNode
}

export const LinkPanel = ({ children }: LinkPanelProps) => {
  return (
    <Button sx={{mt: 2}} variant="contained" color="secondary">
      {children}
    </Button>
  )
}
