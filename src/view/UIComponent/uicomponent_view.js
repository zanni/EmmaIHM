/*
*
*	UIComponent.view 
*	input : 
*		{
*			id:"id",
*			items:[UIComponent.toolbar(...),UIComponent.list(...), ...], //array of UIComponent
*		}
*
*/
UIComponent.view = function(){

	var that = UIComponent.component();
	
	that.render = function(spec){
		var render = "";
		
		render += "<div id='"+spec.id+"' class='"+Sink.viewCls+"'>";
		if(spec.items)
		for(var i=0;i<spec.items.length;i++){
			render += spec.items[i];
		}
		render += "</div>";
		
		return render;
	};
	
	return that;
};