import { stickyDisabledGrids } from "../components/Examples/GridExamples"
import { stickyDisabledHList } from "../components/Examples/HorizontalListExamples"
import { stickyDisabledList } from "../components/Examples/ListExamples"
import { Layout } from "../components/Layout"

export const StickyDisablePage = () => {
  const grid = stickyDisabledGrids
  const hlist = stickyDisabledHList
  const list = stickyDisabledList

  return <Layout routes={{ grid, hlist, list }} />
}
