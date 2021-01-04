tokenF = typeof tokenF != 'undefined' ? tokenF : {}

tokenF.options = (function() {
  let optionsMeta = {
    keyhead: 'blue-noise-tokenF-options',
    eventNotify: 'blue-noise-tokenF-' + 'notify',
  }

  let optionsDrawing = {
    containerID      : 'tokenF',
    containerListID  : 'tokenF-list',
    containerHeaderID: 'tokenF-header',
    
    subheadersID     : '.tokenF-header-element.sub',
    subelementsID    : '.tokenF-element:not(.exclude)',
    
    headerCloseID    : 'tokenF-header-close',
    
    headerHeight     : 32,
    headerTop        : 28,
    offsetLeft       : 49,
    offsetTop        : 74,
    heightPercentile : 88, // offsetTop
    collapsedWidth   : 'calc(333px + 1.3em + 1.2em + 1.2em)',
  }
  
  let optionsFilter = [
    {key: 'exclusionList',      use: true, 
      default: ['USDT','USDC','BUSD','PAX','TUSD','AUSDC','SUSD','USDK','BAC','SBTC','HUSD','GUSD','CUSDT','1INCH'] },
    {key: 'inclusionList',      use: true,  default: ['BTC','FTT','TVK'] },
    {key: 'liquidityThreshold', use: true,  default: 0.11,  minimum: 0.1,   maximum: 100},
    {key: 'supplyThreshold',    use: true,  default: 0.05,  minimum: 0.0,   maximum: 100},
    {key: 'marketCapMinimum',   use: true,  default: 15000000 },
    {key: 'marketCapMaximum',   use: true,  default: 90000000 },
    {key: 'pricePoint',         use: true,  default: 0.05,  minimum: 0.0,   maximum: 100},
    {key: 'minimumPrice',       use: true,  default: 0.01,  },
    {key: 'maximumPrice',       use: true,  default: 1000,  },
    {key: 'pageLimit',          use: true,  default: 4,     minimum: 1,     maximum: 33 }, // 3 = 2, 2 = 1
    {key: 'postHoc',            use: true,  default: true,  },
    {key: 'coinMinAge',         use: true,  default: 7,     minimum: 1,     maximum: 0},
    {key: 'coinMaxAge',         use: true,  default: 500,   minimum: 1,     maximum: 800},
  ]
  
  let loadOptions = function() {
    // construct option keys for required portions
    let keyheadDrawing = optionsMeta.keyhead + '-drawing'
    let keyheadFilter  = optionsMeta.keyhead + '-filter'
    if (!localStorage) { 
      $('body').trigger(optionsMeta.eventNotify,'window.localStorage not available.')
      return false
    }
    let drawingOptions = localStorage.getItem(keyheadDrawing)
    if (drawingOptions) {
      drawingOptions = JSON.parse(drawingOptions)
      for (const key in drawingOptions) {
        if (!optionsDrawing[key]) {
          console.log('Adding key "' + key + '" to tokenF.options.optionsDrawing.')
        } else {
          console.log('Replacing key "' + key + '" for tokenF.options.optionsDrawing.')
        }
        optionsDrawing[key] = drawingOptions[key]
      }
    }
    let filterOptions = localStorage.getItem(keyheadFilter)
    if (filterOptions) {
      filterOptions = JSON.parse(filterOptions)
      // this is a computationally costly operation, but is a small object so...
      for (const index in filterOptions) {
        let key = filterOptions[index].key
        let r   = optionsFilter.forEach(function(item, i) {
          if (item.key == key) { return i }
          return false
        })
        if (!r) {
          console.log('Adding key "' + key + '" to tokenF.options.optionsFilter.')
        } else {
          console.log('Replacing key "' + key + '" for tokenF.options.optionsFilter from browser memory.')
        }
        optionsFilter[i] = filterOptions[index]
      }
    }
    return [optionsDrawing, optionsFilter]
  }
  
  let saveOptions = function() {
    // construct option keys for required portions
    let keyheadDrawing = optionsMeta.keyhead + '-drawing'
    let keyheadFilter  = optionsMeta.keyhead + '-filter'
    if (!localStorage) { 
      $('body').trigger(optionsMeta.eventNotify,'window.localStorage not available.')
      return false
    }
    try {
     let drawingOptions = JSON.stringify(optionsDrawing)
     let filterOptions  = JSON.stringify(optionsFilter)
     localStorage.setItem(keyheadDrawing, JSON.stringify(optionsDrawing))
     localStorage.setItem(keyheadFilter,  JSON.stringify(optionsFilter))
    } catch(err) { $('body').trigger(optionsMeta.eventNotify,'error saving options.') }
    return true
  }
 
  return {
    // Getters & Setters
    setMeta      : function(k,v) { optionsMeta[k] = v; return optionsMeta },
    drawingValues: function() { return optionsDrawing },
    filterValues : function() { return optionsFilter },
    // Functions
    load         : loadOptions,
    save         : saveOptions,
  }
})()
