import { infiniteScrollGrids } from "../components/Examples/GridExamples"
import { infiniteScrollHLists } from "../components/Examples/HorizontalListExamples"
import { infiniteScrollLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const InfiniteScrollPage = () => {
  const grid = infiniteScrollGrids
  const hlist = infiniteScrollHLists
  const list = infiniteScrollLists

  return <Layout routes={{ grid, hlist, list }} />
}
