'use client'

import { FormWishCreator } from '@/components/Forms/WishCreator'
import { useWishListContext } from '@/contexts'
import { useModalContext } from '@/contexts/modalContext'
import { modalStyle } from '@/styles/constants'
import { WishCreateProps } from '@/types'
import { Box, Modal, Typography } from '@mui/material'
import { useState } from 'react'

const AdminPage = () => {
  const { wishCreator } = useWishListContext()
  const [wish, setWish] = useState<WishCreateProps>({
    name: '',
    url: '',
    description: '',
    imageUrl: '',
  })
  const { handleModal, isModalOpen } = useModalContext()
  const [message, setMessage] = useState('')

  const handleWishCreator = async (wish: WishCreateProps) => {
    const response = await wishCreator(wish)
    setMessage(response.message)
    handleModal()
    setWish({ name: '', url: '', imageUrl: '', description: '' })
  }
  const handleGiftValues = (key: string, value: string) => {
    setWish((prev) => ({
      ...prev,
      [key]: value,
    }))
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
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={'center'}
          >
            {message}
          </Typography>
        </Box>
      </Modal>

      <FormWishCreator
        handleGiftValues={handleGiftValues}
        handleWishCreator={handleWishCreator}
        wish={wish}
      />
    </>
  )
}

export default AdminPage
