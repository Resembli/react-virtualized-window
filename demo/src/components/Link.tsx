import type { LinkProps } from "wouter"
import { Link as WLink } from "wouter"

import type { CSS } from "../theme/theme"
import { css } from "../theme/theme"

const linkClass = css({
  color: "$linkPrimary",
  textDecoration: "none",
})

export function Link({ css, ...props }: LinkProps & { css?: CSS }) {
  return <WLink {...props} className={linkClass({ css })} />
}
