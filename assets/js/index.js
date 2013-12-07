define("index", function(require, exports, module){

    var $ = require("jquery");


    require.async("prettyprint", function(){
        prettyPrint();
    });
})