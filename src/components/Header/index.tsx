'use client'

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import RedeemIcon from '@mui/icons-material/Redeem'
import Link from 'next/link'
import * as E from './styles'

export const Header = () => {
  return (
    <header>
      <E.Header
        display={'flex'}
        alignItems={'center'}
        gap={2}
        justifyContent={'center'}
        sx={{
          gap: {
            sm: 3,
            md: 4,
            lg: 6,
          },
        }}
      >
        <RedeemIcon fontSize="small" />

        <p>Chá de casa nova</p>

        <Link href={'/wishes'}>
          Wishes <ArrowOutwardIcon fontSize="small" />{' '}
        </Link>
      </E.Header>
    </header>
  )
}
