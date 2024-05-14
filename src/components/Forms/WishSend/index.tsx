import { WishCreateProps } from '@/types'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, TextField, Typography } from '@mui/material'

type FormWishSendProps = {
  handleGiftValues: (key: string, value: string) => void
  handleWishCreator: (wish: WishCreateProps) => Promise<void>
  wish: WishCreateProps
}

export const FormWishSend = ({
  handleGiftValues,
  handleWishCreator,
  wish,
}: FormWishSendProps) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Typography variant="h6" component="h2">
        Cadastro de desejos
      </Typography>
      <TextField
        id="filled-basic"
        label="Cadastre seu desejo"
        variant="filled"
        value={wish.name}
        onChange={(e) => handleGiftValues('name', e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Link do desejo"
        variant="filled"
        value={wish.url}
        onChange={(e) => handleGiftValues('url', e.target.value)}
      />
      <Button
        onClick={() => handleWishCreator(wish)}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  )
}
