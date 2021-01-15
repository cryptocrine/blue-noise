
iris = typeof iris != 'undefined' ? iris : {}

iris.ftx = (function() {
  let eventNotify = 'blue-noise-iris-' + '-notify'
  let name = 'ftx'
  let datum = {}

  let initialInstructions = [
    {
      op: 'subscribe',
      channel: 'markets',
    },
/*
    {
      op: 'subscribe',
      market: 'BTC-PERP',
      channel: 'trades',
    },
 */
    {
      op: 'subscribe',
      market: 'BTC-PERP',
      channel: 'orderbook',
    },
  ]

  let open = function(e) {
    $('body').trigger(eventNotify,'Connected to FTX.')
    let socket = iris.grab(name)
    initialInstructions.forEach(function(instruction) {
      socket.send(JSON.stringify(instruction))
    })
  }
  
  let message = function(e,v) {
    // console.log(e)
    let data = e.data
    try {
      data = JSON.parse(data)
    } catch(err) {
      $('body').trigger(eventNotify,'Error with data received from FTX, see console.')
      console.log(e)
      console.log(err)
    }
    /* Data Cases */
    switch(data.channel) {
      case 'markets':
        // assignment
        datum.markets = data.data
        break;
      case 'trades':
        break;
      case 'orderbook':
        if (data.type == 'partial') {
          console.log('Orderbooks for BTC-PERP')
          console.log(data)
        } else if (data.type == 'update') {
          console.log(data.data)
        }
        break;
      default:
        break;
    } 
  }
  
  let close = function() {

  }
 
  let error = function() {

  }

  return {
    name     : name,
    uri      : 'wss://ftx.com/ws/',
    reference: 'https://docs.ftx.com/#websocket-api',
    eventName: eventNotify,
    data     : function() { return datum },
    _open    : open,
    _message : message,
    _close   : close,
    _error   : error,
  }
})()