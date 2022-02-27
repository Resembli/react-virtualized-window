import { css } from "@stitches/core"
import { useMemo } from "react"

import { Table, Tbody, useVirtualTable } from "@resembli/virtual-table"

const AppCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  background: "Beige",
})

const names = ["Lee", "Bob", "Aya", "Sam"]

const generateData = () => {
  return Array.from({ length: 1000 }, (_, i) => {
    const wins = Math.ceil(Math.random() * 20)
    const draws = Math.ceil(Math.random() * 20)
    const losses = Math.ceil(Math.random() * 20)
    const total = wins + losses + draws

    return [i, names[i % 4], wins, draws, losses, total]
  })
}

function App() {
  const data = useMemo(() => generateData(), [])

  const { tableProps, bodyProps } = useVirtualTable({ rowData: data, defaultHeight: 20 })

  return (
    <div className={AppCss()}>
      <Table
        style={{
          backgroundColor: "aliceblue",
          height: 500,
          maxHeight: 500,
        }}
        {...tableProps}
      >
        <thead>
          <tr>
            <th style={{ width: 100 }}>#</th>
            <th style={{ width: 100 }}>Name</th>
            <th style={{ width: 100 }}>Wins</th>
            <th style={{ width: 100 }}>Draws</th>
            <th style={{ width: 100 }}>Losses</th>
            <th style={{ width: 100 }}>Total</th>
          </tr>
        </thead>
        <Tbody {...bodyProps}>
          {({ data: row, style }) => {
            return (
              <tr style={style}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
              </tr>
            )
          }}
        </Tbody>
      </Table>
    </div>
  )
}

export default App
