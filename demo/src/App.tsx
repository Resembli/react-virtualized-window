import { Redirect, Route, Switch } from "wouter"

import { BasicGrid } from "./components/Grids/BasicGrid"
import { BasicRTLGrid } from "./components/Grids/BasicRTLGrid"
import { GridWithGap } from "./components/Grids/GridWithGap"
import { GridWithGapRTL } from "./components/Grids/GridWithGapRTL"
import { BasicHorizontalList } from "./components/HorizontalLists/BasicHorizontalList"
import { BasicHorizontalListRTL } from "./components/HorizontalLists/BasicHorizontalListRTL"
import { BasicHorizontalListWithGap } from "./components/HorizontalLists/HorizontalListWithGap"
import { BasicHorizontalListWithGapRTL } from "./components/HorizontalLists/HorizontalListWithGapRTL"
import { Link } from "./components/Link"
import { BasicList } from "./components/Lists/BasicList"
import { BasicListRTL } from "./components/Lists/BasicListRTL"
import { BasicListWithGap } from "./components/Lists/BasicListWithGap"
import { BasicListWithGapRTL } from "./components/Lists/BasicListWithGapRTL"
import { Navbar } from "./components/Navbar"
import { SideNav } from "./components/SideNav"
import { css } from "./theme/theme"

const app = css({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "auto 1fr",
  height: "100%",
  backgroundColor: "$appBg",

  color: "$textPrimary",
})

const appClass = app()

interface RouteItem {
  label: string
  path: string
  Component: () => JSX.Element
}

// TODO:
// - Gap does not work properly with RTL
// - Add index for the currently rendered item

export const App = () => {
  const routes: RouteItem[] = [
    { label: "Basic List", path: "/basic-list", Component: BasicList },
    { label: "Basic List RTL", path: "/basic-list-rtl", Component: BasicListRTL },
    { label: "Basic List with Gap", path: "/basic-list-gap", Component: BasicListWithGap },
    {
      label: "Basic List with Gap RTL",
      path: "/basic-list-gap-rtl",
      Component: BasicListWithGapRTL,
    },

    { label: "Horizontal List", path: "/horizontal-list", Component: BasicHorizontalList },
    {
      label: "Horizontal List RTL",
      path: "/horizontal-list-rtl",
      Component: BasicHorizontalListRTL,
    },
    {
      label: "Horizontal List with Gap",
      path: "/horizontal-list-gap",
      Component: BasicHorizontalListWithGap,
    },
    {
      label: "Horizontal List with Gap RTL",
      path: "/horizontal-list-gap-rtl",
      Component: BasicHorizontalListWithGapRTL,
    },

    { label: "Basic Grid", path: "/basic-grid", Component: BasicGrid },
    { label: "Basic RTL Grid", path: "/basic-rtl-grid", Component: BasicRTLGrid },
    { label: "Grid with Gap", path: "/grid-with-gap", Component: GridWithGap },
    { label: "Grid with Gap RTL", path: "/grid-with-gap-rlt", Component: GridWithGapRTL },

    // TODO: adding the following examples for each component
    // - Variable examples (with rtl variant)
    // - Basic Gap example (with rtl variant)
    // - Variable with Gap (with rtl variant)
    // - Differing gap for (variable, fixed, and rtl)
    // - More than a single virtual window on the same page
    // - resize changing
    // - Custom styling and class name
    // - Onscroll user event handler
    // - tab index handling
    // - api ref handling
    // - infinite scrolling example
    // - auto complete example
    // - grid search scroll to
    // - masonry component
  ]

  return (
    <div className={appClass}>
      <Navbar css={{ gridColumn: "1 / span 2" }} />
      <SideNav>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </SideNav>
      <div style={{ margin: 20 }}>
        <Route path="/">
          <Redirect to={routes[0].path} />
        </Route>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path}>
              <route.Component />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  )
}
