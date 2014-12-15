(function ($) {

    var oprCur = $('.opr-current'); // always stores the current active slide

    function oprNext() {
        var slide = oprCur;
        if (oprHasNext(slide)) {
            var next = slide.next('.opr-page');
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

    function oprPrev() {
        var slide = oprCur;
        if (oprHasPrev(slide)) {
            var prev = slide.prev('.opr-page');
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

    function oprID(pageID) {
        var slide = oprCur;
        if (slide.data('target') != pageID && oprIDExists(pageID)) {
            var page = $('.opr-page[data-target="' + pageID + '"]');
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

    function oprHasNext(slide) {
        if (slide.next().is('.opr-page')) {
            return true;
        }
        return false;
    }

    function oprHasPrev(slide) {
        if (slide.prev().is('.opr-page')) {
            return true;
        }
        return false;
    }

    function oprIDExists(pageID) {
        if ($('.opr-page[data-target="' + pageID + '"]').length > 0) {
            return true;
        }
        return false;
    }


    //****************************//
    // click events               //
    //****************************//
    $('.opr-next').on('click', function () { // handles next button
        oprNext();
    });
    $('.opr-prev').on('click', function () { // handles prev button
        oprPrev();
    });
    $('.opr-nav').on('click', 'a', function () { // handles menu navigation
        var pageID = $(this).data('target');
        oprID(pageID);
    });

    //****************************//
    // key events                 //
    //****************************//
    $(document).keydown(function (e) {
        switch (e.which) {
            case 38: // up
                oprPrev();
                break;
            case 40: // down
                oprNext();
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
