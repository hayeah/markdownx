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

import { Document } from "./Document";
import { Section } from "./Section";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { JSX } from "./JSX";
import { List, ListItem } from "./List";
import { Code } from "./Code";
import { Unknown } from "./Unknown";

export const defaultComponents: ComponentsMap = {
  document: Document,
  section: Section,
  paragraph: Paragraph,
  heading: Heading,
  list: List,
  "list-item": ListItem,
  jsx: JSX,
  unknown: Unknown,
  code: Code,
};
