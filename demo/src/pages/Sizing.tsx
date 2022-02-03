import { sizingGrids } from "../components/Examples/GridExamples"
import { sizingHLists } from "../components/Examples/HorizontalListExamples"
import { sizingLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const SizingPage = () => {
  const grid = sizingGrids
  const hlist = sizingHLists
  const list = sizingLists

  return <Layout routes={{ grid, hlist, list }} />
}
