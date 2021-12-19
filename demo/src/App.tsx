import { Window } from "@resembli/le-window"

const listItems = Array(1000)
  .fill(0)
  .map((_, i) => i)

export const App = () => {
  return <Window width={800} height={800} rowHeight={20} data={listItems} />
}
