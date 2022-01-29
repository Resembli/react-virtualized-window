import type { CSS } from "../theme/theme"
import { css } from "../theme/theme"

const navbarStyles = css({
  display: "flex",
  alignItems: "center",
  backgroundColor: "$subtleBg",
  borderBottom: "1px solid $subtleBorder",
  height: "48px",
})

interface NavbarProps {
  css?: CSS
}

export function Navbar({ css }: NavbarProps) {
  return <div className={navbarStyles({ css })}></div>
}
