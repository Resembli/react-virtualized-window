import { Layout } from "../components/Layout"
import { GridPlayground } from "../components/Playgrounds/GridPlayground"
import { HListPlayground } from "../components/Playgrounds/ListHorizontalPlayground"
import { ListPlayground } from "../components/Playgrounds/ListPlayground"

export const Playground = () => {
  return (
    <Layout
      routes={{
        grid: [{ label: "Grid Playground", path: "/grid", Component: GridPlayground }],
        hlist: [{ label: "H List Playground", path: "/h-list", Component: HListPlayground }],
        list: [{ label: "List Playground", path: "/list", Component: ListPlayground }],
      }}
    />
  )
}
