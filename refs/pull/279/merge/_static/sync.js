var SlideSync = (
    function() {

        var
        slides,
        slide_listeners = [],

        showConsole = function(e) {
            slide_console = window.open(
                DOCUMENTATION_OPTIONS.URL_ROOT + 'console.html',
                'console',
                "menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes");
        },

        nextSlide = function() {
            slides.nextSlide();

            sendCommand('nextSlide');
            sendCurSlide();
        },

        prevSlide = function() {
            slides.prevSlide();

            sendCommand('prevSlide');
            sendCurSlide();
        },

        sendCurSlide = function() {

            var curSlide = slides.curSlide();

            notifyListeners(
                {command: 'cur_slide',
                 content: curSlide,
                 prev_slide: curSlide > 0 ? slides.getSlideEl(curSlide - 1).outerHTML : '',
                 slide: slides.getSlideEl(curSlide).outerHTML,
                 next_slide: curSlide < slides.length() - 1 ? slides.getSlideEl(curSlide + 1).outerHTML : ''
                }
            );

        },

        notifyListeners = function (message) {

            for (var i = 0; i < slide_listeners.length; i++) {
                slide_listeners[i].postMessage(message, '*');
            }

        },

        sendCommand = function(command) {
            return sendMessage({'command':command});
        },

        sendMessage = function(message) {
            notifyListeners(message);
        },

        handleMessage = function(message, source) {

            console.log(message);

            switch (message.command) {

            case 'register':
                slide_listeners.push(source);
                sendMessage(
                    {command: 'num_slides',
                     content: slideEls.length
                    }
                );
                break;

            case 'nextSlide':
                slides.nextSlide();
                break;

            case 'prevSlide':
                slides.prevSlide();
                break;

            };

            sendCurSlide();

        },

        onKeyDown = function (event) {

            switch (event.keyCode) {

            case 84: // t
                slides.toggleView && slides.toggleView();
                break;

            case 67: // c
                showConsole();
                break;
            }
        },

        init = function(slidedeck) {
            slides = slidedeck;

            // attach event handlers
            document.addEventListener('keydown', onKeyDown, false);
            window.addEventListener(
                'message',
                function(e) {
                    return handleMessage(e.data, e.source);
                }, false);

        };


        return {
            init: init,
            showConsole: showConsole,

            nextSlide: nextSlide,
            prevSlide: prevSlide,

            handleMessage: handleMessage,
            sendMessage: sendMessage,
            sendCommand: sendCommand
        };

    }());