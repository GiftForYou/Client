
// chrome.browserAction.onClicked.addListener(function(port){
//   // var newURL = "http://stackoverflow.com/";
//   // chrome.tabs.create({ url: newURL });
//
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({"farewell": "goodbye"});
  });