import { Route } from "wouter"

import { Navbar } from "./components/Navbar"
import { NestedRoutes } from "./components/NestedRoutes"
import { Playground } from "./components/Playground"
import { BasicPage } from "./pages/Basic"
import { CustomStylingPage } from "./pages/CustomStyling"
import { GapPage } from "./pages/Gap"
import { InfiniteScrollPage } from "./pages/InfiniteScroller"
import { MultiplePage } from "./pages/Multiple"
import { OnScrollApiTabIndexPage } from "./pages/OnScrollApiTabIndex"
import { OverscanPage } from "./pages/Overscan"
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

// TODO:
//   - Add percentage examples

export const App = () => {
  return (
    <div className={app()}>
      <Navbar />
      <Route path="/">
        <Playground />
      </Route>
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
      <NestedRoutes base="/infinite-scrolling">
        <InfiniteScrollPage />
      </NestedRoutes>
    </div>
  )
}
