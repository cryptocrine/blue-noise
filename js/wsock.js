let sockets = {}

wsock = (function() {

  let make = function(uri, name, callbacks) {
    // close pre-existing socket if present
    
    // connect socket
    sockets[name] = connect(uri)
    sockets[name].onopen    = callbacks.open
    sockets[name].onmessage = callbacks.receive
    sockets[name].onclose   = callbacks.close
    sockets[name].onerror   = callbacks.error
  }

  let connect = function(uri) {
    try {
      return new WebSocket(uri)
    } catch(err) {
      console.log(err)
      $('body').trigger('msg','Error: ' + err)
    }
  }

  return {
    make  : make,
  }
})()