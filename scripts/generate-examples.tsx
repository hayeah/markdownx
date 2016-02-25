import * as React from "react";

const glob = require("glob");
const beautify = require("js-beautify");

import * as os from "nolang/os";
import * as io from "nolang/io";

import * as path from "path";

import * as ast from "markdownx-ast/ast";

import { configureMarkdown, CustomComponentProps } from "../index";

const mdx = configureMarkdown({
  CustomContainer,
  CustomComponent,
  InlineCustomContainer,
});

function InlineCustomContainer(props: CustomComponentProps) {
  const { sections, renderMarkdown } = props.content;

  const paragraph = sections[0].children[0] as ast.Paragraph;

  return (
    <span data-props={JSON.stringify(props)} className="inline-custom-container">{renderMarkdown(paragraph.children)}</span>
  );
}


function CustomContainer(props: CustomComponentProps) {
  const { sections, renderMarkdown } = props.content;

  const content = sections[0].children;

  return (
    <div data-props={JSON.stringify(props)} className="custom-container">
      {renderMarkdown(content)}
    </div>
  );
}

function CustomComponent(props) {
  return (
    <div data-props={JSON.stringify(props)} className="custom-component">
      my custom component
    </div>
  );
}


main();

function exitIfError(err: Error) {
  if (err) {

    console.log(err);
    if(err.stack) {
      console.log(err.stack);
    }
    process.exit(1);
  }
}

async function getExampleFiles(): Promise<string[]> {
  let files = process.argv.slice(2);

  if (files.length > 0) {
    return files;
  }

  return new Promise<string[]>((resolve, reject) => {
    glob("./examples/*.md", (err, files: string[]) => {
      if(err) {
        reject(err);
        return;
      }

      resolve(files);
    });
  });
}

async function main() {
  try {
    let files = await getExampleFiles();
    console.log("generate test output for", files);
    files.forEach(generateOutputForExample);
  } catch(err) {
    exitIfError(err);
  }
}

async function generateOutputForExample(file: string) {
  var [r, err] = await os.Open(file);
  exitIfError(err);

  var [src, err] = await io.ReadFull(r);
  exitIfError(err);

  try {
    var output = mdx.renderMarkup(mdx.parse(src));
  } catch(err) {
    exitIfError(err);
  }


  var [w, err] = await os.Create(file + ".html");
  exitIfError(err);

  w.Write(beautify.html(output));

  var err = await w.Close();
  exitIfError(err);
}