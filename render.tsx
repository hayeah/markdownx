import * as React from "react";

import {
  ComponentsMap,
  configureDefaultComponents
} from "./defaultComponents";

import * as ast from "markdownx-ast/ast";

interface RendererOptions {
  components: ComponentsMap,
}

export function configureRender(components: ComponentsMap = {}) {
  const findComponent = configureDefaultComponents(renderChildren, components);

  return {
    render,
    renderChildren,
  };

  function render(node: ast.Node) {
    const Component: any = findComponent(node);
    return <Component {...node}/>
  }

  function renderChildren(children: ast.Children) {
    let i = 0;
    let unique = makeEnsureUnique();

    return children.map(node => {
      let key: string;
      if (typeof node === "string") {
        return node;
      } else {
        const Component: any = findComponent(node);

        if (ast.isIdNode(node)) {
          key = unique(node.id);
        } else {
          key = unique(i.toString());
        }
        return <Component key={key} {...node}/>
      }
    })
  }
}

export function makeEnsureUnique() {
  let ids: { [key: string]: boolean } = {};
  return function ensureUnique(str: string): string {
    let id = str;
    let i = 1;
    while (true) {
      let tryId = id;
      if (i != 1) {
        tryId = `${tryId}_${i}`
      }

      if (ids[tryId] == null) {
        id = tryId;
        ids[id] = true;
        break;
      }

      i++;
    }

    return id;
  };
}

