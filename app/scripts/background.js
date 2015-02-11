/*chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(request) {
    var storageService = new markticleStorageService();
    if(request.action === 'add') {
      storageService.add(request.data);
    }
  }
});*/
/*
chrome.extension.onMessage.addListener(

    function(request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
    } 
});
*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.text == "getStuff") {
      console.log('test sent');
      sendResponse({type: "test"});
    }
});