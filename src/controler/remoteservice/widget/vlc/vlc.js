

$.ajax({
	url:RemoteService.widget_path+"vlc/vlc.css",
	success:function(data){
		 $("<style></style>").appendTo("head").html(data);
	},
});	

var vlc = function(){
	
	var that = new Sink.widget.interface();
	
	that.url = 
	that.html = "";
	
	$.ajax({
		url:RemoteService.widget_path+"vlc/vlc.html",
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
		
		var resource = {};
		resource.uri = "http://"+RemoteService.domain+":"+RemoteService.port+"/vlc/";
		var cardSelector = "#card-"+component.id;
		$(cardSelector+" #play").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"play",
				method:"GET",	
				success:function(){
					
					that.sendRequest({
						url:resource.uri+"player_state",
						method:"GET",	
						success:function(player_state){
							switch($.trim(player_state)){
								case "paused" :
									$(cardSelector+" #play").addClass("play");
									break;
								
								case "playing" :
									
									$(cardSelector+" #play").removeClass("play");
									break;
							}
						}
					});
				}
			});
		});
		
		$(cardSelector+" #previous").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"previous",
				method:"GET",	
			});
		});
		$(cardSelector+" #next").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"next",
				method:"GET",	
			});
		});
		$(cardSelector+" #fullscreen").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"fullscreen",
				method:"GET",	
			});
		});
		$(cardSelector+" #mute").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"mute",
				method:"GET",	
			});
		});
		$(cardSelector+" #volume_down").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"volume_down",
				method:"GET",	
			});
		});
		$(cardSelector+" #volume_up").bind("click", function(){
			that.sendRequest({
				url:resource.uri+"volume_up",
				method:"GET",	
			});
		});
		
		that.sendRequest({
						url:resource.uri+"player_state",
						method:"GET",	
						success:function(player_state){
							switch($.trim(player_state)){
								case "paused" :
									$(cardSelector+" #play").addClass("play");
									break;
								
								case "playing" :
									
									$(cardSelector+" #play").removeClass("play");
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
					ico : "resource/folder/vlc.png",
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
Sink.widget.provider.add("remoteservice_vlc",new vlc());

