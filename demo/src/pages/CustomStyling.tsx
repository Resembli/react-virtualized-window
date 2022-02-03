import { stylingGrids } from "../components/Examples/GridExamples"
import { stylingHLists } from "../components/Examples/HorizontalListExamples"
import { stylingLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const CustomStylingPage = () => {
  const grid = stylingGrids
  const hlist = stylingHLists
  const list = stylingLists

  return <Layout routes={{ grid, hlist, list }} />
}
