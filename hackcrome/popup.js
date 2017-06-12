function onAnalize(){
  chrome.tabs.getSelected(null,function (tab) {
    var myNewUrl = tab.url+"/likes_all";
    chrome.tabs.update(tab.id, {url: myNewUrl});
    chrome.tabs.onUpdated.addListener(function(tabId , info) {
      if (info.status == "complete") {
        chrome.tabs.sendMessage(tab.id, {text: 'start'}, function (w) {
          document.getElementById("result").innerHTML = JSON.stringify(w);
        });
      }
    });

  })
}

document.addEventListener('DOMContentLoaded',function () {
  //Analize -- baru maintopic
  document.getElementById("analize").addEventListener("click", onAnalize);

  //Rekomendasi--- kirim data result ke server, dapetin barang rekomendasinya
  //document.getElementById("recomendation").addEventListener("click"................
})
