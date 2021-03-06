/*
  Requires
    injectCSS
 */
 
tokenF = typeof tokenF != 'undefined' ? tokenF : {}

tokenF.css = (function() {
  let className = 'tokenF-rules'
  let rules = {}
      rules.main  = '#tokenF, #tokenF-header, #tokenF-list  {position: absolute;}\n'

  let start = function() {
    $('.' + className).remove()
    for (const ruleName in rules) {
      injectCSS(className, rules[ruleName])
    }
    
    // eventify the removal of these CSS rules
    $('body').on('uncss-tokenF',function() { $('.' + className).remove() })
    
    return true
  }

  return {
    start: start,
  }
})()
