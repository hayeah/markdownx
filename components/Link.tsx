import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function Link(node: ast.Link) {
  const { href, caption } = node;
  return <a href={href}>{caption}</a>
}

