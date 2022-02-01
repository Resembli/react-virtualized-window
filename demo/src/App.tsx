import { Redirect, Route, Switch } from "wouter"

import { gridRoutes } from "./components/GridExamples"
import { hListRoutes } from "./components/HorizontalListExamples"
import { Link } from "./components/Link"
import { listRoutes } from "./components/ListExamples"
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

export const App = () => {
  // TODO: adding the following examples for each component
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
          {hListRoutes.map((route) => (
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
          {[...listRoutes, ...hListRoutes, ...gridRoutes].map((route) => (
            <Route key={route.path} path={route.path}>
              <route.Component />
            </Route>
          ))}
        </Switch>
      </div>
    </div>
  )
}
