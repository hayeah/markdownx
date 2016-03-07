import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function Image(node: ast.Image) {
  const { href, caption } = node;
  return <img src={href} alt={caption}/>
}
