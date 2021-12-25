import useThemeContext from "@theme/hooks/useThemeContext"

import { List } from "@resembli/le-window"

export const WindowExample = () => {
  const listItems = Array(10_000)
    .fill(0)
    .map((_, i) => ({ props: { index: i } }))

  const RenderIndexCentered = (p: { index: number }) => {
    const { isDarkTheme } = useThemeContext()
    const evenColor = isDarkTheme ? "#6b6b61" : "#cfcfc7"
    const oddColor = isDarkTheme ? "gray" : "white"

    return (
      <div
        style={{
          height: "100%",
          background: p.index % 2 === 0 ? evenColor : oddColor,
          display: "flex",
          color: isDarkTheme ? "white" : "black",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => console.log("I was clicked")}
      >
        {p.index}
      </div>
    )
  }

  return (
    <div style={{ width: "100%", height: "30vh", minHeight: 500, border: "1px solid black" }}>
      <List defaultRowHeight={35} data={listItems} ItemComponent={RenderIndexCentered} />
    </div>
  )
}
