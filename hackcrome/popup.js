
function onAnalize(){
  chrome.tabs.getSelected(null,function (tab) {
    var myNewUrl = tab.url+"/likes_all";
    chrome.tabs.update(tab.id, {url: myNewUrl});
    chrome.tabs.onUpdated.addListener(function(tabId , info) {
      if (info.status == "complete") {
        chrome.tabs.sendMessage(tab.id, {text: 'start'}, function (w) {
          console.log(w)

          var sum = w.maintopic.reduce(function (initial, data) {
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

          w.maintopic.forEach(function(obj){
            let tableRow1 = document.createElement("TR")
            if(obj.name !== "Semua Suka"){
              let tableDataName = document.createElement("TD")
              tableDataName.appendChild(document.createTextNode(obj.name))
              tableRow1.appendChild(tableDataName)
              let tableDataCount = document.createElement("TD")
              let persen = Math.floor((obj.count / sum) * 100)
              tableDataCount.appendChild(document.createTextNode(`${persen}%`))
              tableRow1.appendChild(tableDataCount)
              table.appendChild(tableRow1)
            }
          })

          document.getElementById("myResult").appendChild(table)
          // document.getElementById("result").innerHTML = JSON.stringify(w);

          fetch('http://localhost:3000/recomendation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              recomendation: w.maintopic,
            })
          })
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



