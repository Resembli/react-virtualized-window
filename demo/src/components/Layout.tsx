import { Route, Switch } from "wouter"

import { css } from "../theme/theme"
import type { RouteItem } from "../types"
import { Link } from "./Link"
import { SideNav } from "./SideNav"

const layoutCss = css({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  height: "100%",
  backgroundColor: "$appBg",

  color: "$textPrimary",
})

const appClass = layoutCss()

interface LayoutProps {
  routes: { grid: RouteItem[]; list: RouteItem[]; hlist: RouteItem[] }
}

export const Layout = ({ routes }: LayoutProps) => {
  const { grid, list, hlist } = routes

  return (
    <div className={appClass}>
      <SideNav>
        <h3 style={{ textAlign: "center" }}>List</h3>
        <ul>
          {list.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
        <h3 style={{ textAlign: "center" }}>Horizontal List</h3>
        <ul>
          {hlist.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
        <h3 style={{ textAlign: "center" }}>Grid</h3>
        <ul>
          {grid.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </SideNav>
      <div
        style={{
          margin: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch>
          {[...list, ...hlist, ...grid].map((route) => (
            <Route key={route.path} path={route.path}>
              <route.Component />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  )
}
