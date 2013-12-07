define("app/menu",["jquery", "mod/jquery/plugin/easing"],function(require, exports, module){
    var $ = require("jquery");
    function anchorJump(e) {
        var $body       = $('html, body'),
            $item       = $(this),
            $menu       = $item.closest('ul'),
            $anchor     = $menu.find('a'),
            $waypoints  = $('.section'),
            $sect       = $waypoints.eq( $anchor.index($item) ),
            offset      = $sect.offset().top - 110;

        e.preventDefault();
        $body.stop()
            .one('scroll', function(){
                $body.stop();
            })
            .animate({
                scrollTop: offset
            }, 500, "swing" )
            .promise()
            .done(function(){
                $menu.find('.active').removeClass('active');
                $item.addClass('active');
            })
    }
    module.exports = anchorJump;
})