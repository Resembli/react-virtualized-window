import { TreeNode, TreeRoot } from "@resembli/ui"

function App() {
  return (
    <div className="App">
      <div style={{ width: 500, height: 500, border: "1px solid black", margin: "200px auto" }}>
        <TreeRoot>
          <TreeNode item="Applications">
            <TreeNode item="Calendar" />
            <TreeNode item="Chrome" />
            <TreeNode item="WebStorm" />
          </TreeNode>
          <TreeNode item="Documents">
            <TreeNode item="OSS" />
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
