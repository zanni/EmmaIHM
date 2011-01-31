
$.ajax({
	url:Emma.widget_path+"brightness/brightness.css",
	success:function(data){
		 $("<style></style>").appendTo("head").html(data);
	},
});	

var brightness = function(){
	
	var that = new Sink.widget.interface();
		
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
					style:component.link_style+" brightness",
					ico:Emma.widget_path+"brightness/resource/brightness.png",
					items:['<span class="toggle"><p>'+resource.data.value+' '+resource.data.unit+'</p></span>'],
				}).render();	
		Sink.renderer.selected.appendHTML("#link-"+component.id, html);
	}
	
	that.update = function(host, resource){
		
	};
	
	
	return that;
	
};
Sink.widget.provider.add("emma_brightness",new brightness());
