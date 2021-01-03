/*
  UX
    > Container for Module
    > Main Content for Module
    > Options for Module
 */
 
tokenF = typeof tokenF != 'undefined' ? tokenF : {}
 
tokenF.interface = (function() {
  // Interface Options
  let options = {
    containerID      : 'token-filter-list',
    containerHeaderID: 'token-filter-header',
    
    subheadersID     : '.list-header-element.sub',
    subelementsID    : '.token-element:not(.exclude)',
    
    headerCloseID    : 'list-header-close',
    
    headerHeight     : 32,
    headerTop        : 28,
    offsetLeft       : 49,
    heightPercentile : 0.88,
    collapsedWidth   : 'calc(333px + 1.3em + 1.2em + 1.2em)',
  }
  // Interface Options surface

  /* > Container for Module */
  let fullscreen = function(w, h) {
    let left         = options.offsetLeft
    let top          = options.headerTop + options.headerHeight
    let height       = options.heightPercentile * h
    let width        = w - (options.offsetLeft + options.offsetRight || options.offsetLeft)
    
    $('#' + options.containerID)
       .css({
         left  : left   + 'px',
         top   : top    + 'px',
         height: height + 'px',
         width : width  + 'px',
       })
  }
  let collapse = function() {
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
    containerDraw: fullscreen,
    containerCollapse: collapse,
  }
})()
