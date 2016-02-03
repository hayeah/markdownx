const cheerio = require("cheerio");
const pphtml = require("js-beautify").html;

export function cleanHTML(html: string): string {
  let $ = cheerio.load(html);

  $("*").removeAttr("data-reactid");
  $("*").removeAttr("data-react-checksum");

  return $.html();
}

export function prettyHTML(html: string): string {
  return pphtml(cleanHTML(html));
}