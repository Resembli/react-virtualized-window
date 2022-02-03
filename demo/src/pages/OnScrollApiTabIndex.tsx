import { onScrollApiTabIndexGrids } from "../components/Examples/GridExamples"
import { onScrollApiTabIndexHLists } from "../components/Examples/HorizontalListExamples"
import { onScrollApiTabIndexLists } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const OnScrollApiTabIndexPage = () => {
  const grid = onScrollApiTabIndexGrids
  const hlist = onScrollApiTabIndexHLists
  const list = onScrollApiTabIndexLists

  return <Layout routes={{ grid, hlist, list }} />
}
