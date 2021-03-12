document.addEventListener('DOMContentLoaded', function() {

    var

    handleKey = function(event) {
        switch (event.keyCode) {
        case 39: // right arrow
        case 13: // Enter
        case 32: // space
        case 34: // PgDn
            nextSlide();
            event.preventDefault();
            break;

        case 37: // left arrow
        case 8: // Backspace
        case 33: // PgUp
            prevSlide();
            event.preventDefault();
            break;
        }
    },

    handleUpdateSlides = function(slide_index, prev_slide, cur_slide, next_slide) {
        document.querySelector('#cur_slide_num').innerHTML = Number(slide_index) + 1;

        // make sure we have a previous and next slide to show;
        // if not add dummy placeholders
        if (!prev_slide) {
            prev_slide = '<article class="past placeholder"></article>';
        }
        if (!next_slide) {
            next_slide = '<article class="next placeholder"></article>';
        }

        document.querySelector('#slide_container').innerHTML =  prev_slide + cur_slide + next_slide;

        // Copy the presenter notes into place
        $('#presenter_notes').empty();
        $('article.current').find('div.admonition.note').each(
            function(i, node) {
                $('#presenter_notes').append($(node).html());
            }
        );

        var slides = document.querySelector('section.slides > article');
        for (var i=0; i < slides.length; i++) {

        }
    },

    handleMessage = function(e) {
        switch (e.data.command) {
        case 'num_slides':
            document.querySelector('#num_slides').innerHTML = e.data.content;
            break;
        case 'cur_slide':
            handleUpdateSlides(e.data.content, e.data.prev_slide, e.data.slide, e.data.next_slide);
            break;
        }
    },

    nextSlide = function(e) {
        if (e) {
            e.preventDefault();
        }
        window.opener.postMessage({command: 'nextSlide'}, '*');
    },

    prevSlide = function(e) {
        if (e) {
            e.preventDefault();
        }

        window.opener.postMessage({command: 'prevSlide'}, '*');
    },

    init = function(e) {
        window.addEventListener('message', handleMessage, false);
        document.addEventListener('keydown', handleKey, false);

        document.querySelector('#next').addEventListener('click', nextSlide);
        document.querySelector('#prev').addEventListener('click', prevSlide);

        window.opener.postMessage({command: 'register'}, '*');

    };

    init();

 }, false);
