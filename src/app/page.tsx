'use client'

import { CustomLink } from '@/components'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Box, Button } from '@mui/material'
import Image from 'next/image'
import * as E from './styles'

export default function Home() {
  const isDevEnv =
    typeof window != 'undefined' && window.location.href.includes('localhost')

  return (
    <main>
      {isDevEnv ? (
        <Box
          display={'flex'}
          m={2}
          p={2}
          alignItems={'center'}
          border={'1px solid black'}
          justifyContent={'center'}
          borderRadius={2}
        >
          <CustomLink
            href={'/admin'}
            fontSizeIcon={'small'}
            textContent={'Cadastro de desejos '}
            Icon={ArrowOutwardIcon}
          />
        </Box>
      ) : (
        <Box
          display={'flex'}
          m={2}
          p={2}
          alignItems={'center'}
          border={'1px solid black'}
          justifyContent={'center'}
          borderRadius={2}
        >
          <CustomLink
            href={'/chosen-wishes'}
            fontSizeIcon={'small'}
            textContent={'Wishes selecionados'}
            Icon={ArrowOutwardIcon}
          />
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
        >
          <h3>Sejam bem vindo a wish list de Gabriela e Kaique</h3>
          <p>
            Como todos sabem acabamos de nos mudar e vamos deixar aqui uma lista
            de desejos, que seriam muito bem recebidos caso fossemos
            presenteados
          </p>
        </E.WarningBox>

        <E.CTAContent
          m={2}
          p={2}
          alignItems={'center'}
          border={'1px solid black'}
          borderRadius={2}
        >
          <Image
            src={'/IMG-20240218-WA0005.jpg'}
            alt={''}
            width={250}
            height={200}
          />

          <p>
            Então para animar rapaziada clica no butão para dar uma olhada na
            lista e escolher o seu
          </p>

          <Button variant="contained" color="secondary">
            <CustomLink
              href={'/wishes'}
              fontSizeIcon={'small'}
              textContent={'Ir para lista de Wishes '}
              Icon={ArrowOutwardIcon}
            />
          </Button>
        </E.CTAContent>
      </Box>
    </main>
  )
}
