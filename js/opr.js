var opr_cur = $('.current');
function opr_next(){
    var slide = opr_cur;
    var next = slide.next('.page');
    if( next != slide ){
        slide.addClass('animateout');
        slide.removeClass('current');
        next.addClass('current');
        slide.slideUp(function() {
            slide.removeClass('animateout');
            slide.show();
        });
        opr_cur = next;
    }
}
function opr_prev(){
    var slide = opr_cur;
    var prev = slide.prev('.page');
    if( prev != slide ){

    }
}

$('.next').click( function(){
    opr_next();
});

$(document).keydown(function(e) {
    switch(e.which) {
        case 38: // up
            opr_prev();
            break;
        case 40: // down
            opr_next();
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
