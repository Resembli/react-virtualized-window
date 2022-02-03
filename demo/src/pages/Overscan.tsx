import { overscanGrids } from "../components/Examples/GridExamples"
import { overscanHLists } from "../components/Examples/HorizontalListExamples"
import { overscanLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const OverscanPage = () => {
  const grid = overscanGrids
  const hlist = overscanHLists
  const list = overscanLists

  return <Layout routes={{ grid, hlist, list }} />
}
