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
		
		var card_html = "<div><strong>Bienvenue sur Emma</string></div><img src='resource/emma/theme/logo_emma.png'><div>powered by EmmaIHM v0.1</div>";
		
		card_html = new UIComponent.slideshow({
			id:"slideshow",
			slide:[
				{
					title:"slide 1",
					description:"desc 1",
					content:"<p>mouai c cool</p>",
				},
				{
					title:"slide 2",
					description:"desc 2",
					content:"<p>mouai c cool</p>",
				},
				{
					title:"slide 3",
					description:"desc 3",
					content:"<p>mouai c cool</p>",
				},
				{
					title:"slide 4",
					description:"desc 4",
					content:"<p>mouai c cool</p>",
				},
			],
			init:{
				
			},
		});
		widget.render(component, card_html);
		
		
	};
	
	that.renderLink = function(component){
		
	};
	
	that.update = function(component){
	
	};
	
	return that;
};

Sink.widget.provider.add("home", new home());