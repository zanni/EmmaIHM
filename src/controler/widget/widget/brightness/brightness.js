
var brightness = function(){
	
	var that = new Emma.WIDGET.interface();
	
	that.html = "";
	
	that.bindEvent = function(host, resource){
		
	};
	that.init = function(host, resource){
		Emma.WIDGET.provider.getService("chart").init(host, resource);
	};
	
	that.render = function(host, resource){
	
		var chart = Emma.WIDGET.provider.getService("chart");
		return chart.render(host, resource);
	}
	
	that.renderLink = function(component){
		resource = component.data;
		var html = UIComponent.list_link({
					id:component.id,
					name:component.name,
					leaf:component.leaf,
					style:component.link_style+" brightness",
					ico:Emma.WIDGET.uri+"brightness/resource/brightness.png",
					item:['<span class="toggle"><p>'+resource.data.value+' '+resource.data.unit+'</p></span>'],
				});	
		return html;
	}
	
	that.update = function(host, resource){
		
		that.bindEvent(host, resource);
	};
	
	
	return that;
	
};
Emma.WIDGET.provider.addService("brightness",new brightness());
