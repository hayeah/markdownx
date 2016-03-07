import * as React from "react";
import * as ast from "markdownx-ast/ast";

import { contextDef, MarkdownContext } from "./index";

export function Section(props: ast.Section, { renderMarkdown }: MarkdownContext) {
  let {id, children} = props;

  return (
    <section id={id}>
      {renderMarkdown(children) }
    </section>
  );
}

Object.assign(Section, contextDef);