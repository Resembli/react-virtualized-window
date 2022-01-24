import useThemeContext from "@theme/hooks/useThemeContext"

import { List } from "@resembli/react-virtualized-window"

const listData = Array(1000)
  .fill(0)
  .map((_, i) => ({ index: i }))

const heights = [50, 60, 100, 40]

const listHeights = Array(1000)
  .fill(0)
  .map((_, i) => heights[i % heights.length])

export const FixedSizeDocsExample = () => {
  const { isDarkTheme } = useThemeContext()

  return (
    <div style={{ height: 500, border: "1px solid black", marginBottom: "10px" }}>
      <List data={listData} defaultRowHeight={50}>
        {({ index }, style) => {
          const darkRow = isDarkTheme ? "black" : "grey"
          const lightRow = isDarkTheme ? "grey" : "white"

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: index % 2 ? darkRow : lightRow,
                color: isDarkTheme ? "white" : "black",
                ...style,
              }}
            >
              {index}
            </div>
          )
        }}
      </List>
    </div>
  )
}

export const VariableSizeDocsExample = () => {
  const { isDarkTheme } = useThemeContext()

  return (
    <div style={{ height: 500, border: "1px solid black", marginBottom: "10px" }}>
      <List data={listData} defaultRowHeight={50} rowHeights={listHeights}>
        {({ index }, style) => {
          const darkRow = isDarkTheme ? "black" : "grey"
          const lightRow = isDarkTheme ? "grey" : "white"

          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: index % 2 ? darkRow : lightRow,
                color: isDarkTheme ? "white" : "black",
                ...style,
              }}
            >
              {index}
            </div>
          )
        }}
      </List>
    </div>
  )
}
