import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { contextDef, MarkdownContext } from "./index";


const headerLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

export function Heading(props: ast.Heading) {
  let {depth, text, id} = props;
  let tag = headerLevels[depth - 1];
  let headerProps = id ? { id } : {};

  let body = (
    <a href={"#" + id}>
      {text}
    </a>
  );
  return React.createElement(tag, headerProps, body);
}
