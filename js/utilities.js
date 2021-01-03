utilities = (function() {
  /* https://stackoverflow.com/a/2901298 */
  let commaThis = function(x) {
    if (typeof x == 'undefined') { return 0 }
    var parts = x.toString().split('.')
    parts[0]  = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,',')
    return parts.join('.') }

  let random = function(ceiling, min) {
     if (min && min > ceiling) { [ceiling, min] = [min, ceiling] }
     let c = ceiling || 1
     let m = min     || 0
     return (c - m) * Math.random() + m }

  let clone = function(obj) {
     var copy;
     if (null == obj || 'object' != typeof obj) { return obj }
     if (obj instanceof String) { return (' ' + obj).slice(1) } // https://stackoverflow.com/a/31733628
     if (obj instanceof Date) { 
       copy = new Date()
       copy.setTime(obj.getTime())
       return copy }
     if (obj instanceof Array) {
       copy = []
       for (var i = 0, len = obj.length; i < len; i++) { copy[i] = clone(obj[i]) }
       return copy }
     if (obj instanceof Object) {
       copy = {}
       for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = clone(obj[attr]) } }
       return copy }
     throw new Error('Unable to copy object! Type not supported.') }
 
   return {
     clone      : clone,
     commaThis  : commaThis,
     random     : random,
   }
})()

// Global exposure
window.clone     = utilities.clone
window.commaThis = utilities.commaThis
window.random    = utilities.random
