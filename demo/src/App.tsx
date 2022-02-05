import { Navbar } from "./components/Navbar"
import { NestedRoutes } from "./components/NestedRoutes"
import { BasicPage } from "./pages/Basic"
import { CustomStylingPage } from "./pages/CustomStyling"
import { GapPage } from "./pages/Gap"
import { InfiniteScrollPage } from "./pages/InfiniteScroller"
import { MultiplePage } from "./pages/Multiple"
import { OnScrollApiTabIndexPage } from "./pages/OnScrollApiTabIndex"
import { OverscanPage } from "./pages/Overscan"
import { PercentagesPage } from "./pages/Percentages"
import { Playground } from "./pages/Playground"
import { SizingPage } from "./pages/Sizing"
import { StickyDisablePage } from "./pages/StickyDisabled"
import { css } from "./theme/theme"

const app = css({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  height: "100%",
  width: "100%",
  backgroundColor: "$appBg",
  color: "$textPrimary",
})

// TODO: Improve Grid Cell props
// TODO: Add infinite scrolling both ways
// TODO: Add playwright testing
// TODO: Add scroll offset maximum values

export const App = () => {
  return (
    <div className={app()}>
      <Navbar />
      <NestedRoutes base="/playground">
        <Playground />
      </NestedRoutes>
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
      <NestedRoutes base="/custom-styling">
        <CustomStylingPage />
      </NestedRoutes>
      <NestedRoutes base="/onscroll-api-tab-index">
        <OnScrollApiTabIndexPage />
      </NestedRoutes>
      <NestedRoutes base="/sticky-disabled">
        <StickyDisablePage />
      </NestedRoutes>
      <NestedRoutes base="/percentage">
        <PercentagesPage />
      </NestedRoutes>
      <NestedRoutes base="/infinite-scrolling">
        <InfiniteScrollPage />
      </NestedRoutes>
    </div>
  )
}
