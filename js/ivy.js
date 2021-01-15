/*
   Memory module
 */

ivy = (function() {
  let triggerMsg = 'ivy-'
  let keyhead    = 'blue-noise-ivy-'
   
  let initial = function() {
    if (!localStorage) {
      $('body').trigger(triggerMsg + 'storage-check', 'localStorage unavailable.')
      return
    }
    
  }


  return {

  }
})()