import * as React from "react";
import * as ReactDOM from "react-dom/server";

import { parse } from "markdownx-ast/parser";
import * as ast from "markdownx-ast/ast";

import { configureRender} from "./render";

export type Component = React.ComponentClass<any> | React.StatelessComponent<any>;

export type ComponentsMap = { [key: string]: Component };

export type RenderChildrenFunction = (children: ast.Children) => (JSX.Element | string)[];

export interface CustomComponentProps {
  content: {
    sections: ast.Section[],
    renderMarkdown: Function,
  };
}

function parseMarkdown(src: string): ast.Document {
  const sections = parse(src);

  return {
    type: "document",
    children: sections,
  };
}

export function configureMarkdown(components: ComponentsMap) {
  const renderReact = configureRender(components);

  function renderReactMarkup(node: ast.Node) {
    return ReactDOM.renderToString(renderReact(node));
  }

  /*
  * Render markup string without React checksum.
  */
  function renderMarkup(node: ast.Node) {
    return ReactDOM.renderToStaticMarkup(renderReact(node));
  }



  return {
    renderMarkup,

    renderReact,
    renderReactMarkup,

    parse: parseMarkdown,
  }
}

export default configureMarkdown;