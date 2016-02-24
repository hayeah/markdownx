import * as React from "react";
import * as ast from "markdownx-ast/ast";

export const defaultComponents = {
  document: Document,
  section: Section,
  paragraph: Paragraph,
  heading: Heading,
  list: List,
  "list-item": ListItem,
  jsx: JSX,
  unknown: UnknownComponent,
};

function Document(node: ast.Document, { renderMarkdown }) {
  const { children } = node;
  return <article>{renderMarkdown(children)}</article>
};

const contextDef = {
  contextTypes: {
    renderMarkdown: React.PropTypes.func,
    components: React.PropTypes.object,
  }
}

interface MarkdownRenderContext {
  renderMarkdown: Function;
  components: any;
}

Object.assign(Document, contextDef);

function Section(props: ast.Section, { renderMarkdown }: MarkdownRenderContext) {
  let {id, children} = props;

  return (
    <section id={id}>
      {renderMarkdown(children) }
    </section>
  );
}

Object.assign(Section, contextDef);

function Paragraph(node: ast.Paragraph, { renderMarkdown }) {
    const {children} = node;
    return <p>{renderMarkdown(children)}</p>
  }

Object.assign(Paragraph, contextDef);


const headerLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

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

function UnknownComponent(node: ast.Node) {
  return (
    <span>Unknown component: {node.type}</span>
  );
};



function JSX(node: ast.JSX, { components, renderMarkdown }) {
  const { name, attrs, sections } = node;

  const Component: any = components[name];

  if(Component === undefined) {
    return <span>Unknown component: {name}</span>;
  }

  let children = null;
  if(sections) {
    children = renderMarkdown(sections);
  }

  return <Component {...attrs}>{children}</Component>;
}

Object.assign(JSX, contextDef);

function ListItem(node:ast.ListItem, { components, renderMarkdown }) {
  const { children } = node;
  return <li>{renderMarkdown(children)}</li>;
}

Object.assign(ListItem, contextDef);

function List(node: ast.List, { components, renderMarkdown }) {
  const {items, ordered} = node;
  const tag = ordered ? "ol" : "ul";
  const renderedItems = renderMarkdown(items);

  return React.createElement(tag, null, renderedItems);
}

Object.assign(List, contextDef);