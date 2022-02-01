import { Redirect, Route, Switch } from "wouter"

import { BasicGrid, BasicRTLGrid, GridWithGap, GridWithGapRTL } from "./components/Grids/BasicGrid"
import {
  VariableGrid,
  VariableGridWithGap,
  VariableGridWithGapRTL,
  VariableRTLGrid,
} from "./components/Grids/VariableGrid"
import {
  BasicHorizontalList,
  BasicHorizontalListRTL,
  BasicHorizontalListWithGap,
  BasicHorizontalListWithGapRTL,
} from "./components/HorizontalLists/BasicHorizontalList"
import {
  VariableHorizontalList,
  VariableHorizontalListRTL,
  VariableHorizontalListWithGap,
  VariableHorizontalListWithGapRTL,
} from "./components/HorizontalLists/VariableSizeLists"
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
    { label: "Basic", path: "/horizontal-list", Component: BasicHorizontalList },
    {
      label: "RTL",
      path: "/horizontal-list-rtl",
      Component: BasicHorizontalListRTL,
    },
    {
      label: "With Gap",
      path: "/horizontal-list-gap",
      Component: BasicHorizontalListWithGap,
    },
    {
      label: "With Gap RTL",
      path: "/horizontal-list-gap-rtl",
      Component: BasicHorizontalListWithGapRTL,
    },

    {
      label: "Variable Width ",
      path: "/variable-horizontal-list",
      Component: VariableHorizontalList,
    },
    {
      label: "Variable Width RTL",
      path: "/variable-horizontal-list-rtl",
      Component: VariableHorizontalListRTL,
    },
    {
      label: "Variable Width Gap",
      path: "/variable-horizontal-list-gap",
      Component: VariableHorizontalListWithGap,
    },
    {
      label: "Variable Width Gap RTL",
      path: "/variable-horizontal-list-gap-rtl",
      Component: VariableHorizontalListWithGapRTL,
    },
  ]

  const gridRoutes: RouteItem[] = [
    { label: "Grid", path: "/grid", Component: BasicGrid },
    { label: "RTL Grid", path: "/rtl-grid", Component: BasicRTLGrid },
    { label: "Grid with Gap", path: "/grid-with-gap", Component: GridWithGap },
    { label: "Grid with Gap RTL", path: "/grid-with-gap-rlt", Component: GridWithGapRTL },

    { label: "Variable Grid", path: "/variable-grid", Component: VariableGrid },
    { label: "Variable Grid RTL", path: "/variable-grid-rtl", Component: VariableRTLGrid },
    { label: "Variable Grid Gap", path: "/variable-grid-gap", Component: VariableGridWithGap },
    {
      label: "Variable Grid Gap RTL",
      path: "/variable-grid-gap-rtl",
      Component: VariableGridWithGapRTL,
    },

    // TODO: adding the following examples for each component
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
