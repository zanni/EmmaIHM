var CrossDomainAjax = function(){
	var that = new Sink.comm.interface();

	
	that.init = function(spec){
	};
	
	that.send = function(spec){
		
		
		//if(spec.method==="PUT")alert(request);
		crossdomain.request({
			url:spec.url,
			data:spec.data,
			method:spec.method,
			success:function(response){
				//if(method==="PUT")alert(response);
				//if(spec.method==="GET")alert(response);
				that.onMessage(response);
			}
		});
	};
	
	return that;	
};

Sink.comm.provider.add("CrossDomainAjax", new CrossDomainAjax());