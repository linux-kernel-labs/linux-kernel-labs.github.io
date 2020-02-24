var SlideController = (
    function(){

        var
        slidedeck,

        onKeyDown = function (event) {

            switch (event.keyCode) {
            case 39: // right arrow
            case 13: // Enter
            case 32: // space
            case 34: // PgDn
                slidedeck.nextSlide();
                event.preventDefault();
                break;

            case 37: // left arrow
            case 8: // Backspace
            case 33: // PgUp
                slidedeck.prevSlide();
                event.preventDefault();
                break;

            case 40: // down arrow
                if (isChromeVoxActive()) {
                    slidedeck.speakNextItem();
                } else {
                    slidedeck.nextSlide();
                }
                event.preventDefault();
                break;

            case 38: // up arrow
                if (isChromeVoxActive()) {
                    slidedeck.speakPrevItem();
                } else {
                    slidedeck.prevSlide();
                }
                event.preventDefault();
                break;

            }
        };

        init = function(slides) {
            slidedeck = slides;

            document.addEventListener('keydown', onKeyDown, false);

        };

        return {
            init: init
        };

    }());
