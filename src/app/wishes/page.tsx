'use client'

import { CustomLink } from '@/components/CustomLink'
import { WishList } from '@/components/WishList'
import { useWishListContext } from '@/contexts'
import { useModalContext } from '@/contexts/modalContext'
import { modalStyle } from '@/styles/constants'
import { validateName } from '@/utils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SendIcon from '@mui/icons-material/Send'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import {
  Alert,
  Box,
  Button,
  Modal,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const WishListPage = () => {
  const { isLoading, associatePersonWithWish, updateWishResponse, wishes } =
    useWishListContext()

  const { handleModal, isModalOpen } = useModalContext()

  const [isOpenToast, setIsOpenToast] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const [gifter, setGifter] = useState({
    id: '',
    personName: '',
    choosen: false,
    url: '',
    errorMessage: '',
  })

  const handleToast = () => setIsOpenToast((prev) => !prev)
  const handleHidden = () => setIsHidden((prev) => !prev)

  const handlePersonName = (personName: string) => {
    setGifter((prev) => ({
      ...prev,
      personName,
      errorMessage: validateName(personName),
    }))
  }

  const { buyMessage, showBuyButton } = updateWishResponse

  const { choosen, personName, url, errorMessage } = gifter

  const clearState = () => {
    handleModal()
    setGifter({
      choosen: false,
      id: '',
      personName: '',
      url: '',
      errorMessage: '',
    })

    if (isHidden) handleHidden()
  }

  const handleClipBoard = (
    elementId: string,
    textMatch: RegExp,
    handleToast: () => void
  ) => {
    const element = document.getElementById(elementId)
    const textClipBoard = element?.textContent?.match(textMatch)
    navigator.clipboard.writeText(textClipBoard![0]).then(() => {
      handleToast()
    })
  }

  const handleSendGift = () => {
    associatePersonWithWish(gifter)
    setGifter((prev) => ({
      ...prev,
      personName: '',
      choosen: true,
    }))
    handleHidden()
  }

  return (
    <Box marginBottom={8}>
      <Snackbar
        open={isOpenToast}
        autoHideDuration={3000}
        onClose={handleToast}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert onClose={handleToast} severity="success" variant="filled">
          Copiado!!
        </Alert>
      </Snackbar>
      <Modal
        onClose={clearState}
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
          {isHidden ? null : (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              color={'white'}
            >
              Coloque o seu nome para reserva esse presente!!
            </Typography>
          )}

          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
          >
            {choosen ? null : (
              <>
                <TextField
                  onChange={(e) => handlePersonName(e.target.value)}
                  id="filled-basic"
                  label="Seu nome"
                  variant="outlined"
                  color="info"
                  placeholder="Ex: Augusto"
                  value={personName}
                  error={!!errorMessage}
                  helperText={errorMessage ? errorMessage : ''}
                />
                <Button
                  disabled={personName.length <= 3 || !!errorMessage}
                  onClick={handleSendGift}
                  variant="contained"
                  color="info"
                  endIcon={<SendIcon />}
                >
                  Enviar
                </Button>
              </>
            )}

            {showBuyButton && choosen ? (
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
                  alignItems={'center'}
                >
                  <Typography
                    textAlign={'center'}
                    id="textToCopy"
                    component={'p'}
                    color={'white'}
                  >
                    CEP: <b>52020-185</b> e adicione apenas o número do AP:{' '}
                    <b>501</b> e do edificio: <b>565</b>
                  </Typography>

                  <Button
                    onClick={() =>
                      handleClipBoard('textToCopy', /52020-185/, handleToast)
                    }
                    variant="contained"
                    color="info"
                    endIcon={<ContentCopyIcon color="secondary" />}
                  >
                    <Typography component={'p'}>Copiar CEP</Typography>
                  </Button>

                  <Typography component={'p'} color={'white'}>
                    {buyMessage}
                  </Typography>

                  <Button variant="contained" color="info">
                    <CustomLink
                      changecolor={'true'}
                      href={url}
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
          <Typography component={'p'} textAlign={'center'}>
            Oiii gente, se vocês já estão aqui,{' '}
            <b>se cosiderem muito importante para nós!!</b> Essa aqui é uma
            listinha básica de tudo que estamos precisando.{' '}
            <TagFacesIcon color="secondary" /> Ficaremos muito felizes e gratos
            por qualquer lembrança que vocês escolherem. Desde já agradecemos.
          </Typography>
        </Box>

        <Box
          m={2}
          p={2}
          alignItems={'center'}
          border={'1px solid black'}
          borderRadius={2}
        >
          <Alert
            sx={{ justifyContent: 'center' }}
            variant="filled"
            severity="warning"
          >
            Observação: Você não precisa comprar pelo link que aparecerá após
            escolher seu presente e enviar seu nome, fique a vontade para
            comprar onde quiser.
          </Alert>
        </Box>

        <Box
          m={2}
          p={2}
          alignItems={'center'}
          border={'1px solid black'}
          borderRadius={2}
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          alignContent={'center'}
        >
          <Typography textAlign={'center'} id="addressToCopy" component={'p'}>
            Endereço para entrega: Cep: 52020-185, Rua conselheiro portela, 565.
            Apartamento 501
          </Typography>

          <Button
            onClick={() =>
              handleClipBoard(
                'addressToCopy',
                /Cep: 52020-185, Rua conselheiro portela, 565. Apartamento 501/,
                handleToast
              )
            }
            variant="contained"
            color="info"
            endIcon={<ContentCopyIcon color="secondary" />}
          >
            <Typography component={'p'}>Copiar endereço</Typography>
          </Button>
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
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}
          >
            <Skeleton
              variant="rounded"
              width={320}
              height={45}
              data-testid="skeleton"
            />
            <Skeleton variant="rounded" width={320} height={45} />
            <Skeleton variant="rounded" width={320} height={45} />
            <Skeleton variant="rounded" width={320} height={45} />
            <Skeleton variant="rounded" width={320} height={45} />
          </Box>
        ) : (
          <WishList
            handleModal={handleModal}
            handleSetGifter={setGifter}
            wishes={wishes}
          />
        )}
      </Box>
    </Box>
  )
}

export default WishListPage
