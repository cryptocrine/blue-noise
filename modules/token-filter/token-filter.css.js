/*
  Requires
    injectCSS
 */
 
tokenF = typeof tokenF != 'undefined' ? tokenF : {}

tokenF.css = (function() {
  let className = 'tokenF-rules'
  let rules = {}
      rules.main = `#tokenF {position: absolute;}`

  let start = function() {
    $('.' + className).remove()
    for (const ruleName in rules) {
      injectCSS('.' + className, rules[ruleName])
    }
  }

  return {
    start: start,
  }
})()
