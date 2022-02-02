import type { PropsWithChildren } from "react"
import { Link } from "wouter"

import type { CSS } from "../theme/theme"
import { css } from "../theme/theme"

const navbarStyles = css({
  margin: "0px 20px",
  display: "flex",
  alignItems: "center",
  gap: 20,
  backgroundColor: "$subtleBg",
  borderBottom: "1px solid $subtleBorder",
  height: "48px",
})

interface NavbarProps {
  css?: CSS
}

const navLinkClass = css({
  color: "$cyan12",
  textDecoration: "none",
  fontWeight: "bolder",
  fontSize: "1.2rem",
})

interface NavLinkProps {
  to: string
}

function NavLink({ to, children }: PropsWithChildren<NavLinkProps>) {
  return (
    <Link to={to} className={navLinkClass()}>
      {children}
    </Link>
  )
}

export function Navbar({ css }: NavbarProps) {
  return (
    <div className={navbarStyles({ css })}>
      <NavLink to="/basic">Basic Examples</NavLink>
      <NavLink to="/overscan">Overscan Examples</NavLink>
      <NavLink to="/sizing">Sizing Examples</NavLink>
      <NavLink to="/multiple">Multiple Examples</NavLink>
    </div>
  )
}
