/*
   header manages output/input console, site jumps and scrolling feed 
   
   pricefeedConnect() requires wsock
   metronome() requires commaThis
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
  
  let pricefeedAPI  = 'wss://ws-feed.pro.coinbase.com'
  let pricefeedName = 'coinbase'
  let pricefeedSubscription = {
    type: 'subscribe',
    channels: [{ 
      name: 'ticker',
      product_ids: ['BTC-USD'], // ,'ETH-USD'],
    }]
  }
  
  let begin = function() {
    draw()
    pricefeedPopulate()
    pricefeedConnect()
    
    // start the metronome
    metronomic = true
    metronome()
  }
  
  let draw = function() {
    let d = ''
    // template
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
        
    // header-sitejumps
    d = ''
    let sitejumpTemplate  = ''
        sitejumpTemplate += '<div id="trading-platforms-container-__ID" class="trading-platform-holder" '
        sitejumpTemplate += 'onclick="header.jump(\'__ID\')">'
        sitejumpTemplate += '<div id="trading-platforms-__ID" class="trading-platform-icon">'
        sitejumpTemplate += '</div>'
        sitejumpTemplate += '</div>'
    sitejumps.forEach(function(site) {
      if (site.use) {
        d += sitejumpTemplate.replace(new RegExp('__ID','g'), site.name)
      }
    })
    $('#' + containerSitejump).empty().append(d)
    
    // header-io
    d = ''
    d += '<div id="' + containerIO + '-out' + '" class="collapsed">'
    d +=   '<div id="' + containerIO + '-pre"><br><br><br>'
    d +=   'testing text\nmaybe one day 34asdasdasdasdasdasdasdasdas'
    d +=   '</div>'
    d += '</div>'
    d += '<div id="' + containerIO + '-cli' + '">'
    d +=   '<div id="' + containerIO + '-expand' + '" class="arrow-down" onclick="header.ioToggle()"></div>'
    d +=   '<input id="' + containerIO + '-input' + '" placeholder="welcome to blue-noise"></div>'
    d += '</div>'
    $('#' + containerIO).append(d)
    
    // header-pricefeed
    d = ''
    d += '<div id="' + containerPriceFeed + '-display"></div>'
    d += '<div id="' + containerPriceFeed + '-selector"></div>'
    d += '<div id="' + containerPriceFeed + '-expand" class="arrow-down" onclick=""></div>'
    d += '<div id="' + containerPriceFeed + '-search"></div>'
    $('#' + containerPriceFeed).append(d)
    
    // behaviours
    behaviours()
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
  let ioQueue = []
  let ioPush = function(msg) {
    
  }
  let ioPublish = function(msg) {
    
  }
  
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
  
  // PriceFeed Functions
  let pricefeedList = [{key: 'BTC-USD', display: 'BTC'},{key: 'ETH-USD', display: 'ETH'}]
  let pricefeedAggregate = {
    ['BTC-USD']: {
      key: 'BTC', price: 0, 
      sell:{volume:0,price:0,count:0,sizes:0},
      buy:{volume:0,price:0,count:0,sizes:0}},
  }
  let pricefeedConnect = function() {
    let callbacks = {
      open   : pricefeedOpen,
      receive: pricefeedReceive,
      close  : function() { console.log('Closed connection.') },
    }
    wsock.make(pricefeedAPI,'coinbase',callbacks)
  }
  let pricefeedOpen = function() {
    sockets[pricefeedName].send(JSON.stringify(pricefeedSubscription))
  }
  let pricefeedReceive = function(ev) {
    let data = JSON.parse(ev.data)
    if (data.type != 'ticker') { return } // here
    
    let product = data.product_id
    let side    = data.side
    let size    = parseFloat(data.last_size)
    let price   = parseFloat(data.price)
    let vol     = size * price
    
    let aggr    = pricefeedAggregate[product]
    
    aggr[side].volume += vol
    aggr[side].price   = ((aggr[side].price * aggr[side].count) + price) / (aggr[side].count + 1)
    aggr[side].sizes   = ((aggr[side].sizes * aggr[side].count) + size) / (aggr[side].count + 1)
    aggr[side].count   = aggr[side].count + 1
    aggr.price = price
    
    // console.log(aggr)
  }
  let pricefeedPopulate = function() {
    // get a list here, use default for now
    let d = ''
    let template = ''
        template += '<div id="header-pricefeed-__ID" class="header-pricefeed-item">'
        template += '<div id="header-pricefeed-__NAME" class="header-pricefeed-name">__DISPLAY</div>'
        template += '<div id="header-pricefeed-__VALUE" class="header-pricefeed-value">'
        template +=   '<div id="header-pricefeed-__VBUY" class="header-pricefeed-buy"></div>'
        template +=   '<div id="header-pricefeed-__VACTUAL" class="header-pricefeed-price"></div>'
        template +=   '<div id="header-pricefeed-__VSELL" class="header-pricefeed-sell"></div>'
        template += '</div>'
        template += '<div id="header-pricefeed-__BIAS" class="header-pricefeed-bias"></div>'
        template += '</div>'
    let list = pricefeedList
    let outp = []
    list.forEach(function(item) {
      pricefeedAggregate[item.key] = {key: item.display, price: 0, sell:{volume:0,price:0,count:0,sizes:0}, buy:{volume:0,price:0,count:0,sizes:0}}
      outp.push(item.key)
      d = template
           .replace('__ID',item.display)
           .replace('__DISPLAY',item.display)
           .replace('__VALUE', item.display + '-value')
           .replace('__VBUY', item.display + '-buy')
           .replace('__VACTUAL', item.display + '-price')
           .replace('__VSELL', item.display + '-sell')
      $('#' + containerPriceFeed + '-display').append(d)
    })
    pricefeedSubscription.channels = [{ 
      name: 'ticker',
      product_ids: outp,
    }]
  }
  
  /* Behaviours */
  let behaviours = function() {
    // sitejumps
    $('.' + classSitejump).on('mouseover', function() {
      $('.' + classSitejump).parent().removeClass('active')
      $(this).parent().addClass('active')
    }).on('mouseleave', function() {
      $('.' + classSitejump).parent().removeClass('active')
    })
    
    // pricefeed
  }
  
  /* Header's metronome */
  let metronomic = false
  let metronome = function() {
    if (!metronomic) { return }
    
    for (const key in pricefeedAggregate) {
      let item = pricefeedAggregate[key]
      $('#header-pricefeed-' + item.key + '-buy').empty().append(commaThis(item.buy.price.toFixed(1)))
      $('#header-pricefeed-' + item.key + '-sell').empty().append(commaThis(item.sell.price.toFixed(1)))
      $('#header-pricefeed-' + item.key + '-price').empty().append(commaThis(item.price.toFixed(1)))
    }
    
    setTimeout(metronome, 1000)
  }

  return {
    begin: begin,
    draw : draw,
    jump : jump,
    
    ioToggle: ioToggle,
    
    pfData  : function() { return pricefeedAggregate },
  }
})()
