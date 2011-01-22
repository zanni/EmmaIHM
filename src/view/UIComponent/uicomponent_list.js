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
UIComponent.list = function(){

	var that = UIComponent.component();
	
	that.render = function(spec){
		var render = "";
		render += "<ul class='"+spec.style+"'>";
		for(var i=0;i<spec.items.length;i++){
			render += spec.items[i];
		}
		render += "</ul>";
		return render;
	};
	
	return that;
};