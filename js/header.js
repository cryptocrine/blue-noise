/*
   header manages output/input console, site jumps and scrolling feed     
 */

header = (function() {
  let headerContainer   = 'header'
  let IOContainer       = 'header-io'
  let sitejumpContainer = 'header-sitejumps'
  let sitejumps = [
    {key: 'FTX',     name: 'FTX',     use: true,  url: 'https://ftx.com/#a=cryptocrine'},
    {key: 'Binance', name: 'Binance', use: true,  url: 'https://www.binance.com/en/register?ref=Q9AQ1AQN'},
    {key: 'Deribit', name: 'Deribit', use: true,  url: 'https://www.deribit.com/'},
    {key: 'Bitmex',  name: 'Bitmex',  use: true,  url: 'https://www.bitmex.com/'},
    {key: 'Bybit',   name: 'Bybit',   use: false, url: 'https://www.bybit.com/'},
  ]
  
  let draw = function() {
    let d = ''
    let sitejumpTemplate  = ''
        sitejumpTemplate += '<div id="trading-platforms-container-__ID" class="trading-platform-holder" '
        sitejumpTemplate += 'onclick="header.jump(\'__ID\')">'
        sitejumpTemplate += '<div id="trading-platforms-__ID" class="trading-platform-icon">'
        sitejumpTemplate += '</div>'
        sitejumpTemplate += '</div>'
     
    // create header template
    d += '<div id="' + headerContainer + '">'
    d +=   '<div id="' + IOContainer + '"></div>'
    d +=   '<div id="' + sitejumpContainer + '"></div>'
    d += '</div>'
    $('#' + headerContainer).remove()
    $('body').append(d)
        
    // create & modify sitejumps
    sitejumps.forEach(function(site) {
      if (site.use) {
        d += sitejumpTemplate.replace(new RegExp('__ID','g'), site.name)
      }
    })
    $('#' + sitejumpContainer).empty().append(d)
  }
  
  let jump = function(name) {
    for (const site of sitejumps) {
      if (name == site.name) {
        window.open(site.url)
        break
      }
    }
  }

  return {
    draw: draw,
    jump: jump,
  }
})()
