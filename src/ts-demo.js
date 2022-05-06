"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
function showTree(node, depth = 0) {
  let indent = "".padEnd(depth * 4, " ");
  console.log(indent + ts.SyntaxKind[node.kind]);
  if (node.getChildCount() === 0) {
    console.log(indent + "    Text: " + node.getText());
  }
  for (let child of node.getChildren()) {
    showTree(child, depth + 1);
  }
}
//# sourceMappingURL=ts-demo.js.map
