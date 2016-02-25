import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { contextDef, MarkdownContext } from "./index";

export function BlockQuote(node: ast.BlockQuote, { renderMarkdown }: MarkdownContext) {
  const { children } = node;
  return <blockquote>{renderMarkdown(children)}</blockquote>
}

Object.assign(BlockQuote, contextDef);
