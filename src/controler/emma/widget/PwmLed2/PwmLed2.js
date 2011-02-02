$.ajax({
	url:Emma.widget_path+"PwmLed2/PwmLed2.css",
	success:function(data){
		 $("<style></style>").appendTo("head").html(data);
	},
});	

var PwmLed2 = function(){
	var that = new Sink.widget.interface();
	
	that.init = function(){
		/*
		var name = "view";
		var url = Sink.widget.uri+name+"/"+name;
		$.ajax({
				url:url+".css",
				success:function(data){
					 $("<style></style>").appendTo("head").html(data);
			}
		});
		*/
	};
	that.render = function(component){
		var items = [];
		var resource = component.data;
		var widget = Sink.widget.provider.get("card");
		
		var slider = UIComponent.slider({
			id:"slider",
			init:{
				x:resource.data.value/100,
				steps: 11,
				snap: true,
				left:-1,
				right:-1,
				callback:function(x,y){
					Emma.order({
						host:component.parent.data.ip,
						resource:component.name,
						data:'{"value":'+Math.round(x*100)+'}',
					});	
				},
				animationCallback:function(x, y){
					$("#card-"+component.id+" .slider_info").html("<p class='value'>"+Math.round(x*100)+"</p><p class='unit'>"+resource.data.unit+"</p>");
				},
 
			}
		});
		
		
		widget.render(component, "<div class='slider_info'><p class='value'>"+resource.data.value+"</p><p class='unit'>"+resource.data.unit+"</p></div>"+ slider.render());
		
		
	};
	
	that.renderLink = function(component){
		resource = component.data;
		var html = UIComponent.link({
					id:component.id,
					name:component.name,
					leaf:component.leaf,
					style:component.link_style+" PwmLed2",
					ico:Emma.widget_path+"PwmLed2/resource/ico.png",
					items:['<span class="toggle"><p>'+resource.data.value+' '+resource.data.unit+'</p></span>'],
				}).render();	
		//Sink.renderer.selected.appendHTML("#link-"+component.id, html);
		$("#link-"+component.id).append(html);
	};
	
	that.update = function(component){
		var resource = component.data;
		var linkSelector = "#link-"+component.id;
		$(linkSelector+" span.toggle").html("<p>"+resource.data.value+' '+resource.data.unit+"</p>");
		
		
	};
	
	return that;
};

Sink.widget.provider.add("emma_PwmLed2", new PwmLed2());