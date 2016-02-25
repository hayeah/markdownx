import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function Emphasis(node: ast.Emphasis) {
  const { text } = node;
  return <em>{text}</em>
}
