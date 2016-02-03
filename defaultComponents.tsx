import * as React from "react";
import * as ast from "markdown-ast/ast";

const headerLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

import {RenderChildrenFunction} from "./render";

export function configureDefaultComponents(renderChildren: RenderChildrenFunction) {
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
  };

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
  };



  return {
    Section,
    Heading,
    Paragraph,
    Document,
  }
}

// export configureDefaultComponents;