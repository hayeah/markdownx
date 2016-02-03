import * as React from "react";

import {parse as parseMarkdown} from "markdown-ast/parser";

import {configureDefaultComponents} from "./defaultComponents";

import * as ast from "markdown-ast/ast";

function Document(props) {
  return (
    <article>
      a markdown document
    </article>
  );
}

interface RendererOptions {
  components: ComponentsMap,
}

type ComponentsMap = any;

export type RenderFunction = (children: ast.Children) => (JSX.Element | string)[];

export function parse(src: string): ast.Document {
  return parseMarkdown(src);
}

export function configureRender(components: ComponentsMap = {}): RenderFunction {

  let defaultComponents = configureDefaultComponents(render);
  components = Object.assign({},defaultComponents,components)

  function findComponent(type:string) {
    let Component = components[type];

    if(Component == null) {
      // try uppercase name...
      let upperCaseName = type[0].toUpperCase() + type.slice(1);
      Component = components[upperCaseName];
    }

    return Component;
  }

  function render(children: ast.Children) {
    let i = 0;
    let unique = makeEnsureUnique();

    return children.map(node => {
      let key: string;
      if(typeof node === "string") {
        return node;
      } else {
        let Component = findComponent(node.type);

        if(Component == null) {
          let warning = `Unknown component: ${node.type}`;
          console.log(warning);
          return warning;
        }

        if(ast.isIdNode(node)) {
          key = unique(node.id);
        } else {
          key = unique(i.toString());
        }
        return <Component key={key} {...node}/>
      }
    })
  }

  return render;
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