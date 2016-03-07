import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { contextDef, MarkdownContext } from "./index";

export function Document(node: ast.Document, { renderMarkdown }: MarkdownContext) {
  const { children } = node;
  return <article className="markdown">{renderMarkdown(children)}</article>
};

Object.assign(Document, contextDef);