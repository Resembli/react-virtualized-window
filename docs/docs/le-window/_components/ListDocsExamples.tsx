import useThemeContext from "@theme/hooks/useThemeContext"

import { List } from "@resembli/le-window"

const ListItem = ({ index }: { index: number }) => {
  const { isDarkTheme } = useThemeContext()

  const darkRow = isDarkTheme ? "black" : "grey"
  const lightRow = isDarkTheme ? "grey" : "white"

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: index % 2 ? darkRow : lightRow,
        color: isDarkTheme ? "white" : "black",
      }}
    >
      {index}
    </div>
  )
}

const listData = Array(1000)
  .fill(0)
  .map((_, i) => ({ index: i }))

const heights = [50, 60, 100, 40]

const listHeights = Array(1000)
  .fill(0)
  .map((_, i) => heights[i % heights.length])

export const FixedSizeDocsExample = () => {
  return (
    <div style={{ height: 500, border: "1px solid black" }}>
      <List ItemComponent={ListItem} data={listData} defaultRowHeight={50} />
    </div>
  )
}

export const VariableSizeDocsExample = () => {
  return (
    <div style={{ height: 500, border: "1px solid black" }}>
      <List
        ItemComponent={ListItem}
        data={listData}
        defaultRowHeight={50}
        rowHeights={listHeights}
      />
    </div>
  )
}
