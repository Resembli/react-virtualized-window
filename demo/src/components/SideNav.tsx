import type { ReactNode } from "react"

import type { CSS } from "../theme/theme"
import { css } from "../theme/theme"

interface SideNavProps {
  css?: CSS
  children?: ReactNode
}

const sideNavCss = css({
  backgroundColor: "$surfaceBg",
  width: 300,
})

export function SideNav({ css, children }: SideNavProps) {
  return <div className={sideNavCss({ css })}>{children}</div>
}
