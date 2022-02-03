import { multipleGrids } from "../components/Examples/GridExamples"
import { multipleHLists } from "../components/Examples/HorizontalListExamples"
import { multipleLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const MultiplePage = () => {
  const grid = multipleGrids
  const hlist = multipleHLists
  const list = multipleLists

  return <Layout routes={{ grid, hlist, list }} />
}
