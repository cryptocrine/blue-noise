/*
   Websocket module
 */

iris = (function() {
  let eventNotify = 'blue-noise-iris-' + 'notify'

  let dictionary = {}  // data & options for each API 
  let mapped     = {}  // socket <-> client 
  let running    = {}  // sockets

  let wipe = function() {
    for (const socket of running) {
      drop(socket)
    }
  }

  let list = function() {

  }

  let make = function(datum) {
    let url = datum.url
    if (!dictionary[datum.name]) {
      dictionary[datum.name] = datum
    }
    if (!running[datum.name] || !running[datum.name].readyState) {
      connect(datum)
    } else if (running[datum.name].readyState !== WebSocket.CLOSED && 
               running[datum.name].readyState !== WebSocket.CLOSING ? true : false) {
      console.log('Socket already open for (' + datum.name + ').')
      $('body').trigger(eventNotify, 'Socket already open for ' + datum.name + '.')
    } else { 
      connect(datum)
    }
  }

  let connect = function(datum) {
    let name = datum.name
    running[name] = new WebSocket(datum.uri)
    running[name].onopen    = datum._open
    running[name].onmessage = datum._message
    running[name].onclose   = datum._close
    running[name].onerror   = datum._error
  }

  let join = function(datum) {
    
  }

  let drop = function() {

  }

  return {
    data   : function() { return [running, mapped, dictionary] },
    sockets: function() { return running },
    wipe   : wipe,
    make   : make,
    join   : join,
    grab   : function(name) { return running[name] },
  }
})()