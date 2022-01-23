import { globalStyle } from "@vanilla-extract/css"

globalStyle("html", {
  width: "100%",
  height: "100%",
  display: "table",
})

globalStyle("body", {
  width: "100%",
  display: "table-cell",
  background: "beige",
})

globalStyle("html, body", {
  margin: 0,
  padding: 0,
})

globalStyle("#root", {
  height: "100%",
})
