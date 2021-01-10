// https://stackoverflow.com/a/11232541

;!function(e){e.fn.classes=function(t){var n=[];e.each(this,function(e,t){var r=t.className.split(/\s+/);for(var i in r){var s=r[i];if(-1===n.indexOf(s)){n.push(s)}}});if("function"===typeof t){for(var r in n){t(n[r])}}return n}}(jQuery);