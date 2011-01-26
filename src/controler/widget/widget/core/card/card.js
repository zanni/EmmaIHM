var card = function(){
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
	that.render = function(component, card_html){
		var items = [];
		
		items.push(new UIComponent.toolbar({
			name:component.id,
		}));
		items.push(card_html);
		
		var component = UIComponent.card({
			id:component.id,
			items:items,
		});		
		Sink.renderer.selected.appendHTML(Sink.body,component.render());
		
	};
	
	that.renderLink = function(component){
		
	};
	
	that.update = function(component){
	
	};
	
	return that;
};

Sink.widget.provider.add("card", new card());