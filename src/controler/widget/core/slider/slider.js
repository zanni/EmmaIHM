var slider = function(){
	var that = new Sink.widget.interface();
	
	that.init = function(){
	};
	that.render = function(component){
		var slider = UIComponent.slider({
			id:"slider"
		});
		//Sink.renderer.selected.appendHTML(Sink.body,slider.render());
		var card = Sink.widget.provider.get("card");
		card.render(component, slider.render());
		new Dragdealer('slider');
		
	};
	
	that.renderLink = function(component){
		
	};
	
	that.update = function(component){
	
	};
	
	return that;
};

Sink.widget.provider.add("slider", new slider());