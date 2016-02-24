import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { contextDef, MarkdownContext } from "./index";

export function Paragraph(node: ast.Paragraph, { renderMarkdown }: MarkdownContext) {
    const {children} = node;
    return <p>{renderMarkdown(children)}</p>
  }

Object.assign(Paragraph, contextDef);
