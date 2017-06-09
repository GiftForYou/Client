document.addEventListener('DOMContentLoaded',function () {
  chrome.tabs.getSelected(null,function (tab) {

    chrome.tabs.sendMessage(tab.id, {text: 'start'}, function (w) {
      document.write(w)
      // alert(w);
    });
  })
})
