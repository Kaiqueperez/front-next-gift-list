import styled from '@emotion/styled'
import Link from 'next/link'

export const CustomLink = styled(Link)<{ changeColor: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.changeColor ? '#a27f19' : 'white')};
`
