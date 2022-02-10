import { basicGrids } from "../components/Examples/GridExamples"
import { basicHLists } from "../components/Examples/HorizontalListExamples"
import { basicLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const BasicPage = () => {
  const grid = basicGrids
  const hlist = basicHLists
  const list = basicLists

  return <Layout routes={{ grid, hlist, list }} />
}
