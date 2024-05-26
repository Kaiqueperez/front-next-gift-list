import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const Header = styled(Box)`
  background-color: #cc632e;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #e6e0d2;
  }

  @media (max-width: 325px) {
    p {
      font-size: 20px;
    }
  }
`
