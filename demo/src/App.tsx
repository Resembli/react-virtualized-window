import { Navbar } from "./Navbar"
import { css } from "./theme/theme"

const app = css({
  display: "grid",
  gridTemplateColumns: "auto",
  gridTemplateRows: "auto 1fr",
  height: "100%",
  backgroundColor: "$appBg",

  color: "$textPrimary",
})

const appClass = app()

export const App = () => {
  return (
    <div className={appClass}>
      <Navbar />
    </div>
  )
}
