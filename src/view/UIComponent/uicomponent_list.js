/*
*
*	UIComponent.list
*	input : 
*		{
*			style:"style",
*			items:[UIComponent.list_link(...), ...], //array of UIComponent.list_link
*		}
*
*/
UIComponent.list = function(spec){

	var that = UIComponent.component();
	
	that.style = spec.style;
	that.items = spec.items;
	
	that.render = function(){
		var render = "";
		render += "<ul class='"+that.style+"'>";
		if(that.items){
			for(var i=0;i<that.items.length;i++){
				if(that.items[i].render) render += that.items[i].render();
				else render += that.items[i];
			}
		}
		render += "</ul>";
		return render;
	};
	
	return that;
};