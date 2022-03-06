import { css } from "@stitches/core"

import { TreeNode, TreeRoot } from "@resembli/ui"

const AppCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  background: "Beige",
})

function App() {
  return (
    <div className={AppCss()}>
      <div style={{ height: 500, width: 500, border: "1px solid black" }}>
        <TreeRoot>
          <TreeNode item={<div>Applications</div>}>
            <TreeNode item="Calendar" />
            <TreeNode item="Chrome" />
            <TreeNode item="Webstorm" />
          </TreeNode>
          <TreeNode item={<div>Documents</div>}>
            <TreeNode item="UI">
              <TreeNode item="src">
                <TreeNode item="index.js" />
                <TreeNode item="tree-view.js" />
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </TreeRoot>
      </div>
    </div>
  )
}

export default App
