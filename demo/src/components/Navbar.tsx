import type { PropsWithChildren } from "react"
import { Link } from "wouter"

import type { CSS } from "../theme/theme"
import { css } from "../theme/theme"

const navbarStyles = css({
  padding: "0px 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
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
  padding: "0 10px 0 0",
  borderRight: "2px solid $cyan12",

  variants: {
    noBorder: {
      true: { borderRight: "none" },
    },
  },
})

interface NavLinkProps {
  to: string
  noBorder?: boolean
}

function NavLink({ to, children, noBorder }: PropsWithChildren<NavLinkProps>) {
  return (
    <Link to={to} className={navLinkClass({ noBorder })}>
      {children}
    </Link>
  )
}

export function Navbar({ css }: NavbarProps) {
  return (
    <div className={navbarStyles({ css })}>
      <NavLink to="/playground">Playground</NavLink>
      <NavLink to="/basic">Basic</NavLink>
      <NavLink to="/gap">Gap</NavLink>
      <NavLink to="/overscan">Overscan</NavLink>
      <NavLink to="/sizing">Sizing</NavLink>
      <NavLink to="/multiple">Multiple</NavLink>
      <NavLink to="/custom-styling">Custom Styling</NavLink>
      <NavLink to="/onscroll-api-tab-index">Onscroll, Api, Tab Index</NavLink>
      <NavLink to="/sticky-disabled">Sticky Disabled</NavLink>
      <NavLink to="/percentages">Percentages</NavLink>
      <NavLink to="/infinite-scrolling" noBorder>
        Infinite Scrolling Handling
      </NavLink>
    </div>
  )
}
