import * as React from "react";
import * as ast from "markdownx-ast/ast";

export function Code(node: ast.Code) {
  const { text, lang } = node;

  return (
    <pre>
      <code className={lang}>
        {text}
      </code>
    </pre>
  );
}
