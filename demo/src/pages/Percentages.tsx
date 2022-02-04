import { percentageSizeGrids } from "../components/Examples/GridExamples"
import { percentageHList } from "../components/Examples/HorizontalListExamples"
import { percentageList } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const PercentagesPage = () => {
  const grid = percentageSizeGrids
  const hlist = percentageHList
  const list = percentageList

  return <Layout routes={{ grid, hlist, list }} />
}
