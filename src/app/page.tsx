'use client'

import { CustomLink, LinkPanel } from '@/components'
import { useClientSide } from '@/hooks'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Box, Button, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import * as E from './styles'

export default function Home() {
  const { isDevEnv, isMount } = useClientSide()

  if (isMount) {
    return (
      <>
        <main>
          {isDevEnv ? (
            <Box
              sx={{
                display: {
                  xs: 'flex',
                },
                justifyContent: {
                  xs: 'center',
                },
              }}
            >
              <LinkPanel>
                <CustomLink
                  href={'/admin'}
                  fontSizeIcon={'small'}
                  textContent={'Cadastro de desejos'}
                  Icon={ArrowOutwardIcon}
                />
              </LinkPanel>
            </Box>
          ) : (
            <Box
              sx={{
                display: {
                  xs: 'flex',
                },
                justifyContent: {
                  xs: 'center',
                },
              }}
            >
              <LinkPanel>
                <CustomLink
                  href={'/wishes'}
                  fontSizeIcon={'small'}
                  textContent={'Ir para lista de Wishes'}
                  Icon={ArrowOutwardIcon}
                />
              </LinkPanel>
            </Box>
          )}
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            marginBottom={8}
          >
            <E.WarningBox
              m={2}
              p={2}
              alignItems={'center'}
              border={'1px solid black'}
              borderRadius={2}
              maxWidth={768}
              display={'flex'}
              flexDirection={'column'}
              gap={2}
            >
              <Typography
                component={'h3'}
                color={'#a27f19'}
                variant="h5"
                fontStyle={'oblique'}
              >
                Sejam bem vindos a wish list de Gabriela e Kaique
              </Typography>
              <Divider
                sx={{
                  height: 1,
                  width: 1,
                }}
              />
              <Typography component={'p'}>
                Como todos sabem acabamos de nos mudar e vamos deixar aqui uma
                lista de desejos, que seriam muito bem recebidos caso fossemos
                presenteados.
              </Typography>
            </E.WarningBox>
            <E.CTAContent m={2} p={2}>
              <Image
                src={'/img-homee.jpeg'}
                alt={''}
                width={250}
                height={200}
                priority
              />

              <Typography component={'p'}>
                Então para animar rapaziada clica no botão para dar uma olhada
                na lista e escolher o seu!!!
              </Typography>

              <Button variant="contained" color="secondary">
                <CustomLink
                  href={'/wishes'}
                  fontSizeIcon={'small'}
                  textContent={'Ir para lista de Wishes '}
                  Icon={ArrowOutwardIcon}
                />
              </Button>

              <Typography component={'p'}>
                Caso queira acompanhar os presentes já selecionados clica no
                botão abaixo.
              </Typography>

              <LinkPanel>
                <CustomLink
                  href={'/chosen-wishes'}
                  fontSizeIcon={'small'}
                  textContent={'Wishes já selecionados'}
                  Icon={ArrowOutwardIcon}
                />
              </LinkPanel>
            </E.CTAContent>
          </Box>
        </main>
      </>
    )
  }
}
