class ShareUtils
  extend: (to, from, overwrite) ->
    for prop of from
      hasProp = to[prop] isnt `undefined`
      if hasProp and @type(from[prop]) is "object"
        @extend(to[prop], from[prop], overwrite)
      else
        to[prop] = from[prop] if overwrite or not hasProp
    return

  type: (obj) -> # typeof has problems: http://javascript.crockford.com/remedial.html
    if obj == undefined or obj == null
      return String obj
    classToType = {
      '[object Boolean]':   'boolean',
      '[object Number]':    'number',
      '[object String]':    'string',
      '[object Function]':  'function',
      '[object Array]':     'array',
      '[object Date]':      'date',
      '[object RegExp]':    'regexp',
      '[object Object]':    'object'
    }
    return classToType[Object.prototype.toString.call(obj)]

  hide: (el) ->
    el.style.display = "none"
    return

  show: (el) ->
    el.style.display = "block"
    return

  has_class: (el, class_name) ->
    el.classList.contains(class_name)

  add_class: (el, class_name) ->
    el.classList.add(class_name)
    return

  remove_class: (el, class_name) ->
    el.classList.remove(class_name)
    return

  popup: (url) ->
    popup =
      width:  500
      height: 350

    popup.top  = (screen.height/2) - (popup.height/2)
    popup.left = (screen.width/2)  - (popup.width/2)

    window.open(url, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=#{popup.left},top=#{popup.top},width=#{popup.width},height=#{popup.height}")

    return


#####


class Share extends ShareUtils
  constructor: (element, options) ->
    @el =
      head: document.querySelector('head')
      body: document.querySelector('body')

    @config =
      protocol: if ['http', 'https'].indexOf(window.location.href.split(':')[0]) is -1 then 'https://' else '//'
      url: window.location.href
      text: document.querySelector('meta[name=description]').getAttribute('content') || ''
      title: null
      caption: null
      image: null

      ui:
        flyout: 'top center'
        button_font: true
        button_color: '#333333'
        button_background: '#a29baa'
        button_icon: 'export'
        button_text: 'Share'

      network:
        google_plus:
          enabled: true
          path: null
          url: null
        twitter:
          enabled: true
          path: null
          url: null
          text: null
        facebook:
          enabled: true
          path: null
          url: null
          app_id: null
          title: null
          caption: null
          text: null
          image: null

    @setup(element, options)

    return @


  setup: (element, opts) ->
    ## Record all instances
    instances = document.querySelectorAll(element)

    ## Extend config object
    @extend(@config, opts, true)

    ## Apply missing network-specific configurations
    @update_network_configuration()

    ## Inject Icon Fontset
    @inject_icons()

    ## Inject Google's Lato Fontset (if enabled)
    @inject_fonts() if @config.ui.button_font

    ## Inject Facebook JS SDK (if Facebook is enabled)
    @inject_facebook_sdk() if @config.network.facebook.enabled

    ## Loop through and initialize each instance
    @setup_instance(element, index) for instance, index in instances

    return


  setup_instance: (element, index) ->
    instance = document.querySelectorAll(element)[index] # Reload Element. gS/qSA doesn't support live NodeLists

    @hide(instance)

    @add_class(instance, "sharer-#{index}")
    @add_class(instance, "initialized") # FF doesn't support adding multiple classes in a single call

    instance = document.querySelectorAll(element)[index] # Reload Element. qS/qSA doesn't support live NodeLists

    @inject_css(instance)
    @inject_html(instance)

    @show(instance)

    label    = instance.querySelector('label')   # TODO: findByTagName
    button   = instance.querySelector('.social') # TODO: findByClassName
    networks = instance.querySelectorAll('li')   # TODO: findByTagName
    
    label.addEventListener "click", => @event_toggle(button)

    _this = @
    for network, index in networks
      network.addEventListener "click", ->
        _this.event_network(instance, @)
        _this.event_close(button)


  ###################################


  event_toggle: (button) ->
    if @has_class(button, "active")
      @event_close(button)
    else
      @event_open(button)

    return

  event_open: (button) ->
    @add_class(button, "active")
    return

  event_close: (button) ->
    @remove_class(button, "active")
    return

  event_network: (instance, network) ->
    str = network.getAttribute("data-network")
    @["network_#{str}"]()


  ###################################


  network_facebook: ->
    unless window.FB
      console.log "The Facebook JS SDK hasn't loaded yet."
      return

    window.FB.ui
      method:       'feed',
      name:         @config.network.facebook.title
      link:         @config.network.facebook.url
      picture:      @config.network.facebook.image
      caption:      @config.network.facebook.caption
      description:  @config.network.facebook.description

  network_twitter: ->
    @popup(@config.network.twitter.path)

  network_google_plus: ->
    @popup(@config.network.google_plus.path)


  ###################################

  ## Injects icon font CSS file into the header
  inject_icons: ->
    # Notes
    # - Must be https:// due to CDN CORS caching issues
    # - To include the full entypo set, change URL to: https://www.sharebutton.co/fonts/entypo.css
    unless @el.head.querySelector('link[href="https://www.sharebutton.co/fonts/v2/entypo.min.css"]')
      link = document.createElement("link")
      link.setAttribute("rel", "stylesheet")
      link.setAttribute("href", "https://www.sharebutton.co/fonts/v2/entypo.min.css")
      @el.head.appendChild(link)


  ## Injects Google Font 'Lato' CSS file into the header
  inject_fonts: ->
    unless @el.head.querySelector("link[href=\"http://fonts.googleapis.com/css?family=Lato:900&text=#{@config.ui.button_text}\"]")
      link = document.createElement("link")
      link.setAttribute("rel", "stylesheet")
      link.setAttribute("href", "http://fonts.googleapis.com/css?family=Lato:900&text=#{@config.ui.button_text}")
      @el.head.appendChild(link)
  

  ## Injects instantiation specific CSS styles into the header
  inject_css: (instance) ->
    selector = ".#{instance.getAttribute('class').split(" ").join(".")}"

    unless @el.head.querySelector("meta[name='sharer#{selector}']")
      @config.selector = selector # TODO: Temporary
      @el.head.innerHTML += getStyles(@config)
      delete @config.selector # TODO: Temporary

      meta = document.createElement("meta")
      meta.setAttribute("name", "sharer#{selector}")
      @el.head.appendChild(meta)


  ## Injects HTML into the button
  inject_html: (instance) ->
    instance.innerHTML = "<label class='entypo-#{@config.ui.button_icon}'><span>#{@config.ui.button_text}</span></label><div class='social #{@config.ui.flyout}'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>"


  ## Injects the Facebook JS SDK
  inject_facebook_sdk: ->
    if !window.FB && @config.network.facebook.app_id && !@el.body.querySelector('#fb-root')
      script      = document.createElement("script")
      script.text = "window.fbAsyncInit=function(){FB.init({appId:'#{@config.network.facebook.app_id}',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='#{@config.protocol}connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk')"

      @el.body.innerHTML += "<div id='fb-root'></div>"
      @el.body.appendChild(script)

  ###################################


  update_network_configuration: ->
    for network, options of @config.network
      for option of options
        if @config.network[network][option] is null
          @config.network[network][option] = @config[option]

    @config.network.twitter.text = encodeURIComponent(@config.network.twitter.text)

    if @type(@config.network.facebook.app_id) is 'integer'
      @config.network.facebook.app_id = @config.network.facebook.app_id.toString()

    network_paths =
      network:
        google_plus:
          path: "https://plus.google.com/share?url=#{@config.network.google_plus.url}"
        twitter:
          path: "https://twitter.com/intent/tweet?text=#{@config.network.twitter.text}&url=#{@config.network.twitter.url}"
        facebook:
          path: "https://www.facebook.com/sharer/sharer.php?u=#{@config.network.facebook.url}" # TODO: Change to network specific
 
    @extend(@config, network_paths, true)


#####################
#####################


t1 = new Share '.share-button-top',
  network:
    facebook:
      app_id: 12345

t2 = new Share '.share-button-bottom',
  ui:
    button_text: '12345'
  network:
    facebook:
      app_id: 98765



##################################################################
##################################################################
##################################################################
##################################################################





















if false
  $ = jQuery
  $.fn.share = (opts) ->
    #########################
    # Iterate over elements #
    #########################

    $(@).each (i, el) ->

      ######################
      # Set Local Elements #
      ######################

      $sharer = $(@)


      #################
      # Configuration #
      #################

      ## Add unique class to each element and hide

      $sharer.addClass("sharer-#{i}")
      $sharer.hide()

      ## Set up options

      opts ?= {}
      config = {}

      ## Basic Configurations

      config.url        = opts.url || window.location.href
      config.text       = opts.text || $('meta[name=description]').attr('content') || ''
      config.app_id     = opts.app_id
      config.title      = opts.title
      config.image      = opts.image
      config.flyout     = opts.flyout || 'top center'
      config.text_font  = if typeof(opts.text_font) is 'boolean' then opts.text_font else true
   
      ## UI Configurations

      config.button_color      = opts.color || '#333'
      config.button_background = opts.background || '#e1e1e1'
      config.button_icon       = opts.icon || 'export'
      config.button_text       = if typeof(opts.button_text) is 'string'
        opts.button_text
      else
        'Share'

      ## Network-Specific Configurations

      set_opt = (base,ext) -> if opts[base] then opts[base][ext] || config[ext] else config[ext]

      config.twitter_url  = set_opt('twitter', 'url')
      config.twitter_text = set_opt('twitter', 'text')
      config.fb_url       = set_opt('facebook', 'url')
      config.fb_title     = set_opt('facebook', 'title')
      config.fb_caption   = set_opt('facebook', 'caption')
      config.fb_text      = set_opt('facebook', 'text')
      config.fb_image     = set_opt('facebook', 'image')
      config.gplus_url    = set_opt('gplus', 'url')


      #############
      ## PRIVATE ##
      #############

      ## Selector Configuration
      config.selector = ".#{$sharer.attr('class').split(" ").join(".")}"

      ## Correct Common Errors
      config.twitter_text = encodeURIComponent(config.twitter_text)
      config.app_id = config.app_id.toString() if typeof config.app_id == 'integer'
      config.protocol = opts.protocol || if ['http', 'https'].indexOf(window.location.href.split(':')[0]) is -1 then 'https://' else '//'


      ################
      # Inject Icons #
      ################

      # Notes
      # - Must be https:// due to CDN CORS caching issues
      # - To include the full entypo set, change URL to: https://www.sharebutton.co/fonts/entypo.css
      unless $('link[href="https://www.sharebutton.co/fonts/v2/entypo.min.css"]').length
        $("<link />").attr(
          rel: "stylesheet"
          href: "https://www.sharebutton.co/fonts/v2/entypo.min.css"
        ).appendTo $("head")


      ##############
      # Inject CSS #
      ##############

      unless $("meta[name='sharer#{config.selector}']").length
        $('head').append(getStyles(config))
                 .append("<meta name='sharer#{config.selector}'>")


      ################
      # Inject Fonts #
      ################
      
      if config.text_font
        unless $('link[href="'+config.protocol+'fonts.googleapis.com/css?family=Lato:900"]').length
          $("<link />").attr(
            rel: "stylesheet"
            href: "#{config.protocol}fonts.googleapis.com/css?family=Lato:900&text=#{config.button_text}"
          ).appendTo $("head")

      ###############
      # Inject HTML #
      ###############

      $(@).html("<label class='entypo-#{config.button_icon}'><span>#{config.button_text}</span></label><div class='social #{config.flyout}'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>")


      #######################
      # Set Up Facebook API #
      #######################

      if !window.FB && config.app_id && ($('#fb-root').length is 0)
        $body.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='#{config.protocol}connect.facebook.net/en_US/all.js#xfbml=1&appId=#{config.app_id}',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>")

      ###########################
      # Share URL Configuration #
      ###########################

      paths =
        twitter: "http://twitter.com/intent/tweet?text=#{config.twitter_text}&url=#{config.twitter_url}"
        facebook: "https://www.facebook.com/sharer/sharer.php?u=#{config.fb_url}"
        gplus: "https://plus.google.com/share?url=#{config.gplus_url}"

      ##############################
      # Popup/Share Links & Events #
      ##############################

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
          popup =
            width: 500
            height: 350

          popup.top = (screen.height/2) - (popup.height/2)
          popup.left = (screen.width/2) - (popup.width/2)

          window.open(link, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=#{popup.left},top=#{popup.top},width=#{popup.width},height=#{popup.height}")
        return false

      $sharer.find('label').on 'click', toggle
      $sharer.find('li').on 'click', click_link

      $body.on 'click', -> bubbles.removeClass('active')

      setTimeout (=> $sharer.show()), 250

      # return a little API
      return {
        toggle: toggle.bind(@)
        open: open.bind(@)
        close: close.bind(@)
        options: config
        self: @
      }
