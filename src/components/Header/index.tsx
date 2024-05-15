'use client'

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import NorthWestIcon from '@mui/icons-material/NorthWest'
import RedeemIcon from '@mui/icons-material/Redeem'
import { Typography } from '@mui/material'
import { usePathname } from 'next/navigation'
import { CustomLink } from '../CustomLink'
import * as E from './styles'

export const Header = () => {
  const pathname = usePathname()
  const isWishListView = pathname !== '/'

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
        <RedeemIcon color='info' fontSize="small" />

        <Typography color={'#e6e0d2'} component={'p'} variant="h6">
          Chá de casa nova
        </Typography>

        {isWishListView ? (
          <CustomLink
            href={'/'}
            fontSizeIcon={'small'}
            textContent={'Home'}
            sideIcon="left"
            Icon={NorthWestIcon}
          />
        ) : (
          <CustomLink
            href={'/wishes'}
            fontSizeIcon={'small'}
            textContent={'Wishes'}
            Icon={ArrowOutwardIcon}
          />
        )}
      </E.Header>
    </header>
  )
}
