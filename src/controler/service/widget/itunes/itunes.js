/*
var itunes = function(spec){
	
	var that = new Emma.WIDGET.interface();
	
	that.html = "";
	
	
	
	that.sendRequest = function(spec){
		
		
		crossdomain.request({
			url:spec.url,
			method:spec.method,
			success:spec.success
		});
	};
	
	that.bindEvent = function(host, resource){
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		$(cardSelector+" #playpause").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/playpause",
				method:"GET",	
				success:function(){
					
					that.sendRequest({
						url:resource.uri+"/player_state",
						method:"GET",	
						success:function(player_state){
							switch($.trim(player_state)){
								case "paused" :
									$(cardSelector+" #playpause").addClass("play");
									break;
								
								case "playing" :
									
									$(cardSelector+" #playpause").removeClass("play");
									break;
							}
						}
					});
				}
			});
		});
		
		$(cardSelector+" #previous").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/previous",
				method:"GET",	
			});
		});
		$(cardSelector+" #next").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/next",
				method:"GET",	
			});
		});
		$(cardSelector+" #stop").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/stop",
				method:"GET",	
			});
		});
		$(cardSelector+" #mute").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/mute",
				method:"GET",	
			});
		});
		$(cardSelector+" #volume_down").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/volume_down",
				method:"GET",	
			});
		});
		$(cardSelector+" #volume_up").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/volume_up",
				method:"GET",	
			});
		});
	};
	
	that.init = function(host, resource){
		
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		
		//init playpause img
		that.sendRequest({
			url:resource.uri+"/player_state",
			method:"GET",	
			success:function(player_state){
				switch($.trim(player_state)){
					case "paused" :
						$(cardSelector+" #playpause").addClass("play");
						break;
					
					case "playing" :
						$(cardSelector+" #playpause").removeClass("play");
						break;
				}
			}
		});
		
		//get all playlist
		
		that.sendRequest({
			url:that.resource.uri+"/current_artwork",
			method:"GET",	
			success:function(playlist){
				alert(playlist);
			}
		});
		
		
		
	};
	
	that.render = function(host, resource){
		
		return that.html;
	};
	
	that.renderLink = function(component){
		var html = UIComponent.list_link({
					id:component.id,
					name:component.name,
					leaf:component.leaf,
					style:component.link_style+" led0",
					ico:Emma.WIDGET.uri+"itunes/resource/itunes.png",
				});	
		return html;
	}
	
	that.update = function(host, resource){
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		var linkSelector = "#link-"+host.id+"-"+resource.name;
		if(resource.data.value === 0){
			$(cardSelector+" img").removeClass("on");
			$(linkSelector+" img").removeClass("on");

		}
		else{
			$(cardSelector+" img").addClass("on");
			$(linkSelector+" img").addClass("on");
		}
		
		that.bindEvent(host, resource);
	};
	
	
	return that;
	
};

Emma.WIDGET.provider.addService("itunes",new itunes());
/*


var led0 = function(){
	
	var that = new Emma.WIDGET.interface();
	
	that.html = "";
	
	that.bindEvent = function(host, resource){
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		$(cardSelector+" input").unbind('click');
		$(cardSelector+" input").bind('click',function(){
	
			var value;
			if(resource.data.value === 0) value = 1;
			else value = 0;

			controler.sendOrder({
				host:host.data.ip,
				resource:resource.name,
				uri:"/data/"+resource.name+"/",
				method:"PUT",
				body:'{"value":'+value+'}',
			});		
		});
	};
	that.init = function(host, resource){
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		
		//bind checkbox
		
		that.bindEvent(host, resource);
		
		//init checkbox
		if(resource.data.value === 0){
			$(cardSelector+" input").attr('checked', false);
			$(cardSelector+" img").removeClass("on");

		}
		else {
			$(cardSelector+" input").attr('checked', true);
			$(cardSelector+" img").addClass("on");
		}
		
		
	};
	
	that.render = function(host, resource){
		var html = that.html.replace("{value}",resource.data.value);
		
		return html;
	}
	
	that.renderLink = function(component){
		var html = UIComponent.list_link({
					id:component.id,
					name:component.name,
					leaf:component.leaf,
					style:component.link_style+" led0",
					//ico:Emma.WIDGET.uri+"led0/resource/on.png",
				});	
		return html;
	}
	
	that.update = function(host, resource){
		var cardSelector = "#card-"+host.id+"-"+resource.name;
		var linkSelector = "#link-"+host.id+"-"+resource.name;
		if(resource.data.value === 0){
			$(cardSelector+" img").removeClass("on");
			$(linkSelector+" img").removeClass("on");

		}
		else{
			$(cardSelector+" img").addClass("on");
			$(linkSelector+" img").addClass("on");
		}
		
		that.bindEvent(host, resource);
	};
	
	
	return that;
	
};
Emma.WIDGET.provider.addService("led0",new led0());


*/


$.ajax({
	url:service.widget_path+"itunes/itunes.css",
	success:function(data){
		 $("<style></style>").appendTo("head").html(data);
	},
});	

var itunes = function(){
	
	var that = new Sink.widget.interface();
	
	that.html = "";
	
	$.ajax({
		url:service.widget_path+"itunes/itunes.html",
		success:function(data){
			 that.html = data;
		},
	});
	
	that.sendRequest = function(spec){
		
		
		crossdomain.request({
			url:spec.url,
			method:spec.method,
			success:spec.success
		});
	};
	
	that.init = function(){};
	
	that.render = function(component){
		
		var card = Sink.widget.provider.get("card");
		card.render(component, that.html);
		
		var host = component.parent;
		var resource = component.data;
		
		var cardSelector = "#card-"+host.id+"-"+resource.data.name;
		$(cardSelector+" #playpause").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/playpause",
				method:"GET",	
				success:function(){
					
					that.sendRequest({
						url:resource.uri+"/player_state",
						method:"GET",	
						success:function(player_state){
							switch($.trim(player_state)){
								case "paused" :
									$(cardSelector+" #playpause").addClass("play");
									break;
								
								case "playing" :
									
									$(cardSelector+" #playpause").removeClass("play");
									break;
							}
						}
					});
				}
			});
		});
		
		$(cardSelector+" #previous").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/previous",
				method:"GET",	
			});
		});
		$(cardSelector+" #next").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/next",
				method:"GET",	
			});
		});
		$(cardSelector+" #stop").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/stop",
				method:"GET",	
			});
		});
		$(cardSelector+" #mute").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/mute",
				method:"GET",	
			});
		});
		$(cardSelector+" #volume_down").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/volume_down",
				method:"GET",	
			});
		});
		$(cardSelector+" #volume_up").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"/volume_up",
				method:"GET",	
			});
		});
		
		that.sendRequest({
						url:resource.uri+"/player_state",
						method:"GET",	
						success:function(player_state){
							switch($.trim(player_state)){
								case "paused" :
									$(cardSelector+" #playpause").addClass("play");
									break;
								
								case "playing" :
									
									$(cardSelector+" #playpause").removeClass("play");
									break;
							}
						}
					});

		
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
		//Sink.renderer.selected.appendHTML("#link-"+component.id, link);
		$("#link-"+component.id).append(link);
		/*
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
		*/
		
		
	}
	
	that.update = function(component){

		
		
	};
	
	
	return that;
	
};
Sink.widget.provider.add("service_itunes",new itunes());

