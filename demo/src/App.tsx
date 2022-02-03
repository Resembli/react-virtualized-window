import { Navbar } from "./components/Navbar"
import { NestedRoutes } from "./components/NestedRoutes"
import { BasicPage } from "./pages/Basic"
import { GapPage } from "./pages/Gap"
import { MultiplePage } from "./pages/Multiple"
import { OverscanPage } from "./pages/Overscan"
import { SizingPage } from "./pages/Sizing"
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
      <NestedRoutes base="/multiple">
        <MultiplePage />
      </NestedRoutes>
      <NestedRoutes base="/sizing">
        <SizingPage />
      </NestedRoutes>
    </div>
  )
}
