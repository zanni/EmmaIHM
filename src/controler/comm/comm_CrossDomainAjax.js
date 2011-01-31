var CrossDomainAjax = function(){
	var that = new Sink.comm.interface();

	
	that.init = function(){};
	
	that.send = function(spec){
		//if(spec.method==="GET")alert(JSON.stringify(spec));
		//if(spec.method==="PUT")alert(spec.data);
		crossdomain.request({
			url:spec.url,
			data:spec.data,
			method:spec.method,
			success:spec.success
		});
	};	
	return that;	
};

Sink.comm.provider.add("CrossDomainAjax", new CrossDomainAjax());