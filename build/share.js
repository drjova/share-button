!function(){function getStyles(config){ return "<style>"+config.selector+"{width:90px;height:20px}"+config.selector+" [class*=entypo-]:before{font-family:entypo,sans-serif}"+config.selector+" label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:"+config.ui.button_background+";color:"+config.ui.button_color+";-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" label:hover{opacity:.8}"+config.selector+" label span{text-transform:uppercase;font-size:.9em;font-family:Lato,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;padding-left:6px}"+config.selector+" .social{-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-190px);-ms-transform:scale(0) translateY(-190px);transform:scale(0) translateY(-190px);opacity:0;-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-15px}"+config.selector+" .social.active{opacity:1;-webkit-transition:all .4s ease;transition:all .4s ease}"+config.selector+" .social.active.center{margin-left:-45px}"+config.selector+" .social.active.left{margin-left:-115px}"+config.selector+" .social.active.right{margin-left:10px}"+config.selector+" .social.active.top{-webkit-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px)}"+config.selector+" .social.active.top.center ul:after{margin:35px auto;border-top:20px solid #3b5998}"+config.selector+" .social.active.top.left ul:after{margin:35px 0 0 129px;border-top:20px solid #e34429}"+config.selector+" .social.active.top.right ul:after{margin:35px 0 0 10px;border-top:20px solid #6cdfea}"+config.selector+" .social.active.bottom{-webkit-transform:scale(1) translateY(45px);-ms-transform:scale(1) translateY(45px);transform:scale(1) translateY(45px);margin-top:-14px}"+config.selector+" .social.active.bottom.center ul:after{margin:-10px auto;border-bottom:20px solid #3b5998}"+config.selector+" .social.active.bottom.left ul:after{margin:-10px 0 0 129px;border-bottom:20px solid #e34429}"+config.selector+" .social.active.bottom.right ul:after{margin:-10px 0 0 10px;border-bottom:20px solid #6cdfea}"+config.selector+" .social ul{position:relative;left:0;right:0;width:180px;height:46px;color:#fff;background:#3b5998;margin:auto;padding:0;list-style:none}"+config.selector+" .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:block;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-transition:all .3s ease;transition:all .3s ease}"+config.selector+" .social ul li:hover{color:rgba(0,0,0,.5)}"+config.selector+" .social ul:after{content:'';display:block;width:0;height:0;position:absolute;left:0;right:0;border-left:20px solid transparent;border-right:20px solid transparent}"+config.selector+" .social li[class*=twitter]{background:#6cdfea;padding:12px 0}"+config.selector+" .social li[class*=gplus]{background:#e34429;padding:12px 0}</style>"};var $, Share, ShareUtils, t1, t2,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ShareUtils = (function() {
  function ShareUtils() {}

  ShareUtils.prototype.extend = function(to, from, overwrite) {
    var hasProp, prop;
    for (prop in from) {
      hasProp = to[prop] !== undefined;
      if (hasProp && this.type(from[prop]) === "object") {
        this.extend(to[prop], from[prop], overwrite);
      } else {
        if (overwrite || !hasProp) {
          to[prop] = from[prop];
        }
      }
    }
  };

  ShareUtils.prototype.type = function(obj) {
    var classToType;
    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    classToType = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object'
    };
    return classToType[Object.prototype.toString.call(obj)];
  };

  ShareUtils.prototype.hide = function(el) {
    el.style.display = "none";
  };

  ShareUtils.prototype.show = function(el) {
    el.style.display = "block";
  };

  ShareUtils.prototype.has_class = function(el, class_name) {
    return el.classList.contains(class_name);
  };

  ShareUtils.prototype.add_class = function(el, class_name) {
    el.classList.add(class_name);
  };

  ShareUtils.prototype.remove_class = function(el, class_name) {
    el.classList.remove(class_name);
  };

  ShareUtils.prototype.popup = function(url) {
    var popup;
    popup = {
      width: 500,
      height: 350
    };
    popup.top = (screen.height / 2) - (popup.height / 2);
    popup.left = (screen.width / 2) - (popup.width / 2);
    window.open(url, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
  };

  return ShareUtils;

})();

