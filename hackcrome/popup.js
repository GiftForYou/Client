function onAnalize(){
  chrome.tabs.getSelected(null,function (tab) {
    var myNewUrl = tab.url+"/likes_all";
    chrome.tabs.update(tab.id, {url: myNewUrl});
    chrome.tabs.onUpdated.addListener(function(tabId , info) {
      if (info.status == "complete") {
        chrome.tabs.sendMessage(tab.id, {text: 'start'}, function (w) {
          console.log(w.maintopic)
          // var table = ''
          // table += '<table style="width:40%">'
          //   table += '<tr>'
          //     table += '<th>'+ 'Like Category' +'</th>'
          //     table += '<th>'+ 'Persentase' +'</th>'
          //   table += '</tr>'
          // w.maintopic.forEach((data)=>{
          //   table += '<tr>';
          //     table += '<td>'+ data.name +'</td>'
          //     table += '<td>'+ data.like +'</td>'
          //   table += '</tr>';
          // })
          // table += '</table>'
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


          console.log(tableRow)
          document.getElementById("myResult").appendChild(table)
          // document.getElementById("result").innerHTML = JSON.stringify(w);
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
