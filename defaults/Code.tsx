import * as React from "react";
import { RenderChildrenFunction } from "../index";
import * as ast from "markdownx-ast/ast";

export default function make(renderChildren: RenderChildrenFunction) {
  class Code extends React.Component<ast.Code, {}> {
    // componentDidMount() {
    //   this.highlight();
    // }
    // componentDidUpdate() {
    //   this.highlight();
    // },
    // highlight() {
    //   const { text } = this.props;
    //   const { $code } = this.refs;

    //   hljs.highlightBlock($code);
    // }

    render() {
      const { text, lang } = this.props;

      return (
        <pre>
          <code ref="$code" className={lang}>
            {text}
          </code>
        </pre>
      );
    }
  }

  return Code;
}

