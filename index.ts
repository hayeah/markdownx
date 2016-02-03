import * as React from "react";
import {parse as parseMarkdown} from "markdown-ast/parser";
import * as ast from "markdown-ast/ast";

import {ComponentsMap,configureRender} from "./render";

interface RenderToStringOptions {
  mode?: "react" | "pretty"
}

const ReactDOM = require("react-dom/server");

import {prettyHTML} from "./formatHTML";

function parse(src: string): ast.Document {
  let sections = parseMarkdown(src);
  return {
    type: "document",
    children: sections,
  };
}

export function configure(components: ComponentsMap) {
  let {render, renderChildren} = configureRender(components);

  function renderToString(src: string, options: RenderToStringOptions = {}) {

    options = Object.assign({}, { mode: "pretty" }, options);

    let content = render(parse(src));
    let html = ReactDOM.renderToString(content);

    if (options.mode === "pretty") {
      html = prettyHTML(html);
    }

    return html;
  }

  return {
    render,
    renderChildren,
    renderToString,
    parse,
  }
}

export default configure;