Share = (function(_super) {
  __extends(Share, _super);

  function Share(element, options) {
    this.el = {
      head: document.querySelector('head'),
      body: document.querySelector('body')
    };
    this.config = {
      protocol: ['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//',
      url: window.location.href,
      text: document.querySelector('meta[name=description]').getAttribute('content') || '',
      title: null,
      caption: null,
      image: null,
      ui: {
        flyout: 'top center',
        button_font: true,
        button_color: '#333333',
        button_background: '#a29baa',
        button_icon: 'export',
        button_text: 'Share'
      },
      network: {
        google_plus: {
          enabled: true,
          path: null,
          url: null
        },
        twitter: {
          enabled: true,
          path: null,
          url: null,
          text: null
        },
        facebook: {
          enabled: true,
          path: null,
          url: null,
          app_id: null,
          title: null,
          caption: null,
          text: null,
          image: null
        }
      }
    };
    this.setup(element, options);
    return this;
  }

  Share.prototype.setup = function(element, opts) {
    var index, instance, instances, _i, _len;
    instances = document.querySelectorAll(element);
    this.extend(this.config, opts, true);
    this.update_network_configuration();
    this.inject_icons();
    if (this.config.ui.button_font) {
      this.inject_fonts();
    }
    if (this.config.network.facebook.enabled) {
      this.inject_facebook_sdk();
    }
    for (index = _i = 0, _len = instances.length; _i < _len; index = ++_i) {
      instance = instances[index];
      this.setup_instance(element, index);
    }
  };

  Share.prototype.setup_instance = function(element, index) {
    var button, instance, label, network, networks, _i, _len, _results,
      _this = this;
    instance = document.querySelectorAll(element)[index];
    this.hide(instance);
    this.add_class(instance, "sharer-" + index);
    this.add_class(instance, "initialized");
    instance = document.querySelectorAll(element)[index];
    this.inject_css(instance);
    this.inject_html(instance);
    this.show(instance);
    label = instance.querySelector('label');
    button = instance.querySelector('.social');
    networks = instance.querySelectorAll('li');
    label.addEventListener("click", function() {
      return _this.event_toggle(button);
    });
    _this = this;
    _results = [];
    for (index = _i = 0, _len = networks.length; _i < _len; index = ++_i) {
      network = networks[index];
      _results.push(network.addEventListener("click", function() {
        _this.event_network(instance, this);
        return _this.event_close(button);
      }));
    }
    return _results;
  };

  Share.prototype.event_toggle = function(button) {
    if (this.has_class(button, "active")) {
      this.event_close(button);
    } else {
      this.event_open(button);
    }
  };

  Share.prototype.event_open = function(button) {
    this.add_class(button, "active");
  };

  Share.prototype.event_close = function(button) {
    this.remove_class(button, "active");
  };

  Share.prototype.event_network = function(instance, network) {
    var str;
    str = network.getAttribute("data-network");
    return this["network_" + str]();
  };

  Share.prototype.network_facebook = function() {
    if (!window.FB) {
      console.log("The Facebook JS SDK hasn't loaded yet.");
      return;
    }
    return window.FB.ui({
      method: 'feed',
      name: this.config.network.facebook.title,
      link: this.config.network.facebook.url,
      picture: this.config.network.facebook.image,
      caption: this.config.network.facebook.caption,
      description: this.config.network.facebook.description
    });
  };

  Share.prototype.network_twitter = function() {
    return this.popup(this.config.network.twitter.path);
  };

  Share.prototype.network_google_plus = function() {
    return this.popup(this.config.network.google_plus.path);
  };

  Share.prototype.inject_icons = function() {
    var link;
    if (!this.el.head.querySelector('link[href="https://www.sharebutton.co/fonts/v2/entypo.min.css"]')) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "https://www.sharebutton.co/fonts/v2/entypo.min.css");
      return this.el.head.appendChild(link);
    }
  };

  Share.prototype.inject_fonts = function() {
    var link;
    if (!this.el.head.querySelector("link[href=\"http://fonts.googleapis.com/css?family=Lato:900&text=" + this.config.ui.button_text + "\"]")) {
      link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "http://fonts.googleapis.com/css?family=Lato:900&text=" + this.config.ui.button_text);
      return this.el.head.appendChild(link);
    }
  };

  Share.prototype.inject_css = function(instance) {
    var meta, selector;
    selector = "." + (instance.getAttribute('class').split(" ").join("."));
    if (!this.el.head.querySelector("meta[name='sharer" + selector + "']")) {
      this.config.selector = selector;
      this.el.head.innerHTML += getStyles(this.config);
      delete this.config.selector;
      meta = document.createElement("meta");
      meta.setAttribute("name", "sharer" + selector);
      return this.el.head.appendChild(meta);
    }
  };

  Share.prototype.inject_html = function(instance) {
    return instance.innerHTML = "<label class='entypo-" + this.config.ui.button_icon + "'><span>" + this.config.ui.button_text + "</span></label><div class='social " + this.config.ui.flyout + "'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>";
  };

  Share.prototype.inject_facebook_sdk = function() {
    var script;
    if (!window.FB && this.config.network.facebook.app_id && !this.el.body.querySelector('#fb-root')) {
      script = document.createElement("script");
      script.text = "window.fbAsyncInit=function(){FB.init({appId:'" + this.config.network.facebook.app_id + "',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='" + this.config.protocol + "connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')";
      this.el.body.innerHTML += "<div id='fb-root'></div>";
      return this.el.body.appendChild(script);
    }
  };

  Share.prototype.update_network_configuration = function() {
    var network, network_paths, option, options, _ref;
    _ref = this.config.network;
    for (network in _ref) {
      options = _ref[network];
      for (option in options) {
        if (this.config.network[network][option] === null) {
          this.config.network[network][option] = this.config[option];
        }
      }
    }
    this.config.network.twitter.text = encodeURIComponent(this.config.network.twitter.text);
    if (this.type(this.config.network.facebook.app_id) === 'integer') {
      this.config.network.facebook.app_id = this.config.network.facebook.app_id.toString();
    }
    network_paths = {
      network: {
        google_plus: {
          path: "https://plus.google.com/share?url=" + this.config.network.google_plus.url
        },
        twitter: {
          path: "https://twitter.com/intent/tweet?text=" + this.config.network.twitter.text + "&url=" + this.config.network.twitter.url
        },
        facebook: {
          path: "https://www.facebook.com/sharer/sharer.php?u=" + this.config.network.facebook.url
        }
      }
    };
    return this.extend(this.config, network_paths, true);
  };

  return Share;

})(ShareUtils);

