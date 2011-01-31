
var itunes = function(spec){
	
	var that = new Emma.WIDGET.interface();
	
	that.html = "";
	
	
	
	that.sendRequest = function(spec){
		
		
		Sink.comm.selected.send({
			url:spec.url,
			method:spec.method,
			data:spec.data,
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
		/*
		that.sendRequest({
			url:that.resource.uri+"/current_artwork",
			method:"GET",	
			success:function(playlist){
				alert(playlist);
			}
		});
		
		*/
		
	};
	
	that.render = function(component){
		var widget_card = Sink.widget.provider.get("card");
		widget_card.render()
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

