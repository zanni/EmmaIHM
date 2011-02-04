var filesystem = function(){
	
	var that = new Sink.widget.interface();
	
	that.html = "";
	
	that.sendRequest = function(spec){
		
		
		crossdomain.request({
			url:spec.url,
			method:spec.method,
			success:spec.success
		});
	};
	
	that.init = function(){};
	
	that.render = function(component){
		
		
		
	}
		
	that.renderLink = function(component){
		//alert("link : "+component.id);


		var link = UIComponent.link({
					id:component.id,
					name:component.name,
					cls:"led0",
					ico : "resource/folder/itunes.png",
					leaf:component.leaf,
		}).render();
		$("#link-"+component.id).append(link);

		
		
	}
	
	that.update = function(component){

		
		
	};
	
	
	return that;
	
};
Sink.widget.provider.add("remoteservice_itunes",new itunes());