t1 = new Share('.share-button-top', {
  network: {
    facebook: {
      app_id: 12345
    }
  }
});

t2 = new Share('.share-button-bottom', {
  ui: {
    button_text: '12345'
  },
  network: {
    facebook: {
      app_id: 98765
    }
  }
});

if (false) {
  $ = jQuery;
  $.fn.share = function(opts) {
    return $(this).each(function(i, el) {
      var $sharer, bubble, bubbles, click_link, close, config, open, parent, paths, set_opt, toggle,
        _this = this;
      $sharer = $(this);
      $sharer.addClass("sharer-" + i);
      $sharer.hide();
      if (opts == null) {
        opts = {};
      }
      config = {};
      config.url = opts.url || window.location.href;
      config.text = opts.text || $('meta[name=description]').attr('content') || '';
      config.app_id = opts.app_id;
      config.title = opts.title;
      config.image = opts.image;
      config.flyout = opts.flyout || 'top center';
      config.text_font = typeof opts.text_font === 'boolean' ? opts.text_font : true;
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
      config.selector = "." + ($sharer.attr('class').split(" ").join("."));
      config.twitter_text = encodeURIComponent(config.twitter_text);
      if (typeof config.app_id === 'integer') {
        config.app_id = config.app_id.toString();
      }
      config.protocol = opts.protocol || (['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//');
      if (!$('link[href="https://www.sharebutton.co/fonts/v2/entypo.min.css"]').length) {
        $("<link />").attr({
          rel: "stylesheet",
          href: "https://www.sharebutton.co/fonts/v2/entypo.min.css"
        }).appendTo($("head"));
      }
      if (!$("meta[name='sharer" + config.selector + "']").length) {
        $('head').append(getStyles(config)).append("<meta name='sharer" + config.selector + "'>");
      }
      if (config.text_font) {
        if (!$('link[href="' + config.protocol + 'fonts.googleapis.com/css?family=Lato:900"]').length) {
          $("<link />").attr({
            rel: "stylesheet",
            href: "" + config.protocol + "fonts.googleapis.com/css?family=Lato:900&text=" + config.button_text
          }).appendTo($("head"));
        }
      }
      $(this).html("<label class='entypo-" + config.button_icon + "'><span>" + config.button_text + "</span></label><div class='social " + config.flyout + "'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>");
      if (!window.FB && config.app_id && ($('#fb-root').length === 0)) {
        $body.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='" + config.protocol + "connect.facebook.net/en_US/all.js#xfbml=1&appId=" + config.app_id + "',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>");
      }
      paths = {
        twitter: "http://twitter.com/intent/tweet?text=" + config.twitter_text + "&url=" + config.twitter_url,
        facebook: "https://www.facebook.com/sharer/sharer.php?u=" + config.fb_url,
        gplus: "https://plus.google.com/share?url=" + config.gplus_url
      };
      parent = $sharer.parent();
      bubbles = parent.find(".social");
      bubble = parent.find("" + config.selector + " .social");
      toggle = function(e) {
        e.stopPropagation();
        return bubble.toggleClass('active');
      };
      open = function() {
        return bubble.addClass('active');
      };
      close = function() {
        return bubble.removeClass('active');
      };
      click_link = function() {
        var link, popup;
        link = paths[$(this).data('network')];
        if (($(this).data('network') === 'facebook') && config.app_id) {
          if (!window.FB) {
            console.log("The Facebook JS SDK hasn't loaded yet.");
            return;
          }
          window.FB.ui({
            method: 'feed',
            name: config.fb_title,
            link: config.fb_url,
            picture: config.fb_image,
            caption: config.fb_caption,
            description: config.fb_text
          });
        } else {
          popup = {
            width: 500,
            height: 350
          };
          popup.top = (screen.height / 2) - (popup.height / 2);
          popup.left = (screen.width / 2) - (popup.width / 2);
          window.open(link, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
        }
        return false;
      };
      $sharer.find('label').on('click', toggle);
      $sharer.find('li').on('click', click_link);
      $body.on('click', function() {
        return bubbles.removeClass('active');
      });
      setTimeout((function() {
        return $sharer.show();
      }), 250);
      return {
        toggle: toggle.bind(this),
        open: open.bind(this),
        close: close.bind(this),
        options: config,
        self: this
      };
    });
  };
}
}.call(this)