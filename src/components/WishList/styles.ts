import styled from '@emotion/styled'
import { Box } from '@mui/material'

export const CustomBox = styled(Box)`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 0 24px;

  @media (min-width: 576px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 64px;
  }
`
