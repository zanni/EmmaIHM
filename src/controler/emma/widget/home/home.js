var home = function(){
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
		
		var widget = Sink.widget.provider.get("card");
		widget.render(component, "<div><strong>Bienvenue sur Emma</string></div><img src='resource/emma/theme/logo_emma.png'><div>powered by EmmaIHM v0.1</div>");
		
		
	};
	
	that.renderLink = function(component){
		
	};
	
	that.update = function(component){
	
	};
	
	return that;
};

Sink.widget.provider.add("home", new home());