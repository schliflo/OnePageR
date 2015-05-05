(function ($) {

    var oprCur = $('.opr-current'); // always stores the current active slide
    var animationRunning = false;

    function oprHasNext(slide) { // check if slide has valid next
        if (slide.next().is('.opr-page')) {
            return true;
        }
        return false;
    }

    function oprHasPrev(slide) { // check if slide has valid prev
        if (slide.prev().is('.opr-page')) {
            return true;
        }
        return false;
    }

    function oprIDExists(pageID) { // check if pageID exists
        if ($('.opr-page[data-target="' + pageID + '"]').length > 0) {
            return true;
        }
        return false;
    }

    function oprNext() {
        if (!animationRunning) { // check if animation is running
            var slide = oprCur;
            if (oprHasNext(slide)) {
                animationRunning = true;
                var next = slide.next('.opr-page');
                slide.addClass('opr-animate'); // put slide in front (z-index :100)
                slide.removeClass('opr-current'); // remove current status from old slide
                next.addClass('opr-current'); // add current status to new slide
                slide.slideUp(function () {
                    slide.removeClass('opr-animate');
                    slide.show(); // make old slide visible again, as slideUp() adds display:none
                    animationRunning = false;
                });
                oprCur = next; // set current slide
            }
        }
    }

    function oprPrev() {
        if (!animationRunning) { // check if animation is running
            var slide = oprCur;
            if (oprHasPrev(slide)) {
                animationRunning = true;
                var prev = slide.prev('.opr-page');
                prev.hide(); // hide prev slide before slideDown()
                prev.addClass('opr-animate'); // put slide in front (z-index :100)
                prev.slideDown(function () {
                    slide.removeClass('opr-current'); // remove current status from old slide
                    prev.removeClass('opr-animate');
                    prev.addClass('opr-current'); // add current status to new slide
                    animationRunning = false;
                });
                oprCur = prev; // set current slide
            }
        }
    }

    function oprID(pageID) {
        if (!animationRunning) { // check if animation is running
            var slide = oprCur;
            if (slide.data('target') != pageID && oprIDExists(pageID)) {
                animationRunning = true;
                var page = $('.opr-page[data-target="' + pageID + '"]');
                page.hide(); // hide new slide before slideDown()
                page.addClass('opr-animate'); // put slide in front (z-index :100)
                page.slideDown(function () {
                    slide.removeClass('opr-current'); // remove current status from old slide
                    page.removeClass('opr-animate');
                    page.addClass('opr-current'); // add current status to new slide
                    animationRunning = false;
                });
                oprCur = page; // set current slide
            }
        }
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
    var minScrollWidth = 25;
    $(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) { // handle scroll event
        var delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail);
        if (delta >= minScrollWidth) { // determine scroll direction
            oprPrev();
        }
        if (delta <= -minScrollWidth) {
            oprNext();
        }
    });

    $(window).swipe({
        //Generic swipe handler for all directions
        swipeUp: function () { // swipe up
            oprNext();
        },
        swipeDown: function () { // swipe down
            oprPrev();
        }
    });

})(jQuery);
