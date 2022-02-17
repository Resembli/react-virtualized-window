import { List } from "@resembli/react-virtualized-window"

import "./ChatChannel.css"
import { chatData } from "./chatData"

export function ChatChannel() {
  const sizes = chatData.map((d) => d.numberOfSentences * 30)

  const width = globalThis.innerWidth ?? 1280

  return (
    <List
      height={500}
      width={width < 550 ? "100%" : 500}
      data={chatData}
      defaultSize={100}
      sizes={sizes}
      gap={10}
      style={{ border: "1px solid grey" }}
    >
      {({ data, style }) => {
        const bubblePosition = data.isLeft ? "bubble-bottom-left" : "bubble-bottom-right"

        return (
          <div
            style={{
              display: "flex",
              justifyContent: data.isLeft ? "flex-start" : "flex-end",
              alignItems: "center",
              ...style,
            }}
          >
            <div className={`bubble ${bubblePosition}`}>{data.message}</div>
          </div>
        )
      }}
    </List>
  )
}
