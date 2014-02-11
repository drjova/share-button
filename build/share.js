!function(){function getStyles(config){ return "<style>"+config.selector+"{width:90px;height:20px}"+config.selector+" [class*=entypo-]:before{font-family:entypo,sans-serif}"+config.selector+" label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:"+config.button_background+";color:"+config.button_color+";-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" label:hover{opacity:.8}"+config.selector+" label span{text-transform:uppercase;font-size:.85em;font-family:Lato,sans-serif;font-weight:900;-webkit-font-smoothing:antialiased;padding-left:6px}"+config.selector+" .social{-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-190px);-ms-transform:scale(0) translateY(-190px);transform:scale(0) translateY(-190px);opacity:0;-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-15px}"+config.selector+" .social.active{opacity:1;-webkit-transition:all .4s ease;transition:all .4s ease}"+config.selector+" .social.active.center{margin-left:-45px}"+config.selector+" .social.active.left{margin-left:-115px}"+config.selector+" .social.active.right{margin-left:10px}"+config.selector+" .social.active.top{-webkit-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px)}"+config.selector+" .social.active.top.center ul:after{margin:35px auto;border-top:20px solid #3b5998}"+config.selector+" .social.active.top.left ul:after{margin:35px 0 0 129px;border-top:20px solid #e34429}"+config.selector+" .social.active.top.right ul:after{margin:35px 0 0 10px;border-top:20px solid #6cdfea}"+config.selector+" .social.active.bottom{-webkit-transform:scale(1) translateY(45px);-ms-transform:scale(1) translateY(45px);transform:scale(1) translateY(45px);margin-top:-14px}"+config.selector+" .social.active.bottom.center ul:after{margin:-10px auto;border-bottom:20px solid #3b5998}"+config.selector+" .social.active.bottom.left ul:after{margin:-10px 0 0 129px;border-bottom:20px solid #e34429}"+config.selector+" .social.active.bottom.right ul:after{margin:-10px 0 0 10px;border-bottom:20px solid #6cdfea}"+config.selector+" .social ul{position:relative;left:0;right:0;width:180px;height:46px;color:#fff;background:#3b5998;margin:auto;padding:0;list-style:none}"+config.selector+" .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:block;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" .social ul li:hover{color:rgba(0,0,0,.5)}"+config.selector+" .social ul:after{content:'';display:block;width:0;height:0;position:absolute;left:0;right:0;border-left:20px solid transparent;border-right:20px solid transparent}"+config.selector+" .social li[class*=twitter]{background:#6cdfea;padding:12px 0}"+config.selector+" .social li[class*=gplus]{background:#e34429;padding:12px 0}</style>"};(typeof exports !== "undefined" && exports !== null ? exports : this).shareButton = function(el, opts) {
  var $body, $elements, $head, $sharer, addClass, addEvent, bubble, bubbles, close, config, hasClass, i, label, li, link, meta, open, paths, protocol, removeClass, set_opt, toggle, toggleClass, _i, _j, _len, _len1, _ref,
    _this = this;
  hasClass = function(elem, className) {
    return new RegExp(" " + className + " ").test(" " + elem.className + " ");
  };
  addClass = function(elem, className) {
    if (!hasClass(elem, className)) {
      elem.className += " " + className;
    }
  };
  removeClass = function(elem, className) {
    var newClass;
    newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
    if (hasClass(elem, className)) {
      while (newClass.indexOf(" " + className + " ") >= 0) {
        newClass = newClass.replace(" " + className + " ", " ");
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, "");
    }
  };
  toggleClass = function(elem, className) {
    var newClass;
    newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
    if (hasClass(elem, className)) {
      while (newClass.indexOf(" " + className + " ") >= 0) {
        newClass = newClass.replace(" " + className + " ", " ");
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, "");
    } else {
      elem.className += " " + className;
    }
  };
  addEvent = function(element, evnt, funct) {
    if (element.attachEvent) {
      return element.attachEvent("on" + evnt, funct);
    } else {
      return element.addEventListener(evnt, funct, false);
    }
  };
  $elements = document.querySelectorAll(el);
  console.log('Elements', $elements);
  if ($elements.length === 0) {
    console.log("Share Button: No elements found.");
    return;
  }
  $head = document.querySelector('head');
  $body = document.querySelector('body');
  for (i = _i = 0, _len = $elements.length; _i < _len; i = ++_i) {
    $sharer = $elements[i];
    console.log("Sharer", $sharer);
    addClass($sharer, "sharer-" + i);
    if (opts == null) {
      opts = {};
    }
    config = {};
    config.url = opts.url || window.location.href;
    config.text = opts.text || $head.querySelector('meta[name=description]').getAttribute('content') || '';
    config.app_id = opts.app_id;
    config.title = opts.title;
    config.image = opts.image;
    config.flyout = opts.flyout || 'top center';
    config.button_color = opts.color || '#333';
    config.button_background = opts.background || '#e1e1e1';
    config.button_icon = opts.icon || 'export';
    config.button_text = typeof opts.button_text === 'string' ? opts.button_text : 'Share';
    set_opt = function(base, ext) {
      if (opts[base]) {
        return opts[base][ext] || config[ext];
      } else {
        return config[ext];
      }
    };
    config.twitter_url = set_opt('twitter', 'url');
    config.twitter_text = set_opt('twitter', 'text');
    config.fb_url = set_opt('facebook', 'url');
    config.fb_title = set_opt('facebook', 'title');
    config.fb_caption = set_opt('facebook', 'caption');
    config.fb_text = set_opt('facebook', 'text');
    config.fb_image = set_opt('facebook', 'image');
    config.gplus_url = set_opt('gplus', 'url');
    config.selector = "." + ($sharer.getAttribute('class').split(" ").join("."));
    config.twitter_text = encodeURIComponent(config.twitter_text);
    if (typeof config.app_id === 'integer') {
      config.app_id = config.app_id.toString();
    }
    if (!$head.querySelector('link[href="http://weloveiconfonts.com/api/?family=entypo"]')) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "http://weloveiconfonts.com/api/?family=entypo");
      $head.appendChild(link);
    }
    if (!$head.querySelector('link[href="http://fonts.googleapis.com/css?family=Lato:900"]')) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "http://fonts.googleapis.com/css?family=Lato:900&text=" + config.button_text);
      $head.appendChild(link);
    }
    if (!$head.querySelector("meta[name='sharer" + config.selector + "']")) {
      $head.innerHTML += getStyles(config);
      meta = document.createElement("meta");
      meta.setAttribute("name", "sharer" + config.selector);
      $head.appendChild(meta);
    }
    $sharer.innerHTML = "<label class='entypo-" + config.button_icon + "'><span>" + config.button_text + "</span></label><div class='social " + config.flyout + "'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>";
    if (!window.FB && config.app_id && !document.querySelector('#fb-root')) {
      protocol = ['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//';
      $body.innerHTML += "<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='" + protocol + "connect.facebook.net/en_US/all.js#xfbml=1&appId=" + config.app_id + "',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>";
    }
    paths = {
      twitter: "http://twitter.com/intent/tweet?text=" + config.twitter_text + "&url=" + config.twitter_url,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + config.fb_url,
      gplus: "https://plus.google.com/share?url=" + config.gplus_url
    };
    bubbles = $body.querySelector(".social");
    bubble = $sharer.querySelector(".social");
    label = document.querySelector("" + config.selector + " label");
    toggle = function(e) {
      console.log('test');
      e.stopPropagation();
      return toggleClass(bubble, 'active');
    };
    open = function() {
      return addClass(bubble, 'active');
    };
    close = function() {
      return removeClass(bubble, 'active');
    };
    addEvent(label, 'click', function() {
      console.log("toggle", bubble);
      toggleClass(bubble, 'active');
    });
    _ref = $sharer.querySelectorAll("" + config.selector + " li");
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      li = _ref[_j];
      addEvent(li, 'click', function() {
        return alert("click link");
      });
    }
    addEvent($body, 'click', function() {
      return removeClass(bubbles, 'active');
    });
    return;
  }
};

