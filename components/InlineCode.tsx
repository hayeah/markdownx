import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function InlineCode(node: ast.InlineCode) {
  const { text } = node;
  return <code>{text}</code>
}
