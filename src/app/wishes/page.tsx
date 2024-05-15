'use client'

import { CustomLink } from '@/components/CustomLink'
import { WishList } from '@/components/WishList'
import { useWishListContext } from '@/contexts'
import { useModalContext } from '@/contexts/modalContext'
import { modalStyle } from '@/styles/constants'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const WishListPage = () => {
  const { isLoading, associatePersonWithWish, updateWishResponse } =
    useWishListContext()
  const emptyWish = JSON.stringify([
    {
      id: '',
      name: '',
      createdAt: '',
      choosen: null,
      personName: null,
      url: '',
    },
  ])
  const wishes =
    typeof window != 'undefined'
      ? JSON.parse(localStorage.getItem('wishes-gift')!)
      : JSON.parse(emptyWish)

  const { handleModal, isModalOpen } = useModalContext()

  const [gifter, setGifter] = useState({
    id: '',
    personName: '',
    choosen: false,
    url: '',
  })

  const clearState = () => {
    handleModal()
    setGifter({ choosen: false, id: '', personName: '', url: '' })
  }

  return (
    <Box marginBottom={8}>
      <Modal
        onClose={handleModal}
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle['modalWishListPage']}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={'white'}
          >
            Bela escolha, ficamos agradecidos!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color={'white'}
          >
            Coloque o seu nome para reserva esse presente!!
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
          >
            {gifter.choosen ? null : (
              <>
                <TextField
                  onChange={(e) =>
                    setGifter((prev) => ({
                      ...prev,
                      personName: e.target.value,
                    }))
                  }
                  id="filled-basic"
                  label="Seu nome"
                  variant="outlined"
                  color="info"
                  value={gifter.personName}
                />
                <Button
                  disabled={!gifter.personName}
                  onClick={() => {
                    associatePersonWithWish(gifter)
                    setGifter((prev) => ({
                      ...prev,
                      personName: '',
                      choosen: true,
                    }))
                  }}
                  variant="contained"
                  color="info"
                  endIcon={<SendIcon />}
                >
                  Enviar
                </Button>
              </>
            )}

            {updateWishResponse.showBuyButton && gifter.choosen ? (
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={2}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  gap={2}
                >
                  <Typography component={'p'} color={'white'}>
                    {updateWishResponse.buyMessage}
                  </Typography>
                  <Button variant="contained" color="info">
                    <CustomLink
                      href={gifter.url}
                      fontSizeIcon={'small'}
                      textContent={'Comprar'}
                      Icon={SendIcon}
                    />
                  </Button>
                </Box>

                <Button onClick={clearState} variant="contained" color="info">
                  <Typography component={'p'}>Continuar escolhendo</Typography>
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Modal>

      <Box>
        <Box
          m={2}
          p={2}
          alignItems={'center'}
          border={'1px solid black'}
          borderRadius={2}
        >
          <Typography component={'p'}>
            Oiii gente, se vocês já estão aqui,{' '}
            <b>se cosiderem muito importante para nós!!</b> Essa aqui é uma
            listinha básica de tudo que estamos precisando icone Ficaremos muito
            felizes e gratos por qualquer lembrança que vocês escolherem. Desde
            já agradecemos
          </Typography>
        </Box>

        <Box m={2} p={2} justifyContent={'center'} display={'flex'}>
          <Typography
            variant="h4"
            component={'h3'}
            color={'#dd9f3a'}
            fontWeight={700}
          >
            Lista de desejos
          </Typography>
        </Box>

        {isLoading ? (
          <WishList
            handleModal={handleModal}
            handleSetGifter={setGifter}
            wishes={wishes}
          />
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}
      </Box>
    </Box>
  )
}

export default WishListPage
