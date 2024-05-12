'use client'

import { CustomLink } from '@/components/CustomLink'
import { WishList } from '@/components/WishList'
import { useWishListContext } from '@/contexts'
import { useModalContext } from '@/contexts/modalContext'
import { modalStyle } from '@/styles/constants'
import NorthWestIcon from '@mui/icons-material/NorthWest'
import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

const WishListPage = () => {
  const [gifter, setGifter] = useState({
    id: '',
    personName: '',
    choosen: false,
    url: '',
  })

  const {
    isLoading,
    wishes,
    associatePersonWithWish,
    updateWishResponse,
    fetchAllWishes,
  } = useWishListContext()

  const { handleModal, isModalOpen } = useModalContext()

  const clearState = () => {
    handleModal()
    setGifter({ choosen: false, id: '', personName: '', url: '' })
  }

  useEffect(() => {
    fetchAllWishes()

    if (updateWishResponse.message) {
      alert(updateWishResponse.message)
    }
  }, [updateWishResponse])

  return (
    <Box marginBottom={8}>
      <Modal
        onClose={handleModal}
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle['modalWishListPage']}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bela escolha, ficamos agradecidos
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Coloque o seu nome para reserva esse presente
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
          >
            <TextField
              onChange={(e) =>
                setGifter((prev) => ({
                  ...prev,
                  personName: e.target.value,
                }))
              }
              id="filled-basic"
              label="Seu nome"
              variant="filled"
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
              endIcon={<SendIcon />}
            >
              Enviar
            </Button>

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
                  <Typography component={'p'}>
                    {updateWishResponse.buyMessage}
                  </Typography>
                  <Button
                    onClick={() => associatePersonWithWish(gifter)}
                    variant="contained"
                  >
                    <CustomLink
                      href={gifter.url}
                      fontSizeIcon={'small'}
                      textContent={'Comprar'}
                      Icon={SendIcon}
                    />
                  </Button>
                </Box>

                <Button onClick={clearState} variant="contained">
                  Continuar escolhendo
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
            listinha básica de tudo que estamos precisando ''icone'' Ficaremos
            muito felizes e gratos por qualquer lembrança que vocês escolherem.
            Desde já agradecemos
          </Typography>
        </Box>

        <Box m={2} p={2} justifyContent={'center'} display={'flex'}>
          <Typography variant="h5" component={'h3'}>
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

        <Box>
          <CustomLink
            href={'/'}
            fontSizeIcon="small"
            textContent={'Voltar para home '}
            Icon={NorthWestIcon}
            sideIcon="left"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default WishListPage
