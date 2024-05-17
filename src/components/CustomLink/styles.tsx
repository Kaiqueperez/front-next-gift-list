import styled from '@emotion/styled'
import Link from 'next/link'

export const CustomLink = styled(Link)<{ changecolor: string }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.changecolor === 'true' ? '#a27f19' : 'white')};
`
