'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { Roboto } from 'next/font/google'
import * as React from 'react'
import { NextAppDirEmotionCacheProvider } from './EmotionCache'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 16,
    fontFamily: roboto.style.fontFamily,
  },

  components: {
    MuiTypography: {
      defaultProps: {
        color: '#a27f19',
      },
    },
  },
  palette: {
    background: {
      default: '#d6c79c',
    },

    primary: {
      main: '#1976d2',
    },
    text: {
      primary: '#300000',
    },
    secondary: {
      main: '#dd9f3a',
    },
    info: {
      main: '#e6e0d2',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 375,
      lg: 425,
      xl: 1000,
    },
  },
}

const theme = createTheme(themeOptions)

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
