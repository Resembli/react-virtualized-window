import { Redirect, Route, Switch } from "wouter"

import { BasicGrid, BasicRTLGrid, GridWithGap, GridWithGapRTL } from "./components/Grids/BasicGrid"
import {
  BasicHorizontalList,
  BasicHorizontalListRTL,
  BasicHorizontalListWithGap,
  BasicHorizontalListWithGapRTL,
} from "./components/HorizontalLists/BasicHorizontalList"
import { Link } from "./components/Link"
import {
  BasicList,
  BasicListRTL,
  BasicListWithGap,
  BasicListWithGapRTL,
} from "./components/Lists/BasicList"
import {
  VariableList,
  VariableListGap,
  VariableListGapRTL,
  VariableListRTL,
} from "./components/Lists/VariableList"
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

export const App = () => {
  const listRoutes: RouteItem[] = [
    { label: "Basic", path: "/list", Component: BasicList },
    { label: "RTL", path: "/list-rtl", Component: BasicListRTL },
    { label: "With Gap", path: "/list-gap", Component: BasicListWithGap },
    {
      label: "With Gap and RTL",
      path: "/list-gap-rtl",
      Component: BasicListWithGapRTL,
    },
    { label: "Variable Height", path: "/variable-list", Component: VariableList },
    { label: "Variable Height RTL", path: "/variable-list-rtl", Component: VariableListRTL },
    { label: "Variable Height Gap", path: "/variable-list-gap", Component: VariableListGap },
    {
      label: "Variable Height Gap RTL",
      path: "/variable-list-gap-rtl",
      Component: VariableListGapRTL,
    },
  ]

  const listHorizontalRoutes: RouteItem[] = [
    { label: "List", path: "/horizontal-list", Component: BasicHorizontalList },
    {
      label: "List RTL",
      path: "/horizontal-list-rtl",
      Component: BasicHorizontalListRTL,
    },
    {
      label: "List with Gap",
      path: "/horizontal-list-gap",
      Component: BasicHorizontalListWithGap,
    },
    {
      label: "List with Gap RTL",
      path: "/horizontal-list-gap-rtl",
      Component: BasicHorizontalListWithGapRTL,
    },
  ]

  const gridRoutes: RouteItem[] = [
    { label: "Grid", path: "/grid", Component: BasicGrid },
    { label: "RTL Grid", path: "/rtl-grid", Component: BasicRTLGrid },
    { label: "Grid with Gap", path: "/grid-with-gap", Component: GridWithGap },
    { label: "Grid with Gap RTL", path: "/grid-with-gap-rlt", Component: GridWithGapRTL },

    // TODO: adding the following examples for each component
    // - Variable examples (with rtl variant)
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
        <h3 style={{ textAlign: "center" }}>List</h3>
        <ul>
          {listRoutes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
        <h3 style={{ textAlign: "center" }}>Horizontal List</h3>
        <ul>
          {listHorizontalRoutes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
        <h3 style={{ textAlign: "center" }}>Grid</h3>
        <ul>
          {gridRoutes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </SideNav>
      <div style={{ margin: 20 }}>
        <Route path="/">
          <Redirect to={listRoutes[0].path} />
        </Route>
        <Switch>
          {[...listRoutes, ...listHorizontalRoutes, ...gridRoutes].map((route) => (
            <Route key={route.path} path={route.path}>
              <route.Component />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  )
}
