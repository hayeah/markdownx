import * as React from "react";

import {configureDefaultComponents} from "./defaultComponents";

import * as ast from "markdownx-ast/ast";


function UnknownComponent(node: ast.Node) {
  return (
    <span>Unknown component: {node.type}</span>
  );
};

interface RendererOptions {
  components: ComponentsMap,
}

export type ComponentsMap = any;

export type RenderChildrenFunction = (children: ast.Children) => (JSX.Element | string)[];

export function configureRender(components: ComponentsMap = {}) {
  let defaultComponents = configureDefaultComponents(renderChildren);
  components = Object.assign({}, defaultComponents, components)

  function findComponent(node: ast.Node) {
    let type = node.type;
    let Component = components[type];

    if (Component == null) {
      // try uppercase name...
      let upperCaseName = type[0].toUpperCase() + type.slice(1);
      Component = components[upperCaseName];
    }

    if (Component == null) {
      Component = UnknownComponent
    }

    return Component;
  }

  function render(node: ast.Node) {
    let Component = findComponent(node);
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
        let Component = findComponent(node);

        if (ast.isIdNode(node)) {
          key = unique(node.id);
        } else {
          key = unique(i.toString());
        }
        return <Component key={key} {...node}/>
      }
    })
  }

  return {
    render,
    renderChildren,
  };
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

