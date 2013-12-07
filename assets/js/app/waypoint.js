define("app/waypoint",["jquery","mod/jquery/plugin/waypoints"],function(require, exports, module) {

    var $           = require("jquery"),
        $menu       = $(".nav-list"),
        $item       = $menu.find('a'),
        $waypoints  = $('.section');

    var navH = $('.navbar').height();
    var segH = $('.segment').outerHeight();

    require("mod/jquery/plugin/waypoints");

    function wayPoint() {
        $menu.waypoint('sticky', {
            wrapper: '<div class="sticky-wrapper" />',
            stuckClass: 'stuck',
            offset: navH + segH
        });
        $.waypoints('refresh');

        $waypoints
            .waypoint({
                continuous : false,
                offset     : 100,
                handler    : function(direction) {
                    var
                        index = (direction == 'down')
                            ? $waypoints.index(this)
                            : ($waypoints.index(this) - 1 >= 0)
                            ? ($waypoints.index(this) - 1)
                            : 0
                        ;
                    $item
                        .removeClass('active')
                        .eq( index )
                        .addClass('active')
                    ;
                }
            })
        ;
        $('body')
            .waypoint({
                handler: function(direction) {
                    if(direction == 'down') {
                        if( !$('body').is(':animated') ) {
                            $item
                                .removeClass('active')
                                .eq( $item.size() - 1 )
                                .addClass('active')
                            ;
                        }
                    }
                },
                offset: 'bottom-in-view'
            })
        ;
    }
    module.exports = wayPoint;
})