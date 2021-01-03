/*
  UX
    > Container for Module
    > Main Content for Module
    > Options for Module
 */
 
tokenF = typeof tokenF != 'undefined' ? tokenF : {}
 
tokenF.interface = (function() {
  let deriveOptions = tokenF.options.drawingValues
  
  let draw = function() {
    $('main').empty()
    // some fullscreen/mobile logic here
    fullscreen(window.innerWidth, window.innerHeight)
  }
  
  let update = function() {

  }

  /* > Container for Module */
  let fullscreen = function(w, h) {
    let options = deriveOptions()
    
    let d = ''
    d += '<div id="tokenF">'
    d += '<div id="tokenF-header">'
    d +=   '<div id="tokenF-header-left"></div>'
    d +=   '<div id="tokenF-header-right"></div>'
    d +=   '<div id="tokenF-header-menu"></div>'
    d +=   '<div id="tokenF-header-menu-button"><button id=""><span></span><span></span><span></span></button></div>'
    d +=   '<div id="tokenF-header-close"></div>'
    d += '</div>'
    d += '<div id="tokenF-list"><div id="tokenF-list-left"></div><div id="tokenF-list-right"></div></div>'
    d += '</div>'
    $('body').append(d)
    
    let left         = options.offsetLeft
    let top          = options.headerTop + options.headerHeight
    let height       = options.heightPercentile
    let width        = w - (options.offsetLeft + options.offsetRight || options.offsetLeft)
    
    $('#' + options.containerID)
       .css({
         left  : left   + 'px',
         top   : top    + 'px',
         height: 'calc(' + height + '% - ' + options.headerHeight + 'px)',
         width : width  + 'px',
       })
    $('#' + options.containerListID)
       .css({
         left  : '0%',
         top   : options.headerHeight + 'px',
         height: 'calc(100% - ' + options.headerHeight + 'px)',
         width : '100%',
       })
    $('#' + options.containerHeaderID)
       .css({
         left  : '0%',
         top   : '0%',
         height: options.headerHeight + 'px',
         width : '100%',
       })
  }
  let collapse = function() {
    let options = deriveOptions()
    
    let $container = $('#' + options.containerID)
    let $subheaders = $(options.subheadersID)
    let $subelements = $(options.subelementsID)
    let $headerClose = $('#' + options.headerCloseID)
    
    if ($container.hassClass('collapsed')) {
      let width = window.innerWidth - (options.offsetLeft + options.offsetRight || options.offsetLeft)
      $container.removeClass('collapsed').css('width', width)
      $subheaders.css('display','inline-block')
      $subelements.css('display','inline-block')
      $headerClose.removeClass('arrow-right').addClass('arrow-left')
      $('body').trigger('tokenF-uncollapse')
    } else {
      $subheaders.css('display','none')
      $subelements.css('display','none')
      $container.addClass('collapsed').css('width',collapsedWidth)
      $headerClose.removeClass('arrow-left').addClass('arrow-right')
      $('body').trigger('tokenF-collapse')
    }
  }

  return {
    
    draw: draw,
    collapse: collapse,
  }
})()
