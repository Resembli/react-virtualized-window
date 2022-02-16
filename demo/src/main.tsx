import { globalCss } from "@stitches/core"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./App"

const globalStyles = globalCss({
  "html, body": { height: "100%", margin: 0, padding: 0 },
  "#root": { height: "100%", minHeight: "100%" },
})

globalStyles()

const container = document.getElementById("root")

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
