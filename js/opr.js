( function($) {

    var oprCur = $('.opr-current'); // always stores the current active slide

    function opr_next() {
        var slide = oprCur;
        var next = slide.next('.opr-page');
        //TODO check if has next
        if (true) {
            slide.addClass('opr-animate'); // put slide in front (z-index :100)
            slide.removeClass('opr-current'); // remove current status from old slide
            next.addClass('opr-current'); // add current status to new slide
            slide.slideUp(function () {
                slide.removeClass('opr-animate');
                slide.show(); // make old slide visible again, as slideUp() adds display:none
            });
            oprCur = next; // set current slide
        }
    }
    function opr_prev() {
        var slide = oprCur;
        var prev = slide.prev('.opr-page');
        //TODO check if has previous
        if (true) {
            prev.hide(); // hide prev slide before slideDown()
            prev.addClass('opr-animate'); // put slide in front (z-index :100)
            prev.slideDown(function () {
                slide.removeClass('opr-current'); // remove current status from old slide
                prev.removeClass('opr-animate');
                prev.addClass('opr-current'); // add current status to new slide
            });
            oprCur = prev; // set current slide
        }
    }
    function opr_id(pageID) {
        var slide = oprCur;
        var page = $('.opr-page:nth-child(' + pageID + ')');
        //TODO check if id exists
        if (slide.data('target') != pageID) {
            page.hide(); // hide new slide before slideDown()
            page.addClass('opr-animate'); // put slide in front (z-index :100)
            page.slideDown(function () {
                slide.removeClass('opr-current'); // remove current status from old slide
                page.removeClass('opr-animate');
                page.addClass('opr-current'); // add current status to new slide
            });
            oprCur = page; // set current slide
        }
    }

    //****************************//
    // click events               //
    //****************************//
    $('.opr-next').on('click', function () { // handles next button
        opr_next();
    });
    $('.opr-prev').on('click', function () { // handles prev button
        opr_prev();
    });
    $('.opr-nav').on('click', 'a', function () { // handles menu navigation
        var pageID = $(this).data('target');
        opr_id(pageID);
    });

    //****************************//
    // key events                 //
    //****************************//
    $(document).keydown(function (e) {
        switch (e.which) {
            case 38: // up
                opr_prev();
                break;
            case 40: // down
                opr_next();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    //****************************//
    // scroll events              //
    //****************************//
    //TODO add scroll support

})(jQuery);
