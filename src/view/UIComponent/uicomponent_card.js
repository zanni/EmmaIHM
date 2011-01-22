/*
*
*	UIComponent.card 
*	input : 
*		{
*			id:"id",
*			items:[UIComponent.toolbar(...),UIComponent.list(...), ...], //array of UIComponent
*		}
*
*/
UIComponent.card = function(){

	var that = UIComponent.component();
	
	that.render = function(spec){
		var render = "";
		render += "<div id='card-"+spec.id+"' class='"+Sink.cardCls+"'>";
		for(var i=0;i<spec.items.length;i++){
			render += spec.items[i];
		}
		render += "</div>";
		return render;
	};
	
	return that;
};