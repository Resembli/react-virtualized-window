import { gapGrids } from "../components/Examples/GridExamples"
import { gapHLists } from "../components/Examples/HorizontalListExamples"
import { gapLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const GapPage = () => {
  const grid = gapGrids
  const hlist = gapHLists
  const list = gapLists

  return <Layout routes={{ grid, hlist, list }} />
}
