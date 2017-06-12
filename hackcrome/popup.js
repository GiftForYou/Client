var app = {
  result:null,
  init:function(){
    chrome.storage.sync.get('result', function(w) {
      app.result=w.result;
      app.addTable();
    });
  },
  onAnalize: function(){
    chrome.tabs.getSelected(null,function (tab) {
    var myNewUrl = tab.url+"/likes_all";
    chrome.tabs.update(tab.id, {url: myNewUrl});
    chrome.tabs.onUpdated.addListener(function(tabId , info) {
      if (info.status == "complete") {
        chrome.tabs.sendMessage(tab.id, {text: 'start'}, function (w) {
          chrome.storage.sync.set({'result': w.maintopic}, function() {
          // Notify that we saved.
          console.log('Settings saved');
          });
          app.result=w.maintopic;
          app.addTable();
        });
        axios.get('https://www.facebook.com/haryana.wisnu')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    });

  })
  },
  addTable : function(){
    var maintopic=this.result;
    if(maintopic){
      var sum = maintopic.reduce(function (initial, data) {
      let tmp = initial
      data.name !== "Semua Suka" ? tmp += parseInt(data.count) : null
      return tmp
    }, 0);

    let table = document.createElement("TABLE");
    table.setAttribute("style", "width: 40%;");

    let arrays = ["Category","Count"]

    let tableRow = document.createElement("TR")
    arrays.forEach(function(data){
      let tableHeader = document.createElement("TH")
      tableHeader.appendChild(document.createTextNode(data))
      tableRow.appendChild(tableHeader)
    })
    table.appendChild(tableRow)

    maintopic.forEach(function(obj){
      let tableRow1 = document.createElement("TR")
      if(obj.name !== "Semua Suka"){
        let tableDataName = document.createElement("TD")
        tableDataName.appendChild(document.createTextNode(obj.name))
        tableRow1.appendChild(tableDataName)
        let tableDataCount = document.createElement("TD")
        let persen = Math.floor((obj.count / sum) * 100)
        //console.log(persen,'%')
        tableDataCount.appendChild(document.createTextNode(`${persen}%`))
        tableRow1.appendChild(tableDataCount)
        table.appendChild(tableRow1)
      }
    })

    //console.log(table)
    document.getElementById("myResult").appendChild(table)
    // document.getElementById("result").innerHTML = JSON.stringify(w);
    }
    }
}
document.addEventListener('DOMContentLoaded',function () {
  //Analize -- baru maintopic
  app.init();
  document.getElementById("analize").addEventListener("click", app.onAnalize);

  //Rekomendasi--- kirim data result ke server, dapetin barang rekomendasinya
  //document.getElementById("recomendation").addEventListener("click"................
})
