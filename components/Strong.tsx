import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function Strong(node: ast.Strong) {
  const { text } = node;
  return <strong>{text}</strong>
}
