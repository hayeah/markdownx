import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function Unknown(node: ast.Node) {
  return (
    <span>Unknown component: {node.type}</span>
  );
};
