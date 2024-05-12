'use client'
import { useModalContext } from '@/contexts/modalContext'
import { wishesRepositoryImpl } from '@/repositories'
import { modalStyle } from '@/styles/constants'
import { WishCreateProps } from '@/types'
import { createWish } from '@/useCases'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const AdminPage = () => {
  const [wish, setWish] = useState<WishCreateProps>({
    name: '',
    url: '',
  })
  const [message, setMessage] = useState('')

  const { handleModal, isModalOpen } = useModalContext()

  const sendWishCreator = async (wish: WishCreateProps) => {
    const response = await createWish(wish, wishesRepositoryImpl)

    setMessage(response.message)
    handleModal()
    setWish({ name: '', url: '' })
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle['modalAdminPage']}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
        </Box>
      </Modal>

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
          onChange={(e) =>
            setWish((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          id="filled-basic"
          label="Link do desejo"
          variant="filled"
          value={wish.url}
          onChange={(e) =>
            setWish((prev) => ({ ...prev, url: e.target.value }))
          }
        />
        <Button
          onClick={() => sendWishCreator(wish)}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </>
  )
}

export default AdminPage