if (typeof jQuery !== "undefined" && jQuery !== null) {
  jQuery.fn.share = function(opts) {
    return shareButton(jQuery(this), opts);
  };
}

/*
$ = jQuery
$.fn.share2 = (opts) ->

  if $(@).length is 0
    console.log "Share Button: No elements found."
    return


  $head = $('head')
  $body = $('body')

  $(@).each (i, el) ->
    $sharer = $(@)


    $sharer.addClass("sharer-#{i}")
    $sharer.hide()


    opts ?= {}
    config = {}


    config.url    = opts.url || window.location.href
    config.text   = opts.text || $('meta[name=description]').attr('content') || ''
    config.app_id = opts.app_id
    config.title  = opts.title
    config.image  = opts.image
    config.flyout = opts.flyout || 'top center'


    config.button_color      = opts.color || '#333'
    config.button_background = opts.background || '#e1e1e1'
    config.button_icon       = opts.icon || 'export'
    config.button_text       = if typeof(opts.button_text) is 'string'
      opts.button_text
    else
      'Share'


    set_opt = (base,ext) -> if opts[base] then opts[base][ext] || config[ext] else config[ext]

    config.twitter_url  = set_opt('twitter', 'url')
    config.twitter_text = set_opt('twitter', 'text')
    config.fb_url       = set_opt('facebook', 'url')
    config.fb_title     = set_opt('facebook', 'title')
    config.fb_caption   = set_opt('facebook', 'caption')
    config.fb_text      = set_opt('facebook', 'text')
    config.fb_image     = set_opt('facebook', 'image')
    config.gplus_url    = set_opt('gplus', 'url')


    config.selector = ".#{$sharer.attr('class').split(" ").join(".")}"

    config.twitter_text = encodeURIComponent(config.twitter_text)
    config.app_id = config.app_id.toString() if typeof config.app_id == 'integer'


    unless $('link[href="http://weloveiconfonts.com/api/?family=entypo"]').length
      $("<link />").attr(
        rel: "stylesheet"
        href: "http://weloveiconfonts.com/api/?family=entypo"
      ).appendTo $("head")


    unless $('link[href="http://fonts.googleapis.com/css?family=Lato:900"]').length
      $("<link />").attr(
        rel: "stylesheet"
        href: "http://fonts.googleapis.com/css?family=Lato:900"
      ).appendTo $("head")


    unless $("meta[name='sharer#{config.selector}']").length
      $('head').append(getStyles(config))
               .append("<meta name='sharer#{config.selector}'>")


    $(@).html("<label class='entypo-#{config.button_icon}'><span>#{config.button_text}</span></label><div class='social #{config.flyout}'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>")


    if !window.FB && config.app_id && ($('#fb-root').length is 0)
      protocol = if ['http', 'https'].indexOf(window.location.href.split(':')[0]) is -1 then 'https://' else '//'
      $body.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='#{protocol}connect.facebook.net/en_US/all.js#xfbml=1&appId=#{config.app_id}',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>")

    paths =
      twitter: "http://twitter.com/intent/tweet?text=#{config.twitter_text}&url=#{config.twitter_url}"
      facebook: "https://www.facebook.com/sharer/sharer.php?u=#{config.fb_url}"
      gplus: "https://plus.google.com/share?url=#{config.gplus_url}"

    parent  = $sharer.parent()
    bubbles = parent.find(".social")
    bubble  = parent.find("#{config.selector} .social")

    toggle = (e) ->
      e.stopPropagation()
      bubble.toggleClass('active')

    open = -> bubble.addClass('active')

    close = -> bubble.removeClass('active')

    click_link = ->
      link = paths[$(@).data('network')]
      if ($(@).data('network') == 'facebook') && config.app_id
        unless window.FB
          console.log "The Facebook JS SDK hasn't loaded yet."
          return

        window.FB.ui
          method: 'feed',
          name: config.fb_title
          link: config.fb_url
          picture: config.fb_image
          caption: config.fb_caption
          description: config.fb_text
      else
        window.open(link, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350')
      return false

    $sharer.find('label').on 'click', toggle
    $sharer.find('li').on 'click', click_link

    $body.on 'click', -> bubbles.removeClass('active')

    setTimeout (=> $sharer.show()), 250

    return {
      toggle: toggle.bind(@)
      open: open.bind(@)
      close: close.bind(@)
      options: config
      self: @
    }
*/

}.call(this)