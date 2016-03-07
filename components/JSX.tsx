import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { contextDef, MarkdownContext } from "./index";

export function JSX(node: ast.JSX, { components, renderMarkdown }: MarkdownContext) {
  const { name, attrs, sections } = node;

  const Component: any = components[name];

  if(Component === undefined) {
    return <span>Unknown component: {name}</span>;
  }

  const props = {
    content: {
      sections,
      renderMarkdown,
    }
  };

  return <Component {...props} {...attrs}/>;
}

Object.assign(JSX, contextDef);