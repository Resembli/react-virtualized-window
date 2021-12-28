import { List } from "@resembli/le-window"

export const FixedSizeListExample = () => {
  return <List data={[]} ItemComponent={() => <div>Lee</div>} defaultRowHeight={50} />
}
