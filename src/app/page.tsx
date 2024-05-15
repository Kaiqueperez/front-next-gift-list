'use client'

import { CustomLink, LinkPanel } from '@/components'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as E from './styles'

export default function Home() {
  const [isMount, setIsMount] = useState(false)

  const isDevEnv =
    typeof window != 'undefined' && window.location.href.includes('localhost')

  useEffect(() => {
    setIsMount(true)
  }, [])

  if (isMount) {
    return (
      <main>
        {isDevEnv ? (
          <LinkPanel>
            <CustomLink
              href={'/admin'}
              fontSizeIcon={'small'}
              textContent={'Cadastro de desejos '}
              Icon={ArrowOutwardIcon}
            />
          </LinkPanel>
        ) : (
          <LinkPanel>
            <Button variant="contained" color="secondary">
              <CustomLink
                href={'/wishes'}
                fontSizeIcon={'small'}
                textContent={'Ir para lista de Wishes '}
                Icon={ArrowOutwardIcon}
              />
            </Button>
          </LinkPanel>
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
          >
            <Typography
              component={'h3'}
              color={'#a27f19'}
              variant="h5"
              fontStyle={'oblique'}
            >
              Sejam bem vindo a wish list de Gabriela e Kaique
            </Typography>
            <Typography component={'p'}>
              Como todos sabem acabamos de nos mudar e vamos deixar aqui uma
              lista de desejos, que seriam muito bem recebidos caso fossemos
              presenteados
            </Typography>
          </E.WarningBox>

          <E.CTAContent
            m={2}
            p={2}
            alignItems={'center'}
            border={'1px solid black'}
            borderRadius={2}
          >
            <Image
              src={'/img-home.jpeg'}
              alt={''}
              width={250}
              height={200}
              style={{
                width: '100%',
                height: '400px',
              }}
              sizes="(max-width: 500px) 90vw, 500px"
            />

            <Typography component={'p'}>
              Então para animar rapaziada clica no botão para dar uma olhada na
              lista e escolher o seu
            </Typography>

            <Button variant="contained" color="secondary">
              <CustomLink
                href={'/wishes'}
                fontSizeIcon={'small'}
                textContent={'Ir para lista de Wishes '}
                Icon={ArrowOutwardIcon}
              />
            </Button>
            <LinkPanel>
              <CustomLink
                href={'/chosen-wishes'}
                fontSizeIcon={'small'}
                textContent={'Wishes selecionados'}
                Icon={ArrowOutwardIcon}
              />
            </LinkPanel>
          </E.CTAContent>
        </Box>
      </main>
    )
  }
}
