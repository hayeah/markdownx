import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function HTML(node: ast.HTML) {
  const { text, inline } = node;
  const tagName = inline ? "span" : "div";

  return React.createElement(tagName, {dangerouslySetInnerHTML: {__html: text}});
}

