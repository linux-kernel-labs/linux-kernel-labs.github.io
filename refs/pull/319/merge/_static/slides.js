/*

  Slide Presentation Javascript
  (consumers should include commons.js as well)

  -----

  Based on Google HTML5 slides template

  Original Authors: Luke Mahé (code)
                    Marcin Wichary (code and design)

                    Dominic Mazzoni (browser compatibility)
                    Charles Chen (ChromeVox support)

  URL: http://code.google.com/p/html5slides/

*/

var SlideDeck = (
    function() {

var
curSlide,
slide_console;

/* Slide movement */

function getSlideEl(no) {
  if ((no < 0) || (no >= slideEls.length)) {
    return null;
  } else {
    return slideEls[no];
  }
};

function updateSlideClass(slideNo, className) {
  var el = getSlideEl(slideNo);

  if (!el) {
    return;
  }

  if (className) {
    el.classList.add(className);
  }

  for (var i in SLIDE_CLASSES) {
    if (className != SLIDE_CLASSES[i]) {
      el.classList.remove(SLIDE_CLASSES[i]);
    }
  }
};


function updateSlides() {
  for (var i = 0; i < slideEls.length; i++) {
    switch (i) {
      case curSlide - 2:
        updateSlideClass(i, 'far-past');
        break;
      case curSlide - 1:
        updateSlideClass(i, 'past');
        break;
      case curSlide:
        updateSlideClass(i, 'current');
        break;
      case curSlide + 1:
        updateSlideClass(i, 'next');
        break;
      case curSlide + 2:
        updateSlideClass(i, 'far-next');
        break;
      default:
        updateSlideClass(i);
        break;
    }
  }

  triggerLeaveEvent(curSlide - 1);
  triggerEnterEvent(curSlide);

  window.setTimeout(function() {
    // Hide after the slide
    disableSlideFrames(curSlide - 2);
  }, 301);

  enableSlideFrames(curSlide - 1);
  enableSlideFrames(curSlide + 2);

  if (isChromeVoxActive()) {
    speakAndSyncToNode(slideEls[curSlide]);
  }

  updateHash();

  // notifyListeners(
  //     {command: 'cur_slide',
  //      content: curSlide,
  //      prev_slide: curSlide > 0 ? getSlideEl(curSlide - 1).outerHTML : '',
  //      slide: getSlideEl(curSlide).outerHTML,
  //      next_slide: curSlide < slideEls.length - 1 ? getSlideEl(curSlide + 1).outerHTML : ''
  //     }
  // );

};

function buildNextItem() {
  var toBuild  = slideEls[curSlide].querySelectorAll('.to-build');

  if (!toBuild.length) {
    return false;
  }

  toBuild[0].classList.remove('to-build');

  if (isChromeVoxActive()) {
    speakAndSyncToNode(toBuild[0]);
  }

  return true;
};


function prevSlide() {
  if (slidesContainer.classList.contains(TABLE_CLASS)) return;

  if (curSlide > 0) {
    curSlide--;

    updateSlides();
  }
};

function nextSlide() {
  if (slidesContainer.classList.contains(TABLE_CLASS)) return;

  if (buildNextItem()) {
    return;
  }

  if (curSlide < slideEls.length - 1) {
    curSlide++;

    updateSlides();
  }
};

function showSlide(e) {

    if (!slidesContainer.classList.contains(TABLE_CLASS)) return;

    // toggle table class
    toggleView();

    // set curSlide
    if (e) {
        for (i = 0; i < slideEls.length; i++) {
            if (slideEls[i].contains(e.target)) {
                curSlide = i;
                break;
            }
        }
    }

    // update slide classes
    updateSlides();
};

function toggleView() {
  for (var i = 0; i < slideEls.length; i++) {
      updateSlideClass(i);
  };

  if (slidesContainer.classList.contains(TABLE_CLASS)) {
      // leaving table mode
      updateSlides();
  }

  slidesContainer.classList.toggle(TABLE_CLASS);
  $(document).trigger('slidesSized');
};


/* Slide events */

function triggerEnterEvent(no) {
  var el = getSlideEl(no);
  if (!el) {
    return;
  }

  var onEnter = el.getAttribute('onslideenter');
  if (onEnter) {
    new Function(onEnter).call(el);
  }

  var evt = document.createEvent('Event');
  evt.initEvent('slideenter', true, true);
  evt.slideNumber = no + 1; // Make it readable

  el.dispatchEvent(evt);
};

function triggerLeaveEvent(no) {
  var el = getSlideEl(no);
  if (!el) {
    return;
  }

  var onLeave = el.getAttribute('onslideleave');
  if (onLeave) {
    new Function(onLeave).call(el);
  }

  var evt = document.createEvent('Event');
  evt.initEvent('slideleave', true, true);
  evt.slideNumber = no + 1; // Make it readable

  el.dispatchEvent(evt);
};

/* Touch events */

function handleTouchStart(event) {
  if (event.touches.length == 1) {
    touchDX = 0;
    touchDY = 0;

    touchStartX = event.touches[0].pageX;
    touchStartY = event.touches[0].pageY;

    document.body.addEventListener('touchmove', handleTouchMove, true);
    document.body.addEventListener('touchend', handleTouchEnd, true);
  }
};

function handleTouchMove(event) {
  if (event.touches.length > 1) {
    cancelTouch();
  } else {
    touchDX = event.touches[0].pageX - touchStartX;
    touchDY = event.touches[0].pageY - touchStartY;
  }
};

function handleTouchEnd(event) {
  var dx = Math.abs(touchDX);
  var dy = Math.abs(touchDY);

  if ((dx > PM_TOUCH_SENSITIVITY) && (dy < (dx * 2 / 3))) {
    if (touchDX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }

  cancelTouch();
};

function cancelTouch() {
  document.body.removeEventListener('touchmove', handleTouchMove, true);
  document.body.removeEventListener('touchend', handleTouchEnd, true);
};

/* Preloading frames */

function disableSlideFrames(no) {
  var el = getSlideEl(no);
  if (!el) {
    return;
  }

  var frames = el.getElementsByTagName('iframe');
  for (var i = 0, frame; frame = frames[i]; i++) {
    disableFrame(frame);
  }
};

function enableSlideFrames(no) {
  var el = getSlideEl(no);
  if (!el) {
    return;
  }

  var frames = el.getElementsByTagName('iframe');
  for (var i = 0, frame; frame = frames[i]; i++) {
    enableFrame(frame);
  }
};

function disableFrame(frame) {
  frame.src = 'about:blank';
};

function enableFrame(frame) {
  var src = frame._src;

  if (frame.src != src && src != 'about:blank') {
    frame.src = src;
  }
};

function setupFrames() {
  var frames = document.querySelectorAll('iframe');
  for (var i = 0, frame; frame = frames[i]; i++) {
    frame._src = frame.src;
    disableFrame(frame);
  }

  enableSlideFrames(curSlide);
  enableSlideFrames(curSlide + 1);
  enableSlideFrames(curSlide + 2);
};

function setupInteraction() {
  /* Clicking and tapping */

  var el = document.createElement('div');
  el.className = 'slide-area';
  el.id = 'prev-slide-area';
  el.addEventListener('click', prevSlide, false);
  document.querySelector('section.slides').appendChild(el);

  var el = document.createElement('div');
  el.className = 'slide-area';
  el.id = 'next-slide-area';
  el.addEventListener('click', nextSlide, false);
  document.querySelector('section.slides').appendChild(el);

  /* Swiping */

  document.body.addEventListener('touchstart', handleTouchStart, false);

  /* Clicking Slides */
  for (i = 0; i < slideEls.length; i++) {
      slideEls[i].addEventListener('click', showSlide, false);
  }

}

/* ChromeVox support */

function isChromeVoxActive() {
  if (typeof(cvox) == 'undefined') {
    return false;
  } else {
    return true;
  }
};

function speakAndSyncToNode(node) {
  if (!isChromeVoxActive()) {
    return;
  }

  cvox.ChromeVox.navigationManager.switchToStrategy(
      cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
  cvox.ChromeVox.navigationManager.syncToNode(node);
  cvox.ChromeVoxUserCommands.finishNavCommand('');
  var target = node;
  while (target.firstChild) {
    target = target.firstChild;
  }
  cvox.ChromeVox.navigationManager.syncToNode(target);
};

function speakNextItem() {
  if (!isChromeVoxActive()) {
    return;
  }

  cvox.ChromeVox.navigationManager.switchToStrategy(
      cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
  cvox.ChromeVox.navigationManager.next(true);
  if (!cvox.DomUtil.isDescendantOfNode(
      cvox.ChromeVox.navigationManager.getCurrentNode(), slideEls[curSlide])){
    var target = slideEls[curSlide];
    while (target.firstChild) {
      target = target.firstChild;
    }
    cvox.ChromeVox.navigationManager.syncToNode(target);
    cvox.ChromeVox.navigationManager.next(true);
  }
  cvox.ChromeVoxUserCommands.finishNavCommand('');
};

function speakPrevItem() {
  if (!isChromeVoxActive()) {
    return;
  }

  cvox.ChromeVox.navigationManager.switchToStrategy(
      cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
  cvox.ChromeVox.navigationManager.previous(true);
  if (!cvox.DomUtil.isDescendantOfNode(
      cvox.ChromeVox.navigationManager.getCurrentNode(), slideEls[curSlide])){
    var target = slideEls[curSlide];
    while (target.lastChild){
      target = target.lastChild;
    }
    cvox.ChromeVox.navigationManager.syncToNode(target);
    cvox.ChromeVox.navigationManager.previous(true);
  }
  cvox.ChromeVoxUserCommands.finishNavCommand('');
};

/* Hash functions */

function findSlideById(title_id) {
    // Return the 1-base index of the Slide with id ``title_id``
    //
    // The index must be 1-based, as it's passed to code which assumes
    // it was specified as the location fragment.

    for (var i = 0; i < slideEls.length; i++) {
        if (slideEls.item(i).id == title_id) {
            return i + 1;
        }
    }

    // no match on a slide, perhaps it's an explicit reference?
    var
    target_link = document.querySelector("span[id='" + title_id + "']"),
    // XXX this is pretty strict, may need to be more flexible in the future
    slide = (target_link && target_link.parentNode);

    if (slide && slide.tagName == 'ARTICLE') {
        return findSlideById(slide.id);
    }

    return false;

};

function getCurSlideFromHash() {
  var slideNo = Number(location.hash.substr(1));

  if (isNaN(slideNo)) {
      // must be a section title reference
      slideNo = findSlideById(location.hash.substr(1));
  }

  if (slideNo) {
    curSlide = slideNo - 1;
  } else {
    curSlide = 0;
  }
};

function updateHash() {
  location.replace('#' + (curSlide + 1));
};

/* Event listeners */




function addEventListeners() {

};

/* Initialization */

function addGeneralStyle() {
  var el = document.createElement('meta');
  el.name = 'viewport';
  el.content = 'width=1100,height=750';
  document.querySelector('head').appendChild(el);

  var el = document.createElement('meta');
  el.name = 'apple-mobile-web-app-capable';
  el.content = 'yes';
  document.querySelector('head').appendChild(el);
};

function makeBuildLists() {
  for (var i = curSlide, slide; slide = slideEls[i]; i++) {
    var items = slide.querySelectorAll('.build > *');
    for (var j = 0, item; item = items[j]; j++) {
      if (item.classList) {
        item.classList.add('to-build');
      }
    }
  }
};

function handleDomLoaded() {
  slidesContainer = document.querySelector('section.slides');
  slideEls = document.querySelectorAll(SLIDES_SELECTOR);

  getCurSlideFromHash();
  setupFrames();

  addGeneralStyle();
  addEventListeners();

  updateSlides();

  setupInteraction();
  makeBuildLists();

  document.body.classList.add('loaded');
  $(document).trigger('slidesSized');
};


        var

        getLocation = function () {
            return curSlide;
        },

        setLocation = function (slide) {
            curSlide = slide;
            updateSlides();
        },

        getLength = function () {
            return slideEls.length;
        },

        init = function () {
            document.addEventListener('DOMContentLoaded', handleDomLoaded, false);
        };


        init();

        return {
            curSlide: getLocation,
            location: getLocation,
            setLocation: setLocation,

            toggleView: toggleView,

            length: getLength,

            getSlideEl: getSlideEl,

            nextSlide: nextSlide,
            prevSlide: prevSlide
        };

    }());
