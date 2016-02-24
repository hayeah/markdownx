import * as React from "react";
import * as ast from "markdownx-ast/ast";

import {
  RenderChildrenFunction,
  ComponentsMap,
  Component,
} from "./index";

import makeCode from "./defaults/Code";


const headerLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

export function configureDefaultComponents(renderChildren: RenderChildrenFunction, customComponents: ComponentsMap) {
  const defaultComponents: ComponentsMap = {
    section: Section,
    heading: Heading,
    paragraph: Paragraph,
    document: Document,
    list: List,
    "list-item": ListItem,
    code: makeCode(renderChildren),

    jsx: JSX,
    unknown: UnknownComponent,
  };

  const components: ComponentsMap = Object.assign({}, defaultComponents, customComponents);

  return findComponent;

  function findComponent(node: ast.Node): Component {
    const type = node.type;

    let Component = components[type];

    if (Component == null) {
      Component = components["unknown"] || UnknownComponent;
    }

    return Component;
  }

  function Document(node: ast.Document) {
    const {children} = node;
    return <article>{renderChildren(children)}</article>
  };

  function Section(props: ast.Section) {
    let {id, children} = props;

    return (
      <section id={id}>
        {renderChildren(children) }
      </section>
    );
  }

  function Heading(props: ast.Heading) {
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

  function Paragraph(node: ast.Paragraph) {
    const {children} = node;
    return <p>{renderChildren(children)}</p>
  }

  function UnknownComponent(node: ast.Node) {
    return (
      <span>Unknown component: {node.type}</span>
    );
  };

  function JSX(node: ast.JSX) {
    const { name, attrs, sections } = node;

    const Component: any = components[name];

    if(Component === undefined) {
      return <span>Unknown component: {name}</span>;
    }

    let children = null;
    if(sections) {
      children = renderChildren(sections);
    }

    return <Component {...attrs}>{children}</Component>;
  }

  function ListItem(node:ast.ListItem) {
    const { children } = node;
    return <li>{renderChildren(children)}</li>;
  }

  function List(node: ast.List) {
    const {items, ordered} = node;
    const tag = ordered ? "ol" : "ul";
    const renderedItems = renderChildren(items);

    return React.createElement(tag, null, renderedItems);
  }



}





// export configureDefaultComponents;