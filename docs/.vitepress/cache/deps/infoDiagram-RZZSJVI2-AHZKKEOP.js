import {
  parse
} from "./chunk-3G7RUOIQ.js";
import "./chunk-BWVADY25.js";
import "./chunk-ZBKXGXK3.js";
import "./chunk-N3BKFZLO.js";
import "./chunk-ZX5LFVQ3.js";
import "./chunk-VO7ONFFH.js";
import "./chunk-4QA6KPIQ.js";
import {
  version
} from "./chunk-YDZ2DSFV.js";
import {
  selectSvgElement
} from "./chunk-LQDV4XHW.js";
import "./chunk-NIGVPFNL.js";
import {
  __name,
  configureSvgSize,
  log
} from "./chunk-L6MA6KHE.js";
import "./chunk-2VRVB2MD.js";
import "./chunk-4UTD2NOI.js";
import "./chunk-VDEZMSJ4.js";
import "./chunk-ZR7N7HH5.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-RZZSJVI2.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = { version };
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version2) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version2}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-RZZSJVI2-AHZKKEOP.js.map
