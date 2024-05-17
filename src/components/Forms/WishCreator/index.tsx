import { WishCreateProps } from '@/types'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, TextField, Typography } from '@mui/material'

type FormWishCreatorProps = {
  handleGiftValues: (key: string, value: string) => void
  handleWishCreator: (wish: WishCreateProps) => Promise<void>
  wish: WishCreateProps
}

export const FormWishCreator = ({
  handleGiftValues,
  handleWishCreator,
  wish,
}: FormWishCreatorProps) => {
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
        placeholder="Ex: Jogo de facas"
        label="Cadastre seu desejo"
        variant="filled"
        color='info'
        value={wish.name}
        onChange={(e) => handleGiftValues('name', e.target.value)}
      />
      <TextField
        placeholder="Ex: link do produto"
        label="Link do desejo"
        variant="filled"
        color='info'
        value={wish.url}
        onChange={(e) => handleGiftValues('url', e.target.value)}
      />
      <Button
        onClick={() => handleWishCreator(wish)}
        variant="contained"
        color='info'
        endIcon={<SendIcon />}
      >
       Criar wish
      </Button>
    </Box>
  )
}
