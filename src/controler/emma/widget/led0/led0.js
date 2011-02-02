
$.ajax({
	url:Emma.widget_path+"led0/led0.css",
	success:function(data){
		 $("<style></style>").appendTo("head").html(data);
	},
});	

var led0 = function(){
	
	var that = new Sink.widget.interface();
	
	that.init = function(){};
	
	that.render = function(component){
		//var chart = Emma.WIDGET.provider.getService("chart");
		var service = Sink.widget.provider.get("chart");
		service.render(component);
	}
	
	that.renderLink = function(component){
		//alert("link : "+component.id);


		var link = UIComponent.link({
					id:component.id,
					name:component.name,
					cls:"led0",
					//ico:Sink.widget.uri+"emma_led0/resource/on.png",
					leaf:component.leaf,
					items:['<span class="toggle"><input type="checkbox"></input></span>'],
		}).render();
		//Sink.renderer.selected.appendHTML("#link-"+component.id, link);
		$("#link-"+component.id).append(link);
		
		var linkSelector = "#link-"+component.id;
		if(component.data.data.value === 0){
			$(linkSelector+" input").attr('checked', false);
			$(linkSelector+" img").removeClass("on");

		}
		else {
			$(linkSelector+" input").attr('checked', true);
			$(linkSelector+" img").addClass("on");
		}

		$(linkSelector+" input").bind('click',function(){
			var value;
			if(component.data.data.value === 0) value = 1;
			else value = 0;

			Emma.order({
				host:component.parent.data.ip,
				resource:component.name,
				data:'{"value":'+value+'}',
			});		
		});
		
		
	}
	
	that.update = function(component){
		var resource = component.data;
		var linkSelector = "#link-"+component.id;
	
		if(resource.data.value === 0){
			$(linkSelector+" img").removeClass("on");

		}
		else{
			$(linkSelector+" img").addClass("on");
		}
		
		
	};
	
	
	return that;
	
};
Sink.widget.provider.add("emma_led0",new led0());
