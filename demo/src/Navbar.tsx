import { css } from "./theme/theme"

const navbarStyles = css({
  display: "flex",
  alignItems: "center",
  backgroundColor: "$subtleBg",
  height: "48px",
})

export function Navbar() {
  return <div className={navbarStyles()}></div>
}
