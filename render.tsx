import * as React from "react";

import {
  ComponentsMap,
} from "./index";

import * as ast from "markdownx-ast/ast";

interface RendererOptions {
  components: ComponentsMap,
}

import { defaultComponents } from "./components";

export function configureRender(customComponents: ComponentsMap = {}) {
  const components = Object.assign({}, defaultComponents, customComponents);

  class RenderContext extends React.Component<any, any> {
    static childContextTypes = {
      renderMarkdown: React.PropTypes.func,
      components: React.PropTypes.object,
    };

    getChildContext() {
      return {
        renderMarkdown,
        components,
      }
    };

    render() {
      return this.props.children;
    };
  }

  return render;

  function render(content: ast.Node | ast.Children) {
    return (
      <RenderContext>
        {renderMarkdown(content)}
      </RenderContext>
    );
  }

  function renderMarkdown(node: ast.Node | ast.Children): any {
    if(typeof node === "string") {
      return node;
    } else if(node.constructor === Array) {
      return renderChildren(node as ast.Children);
    } else {
      const type = (node as ast.Node).type;
      const Component: any = findComponent(type);
      return <Component {...node}/>
    }
  }

  function renderChildren(children: ast.Children) {
    let i = 0;
    let unique = makeEnsureUnique();

    return children.map(node => {
      let key: string;
      if (typeof node === "string") {
        return node;
      } else {
        const Component: any = findComponent(node.type);

        if (ast.isIdNode(node)) {
          key = unique(node.id);
        } else {
          key = unique(i.toString());
        }
        return <Component key={key} {...node}/>
      }
    })
  }

  function findComponent(type: string) {
    return components[type] || components["unknown"];
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

