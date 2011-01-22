var CrossDomainAjax = function(){
	var that = new Sink.comm.interface();
	that.url = null;
	that.data = null;
	that.method = null;
	
	that.init = function(){

	};
	that.send = function(spec){
	/*
		var req = JSON.parse(request);
		
		var method;
		var data = "";
		
		switch(req.type){
			case "node":
				var url ="http://"+that.uri+":"+that.port+"/"+req.type+"/"+req.payload.host+"/";
				method = "GET";
				url += req.payload.ressources;
				break;
				
			case "log":
				var url ="http://"+that.uri+":"+that.port+"/"+req.type+"/"+req.payload.host+"/";
				method = "GET";
				url += req.payload.ressources;
				break;
				
			case "order":
				method = "PUT";
				var url ="http://"+that.uri+":"+that.port+"/node/"+req.payload.host+"/";
				data = req.payload.body;
				var temp = req.payload.uri;
				temp = temp.replace("/data/","").replace("/","");
				url+=temp;
				break;
		}
		*/
		//if(spec.method==="PUT")alert(request);
		//if(spec.method==="GET")alert(request);
		crossdomain.request({
			url:spec.url,
			data:spec.data,
			method:spec.method,
			success:function(response){
				//if(method==="PUT")alert(response);
				//if(method==="GET")alert(response);
				that.onMessage(response);
			}
		});
	};
	
	return that;	
};

Sink.comm.provider.add("CrossDomainAjax", new CrossDomainAjax());