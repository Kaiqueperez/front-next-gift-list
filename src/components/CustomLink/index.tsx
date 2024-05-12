import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import * as E from './styles'

type CustomLinkProps = React.ComponentProps<'link'> & {
  href: string
  fontSizeIcon: IconSize
  textContent: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  sideIcon?: SideIconProps
}

type SideIconProps = 'left' | 'right'
type IconSize = 'small' | 'inherit' | 'large' | 'medium'

export const CustomLink = ({
  fontSizeIcon = 'small',
  href,
  textContent,
  Icon,
  sideIcon = 'right',
}: CustomLinkProps) => {
  return (
    <E.CustomLink href={href}>
      {sideIcon === 'left' ? (
        <>
          <Icon fontSize={fontSizeIcon} /> <span>{textContent}</span>
        </>
      ) : (
        <>
          <span>{textContent}</span> <Icon fontSize={fontSizeIcon} />
        </>
      )}
    </E.CustomLink>
  )
}
