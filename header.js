/*
   header manages output/input console, site jumps and scrolling feed     
 */

header = (function() {
  let websiteName        = 'blue n&oslash;ise'

  // let container          = 'main'
  let containerHeader    = 'header'
  let containerTitle     = 'header-title'
  let containerIO        = 'header-io'
  let containerSitejump  = 'header-sitejumps'
  let containerClock     = 'header-clocks'
  let containerPriceFeed = 'header-pricefeed'
  let containerSettings  = 'header-settings'
  let classSitejump      = 'trading-platform-icon'
  let sitejumps = [
    {key: 'FTX',     name: 'FTX',     use: true,  url: 'https://ftx.com/#a=cryptocrine'},
    {key: 'Binance', name: 'Binance', use: true,  url: 'https://www.binance.com/en/register?ref=Q9AQ1AQN'},
    {key: 'Deribit', name: 'Deribit', use: true,  url: 'https://www.deribit.com/'},
    {key: 'Bitmex',  name: 'Bitmex',  use: false, url: 'https://www.bitmex.com/'},
    {key: 'Bybit',   name: 'Bybit',   use: true,  url: 'https://www.bybit.com/'},
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
    d += '<div id="' + containerHeader + '" class="top">'
    d +=   '<div id="' + containerTitle + '"">' + websiteName + '</div>'
    d +=   '<div id="' + containerIO + '"></div>'
    d +=   '<div id="' + containerSitejump + '"></div>'
    d +=   '<div id="' + containerClock + '"></div>'
    d +=   '<div id="' + containerPriceFeed + '"></div>'
    d +=   '<div id="' + containerSettings + '"></div>'
    d += '</div>'
    $('#' + containerHeader).remove()
    $('body').append(d) // not sure if we want to include it into #main or the 'body'
        
    // create & modify sitejumps
    d = ''
    sitejumps.forEach(function(site) {
      if (site.use) {
        d += sitejumpTemplate.replace(new RegExp('__ID','g'), site.name)
      }
    })
    $('#' + containerSitejump).empty().append(d)
    
    // modify the console
    d = ''
    d += '<div id="' + containerIO + '-out' + '" class="collapsed">'
    d +=   '<div id="' + containerIO + '-pre"><br><br></div>'
    d +=   'testing text\nmaybe one day 34asdasdasdasdasdasdasdasdas'
    d += '</div>'
    d += '<div id="' + containerIO + '-cli' + '">'
    d +=   '<div id="' + containerIO + '-expand' + '" class="arrow-down" onclick="header.ioToggle()"></div>'
    d +=   '<input id="' + containerIO + '-input' + '" placeholder="welcome to blue-noise"></div>'
    d += '</div>'
    $('#' + containerIO).append(d)
    
    // behaviours
    behaviours()
  }
  
  let behaviours = function() {
    $('.' + classSitejump).on('mouseover', function() {
      $('.' + classSitejump).parent().removeClass('active')
      $(this).parent().addClass('active')
    }).on('mouseleave', function() {
      $('.' + classSitejump).parent().removeClass('active')
    })
  }
  
  let jump = function(name) {
    for (const site of sitejumps) {
      if (name == site.name) {
        window.open(site.url)
        break
      }
    }
  }
  
  // IO Functions
  let ioToggle = function() {
    let w = $('#' + containerIO)
    let v = $('#' + containerIO + '-expand') 
    let c = w.classes()
    if (c.indexOf('expanded') > -1) {
      w.addClass('collapsed').removeClass('expanded')
      v.addClass('arrow-down').removeClass('arrow-up')
    } else {
      w.addClass('expanded').removeClass('collapsed')
      v.addClass('arrow-up').removeClass('arrow-down')
    }
  }

  return {
    draw: draw,
    jump: jump,
    
    ioToggle: ioToggle,
  }
})()
