import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { contextDef, MarkdownContext } from "./index";

export function List(node: ast.List, { renderMarkdown }: MarkdownContext) {
  const {items, ordered} = node;
  const tag = ordered ? "ol" : "ul";
  const renderedItems = renderMarkdown(items);

  return React.createElement(tag, null, renderedItems);
}

Object.assign(List, contextDef);

export function ListItem(node:ast.ListItem, { renderMarkdown }: MarkdownContext) {
  const { children } = node;
  return <li>{renderMarkdown(children)}</li>;
}

Object.assign(ListItem, contextDef);

