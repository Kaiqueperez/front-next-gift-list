import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const WarningBox = styled(Box)`
  h3,
  p {
    text-align: -webkit-center;
  }
`
export const CTAContent = styled(Box)`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 16px;
  flex-direction: column;
  gap: 16px;

  img {
    width: 90%;
    height: 400px;
  }

  @media (min-width: 1024px) {
    img {
      height: 620px;
    }
  }
`
