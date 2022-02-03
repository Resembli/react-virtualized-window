import { Navbar } from "./components/Navbar"
import { NestedRoutes } from "./components/NestedRoutes"
import { BasicPage } from "./pages/Basic"
import { GapPage } from "./pages/Gap"
import { OverscanPage } from "./pages/Overscan"
import { css } from "./theme/theme"

const app = css({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  height: "100%",
  width: "100%",
  backgroundColor: "$appBg",
  color: "$textPrimary",
})

export const App = () => {
  // TODO: adding the following examples for each component
  // - resize changing
  // - Custom styling and class name
  // - Onscroll user event handler
  // - tab index handling
  // - api ref handling
  // - infinite scrolling example
  // - auto complete example
  // - grid search scroll to
  // - masonry component

  return (
    <div className={app()}>
      <Navbar />
      <NestedRoutes base="/basic">
        <BasicPage />
      </NestedRoutes>
      <NestedRoutes base="/gap">
        <GapPage />
      </NestedRoutes>
      <NestedRoutes base="/overscan">
        <OverscanPage />
      </NestedRoutes>
    </div>
  )
}
