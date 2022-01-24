import { css } from "@stitches/core"
import { Route, Switch } from "wouter"

import { Grid } from "./components/Grid"
import { List } from "./components/List"
import { ListHorizontal } from "./components/ListHorizontal"
import { Sidebar } from "./components/Sidebar"

const app = css({
  display: "grid",
  gridTemplateColumns: "200px auto",
  height: "100%",
})

const listContainer = css({
  width: 800,
  height: 800,
  border: "1px solid black",
})

const gridSpace = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

export const App = () => {
  return (
    <div className={app()}>
      <Sidebar />
      <div className={gridSpace()}>
        <div className={listContainer()}>
          <Switch>
            <Route path="/list-component">
              <List />
            </Route>
            <Route path="/grid-component">
              <Grid />
            </Route>
            <Route path="/list-horizontal-component">
              <ListHorizontal />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}
