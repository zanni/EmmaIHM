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
UIComponent.view = function(spec){

	var that = UIComponent.component();
	
	that.id = spec.id;
	that.items = spec.items;
	
	that.render = function(){
		var render = "";
		
		render += "<div id='"+that.id+"' class='"+Sink.viewcls+"'>";
		if(that.items){
			for(var i=0;i<that.items.length;i++){
				if(that.items[i].render) render += that.items[i].render();
				else render += that.items[i];
			}
		}
		render += "</div>";
		
		return render;
	};
	
	return that;
};