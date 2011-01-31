
$.ajax({
	url:Emma.widget_path+"temperature/temperature.css",
	success:function(data){
		 $("<style></style>").appendTo("head").html(data);
	},
});	


var temperature = function(){
	
	var that = new  Sink.widget.interface();
	
	that.html = "";
	
	
	that.init = function(host, resource){
		//Emma.WIDGET.provider.getService("chart").init(host, resource);
	};
	
	that.render = function(component){
		var service = Sink.widget.provider.get("chart");
		service.render(component);
	}
	
	that.renderLink = function(component){
		resource = component.data;
		var html = UIComponent.link({
					id:component.id,
					name:component.name,
					leaf:component.leaf,
					style:component.link_style+" temperature",
					ico:Emma.widget_path+"temperature/resource/temperature.png",
					items:['<span class="toggle"><p>'+resource.data.value+' '+resource.data.unit+'</p></span>'],
				}).render();	
		Sink.renderer.selected.appendHTML("#link-"+component.id, html);
	}
	
	that.update = function(host, resource){
		
	};
	
	
	return that;
	
};
Sink.widget.provider.add("emma_temperature",new temperature());
