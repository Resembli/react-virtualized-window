import { globalCss } from "@stitches/core"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./App"

const globalStyles = globalCss({
  html: { width: "100%", height: "100%", display: "table" },
  body: { width: "100%", display: "table-cell" },
  "html, body": { margin: 0, padding: 0 },
  "#root": { height: "100%" },
})

globalStyles()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)
