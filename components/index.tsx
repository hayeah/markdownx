import * as React from "react";
import * as ast from "markdownx-ast/ast";
import { ComponentsMap } from "../index";

export const contextDef = {
  contextTypes: {
    renderMarkdown: React.PropTypes.func,
    components: React.PropTypes.object,
  }
};

export interface MarkdownContext {
  renderMarkdown: Function;
  components: ComponentsMap;
}

import { Unknown } from "./Unknown";
import { Document } from "./Document";
import { Section } from "./Section";

// blocks
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { List, ListItem } from "./List";
import { Code } from "./Code";
import { BlockQuote } from "./BlockQuote";

// html
import { JSX } from "./JSX";
import { HTML } from "./HTML";

// inline
import { Newline } from "./Newline";
import { Link } from "./Link";
import { Image } from "./Image";
import { Strong } from "./Strong";
import { InlineCode } from "./InlineCode";
import { Emphasis } from "./Emphasis";

export const defaultComponents: ComponentsMap = {
  document: Document,
  section: Section,
  paragraph: Paragraph,
  heading: Heading,
  list: List,
  "list-item": ListItem,
  jsx: JSX,
  html: HTML,
  unknown: Unknown,
  code: Code,
  newline: Newline,
  link: Link,
  image: Image,
  strong: Strong,
  "inline-code": InlineCode,
  emphasis: Emphasis,
  blockquote: BlockQuote,
};
