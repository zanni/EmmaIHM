
var led0 = function(){
	
	var that = new Sink.widget.interface();
	
	that.html = "";

	that.init = function(host, resource){

	};
	
	that.render = function(host, resource){
		//var chart = Emma.WIDGET.provider.getService("chart");
		//return chart.render(host, resource);
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
		Sink.renderer.selected.appendHTML("#link-"+component.id, link);
		
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
			alert(component.parent.id);
			alert(component.name);
			alert('{"value":'+value+'}');
			Sink.controler.selected.order({
				
				host:component.parent.id,
				resource:component.name,
				//data:'{"value":'+value+'}',
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
