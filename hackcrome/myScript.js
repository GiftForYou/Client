chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
  if(response.text==="start"){
    var arr1=[],arr2=[],result={};

    //MainTopic
    for (var i = 0; i < document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3sz').length; i++) {
      var obj={};
      obj.name=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3sz')[i].innerText;
      // var url=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3c_')[i].getAttribute("href")
      // window.open(url, '_blank')
      // chrome.tabs.create({ url: document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3c_')[i].getAttribute("href") });
      obj.count=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('_3d0')[i].innerText;
      arr1.push(obj);
    }

    //Detail
    // for (var j = 0; j < document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('fsm fwn fcg').length; j++) {
    //   var obj={};
    //   obj.group=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('fsm fwn fcg')[j].innerText;
    //   obj.name=document.getElementById('pagelet_timeline_medley_likes').getElementsByClassName('fsl fwb fcb')[j].innerText;
    //   arr2.push(obj);
    // }

    //MainTopic
    result.maintopic=arr1;

    //Detail
    // result.detail=arr2;

    sendResponse(result)
  }
})