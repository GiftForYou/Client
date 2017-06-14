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
          // console.log(w)

          var sum = w.maintopic.reduce(function (initial, data) {
            let tmp = initial
            data.name !== "Semua Suka" ? tmp += parseInt(data.count) : null
            return tmp
          }, 0);

          let table = document.createElement("TABLE");
          table.setAttribute("class", "ui orange celled table");

          let arrays = ["Category","Percentase"]

          let tHead = document.createElement("THEAD")
          let tableRow = document.createElement("TR")
          arrays.forEach(function(data){
            let tableHeader = document.createElement("TH")
            tableHeader.appendChild(document.createTextNode(data))
            tableRow.appendChild(tableHeader)
          })
          tHead.appendChild(tableRow)
          table.appendChild(tHead)

          let tBody = document.createElement("TBODY")

          w.maintopic.forEach(function(obj, index){
            let tableRow1 = document.createElement("TR")
            if(index%2 === 0){
              index%4 === 0 ? tableRow1.setAttribute("class", "warning") : tableRow1.setAttribute("class", "positive");
            }
            if(obj.name !== "Semua Suka"){
              let tableDataName = document.createElement("TD")
              tableDataName.appendChild(document.createTextNode(obj.name))
              tableRow1.appendChild(tableDataName)
              let tableDataCount = document.createElement("TD")
              let persen = Math.floor((obj.count / sum) * 100)
              tableDataCount.appendChild(document.createTextNode(`${persen}%`))
              tableRow1.appendChild(tableDataCount)
              tBody.appendChild(tableRow1)
            }
          })

          table.appendChild(tBody)
          document.getElementById("selfresult").appendChild(table)
          console.log(app)
          // document.getElementById("result").innerHTML = JSON.stringify(w);
        });
      }
    });
  })
  },
  addRecomend : function(){
    let dummy = {"maintopic": [
              {
                  "name": "semua suka",
                  "count": 119
              },
              {
                  "name": "film",
                  "count": 2
              },
              {
                  "name": "atlet",
                  "count": "4"
              }
          ],
          "detail": [
              {
                  "name": "semua suka",
                  "data": [
                      "chealsea",
                      "nasi goreng",
                      "john terry fansclub",
                      "chealsea tangerang",
                      "chealsea indo",
                      "fast on farius 8",
                      "falcon picture"
                  ]
              },
              {
                  "name": "film",
                  "data": [
                      "fast on farius 8",
                      "falcon picture"
                  ]
              },
              {
                  "name": "atlet",
                  "data": [
                      "chealsea",
                      "john terry fansclub",
                      "chealsea tangerang",
                      "chealsea indo"
                  ]
              }
          ]
      }

    fetch('http://localhost:3000/recomendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: dummy,
      })
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data.hasil)
      data.hasil.forEach((obj,index)=>{
        let alpha = document.createElement("a")
        alpha.setAttribute("class", "teal card")
        alpha.setAttribute("href", "https://www.bukalapak.com/p/rumah-tangga/home-stuff/z2a6-jual-balmut-chealsea")
        let divImage = document.createElement("div")
        divImage.setAttribute("class", "image")
        let image = document.createElement("img")
        image.setAttribute("src", "https://s2.bukalapak.com/img/2021773/large/image-52045417-480x272.jpg")
        divImage.appendChild(image)
        alpha.appendChild(divImage)
        let divExtra = document.createElement("div")
        divExtra.setAttribute("class", "extra")
        divExtra.appendChild(document.createTextNode('Description'))
        alpha.appendChild(divExtra)
        console.log(alpha)
        document.getElementById("selfrecomend").appendChild(alpha)

      })

      // document.getElementById("selfrecomend").append(JSON.stringify(data.hasil))
    })
  }
}
document.addEventListener('DOMContentLoaded',function () {
  //Analize -- baru maintopic
  // app.init();
  document.getElementById("analize").addEventListener("click", app.onAnalize);
  document.getElementById("selfRecomendation").addEventListener("click", app.addRecomend);

  //Rekomendasi--- kirim data result ke server, dapetin barang rekomendasinya
  //document.getElementById("recomendation").addEventListener("click"................
})
