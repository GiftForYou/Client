var background = {
	result:null,
	init :function() {
		chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
			if(request.fn in background){
				background[request.fn](request,sender,sendResponse);
			}		
		});
	},
	setResult:function(request,sender,sendResponse){
		this.result=request.data;
	},
	getResult:function(request,sender,sendResponse){
		sendResponse(this.result);
	}
}

background.init();