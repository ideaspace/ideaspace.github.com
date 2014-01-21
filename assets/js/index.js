define("index",["highlight"],function (require, exports, module) {

    var hljs = require("highlight");

    hljs.tabReplace = '<span class="indent">\t</span>';
    hljs.initHighlightingOnLoad();
});