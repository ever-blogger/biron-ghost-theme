//*****************
// Website scripts
//*****************

// Event DOM ready
var callback = function(){
  // trigger events on Dom ready.

  // =======
  // fitvids
  // =======
  fitvids();

  // ================
  // Lazy load images
  // ================
  lazyLoad = newLazyLoad();

  // =======================================
  // Load comments when it's in the viewport
  // =======================================
  var comments = document.getElementById('comments');

  if (comments) {
    var scroll = function(e) {
      if(isInViewport(comments) == true) {
        loadComments();
        document.removeEventListener('scroll', scroll, true);
      }
    };
    document.addEventListener('scroll', scroll, true);
  }
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

// ===============================
// Check if element is in viewport
// ===============================
function isInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

// =================
// Lazyload function
// =================
function newLazyLoad() {
  return new LazyLoad({
    elements_selector: ".lazyload",
    class_loading: "loading",
    class_loaded: "loaded",
    treshold: 100,
    callback_enter: function(el) {
      // addClass('.lazyload', 'loading');
      el.classList.add('loading');
    },
    callback_set: function(el) {
      el.classList.remove('loading');
      el.classList.add('loaded');
    }
  });
}

function updateLazyLoad(lazyLoad) {
  lazyLoad.update();
}

// ==================
// Add class function
// ==================
function addClass(selector, myClass) {
  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.add(myClass);
  }
}

// =====================
// Remove class function
// =====================
function removeClass(selector, myClass) {
  // get all elements that match our selector
  elements = document.querySelectorAll(selector);

  // remove class from all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].classList.remove(myClass);
  }
}

// =============
// Load Comments
// =============
function loadComments() {
  /**
  *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
  *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
  */
  var disqus_config = function () {
    this.page.url = '{{url absolute="true"}}';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = '{{comment_id}}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };

  (function () {  // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
}