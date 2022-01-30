import { Redirect, Route, Switch } from "wouter"

import { BasicGrid } from "./components/Grids/BasicGrid"
import { BasicHorizontalList } from "./components/HorizontalLists/BasicHorizontalList"
import { Link } from "./components/Link"
import { BasicList } from "./components/Lists/BasicList"
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
  const routes: RouteItem[] = [
    { label: "Basic List", path: "/basic-list", Component: BasicList },
    { label: "Horizontal List", path: "/horizontal-list", Component: BasicHorizontalList },
    { label: "Basic Grid", path: "/basic-grid", Component: BasicGrid },
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
